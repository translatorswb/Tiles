import os
import shutil

from googleapiclient.discovery import build

from google_docs_pull.logger import log
from google_docs_pull import google_auth
from google_docs_pull import remote_to_local
from __init__ import BASE_DIR, LOCAL_ANNOUNCEMENTS_DIR, LOCAL_ARTICLES_DIR

ANNOUNCEMENTS_GOOGLE_DIR_ID = "1WiBXft6qxEp0Yja3ljMuBcPoOK4BadH6"
ARTICLES_GOOGLE_DIR_ID = "1NqlV3akLjEmbeniKg4_GcmwzXKM_QG9P"


def process_remote_to_local(
    google_drive_folder_id: str, local_directory_path: str, drive_service
):
    pull_server = remote_to_local.PullServer(drive_service)
    remote_announcements_dir_struct = pull_server.get_remote_dir_struct(
        google_drive_folder_id
    )
    log("cleaning the local directory")
    exiting_folders = [
        os.path.join(local_directory_path, dir_name)
        for dir_name in next(os.walk(local_directory_path))[1]
    ]
    for folder in exiting_folders:
        shutil.rmtree(folder)

    log("Replicating remote directory structure locally ...")
    pull_server.replicate_remote_dir_struct(
        local_directory_path, remote_announcements_dir_struct
    )


def get_remote_folders():

    log("Setting up Drive Serivce")
    drive_service = build("drive", "v3", credentials=google_auth.get_access_token())
    log("Processing Announcements...")
    process_remote_to_local(
        google_drive_folder_id=ANNOUNCEMENTS_GOOGLE_DIR_ID,
        local_directory_path=LOCAL_ANNOUNCEMENTS_DIR,
        drive_service=drive_service,
    )
    log("Processing Articles...")
    process_remote_to_local(
        google_drive_folder_id=ARTICLES_GOOGLE_DIR_ID,
        local_directory_path=LOCAL_ARTICLES_DIR,
        drive_service=drive_service,
    )

    log("All done. Exiting ...")

