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
    startSyncing() {
      if (this.recordingsReplication) {
        this.recordingsReplication.cancel();
      }
      this.recordingsReplication = this.pushRecordings();
      this.pullAnnouncements();
      this.pullArticles();
    },
    pushRecordings() {
      return this.$pouch.push(this.localRecordings, this.remoteRecordings, {
        live: true,
        retry: true,
        filter: doc => !doc._deleted
      });
    },
    pullAnnouncements() {
      this.$pouch.pull(this.localAnnouncements, this.remoteAnnouncements);
    },
    pullArticles() {
      this.$pouch.pull(this.localArticles, this.remoteArticles);
    },
    setupListeners() {
      this.$on("pouchdb-push-change", async change => {
        console.log("Change ", change);
        if (change.db === this.localRecordings) {
          try {
            const deletedDocs = change.info.docs.forEach(doc => {
              doc._deleted = true;
            });
            await this.$pouch.bulkDocs(deletedDocs, {}, this.localRecordings);
            const info = await this.$pouch.info(this.localRecordings);
            if (info.doc_count === 0) {
              this.setSyncStatus("Recordings", "success");
              this.updateToUploadRecordingsCount(info.doc_count);
              this.recordingsReplication.cancel();
              this.$pouch.destroy(this.localRecordings).then(() => {
                console.log("Destroyed local recordings db ☠️");
                console.log("Started a new local recordings db 🐣 ");
                this.recordingsReplication = this.pushRecordings();
              });
            }
          } catch (error) {
            this.setSyncStatus("Recordings", "failure");
          }
        }
      });
      this.$on("pouchdb-push-paused", paused => {
        console.log("Paused ", paused);
        if (paused.db === this.localRecordings) {
          this.setSyncStatus("Recordings", "success");
        }
      });
      this.$on("pouchdb-push-active", active => {
        console.log("Active ", active);
        if (active.db === this.localRecordings) {
          this.setSyncStatus("Recordings", "syncing");
        }
      });
      this.$on("pouchdb-push-denied", err => {
        console.log("Denied ", err);
        if (err.db === this.localRecordings) {
          this.setSyncStatus("Recordings", "failure");
          this.error = `${this.error}. ${err.error}`;
        }
      });
      this.$on("pouchdb-push-complete", complete => {
        console.log("Completed ", complete);
      });
      this.$on("pouchdb-pull-error", err => {
        console.log("Error ", err);
        if (err.db === this.localRecordings) {
          this.setSyncStatus("Recordings", "failure");
          this.error = `${this.error}. ${err.error}`;
        }
      });

      this.$on("pouchdb-pull-change", async change => {
        console.log("Changed ", change);
        if (change.db === this.localAnnouncements) {
          try {
            await this.$pouch.compact({}, this.localAnnouncements);
          } catch (error) {
            this.error = `${this.error}. ${error}`;
          }
          this.setSyncStatus("Announcements", "success");
        } else if (change.db === this.localArticles) {
          try {
            await this.$pouch.compact({}, this.localArticles);
          } catch (error) {
            this.error = `${this.error}. ${error}`;
          }
          this.setSyncStatus("Articles", "success");
        }
      });
      this.$on("pouchdb-pull-paused", paused => {
        console.log("Paused ", paused);
        if (paused.db === this.localAnnouncements) {
          this.setSyncStatus("Announcements", "success");
        } else if (paused.db === this.localArticles) {
          this.setSyncStatus("Articles", "success");
        }
      });
      this.$on("pouchdb-pull-active", active => {
        console.log("Active ", active);
        if (active.db === this.localAnnouncements) {
          this.setSyncStatus("Announcements", "syncing");
        } else if (active.db === this.localArticles) {
          this.setSyncStatus("Articles", "syncing");
        }
      });
      this.$on("pouchdb-pull-denied", err => {
        console.log("Denied ", err);
        if (err.db === this.localAnnouncements) {
          this.setSyncStatus("Announcements", "failure");
          this.error = `${this.error}. ${err.error}`;
        } else if (err.db === this.localArticles) {
          this.setSyncStatus("Articles", "failure");
          this.error = `${this.error}. ${err.error}`;
        }
      });
      this.$on("pouchdb-pull-complete", complete => {
        console.log("Completed ", complete);
      });
      this.$on("pouchdb-pull-error", err => {
        console.log("Error", err);
        if (err.db === this.localAnnouncements) {
          this.setSyncStatus("Announcements", "failure");
          this.error = `${this.error}. ${err.error}`;
        } else if (err.db === this.localArticles) {
          this.setSyncStatus("Articles", "failure");
          this.error = `${this.error}. ${err.error}`;
        }
      });
    }
  }
};
