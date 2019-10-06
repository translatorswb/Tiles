import os

from cloudant.client import Cloudant

from utils import setup_database, create_json_datetime_now, connect_to_db, get_document_directories, create_base_document, add_attachments_to_document

USERNAME = 'admin'
PASSWORD = 'admin'
URL = 'http://127.0.0.1:5984'

CONTENT_FOLDER_NAME = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), 'content')
ANNOUNCEMENTS_DATABASE_NAME = 'announcements'
CATEGORIZED_ARTICLES_DATABASE_NAME = 'articles'


def upload_announcements_to_db(client, db_name):
    """
    All of the folders in the announcements directory become an announcement there is no other metadata
    """
    announcement_dirs = get_document_directories(
        os.path.join(CONTENT_FOLDER_NAME, db_name))
    db = setup_database(client, db_name)
    for announcement_dir in announcement_dirs:
        data = {'_id': create_json_datetime_now(), "name": os.path.basename(
            os.path.normpath(announcement_dir))}
        document = create_base_document(
            db, meta_data=data)
        add_attachments_to_document(
            document, directory=announcement_dir)
        print('')


def upload_articles_to_db(client, db_name):
    """
    The directory is created so it is transformed as follows:
    name - sector
    """
    articles_dirs = get_document_directories(
        os.path.join(CONTENT_FOLDER_NAME, db_name))
    db = setup_database(client, db_name)
    for article_dir_name in articles_dirs:
        name_sector = os.path.basename(
            os.path.normpath(article_dir_name)).split('-')
        data = {'_id': create_json_datetime_now(
        ), "name": name_sector[0], "sector": name_sector[1]}
        document = create_base_document(
            db, meta_data=data)
        add_attachments_to_document(
            document, directory=article_dir_name)
        print('')


if __name__ == "__main__":
    client = connect_to_db(USERNAME, PASSWORD, URL)
    upload_announcements_to_db(client, ANNOUNCEMENTS_DATABASE_NAME)
    upload_articles_to_db(
        client, CATEGORIZED_ARTICLES_DATABASE_NAME)
    print('All documents successfully made closing connection with CouchDB')
    client.disconnect()
