import os
import click

from utils import connect_to_couch

from configure_databases import (
    configure_users_db,
    configure_content_db,
    configure_recordings_db,
    configure_replicator,
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

CLIENT_USERNAME = "client"
CLIENT_PASSWORD = "clientPassword"

SERVER_ADMIN_USERNAME = "admin"
SERVER_ADMIN_PASSWORD = "password"

TWB_STAFF_USERNAME = "twb"
TWB_STAFF_PASSWORD = "twbPassword"

# URL = "https://tiles-couchdb.pngk.org"
URL = "http://localhost:5984"


def run_configure_couchdb():
    """
    Here we run the logic to get couchdb ready and up to date. 

    Each camp has it's own database for recordings, Articles and announcements
    """
    client = connect_to_couch(SERVER_ADMIN_USERNAME, SERVER_ADMIN_PASSWORD, URL)
    users_db = client.create_database("_users")
    configure_users_db(
        db=users_db,
        client_user_name=CLIENT_USERNAME,
        client_password=CLIENT_PASSWORD,
        role="client",
    )
    configure_users_db(
        db=users_db,
        client_user_name=TWB_STAFF_USERNAME,
        client_password=TWB_STAFF_PASSWORD,
        role="admin",
    )
    # Master recordings database that we replicate to
    master_recordings_db = client.create_database(f"master_recordings")

    for camp_id in range(NUMBER_OF_CAMPS):
        # Configure the articles databases
        configure_content_db(
            client=client,
            dir_content_type=LOCAL_ARTICLES_DIR,
            database_name=f"c00{camp_id + 1}_{ARTICLES_DATABASE_NAME}",
            camp_id=camp_id,
            db_users=[CLIENT_USERNAME],
            server_admin_username=SERVER_ADMIN_USERNAME,
            server_admin_password=SERVER_ADMIN_PASSWORD,
        )

        # Configure the announcements databases
        configure_content_db(
            client=client,
            dir_content_type=LOCAL_ANNOUNCEMENTS_DIR,
            database_name=f"c00{camp_id + 1}_{ANNOUNCEMENTS_DATABASE_NAME}",
            camp_id=camp_id,
            db_users=[CLIENT_USERNAME],
            server_admin_username=SERVER_ADMIN_USERNAME,
            server_admin_password=SERVER_ADMIN_PASSWORD,
        )
        # TODO we decided to only have one recordings database

    recordings_db = configure_recordings_db(
        client=client,
        camp_id=camp_id,
        server_admin_password=SERVER_ADMIN_PASSWORD,
        server_admin_username=SERVER_ADMIN_USERNAME,
        db_users=[CLIENT_USERNAME],
    )
    # We configure a replicator to get data from the recordings db to the master db
    configure_replicator(
        client=client, source_db=recordings_db, target_db=master_recordings_db
    )
    print("All documents successfully made closing connection with CouchDB")
    client.disconnect()


@click.command()
@click.option(
    "-pgdd",
    "--pull-google-drive-docs",
    help="Pull the files from the remote drive to our local file system",
    is_flag=True,
)
@click.option(
    "-cc",
    "--configure-couchdb",
    help="Format the files we have locally to a format couchdb can handle and send them to the repote couchDB",
    is_flag=True,
)
@click.option("-ra", "--run-all", help="Run all available commands", is_flag=True)
def main(pull_google_drive_docs: bool, configure_couchdb: bool, run_all: bool):
    if pull_google_drive_docs or run_all:
        get_remote_folders()
    if configure_couchdb or run_all:
        run_configure_couchdb()


if __name__ == "__main__":
    main()

