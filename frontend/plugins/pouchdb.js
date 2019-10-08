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
  defaultDB: `${process.env.databaseBaseUrl}/${process.env.feedbackDataBaseName}`,
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
    .connect("admin", "admin")
    .then(res => {
      const isUnauthorized = res.error === "unauthorized";
      const isOffline = res.status === 0;

      if (isOffline) {
        return;
      }

      if (isUnauthorized) {
        return;
      }
      // We create the initial local database which only pushes to the remote
      // https://github.com/MDSLKTR/pouch-vue/blob/master/src/index.js#L409
      // i.e. it doesn't get data from remote
      // @zhenmao Is there so way that we can make THIS...

      // Recordings
      let rep = $pouch.push(
        "recordings",
        `${process.env.databaseBaseUrl}/recordings`,
        {
          live: true,
          retry: true
        }
      );
      vm.$on("pouchdb-push-change", info => {
        if (info.db === "recordings") {
          console.log("Recordings pushed ", info.info);
          rep.cancel();
          $pouch.destroy("recordings").then(() => {
            console.log("Destroyed local recordings db ☠️");
            console.log("Started a new local recordings db 🐣 ");
            // @zhenmao ...and THIS into a function
            rep = $pouch.push(
              "recordings",
              `${process.env.databaseBaseUrl}/recordings`,
              {
                live: true,
                retry: true
              }
            );
          });
        }
      });

      // For debugging
      // vm.$on("pouchdb-push-paused", info => console.log("Paused ", info));
      // vm.$on("pouchdb-push-active", info => console.log("Active ", info));
      // vm.$on("pouchdb-push-denied", error => console.log("Denied ", error));
      // vm.$on("pouchdb-push-complete", info => console.log("Completed ", info));
      // vm.$on("pouchdb-push-error", error => console.log("Error ", error));
    })
    .catch(err => {
      console.log(err);
    });

  // Announcements
  $pouch.pull("announcements", `${process.env.databaseBaseUrl}/announcements`, {
    live: true,
    retry: true
  });

  // Articles
  $pouch.pull("articles", `${process.env.databaseBaseUrl}/articles`, {
    live: true,
    retry: true
  });
};
