import sys
import json
import os
import io

from cloudant.client import Cloudant
from datetime import datetime
import time


ACCEPTABLE_FILE_TYPES = ['md', 'mp3', 'png']


def create_base_document(db, meta_data):
    """
    We a document in couchDB so we can then append the attachments to it
    """
    document = db.create_document(meta_data)
    if document.exists():
        print("Document %s successfully created" % (meta_data['name']))
        return document
    else:
        print("Error while creating document %s" % (meta_data['name']))
        sys.exit()


def connect_to_db(username, password, url):
    """
    https://python-cloudant.readthedocs.io/en/latest/getting_started.html#authentication
    """
    return Cloudant(username, password,  url=url, connect=True)


def setup_database(client, database_name):
    """
    Since this is development and we are using dateTime for the id we will create and delete a new DB each time
    """
    db = client.create_database(database_name)
    if db.exists():
        print('This database %s exists, clearing it of its contents' %
              (database_name))
        client.delete_database(database_name)
        db = client.create_database(database_name)
        if db.exists():
            print('Fresh db %s sucessfully created' % (database_name))
            return db
        else:
            print("Something went wrong the DB %s was not created" %
                  (database_name))
            sys.exit()
    else:
        print('created a new database')
        return db


def get_document_directories(dir_file_path):
    """
    The local dir has the same name as the database 
    """
    return [os.path.join(dir_file_path, name) for name in os.listdir(
        dir_file_path) if os.path.isdir(os.path.join(dir_file_path, name))]


def create_json_datetime_now():
    """
    Create a json seizable datetime value
    This is a bit of a hack to get it into the same format as with JS
    e.g. 
    "2019-10-05T12:06:50.762Z"
    """
    return str(int(time.time() * 1000))
    # return str(datetime.now()).replace(" ", 'T') + 'Z'


def add_attachment_to_doc(document, file_to_attach, content_type):
    """
    https://python-cloudant.readthedocs.io/en/latest/document.html#cloudant.document.Document.put_attachment

    The tests can be followed to learn how to use
    https://github.com/cloudant/python-cloudant/blob/bbdd5d31ebb2981696cf9adcb6505a2ac13d44da/tests/unit/document_tests.py
    """
    with io.open(file_to_attach, 'rb') as f:
        data = f.read()
        resp = document.put_attachment(
            os.path.basename(file_to_attach), content_type=content_type, data=data)
        if resp['ok'] == True:
            return 1
        else:
            print("Error %s was not attached" % (file_to_attach))
            return 0


def add_attachments_to_document(document, directory):
    """
    We append all of the attachments in the folder to the document
    """
    files = [name for name in os.listdir(
        directory) if name.split('.')[-1] in ACCEPTABLE_FILE_TYPES]
    count = 0

    for file_to_attach in files:
        if file_to_attach.split('.')[-1] == 'md':
            count += add_attachment_to_doc(document, os.path.join(
                directory, file_to_attach), 'text/markdown;charset=utf-8')
        elif file_to_attach.split('.')[-1] == 'mp3':
            count += add_attachment_to_doc(document, os.path.join(
                directory, file_to_attach), 'audio/mp3')
        elif file_to_attach.split('.')[-1] == 'png':
            count += add_attachment_to_doc(document, os.path.join(
                directory, file_to_attach), 'image/png')
    print("There were %s files attached to %s" % (
        count, directory.split('/')[-1]))
