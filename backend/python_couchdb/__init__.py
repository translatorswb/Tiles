import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ANNOUNCEMENTS_DATABASE_NAME = "announcements"
ARTICLES_DATABASE_NAME = "articles"

CONTENT_DIR = os.path.join(BASE_DIR, "content")
LOCAL_ANNOUNCEMENTS_DIR = os.path.join(CONTENT_DIR, ANNOUNCEMENTS_DATABASE_NAME)
LOCAL_ARTICLES_DIR = os.path.join(CONTENT_DIR, ARTICLES_DATABASE_NAME)
