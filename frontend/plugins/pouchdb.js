import Vue from "vue";
import pouchVue from "pouch-vue";
import PouchDB from "pouchdb-browser";
import pf from "pouchdb-find";
import plf from "pouchdb-live-find";
import pa from "pouchdb-authentication";
// import pd from "pouchdb-debug";
PouchDB.plugin(pf);
PouchDB.plugin(plf);
PouchDB.plugin(pa);
// PouchDB.plugin(pd);

Vue.use(pouchVue, {
  pouch: PouchDB,
  defaultDB: `${process.env.databaseBaseUrl}`,
  optionDB: {
    fetch(url, opts) {
      opts.credentials = "include";
      return PouchDB.fetch(url, opts);
    },
    auto_compaction: true
  }
  // debug: "*"
});
