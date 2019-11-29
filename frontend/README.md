# TILES Frontend

TILES uses [nuxt.js](https://nuxtjs.org/) for the frontend framework, and [pouchDB](https://pouchdb.com/) for the client side database.

## Setting up environment

We use [yarn](https://yarnpkg.com/lang/en/) as our package manager, so be sure that is installed on your machine.

## Install dependencies

The dependencies for tiles are listed in the `package.json` file. To install them with yarn run `yarn install` from the root of this directory.

## Getting Started

In order for TILES to access content you'll need to tell it which backend to use. This environmental variable `databaseBaseUrl` is set in the `nuxt.config.js` file, in the root of this directory.

Once the backed data base is set (currently set on PNGK's database) you can run the development server with:

`yarn run dev`

## Deployment

We have chosen to deploy the app with [AWS S3](https://aws.amazon.com/s3/). However any service which serves static files will work e.g. Azure's Blob Storage.

To build the app for deployment run:

`yarn build`

This command will generate a `dist` folder and the contents of this folder should all be deployed to your static file server.

## Feedback

Currently the feedback recording page (found in `pages/feedback.vue`) is not linked to on the app. However it still functions see: https://twb-iiab.pngk.org/hausa/feedback?camp=c001
