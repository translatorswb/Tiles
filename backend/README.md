# Backend CouchDB

This module is used to setup our backend database and keep it's content up to date.

We use a CouchDB docker container to allow for simple setup of CouchDB configured on the default port `5984`. The `docker` directory here explains how to set this up.

We use custom python scripts to configure all of the databases and keep them up to date with the latest content on the google drive CMS. These scripts are in the `python_couchdb` folder.

Our production database is hosted on AWS, the cridentials for that ec2 instance along with instructions on how to setup the database are in the `aws` directory.

## Data Bases

We have 3 main databases:

- articles
- announcements
- recordings

However since we have different camps, and different content can be at each camp we give each camp it's own set of databases. So for example, the first camps databases are:

- c001_articles
- c001_announcements
- c002_recordings

### Recordings

The Recordings data is sent one way from the client to the the database each document is a single recording from a user. **With the current configuration anyone with the client username and password can read and write from the database. We need to fix this**

```json
{
  "_id": "2019-10-05T12:06:50.762Z",
  "_rev": "1-76324b9a1bc834b05511de987aeb511b",
  "locale": "en",
  "_attachments": {
    "recordings.webm": {
      "content_type": "audio/webm; codecs=opus"
    }
  }
}
```

### Content

The Announcements and Articles databases are very similar, they house the multi lingual content provided by TWB.

We have to ensure that only the admins can write to these databases. So we use a [design document](https://docs.couchdb.org/en/master/ddocs/index.html) to give write access only to admin.

We currently use the folder name that each piece of content is store in as the id. This way we can easily check the the documents are still on google drive, our source of truth, and update/delete them as necessary.

#### Announcements

Announcements are shown to the user on the welcome screen.

```json
{
  "_id": "flood_safety_messages",
  "_rev": "3-d72c906c58a1c90314f6ddb3aecd7723",
  "title": {
    "bura": "Labarayari atakəra nkamta asar pərtu",
    "en": "Flood Safety Messages"
  },
  "icon": "Flood",
  "expiration": "2019-11-01",
  "_attachments": {
    "en.md": {
      "content_type": "text/markdown;charset=utf-8"
    },
    "en.mp3": {
      "content_type": "audio/mp3"
    },
    "bura.md": {
      "content_type": "text/markdown;charset=utf-8"
    },
    "bura.mp3": {
      "content_type": "audio/mp3"
    },
    "author.png": {
      "content_type": "image/png"
    }
  }
}
```

#### Categorized_articles

```json
{
  "_id": "disposal_feces",
  "_rev": "7-344e6afcdd1302bfcf92c7db212fc67d",
  "title": {
    "en": "Disposal of faeces",
    "hausa": "Hausa faeces Info"
  },
  "sector": "health",
  "_attachments": {
    "author.png": {
      "content_type": "image/png"
    },
    "en.md": {
      "content_type": "text/markdown;charset=utf-8"
    },
    "hausa.md": {
      "content_type": "text/markdown;charset=utf-8"
    }
  }
}
```
