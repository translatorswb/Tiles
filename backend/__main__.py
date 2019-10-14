import os
import click
from cloudant.client import Cloudant

from utils import (
    setup_database,
    create_json_datetime_now,
    connect_to_db,
    get_document_directories,
    create_base_document,
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

USERNAME = "admin"
PASSWORD = "admin"
URL = "http://127.0.0.1:5984"


def upload_to_db(client, local_dir, database_name):
    """
    The directory is created so it is transformed as follows:
    name - sector
    """
    dirs = get_document_directories(local_dir)
    db = setup_database(client, database_name)
    for dir_name in dirs:
        if local_dir == LOCAL_ANNOUNCEMENTS_DIR:
            user_meta_data = extract_announcements_meta_data(dir_name)
        elif local_dir == LOCAL_ARTICLES_DIR:
            user_meta_data = extract_articles_meta_data(dir_name)
        computer_meta_data = {"_id": create_json_datetime_now()}
        meta_data = {**user_meta_data, **computer_meta_data}

        document = create_base_document(db, meta_data=meta_data)

        add_attachments_to_document(document, directory=dir_name)
        print("")


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
        upload_to_db(
            client=client,
            local_dir=LOCAL_ARTICLES_DIR,
            database_name=ARTICLES_DATABASE_NAME,
        )
        upload_to_db(
            client=client,
            local_dir=LOCAL_ANNOUNCEMENTS_DIR,
            database_name=ANNOUNCEMENTS_DATABASE_NAME,
        )
        print("All documents successfully made closing connection with CouchDB")
        client.disconnect()


if __name__ == "__main__":
    main()

