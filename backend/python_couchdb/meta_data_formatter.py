import os
import pandas as pd
import sys
import json

import utils

from datetime import datetime
import time


from __init__ import BASE_DIR


META_DATA_CSV_NAME = "meta_data.csv"
NAME_OF_CAMP_IN_COLUMN_1 = "Camp 1"

LANGUAGES = {
    "English": "en",
    "Waha": "waha",
    "Kibaku": "kibaku",
    "Fulfulde": "fulfulde",
    "Mandara": "mandara",
    "Bura": "bura",
    "Marghi": "marghi",
    "Shuwa": "shuwa",
    "Kanuri": "kanuri",
    "Hausa": "hausa",
}


def extract_and_add_data_to_meta_data_dict(
    df: pd.DataFrame, item_type: str, meta_data_dict: dict
):
    item = df.loc[df["Language"] == item_type, "Title"]
    if not item.empty:
        meta_data_dict[item_type.lower()] = item.values[0]
        return meta_data_dict
    else:
        print(f"There was no information for {item_type}")


# def get_icons_mapper():
#     with open(os.path.join(BASE_DIR, "icons", "icons.json"), "r") as icons_file:
#         icons = json.load(icons_file)
#     return {icon["iconName"]: icon["iconId"] for icon in icons}


def will_article_be_displayed_for_this_camp(df: pd.DataFrame, camp_id: int):
    """
    If the cell has the value Display status then we show the camp number. So whatever camp is in column a will be c001 
    """
    row_index_where_camps_are_toggled = (
        df.loc[df["Language"] == NAME_OF_CAMP_IN_COLUMN_1].index + 1
    )
    iterable_camp_display_status = df.loc[row_index_where_camps_are_toggled].values[0]
    return iterable_camp_display_status[camp_id] == "Display"


def create_meta_data_announcements_dict(df: pd.DataFrame, camp_id: int):
    """
    We create a dictionary with the following structure
    {
        "title": {
            "en": "Flood Safety Messages"
            },
        "icon": "Flood",
        "expiration": "2019-11-01"
    }
    """
    if will_article_be_displayed_for_this_camp(df, camp_id) == False:
        return False
    meta_data_dict = {"title": {}}
    for language, code in LANGUAGES.items():
        title = df.loc[df["Language"] == language, "Title"]
        if not title.empty and type(title.values[0]) == str:
            meta_data_dict["title"][code] = title.values[0]
    meta_data_dict = extract_and_add_data_to_meta_data_dict(
        df=df, item_type="Icon", meta_data_dict=meta_data_dict
    )
    meta_data_dict = extract_and_add_data_to_meta_data_dict(
        df=df, item_type="Expiration", meta_data_dict=meta_data_dict
    )
    # convert time to Unix seconds
    meta_data_dict["expiration"] = str(
        int(
            time.mktime(
                datetime.strptime(meta_data_dict["expiration"], "%Y-%m-%d").timetuple()
            )
        )
    )
    meta_data_dict["createdOn"] = utils.create_json_datetime_now()
    return meta_data_dict


def create_meta_data_articles_dict(df: pd.DataFrame, camp_id: int):
    """
    We create a dictionary with the following structure
    {
        "title": {
            "en": "Flood Safety Messages"
            },
        "sector": "protection",
    }
    """
    if will_article_be_displayed_for_this_camp(df, camp_id) == False:
        return False
    meta_data_dict = {"title": {}}
    # certain languages are not utf format
    for language, code in LANGUAGES.items():
        title = df.loc[df["Language"] == language, "Title"]
        if not title.empty and type(title.values[0]) == str:
            meta_data_dict["title"][code] = title.values[0]
    meta_data_dict = extract_and_add_data_to_meta_data_dict(
        df=df, item_type="Sector", meta_data_dict=meta_data_dict
    )
    meta_data_dict = extract_and_add_data_to_meta_data_dict(
        df=df, item_type="Icon", meta_data_dict=meta_data_dict
    )
    meta_data_dict["createdOn"] = utils.create_json_datetime_now()
    return meta_data_dict


def extract_announcements_meta_data(announcement_dir: str, camp_id: str):
    """
    Main logic for extracting the meta data for the announcements.
    """
    if META_DATA_CSV_NAME not in os.listdir(announcement_dir):
        print(f"Cannot find {META_DATA_CSV_NAME}")
        sys.exit()
    else:
        df = pd.read_csv(
            os.path.join(announcement_dir, META_DATA_CSV_NAME)
        )  # encoding="ISO-8859-1"
        return create_meta_data_announcements_dict(df, camp_id)


def extract_articles_meta_data(articles_dir: str, camp_id: str):
    """
    Main logic for extracting the meta data for the articles. 
    """
    if META_DATA_CSV_NAME not in os.listdir(articles_dir):
        print(f"Cannot find {META_DATA_CSV_NAME}")
        sys.exit()
    else:
        df = pd.read_csv(
            os.path.join(articles_dir, META_DATA_CSV_NAME), encoding="UTF-8"
        )
        return create_meta_data_articles_dict(df, camp_id)
