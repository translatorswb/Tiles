import os

from google_docs_pull import progress_bar

from google_docs_pull.logger import log

from apiclient.http import MediaIoBaseDownload

OTHER_USEFUL_META_DATA_FORMATS = [
    "image/png",
    "audio/mp3",
    "text/markdown",
    "image/jpeg",
]
EXAMPLE_FOLDER_NAME = "01-EXAMPLE"


class PullServer:
    def __init__(self, drive_service):
        self.drive_service = drive_service

    def get_all_files_in_remote_dir(self, remote_dir_id):
        next_page_token = ""

        files = []

        while True:
            results = (
                self.drive_service.files()
                .list(
                    pageSize=1000,
                    pageToken=next_page_token,
                    q=f"'{remote_dir_id}' in parents",
                    fields="nextPageToken, files(id, name, mimeType, trashed)",
                )
                .execute()
            )

            files.extend(
                [file for file in results.get("files", []) if not file["trashed"]]
            )
            next_page_token = results.get("nextPageToken", "")

            if next_page_token == "":
                break

        return files

    def get_remote_dir_struct(self, remote_dir_id, parent_dir_struct=None):
        if parent_dir_struct is None:
            parent_dir_struct = {}

        files_in_dir = self.get_all_files_in_remote_dir(remote_dir_id)

        for file in files_in_dir:
            if file["mimeType"] == "application/vnd.google-apps.folder":
                if file["name"] != EXAMPLE_FOLDER_NAME:
                    parent_dir_struct[file["name"]] = file
                    self.get_remote_dir_struct(
                        file["id"], parent_dir_struct[file["name"]]
                    )

            elif file["mimeType"] == "application/vnd.google-apps.spreadsheet":
                parent_dir_struct[file["name"]] = file

            elif file["mimeType"] in OTHER_USEFUL_META_DATA_FORMATS:
                parent_dir_struct[file["name"]] = file
            else:
                print("UNKNOWN FORMAT")
                print(file)

        return parent_dir_struct

    def download_csv(self, remote_file_id, file_name, file_path):
        req = self.drive_service.files().export_media(
            fileId=remote_file_id, mimeType="text/csv"
        )

        with open(file_path, "wb") as fh:
            downloader = MediaIoBaseDownload(fh, req)

            download_complete = False
            log(f"Downloading {file_name}")
            progress_bar.start_progress()

            while not download_complete:
                status, download_complete = downloader.next_chunk()
                progress_bar.progress(status.progress())

            progress_bar.end_progress()

    def download_other_files(self, remote_file_id, file_name, file_path):
        req = self.drive_service.files().get_media(fileId=remote_file_id)

        with open(file_path, "wb") as fh:
            downloader = MediaIoBaseDownload(fh, req)

            download_complete = False
            log(f"Downloading {file_name}")
            progress_bar.start_progress()

            while not download_complete:
                status, download_complete = downloader.next_chunk()
                progress_bar.progress(status.progress())

            progress_bar.end_progress()

    # Replicates remote directory structure locally, also downloads remote files
    def replicate_remote_dir_struct(self, curr_path, remote_dir_struct):
        if not os.path.exists(curr_path):
            os.makedirs(curr_path)
        for k, v in remote_dir_struct.items():
            if type(v) != dict:
                continue
            if v["mimeType"] == "application/vnd.google-apps.folder":
                self.replicate_remote_dir_struct(os.path.join(curr_path, k), v)
            elif v["mimeType"] == "application/vnd.google-apps.spreadsheet":
                file_name = k + ".csv"
                file_path = os.path.join(curr_path, file_name)
                self.download_csv(v["id"], file_name, file_path)
            else:
                self.download_other_files(
                    remote_file_id=v["id"],
                    file_name=v["name"],
                    file_path=os.path.join(curr_path, v["name"]),
                )
