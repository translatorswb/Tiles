import os
import json
import io

"""
This file is used to create a .json file in the assets directory which tells vue what audio files we have.
"""

DIR = os.path.dirname(os.path.abspath(__file__))

ROOT_DIR = os.path.dirname(os.path.dirname(DIR))
ASSETS_DIR = os.path.join(ROOT_DIR, "frontend", "assets")
STATIC_DIR = os.path.join(ROOT_DIR, "frontend", "static")
OUT_FILE = os.path.join(ASSETS_DIR, "audio-instructions.json")

FILE_DIRECTORIES = [
    "language",
    "welcome/information",
    "welcome/feedback",
    "welcome/announcement",
    "info",
    "feedback",
]

LANGUAGES = [
    "bura",
    "en",
    "fulfulde",
    "hausa",
    "kanuri",
    "kibaku",
    "mandara",
    "marghi",
    "shuwa",
    "waha",
]

BASE_DICT = {
    directory: {language: False for language in LANGUAGES}
    for directory in FILE_DIRECTORIES
}


def get_mp3_files():
    return [
        os.path.join(path, name)
        for path, subdirs, files in os.walk(STATIC_DIR)
        for name in files
        if name.endswith(".mp3")
    ]


for audio_file in get_mp3_files():
    for directory in FILE_DIRECTORIES:
        if directory in audio_file:
            language = os.path.basename(audio_file).split(".")[0]
            BASE_DICT[directory][language] = True

json_str = json.dumps(BASE_DICT)
with io.open(OUT_FILE, "w", encoding="utf8") as outfile:
    outfile.write(json_str)

