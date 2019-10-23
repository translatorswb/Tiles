import { mapActions, mapState } from "vuex";
import { getDatabaseName } from "@/utils/pouchdb-utils";

export default {
  data() {
    return {
      recordingsReplication: null
    };
  },
  computed: {
    ...mapState(["isOnline"]),
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
  created() {
    this.setupListeners();
    this.signIn();
  },
  methods: {
    ...mapActions(["updateToUploadRecordingsCount"]),
    async signIn() {
      try {
        const result = await this.$pouch.connect("client", "clientPassword");
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    async getToUploadRecordingsCount() {
      try {
        const docs = await this.$pouch.allDocs(
          { include_docs: false },
          this.localRecordings
        );
        return docs.rows.length;
      } catch (error) {
        console.log(error);
        return -1;
      }
    },
    async cleanupOldDatabases() {
      const dbs = Object.entries(this.$databases);
      if (dbs.length > 0) {
        try {
          const dbsToBeDeleted = dbs.filter(
            db => this.isDBLocal(db) && !this.isDBRecordings(db)
          );
          await Promise.all([
            dbsToBeDeleted.map(db => this.$pouch.destroy(db[0]))
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    },
    isDBLocal(db) {
      return db[1].adapter === "idb";
    },
    isDBRecordings(db) {
      const recordingsRegex = /recordings$/;
      return recordingsRegex.test(db[0]);
    },
    startSyncing() {
      if (!this.isOnline) {
        this.setSyncStatus("Recordings", "failure", "Network Error");
        this.setSyncStatus("Announcements", "failure", "Network error");
        this.setSyncStatus("Articles", "failure", "Network error");
        console.log("Offline");
        return;
      }
      if (this.toUploadRecordingsCount === 0) {
        this.setSyncStatus("Recordings", "success");
      }
      if (!this.recordingsReplication) {
        this.recordingsReplication = this.pushRecordings();
      }
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
            change.info.docs.forEach(doc => {
              doc._deleted = true;
            });
            await this.$pouch.bulkDocs(
              change.info.docs,
              {},
              this.localRecordings
            );
            const count = await this.getToUploadRecordingsCount();
            if (count === 0) {
              this.setSyncStatus("Recordings", "success");
              this.updateToUploadRecordingsCount(count);
              this.recordingsReplication.cancel(); // Will trigger complete event
            }
          } catch (error) {
            this.setSyncStatus("Recordings", "failure", error);
            console.log(error);
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
          this.error = "Authentication Error";
          console.log(err.error);
        }
      });
      this.$on("pouchdb-push-complete", complete => {
        console.log("Completed ", complete);
        this.$pouch.destroy(this.localRecordings).then(() => {
          console.log("Destroyed local recordings db ☠️");
          console.log("Started a new local recordings db 🐣 ");
          this.recordingsReplication = this.pushRecordings();
        });
      });
      this.$on("pouchdb-push-error", err => {
        console.log("Error ", err);
        if (err.db === this.localRecordings) {
          this.setSyncStatus("Recordings", "failure", err.error);
          console.log(err.error);
        }
      });

      this.$on("pouchdb-pull-change", async change => {
        console.log("Changed ", change);
        if (change.db === this.localAnnouncements) {
          try {
            await this.$pouch.compact({}, this.localAnnouncements);
          } catch (error) {
            this.setSyncStatus("Announcements", "failure", error);
            console.log(error);
          }
          this.setSyncStatus("Announcements", "success");
        } else if (change.db === this.localArticles) {
          try {
            await this.$pouch.compact({}, this.localArticles);
          } catch (error) {
            this.setSyncStatus("Articles", "failure", error);
            console.log(error);
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
          this.setSyncStatus(
            "Announcements",
            "failure",
            "Authentication Error"
          );
          console.log(err.error);
        } else if (err.db === this.localArticles) {
          this.setSyncStatus("Articles", "failure", "Authentication Error");
          console.log(err.error);
        }
      });
      this.$on("pouchdb-pull-complete", complete => {
        console.log("Completed ", complete);
      });
      this.$on("pouchdb-pull-error", err => {
        console.log("Error", err);
        if (err.db === this.localAnnouncements) {
          this.setSyncStatus("Announcements", "failure", "Network error");
          console.log(err.error);
        } else if (err.db === this.localArticles) {
          this.setSyncStatus("Articles", "failure", "Network error");
          console.log(err.error);
        }
      });
    }
  }
};
