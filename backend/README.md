# Backend

Inside the `backend` directory
Create a new virtual environment:

`virtualenv -p python3.7 env`

Activate the newly created virtual environment:

`source env/bin/activate`

Install required modules:

`pip install -r requirements.txt`

create an admin user and password in couch, those values are hardcoded in the `__main__.py` file. I am using `admin`, `admin`

### CMS

Inside the `backend` directory
Our cms is currently a google drive folder. We copy the fils in this folder to the `content` directory using the command `python . -pgdd`
Once we have them in our local directory we process them to couchdb with `python . -utc`
To run both functions back to back execute `python . -ra`

## Google Drive

Articles
1WiBXft6qxEp0Yja3ljMuBcPoOK4BadH6

## CouchDB v 2.3.1

We can add data to the cloud database through the use of python scripts. This will ensure our data has the same structure.

I think this could work for quite a while during prototyping. We could stay in the project because we "hold the keys" to the database. Also it will allow us to concentrate our work on the front end and figure out what kind of admin interface TWB would even be capable of using.

## Data Models

I propose we use three different databases. I realize the announcements and the categorized articles are very similar but categorized articles has the sectors information and shouldn't be updated as frequently. I don't see the harm of keeping them apart.

### recordings

This data is sent one way from the client to the the database each document is a single recording from a user.

- TODO do we want to give the users and id
- TODO we should figure out how to give the users access through some cookie

```json
{
	"_id": "2019-10-05T12:06:50.762Z",
	"_rev": "1-76324b9a1bc834b05511de987aeb511b",
	"_attachments": {
		"recordings.webm": {
			"content_type": "audio/webm; codecs=opus"
		}
	}
}
```

### announcements

Announcements are shown to the user on the welcome screen.

We push the data to the client .

```json
{
	"_id": "1570832046966",
	"_rev": "3-d72c906c58a1c90314f6ddb3aecd7723",
	"name": "disposal_of_faeces",
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
	},
	"title": {
		"hausa": "Sakonnin Kariya Daga Ambaliya",
		"kanuri": "Kawuliwa Wawa Njiye-ro Katәbe",
		"shuwa": "رِسالَتْ فوغ سلامه مِن صَيْل",
		"marghi": "Labar Arkira Asar Imi",
		"bura": "Labarayari atakəra nkamta asar pərtu",
		"en": "Flood Safety Messages"
	},
	"icon": "Flood",
	"expiration": "2019-11-01"
}
```

### categorized_articles

Same idea as announcements but we don't need the date and also have the sector field.

```json
{
	"_id": "2019-10-05T21:28:58.410329Z",
	"_rev": "7-344e6afcdd1302bfcf92c7db212fc67d",
	"sector": "waterSanitation",
	"name": "safe_water_hygine",
	"_attachments": {
		"step5.png": {
			"content_type": "image/png"
		},
		"step4.png": {
			"content_type": "image/png"
		},
		"step3.png": {
			"content_type": "image/png"
		},
		"en.md": {
			"content_type": "text/markdown;charset=utf-8"
		},
		"step2.png": {
			"content_type": "image/png"
		},
		"step1.png": {
			"content_type": "image/png"
		}
	}
}
```
