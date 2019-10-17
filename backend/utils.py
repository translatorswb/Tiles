import sys
import json
import os
import io

from cloudant.client import Cloudant
from datetime import datetime
import time


ACCEPTABLE_FILE_TYPES = ["md", "mp3", "png"]


def connect_to_db(username, password, url):
    """
    https://python-cloudant.readthedocs.io/en/latest/getting_started.html#authentication
    """
    return Cloudant(username, password, url=url, connect=True)


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

