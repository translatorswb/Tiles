import sys
import json
import os
import io
import requests


from cloudant.client import CouchDB
from datetime import datetime
import time

from __init__ import LOCAL_ANNOUNCEMENTS_DIR, LOCAL_ARTICLES_DIR
from meta_data_formatter import (
    extract_announcements_meta_data,
    extract_articles_meta_data,
)

ACCEPTABLE_FILE_TYPES = ["md", "mp3", "png", "jpg"]


def connect_to_couch(username, password, url):
    """
    https://python-cloudant.readthedocs.io/en/latest/getting_started.html#authentication
    """
    return CouchDB(username, password, url=url, connect=True)


def get_document_directories(dir_file_path):
    """
    The local dir has the same name as the database 
    """
    return [
        os.path.join(dir_file_path, name)
        for name in os.listdir(dir_file_path)
        if os.path.isdir(os.path.join(dir_file_path, name))
    ]


def create_json_datetime_now():
    """
    Create a json seizable datetime value

    e.g. 
    "1570832046966"
    """
    return str(int(time.time() * 1000))


def add_attachment_to_doc(document, file_to_attach, content_type):
    """
    This code overwrites the existing attachment
    https://python-cloudant.readthedocs.io/en/latest/document.html#cloudant.document.Document.put_attachment

    The tests can be followed to learn how to use
    https://github.com/cloudant/python-cloudant/blob/bbdd5d31ebb2981696cf9adcb6505a2ac13d44da/tests/unit/document_tests.py
    """
    with open(file_to_attach, "rb") as f:
        data = f.read()
        resp = document.put_attachment(
            os.path.basename(file_to_attach), content_type=content_type, data=data
        )
        if resp["ok"] == True:
            return 1
        else:
            print("Error %s was not attached" % (file_to_attach))
            return 0


def add_attachments_to_document(document, directory):
    """
    We append all of the attachments in the folder to the document
    """
    files = [
        name
        for name in os.listdir(directory)
        if name.split(".")[-1] in ACCEPTABLE_FILE_TYPES
    ]
    count = 0

    for file_to_attach in files:
        if file_to_attach.split(".")[-1] == "md":
            count += add_attachment_to_doc(
                document,
                os.path.join(directory, file_to_attach),
                "text/markdown;charset=utf-8",
            )
        elif file_to_attach.split(".")[-1] == "mp3":
            count += add_attachment_to_doc(
                document, os.path.join(directory, file_to_attach), "audio/mp3"
            )
        elif file_to_attach.split(".")[-1] == "png":
            count += add_attachment_to_doc(
                document, os.path.join(directory, file_to_attach), "image/png"
            )
        elif file_to_attach.split(".")[-1] == "jpg":
            count += add_attachment_to_doc(
                document, os.path.join(directory, file_to_attach), "image/jpg"
            )
    print("There were %s files attached to %s" % (count, directory.split("/")[-1]))


def delete_documents_removed_from_google_drive(db, dirs: list):
    """
    We get the directory names which are also now our ids, we then get a list of all of the documents we have which are not in the directory names
    we delete these documents

    We should not delete the design docs. So we therefor append _design/auth to the directory names we do not want to delete. We start all of our design docs that way

    When a document is deleted it looks like this in pouch, taking up very little memory:
    {_deleted: true, _doc_id_rev: "disposal_feces::9-18f1d266335e4f0cf89b9be95943095d"}
    """
    directory_names = [
        os.path.basename(os.path.normpath(directory)) for directory in dirs
    ]
    directory_names.append("_design/auth")
    docs_to_delete_ids = [
        doc["id"] for doc in db.all_docs()["rows"] if doc["id"] not in directory_names
    ]

    for document_to_delete_id in docs_to_delete_ids:
        # The delete() method deletes the document in couchdb which then propagates to pouch when it connects again.
        db[document_to_delete_id].delete()
        print(f"Deleted document with id = {document_to_delete_id}")


def update_or_add_document(
    db, full_directory_path: str, dir_content_type: str, camp_id: int
):
    """
    Based off of which directory we are in we add the meta data

    We use a try except statement to deal with documents that do not exist
    """
    if dir_content_type == LOCAL_ANNOUNCEMENTS_DIR:
        user_meta_data = extract_announcements_meta_data(full_directory_path, camp_id)
    elif dir_content_type == LOCAL_ARTICLES_DIR:
        user_meta_data = extract_articles_meta_data(full_directory_path, camp_id)
    local_directory_id = os.path.basename(os.path.normpath(full_directory_path))
    if user_meta_data == False:
        return False
    meta_data = {**{"_id": local_directory_id}, **user_meta_data}
    try:
        # The document already exists.
        content_document = db[local_directory_id]
        print(f"Found {local_directory_id} updating this content")
        for key, value in meta_data.items():
            content_document[key] = value
        content_document.save()
    except:
        # We are creating a new document.
        print(f"Document {local_directory_id} is new, making a fresh document.")
        content_document = db.create_document(meta_data)
    add_attachments_to_document(content_document, directory=full_directory_path)


def add_users_to_db(
    server_url: str,
    server_admin_username: str,
    server_admin_password: str,
    users_with_rights_to_db: list,
):
    """
    Since the cloudant api doesn't have a way to create users in couchdb we have to create our own function.
    """

    request_url = f"{server_url}/_security"
    database_name = server_url.split("/")[-1]
    data = {
        "admins": {"names": [], "roles": []},
        "members": {"names": users_with_rights_to_db, "roles": []},
    }

    resp = requests.put(
        request_url,
        data=json.dumps(data),
        headers={"Content-Type": "application/json"},
        auth=(server_admin_username, server_admin_password),
    )
    if resp.status_code == 200:
        print(
            f"Users: {users_with_rights_to_db} were sucessfully granted writes to {database_name}"
        )
    else:
        print(
            f"There was an error when trying to add {users_with_rights_to_db} to {database_name}"
        )
        print(resp.content)

