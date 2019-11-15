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
    this.startSyncing();
  },
  methods: {
    ...mapActions(["updateToUploadRecordingsCount"]),
    signIn() {
      return this.$pouch.connect("client", "clientPassword");
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
    async startSyncing() {
      if (!this.isOnline) {
        // this.setSyncStatus("recordings", "failure", "Network Error");
        this.setSyncStatus("announcements", "failure", "Network error");
        this.setSyncStatus("articles", "failure", "Network error");
        console.log("Offline");
        return;
      }
      // if (this.toUploadRecordingsCount === 0) {
      // 	this.setSyncStatus("recordings", "success");
      // }

      try {
        const session = await this.$pouch.getSession();
        if (session.error) {
          // Not signed in
          const user = await this.signIn();
          if (!user.hasAccess) {
            throw new Error(user);
          }
        }
        // if (!this.recordingsReplication) {
        // 	this.recordingsReplication = this.pushRecordings();
        // }
        this.pullAnnouncements();
        this.pullArticles();
      } catch (error) {
        console.log(error);
        // this.setSyncStatus("recordings", "failure", "Authentication Error");
        this.setSyncStatus("announcements", "failure", "Authentication error");
        this.setSyncStatus("articles", "failure", "Authentication error");
      }
    },
    // pushRecordings() {
    // 	return this.$pouch.push(this.localRecordings, this.remoteRecordings, {
    // 		live: true,
    // 		retry: true,
    // 		filter: doc => !doc._deleted
    // 	});
    // },
    pullAnnouncements() {
      this.$pouch.pull(this.localAnnouncements, this.remoteAnnouncements);
    },
    pullArticles() {
      this.$pouch.pull(this.localArticles, this.remoteArticles);
    },
    setupListeners() {
      // this.$on("pouchdb-push-change", async change => {
      // 	console.log("Change ", change);
      // 	if (change.db === this.localRecordings) {
      // 		try {
      // 			change.info.docs.forEach(doc => {
      // 				doc._deleted = true;
      // 			});
      // 			await this.$pouch.bulkDocs(
      // 				change.info.docs,
      // 				{},
      // 				this.localRecordings
      // 			);
      // 			const count = await this.getToUploadRecordingsCount();
      // 			if (count === 0) {
      // 				this.setSyncStatus("recordings", "success");
      // 				this.updateToUploadRecordingsCount(count);
      // 				this.recordingsReplication.cancel(); // Will trigger complete event
      // 			}
      // 		} catch (error) {
      // 			this.setSyncStatus("recordings", "failure", error);
      // 			console.log(error);
      // 		}
      // 	}
      // });
      // this.$on("pouchdb-push-paused", paused => {
      // 	console.log("Paused ", paused);
      // 	if (paused.db === this.localRecordings) {
      // 		this.setSyncStatus("recordings", "success");
      // 	}
      // });
      // this.$on("pouchdb-push-active", active => {
      // 	console.log("Active ", active);
      // 	if (active.db === this.localRecordings) {
      // 		this.setSyncStatus("recordings", "syncing");
      // 	}
      // });
      // this.$on("pouchdb-push-denied", err => {
      // 	console.log("Denied ", err);
      // 	if (err.db === this.localRecordings) {
      // 		this.setSyncStatus("recordings", "failure");
      // 		this.error = "Authentication Error";
      // 		console.log(err.error);
      // 	}
      // });
      // this.$on("pouchdb-push-complete", complete => {
      // 	console.log("Completed ", complete);
      // 	this.$pouch.destroy(this.localRecordings).then(() => {
      // 		console.log("Destroyed local recordings db ☠️");
      // 		console.log("Started a new local recordings db 🐣 ");
      // 		this.recordingsReplication = this.pushRecordings();
      // 	});
      // });
      // this.$on("pouchdb-push-error", err => {
      // 	console.log("Error ", err);
      // 	if (err.db === this.localRecordings) {
      // 		this.setSyncStatus("recordings", "failure", err.error);
      // 		console.log(err.error);
      // 	}
      // });

      this.$on("pouchdb-pull-change", async change => {
        console.log("Changed ", change);
        if (change.db === this.localAnnouncements) {
          try {
            await this.$pouch.compact({}, this.localAnnouncements);
          } catch (error) {
            this.setSyncStatus("announcements", "failure", error);
            console.log(error);
          }
          this.setSyncStatus("announcements", "success");
        } else if (change.db === this.localArticles) {
          try {
            await this.$pouch.compact({}, this.localArticles);
          } catch (error) {
            this.setSyncStatus("articles", "failure", error);
            console.log(error);
          }
          this.setSyncStatus("articles", "success");
        }
      });
      this.$on("pouchdb-pull-paused", paused => {
        console.log("Paused ", paused);
        if (paused.db === this.localAnnouncements) {
          this.setSyncStatus("announcements", "success");
        } else if (paused.db === this.localArticles) {
          this.setSyncStatus("articles", "success");
        }
      });
      this.$on("pouchdb-pull-active", active => {
        console.log("Active ", active);
        if (active.db === this.localAnnouncements) {
          this.setSyncStatus("announcements", "syncing");
        } else if (active.db === this.localArticles) {
          this.setSyncStatus("articles", "syncing");
        }
      });
      this.$on("pouchdb-pull-denied", err => {
        console.log("Denied ", err);
        if (err.db === this.localAnnouncements) {
          this.setSyncStatus(
            "announcements",
            "failure",
            "Authentication Error"
          );
          console.log(err.error);
        } else if (err.db === this.localArticles) {
          this.setSyncStatus("articles", "failure", "Authentication Error");
          console.log(err.error);
        }
      });
      this.$on("pouchdb-pull-complete", complete => {
        console.log("Completed ", complete);
      });
      this.$on("pouchdb-pull-error", err => {
        console.log("Error", err);
        if (err.db === this.localAnnouncements) {
          this.setSyncStatus("announcements", "failure", "Network error");
          console.log(err.error);
        } else if (err.db === this.localArticles) {
          this.setSyncStatus("articles", "failure", "Network error");
          console.log(err.error);
        }
      });
    }
  }
};
