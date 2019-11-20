import os

from cloudant.replicator import Replicator

from utils import (
    connect_to_couch,
    get_document_directories,
    update_or_add_document,
    delete_documents_removed_from_google_drive,
    add_users_to_db,
)
from design_documents import read_only_except_admin


def configure_users_db(db, client_user_name: str, client_password: str, role: str):
    """
    Here we configure our users for now we are only creating one user but we will add more
    """
    user_id = f"org.couchdb.user:{client_user_name}"
    data = {
        "_id": user_id,
        "name": client_user_name,
        "password": client_password,
        "roles": [role],
        "type": "user",
    }
    try:
        user_document = db[user_id]
        print(f"Found {client_user_name} updating this user")
        for key, value in data.items():
            user_document[key] = value
        user_document.save()
    except:
        print(f"User {client_user_name} does not exist, creating a new user")
        db.create_document(data)


def configure_content_db(
    client,
    dir_content_type: str,
    database_name: str,
    camp_id: int,
    db_users: list,
    server_admin_username: str,
    server_admin_password: str,
):
    """
    From our local file system we create a list of directories. Each directory contains the content for one article, in multiple languages.

    We create the database no matter what, since we need them for the front end vue application to operate properly.

    We loop through all of the directories and we create a new document or we update the existing document. We also provide users the ability to read and write to the database. TODO how to give users only the ability to write?

    We then remove any documents that are in the database which we do not have on our local file system. We get these local documents from google drive. 

    We then provide the database with users who can access the content
    """
    dirs = get_document_directories(dir_content_type)

    db = client.create_database(database_name)

    read_only_except_admin(database=db, database_name=database_name)

    # we start our loop here, looping through the documents and adding or updating them in the db
    for content_dir in dirs:
        update_or_add_document(
            db=db,
            full_directory_path=content_dir,
            dir_content_type=dir_content_type,
            camp_id=camp_id,
        )
        add_users_to_db(
            server_url=db.database_url,
            server_admin_password=server_admin_password,
            server_admin_username=server_admin_username,
            users_with_rights_to_db=db_users,
        )
    delete_documents_removed_from_google_drive(db=db, dirs=dirs)
    print(f"Configured {database_name}")


def configure_recordings_db(
    client,
    camp_id: int,
    server_admin_password: str,
    server_admin_username: str,
    db_users: list,
):
    """
    We need to create a recordings db for each of the camps and grant the clients the ability to write to this database. 
    """
    db = client.create_database("recordings")
    if db.exists():
        add_users_to_db(
            server_url=db.database_url,
            server_admin_password=server_admin_password,
            server_admin_username=server_admin_username,
            users_with_rights_to_db=db_users,
        )
    print("Configured recordings")
    return db


def start_replication(replicator, source_db, target_db, replication_id):
    return replicator.create_replication(
        source_db=source_db,
        target_db=target_db,
        repl_id=replication_id,
        continuous=True,
    )


def configure_replicator(client, source_db, target_db):
    """
    Currently we try and start a replication, if that fails that means one already exists. So we stop it and create a new one.
    https://python-cloudant.readthedocs.io/en/latest/replicator.html#module-cloudant.replicator

    How can we configure couchdb to delete this data...
    """
    replicator = Replicator(client)
    replication_id = f"{source_db.database_name}_to_{target_db.database_name}"

    try:
        replication_doc = start_replication(
            replicator, source_db, target_db, replication_id
        )
    except:
        replicator.stop_replication(repl_id=replication_id)
        replication_doc = start_replication(
            replicator, source_db, target_db, replication_id
        )

