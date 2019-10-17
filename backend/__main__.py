import os
import click
from cloudant.client import Cloudant

from utils import (
    create_json_datetime_now,
    connect_to_db,
    get_document_directories,
    add_attachments_to_document,
)
from meta_data_formatter import (
    extract_announcements_meta_data,
    extract_articles_meta_data,
)
from google_docs_pull.__main__ import get_remote_folders
from __init__ import (
    LOCAL_ANNOUNCEMENTS_DIR,
    LOCAL_ARTICLES_DIR,
    ANNOUNCEMENTS_DATABASE_NAME,
    ARTICLES_DATABASE_NAME,
)

# since we know how many camp we have we check if they are displayed in the metadata
NUMBER_OF_CAMPS = 3

USERNAME = "admin"
PASSWORD = "admin"
URL = "https://tiles-couchdb.pngk.org"
# URL = "http://localhost:5984"


def update_or_add_document(db, full_directory_path: str, local_dir: str, camp_id: int):
    """
    Based off of which directory we are in we add the meta data
    """
    if local_dir == LOCAL_ANNOUNCEMENTS_DIR:
        user_meta_data = extract_announcements_meta_data(full_directory_path, camp_id)
    elif local_dir == LOCAL_ARTICLES_DIR:
        user_meta_data = extract_articles_meta_data(full_directory_path, camp_id)
    local_directory_id = os.path.basename(os.path.normpath(full_directory_path))
    if user_meta_data == False:
        return False
    meta_data = {**{"_id": local_directory_id}, **user_meta_data}
    document = db.create_document(meta_data)
    add_attachments_to_document(document, directory=full_directory_path)


def delete_documents_removed_from_google_drive(db, dirs: list):
    """
    We get the directory names which are also now our ids, we then get a list of all of the documents we have which are not in the directory names
    we delete these documents
    """
    directory_names = [
        os.path.basename(os.path.normpath(directory)) for directory in dirs
    ]
    docs_to_delete_ids = [
        doc["id"] for doc in db.all_docs()["rows"] if doc["id"] not in directory_names
    ]

    for document_to_delete_id in docs_to_delete_ids:
        db[document_to_delete_id].delete()
        print(f"Deleted document with id = {document_to_delete_id}")


def configure_db(client, local_dir, database_name, camp_id):
    """
    We first get all of the documents we have on our local file system i.e. dirs

    The create_database method creates a new database or returns the db if it exist

    We then modify or create each document which we have on our local file system
    """
    dirs = get_document_directories(local_dir)

    db = client.create_database(database_name)
    # we start our loop here, looping through the documents and adding or updating them in the db
    for content_dir in dirs:
        update_or_add_document(
            db=db, full_directory_path=content_dir, local_dir=local_dir, camp_id=camp_id
        )
    delete_documents_removed_from_google_drive(db=db, dirs=dirs)


@click.command()
@click.option(
    "-pgdd",
    "--pull-google-drive-docs",
    help="Pull the files from the remote drive to our local file system",
    is_flag=True,
)
@click.option(
    "-utc",
    "--upload-to-couch",
    help="Format the files we have locally to a format couchdb can handle and send them to the repote couchDB",
    is_flag=True,
)
@click.option("-ra", "--run-all", help="Run all available commands", is_flag=True)
def main(pull_google_drive_docs: bool, upload_to_couch: bool, run_all: bool):
    if pull_google_drive_docs or run_all:
        get_remote_folders()
    if upload_to_couch or run_all:
        client = connect_to_db(USERNAME, PASSWORD, URL)
        for camp_id in range(NUMBER_OF_CAMPS):
            configure_db(
                client=client,
                local_dir=LOCAL_ARTICLES_DIR,
                database_name=f"c00{camp_id + 1}_{ARTICLES_DATABASE_NAME}",
                camp_id=camp_id,
            )
            configure_db(
                client=client,
                local_dir=LOCAL_ANNOUNCEMENTS_DIR,
                database_name=f"c00{camp_id + 1}_{ANNOUNCEMENTS_DATABASE_NAME}",
                camp_id=camp_id,
            )
        print("All documents successfully made closing connection with CouchDB")
        client.disconnect()


if __name__ == "__main__":
    main()

