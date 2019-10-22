# Python CouchDB

The purpose of this module is to setup all of the databases and content necessary for our vue client application to function.

## Setup

Inside the `python_couchdb` directory

Create a new virtual environment:

`virtualenv -p python3.7 env`

Activate the newly created virtual environment:

`source env/bin/activate`

Install required modules:

`pip install -r requirements.txt`

### CMS

Our cms is currently a google drive folder, this is considered to be the source of truth. We copy the fils in this folder to the `content` directory using the command `python . -pgdd`
Once we have them in our local directory we process them to couchdb with `python . -cc`
To run both functions back to back execute `python . -ra`

### CouchDB Python API

We are primarily using the [cloudant python API](https://python-cloudant.readthedocs.io/en/latest/getting_started.html) to interact with CouchDB. We had to write a custom method to add users to the databases since cloudant handles that differently than CouchDB
