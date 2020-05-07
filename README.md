# TWB IIAB project

This project concluded at the end of 2019. A pdf report of the Nigeria visit can be found in `/report`

## Technology choices

Early on in the project it was decided that users should be given the ability to leave feedback on the devices, offline, which could be transferred to a central server. When the a re-entered wifi/internet location. For this reason CouchDB and PouchDB were used. We selected nuxt.js for the frontend javascript framework and made a quick and dirty google drive/python scripts CMS.

This project has 2 main modules:

- _backend_: where a dockerized version of couchDB lives including instructions for deployment on AWS
- _frontend_: where the nuxt.js code lives - PNGK deployed the built files to an AWS S3 bucket and used AWS Cloudfront for a CDN.

## Things to consider moving forward

At the start of the Nigeria visit the country director at the time, Virginia, decided to limit the scope of testing to content dissemination. Because the social aspects around audio feedback system were not fully thought through.
For this reason we removed the feedback recorder. However it is still in the code `frontend/pages/feedback.vue` and can easily be re-added to the project. If it is decided not to use the feedback system, then there is no need to use CouchDB/PouchDB. Perhaps consider using a JAM stack framework like Gridsome.
