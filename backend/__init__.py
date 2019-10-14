import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ANNOUNCEMENTS_DATABASE_NAME = "announcements"
ARTICLES_DATABASE_NAME = "articles"

LOCAL_ANNOUNCEMENTS_DIR = os.path.join(BASE_DIR, "content", ANNOUNCEMENTS_DATABASE_NAME)
LOCAL_ARTICLES_DIR = os.path.join(BASE_DIR, "content", ARTICLES_DATABASE_NAME)
