import Vue from "vue";
import pouchVue from "pouch-vue";
import PouchDB from "pouchdb-browser";
import pf from "pouchdb-find";
import plf from "pouchdb-live-find";
import pa from "pouchdb-authentication";
PouchDB.plugin(pf);
PouchDB.plugin(plf);
PouchDB.plugin(pa);
Vue.use(pouchVue, {
  pouch: PouchDB,
  defaultDB: `${process.env.databaseBaseUrl}/recordings`,
  optionDB: {
    fetch(url, opts) {
      opts.credentials = "include";
      return PouchDB.fetch(url, opts);
    },
    auto_compaction: true
  }
});

export default ({ store }) => {
  const vm = store._vm;
  const $pouch = vm.$pouch;
  $pouch
    .info() // Init remote db
    .then(result => {
      let rep = $pouch.push(
        "recordings",
        `${process.env.databaseBaseUrl}/recordings`
      );
      vm.$on("pouchdb-push-change", info => {
        if (info.db === "recordings") {
          console.log("Recordings pushed ", info.info);
          rep.cancel();
          $pouch.destroy("recordings");
          console.log("Destroyed local recordings db ☠️");
          console.log("Started a new local recordings db 🐣");
          rep = $pouch.push(
            "recordings",
            `${process.env.databaseBaseUrl}/recordings`
          );
        }
      });

      // For debugging
      vm.$on("pouchdb-push-paused", info => console.log("Paused ", info));
      vm.$on("pouchdb-push-active", info => console.log("Active ", info));
      vm.$on("pouchdb-push-denied", error => console.log("Denied ", error));
      vm.$on("pouchdb-push-complete", info => console.log("Completed ", info));
      vm.$on("pouchdb-push-error", error => console.log("Error ", error));
    })
    .catch(err => {
      console.log(err);
    });
};
