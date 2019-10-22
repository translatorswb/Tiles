# Docker CouchDB

Automated setup of couchDB with docker compose. Using the [semi-official Apache CouchDB Docker image](https://github.com/apache/couchdb-docker)

## Setup Docker and Docker Compose

Use get.docker.com since there is a pre-made script.

```
curl -fsSL get.docker.com -o get-docker.sh
sh get-docker.sh
```

add privledges

```
sudo usermod -aG docker <user>
```

Follow the instructions [here](https://docs.docker.com/compose/install/#install-compose) to install docker compose.

## Spin up the custom container

We build a custom container with the latest couchdb image. And we replace the `/opt/couchdb/ect/local.ini` file with the one in this directory.

Open up a terminal in this directory and run `docker-compose build` to create our image.

We then start to container, I use `-d` to run the container in the background. `docker-compose up -d`

To stop this container `docker-compose down`. With the current configuration doing this means you will lose any data in CouchDB.
