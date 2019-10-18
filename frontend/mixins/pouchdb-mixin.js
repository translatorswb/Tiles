import { getDatabaseName } from "@/utils/pouchdb-utils";

export default {
  data() {
    return {
      recordingsReplication: null
    };
  },
  computed: {
    localRecordings() {
      return getDatabaseName("local", this.selectedCamp, "recordings");
    },
    remoteRecordings() {
      return getDatabaseName("remote", this.selectedCamp, "recordings");
    },
    localAnnouncements() {
      return getDatabaseName("local", this.selectedCamp, "announcements");
    },
    remoteAnnouncements() {
      return getDatabaseName("remote", this.selectedCamp, "announcements");
    },
    localArticles() {
      return getDatabaseName("local", this.selectedCamp, "articles");
    },
    remoteArticles() {
      return getDatabaseName("remote", this.selectedCamp, "articles");
    },
    recordingsCount() {
      return this.recordings ? this.recordings.length : 0;
    }
  },
  pouch: {
    recordings() {
      return {
        database: this.localRecordings
      };
    }
  },
  methods: {
    async cleanupOldDatabases() {
      const dbs = Object.entries(this.$databases);
      if (dbs.length > 0) {
        try {
          const localDBs = dbs.filter(db => db[1].adapter === "idb");
          await Promise.all([localDBs.map(db => this.$pouch.destroy(db[0]))]);
        } catch (error) {
          console.log(error);
        }
      }
    },
    setupNewDatabases() {
      this.recordingsReplication = this.pushRecordings();
      this.pullAnnouncements();
      this.pullArticles();
      this.setupListeners();
    },
    pushRecordings() {
      return this.$pouch.push(this.localRecordings, this.remoteRecordings, {
        live: true,
        retry: true
      });
    },
    pullAnnouncements() {
      this.$pouch.pull(this.localAnnouncements, this.remoteAnnouncements);
    },
    pullArticles() {
      this.$pouch.pull(this.localArticles, this.remoteArticles);
    },
    setupListeners() {
      this.$on("pouchdb-push-change", info => {
        if (info.db === this.localRecordings) {
          console.log("Recordings pushed ", info.info);
          this.cancel();
          this.$pouch.destroy(this.localRecordings).then(() => {
            console.log("Destroyed local recordings db ☠️");
            console.log("Started a new local recordings db 🐣 ");
            this.recordingsReplication = this.pushRecordings();
          });
        }
      });

      // For debugging
      this.$on("pouchdb-push-paused", info => console.log("Paused ", info));
      this.$on("pouchdb-push-active", info => console.log("Active ", info));
      this.$on("pouchdb-push-denied", error => console.log("Denied ", error));
      this.$on("pouchdb-push-complete", info =>
        console.log("Completed ", info)
      );
      this.$on("pouchdb-pull-error", error => console.log("Error ", error));

      this.$on("pouchdb-pull-change", info => console.log("Changed ", info));
      this.$on("pouchdb-pull-paused", info => console.log("Paused ", info));
      this.$on("pouchdb-pull-active", info => console.log("Active ", info));
      this.$on("pouchdb-pull-denied", error => console.log("Denied ", error));
      this.$on("pouchdb-pull-complete", info =>
        console.log("Completed ", info)
      );
      this.$on("pouchdb-pull-error", error => console.log("Error ", error));
    }
  }
};
