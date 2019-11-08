import os
import glob

from pydub import AudioSegment


DIR = os.path.dirname(os.path.abspath(__file__))
RAW_AUDIO_DIR = os.path.join(DIR, "raw")
FORMATTED_AUDIO_DIR = os.path.join(DIR, "formatted")

DIRECTORY_MAPPER = {
    "0": "language",
    "1": "welcome/information",
    "2": "welcome/recordings",
    "3": "welcome/announcements",
    "4": "info",
    "5": "feedback",
}

LANGUAGE_MAPPER = {
    "Bura-Pabir": "bura",
    "Kibaku": "kibaku",
    "Fulfulde": "fulfulde",
    "Hausa": "hausa",
    "Kanuri": "kanuri",
    "Mandara": "mandara",
    "Marghi": "marghi",
    "Shuwa-Arabic": "shuwa",
}


def get_raw_files():
    return [
        os.path.join(path, name)
        for path, subdirs, files in os.walk(RAW_AUDIO_DIR)
        for name in files
        if name.endswith(".mp3")
    ]


def format_audio_file(input_file: str, output_file: str):
    sound = AudioSegment.from_file(input_file)
    sound.export(output_file, format="mp3", bitrate="64k")


def create_output_file(input_path: str):
    file_name = os.path.basename(input_path)
    language = LANGUAGE_MAPPER[file_name.split("_")[0]]
    place = DIRECTORY_MAPPER[file_name.split("_")[1][1]]
    directory = os.path.join(FORMATTED_AUDIO_DIR, place)
    if not os.path.exists(directory):
        os.makedirs(directory)
    return os.path.join(directory, f"{language}.mp3")


for raw_file in get_raw_files():
    new_file_name = create_output_file(raw_file)
    format_audio_file(raw_file, new_file_name)

