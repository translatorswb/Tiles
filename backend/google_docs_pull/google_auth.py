# Incase you don't have API Credentials:
# https://developers.google.com/drive/api/v3/quickstart/python?refresh=1#step_1_turn_on_the

import os
import pickle

from google_docs_pull.logger import log

from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow

from __init__ import BASE_DIR


def get_access_token():
    log("Initiating login/access token process")

    # If modifying these scopes, delete the file token.pickle.
    SCOPES = [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive.metadata",
    ]

    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    token_location = os.path.join(BASE_DIR, "token.pickle")
    if os.path.exists(token_location):
        log("token.pickle found. Reusing tokens ...")
        with open(token_location, "rb") as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            log("Expired tokens. Refreshing ...")
            creds.refresh(Request())
        else:
            log("Fetching new tokens")
            flow = InstalledAppFlow.from_client_secrets_file(
                os.path.join(BASE_DIR, "credentials.json"), SCOPES
            )
            creds = flow.run_local_server(port=0)

        log("Saving tokens for next run")
        with open("token.pickle", "wb") as token:
            pickle.dump(creds, token)

    return creds
