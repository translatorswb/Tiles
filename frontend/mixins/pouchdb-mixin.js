import { mapState } from "vuex";
import { getDatabaseName } from "@/utils/pouchdb-utils";

export default {
  computed: {
    ...mapState(["isOnline"]),
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
    }
  },
  created() {
    this.setupListeners();
    this.startSyncing();
  },
  methods: {
    signIn() {
      return this.$pouch.connect("client", "clientPassword");
    },
    async cleanupOldDatabases() {
      const dbs = Object.entries(this.$databases);
      if (dbs.length > 0) {
        try {
          const dbsToBeDeleted = dbs.filter(db => this.isDBLocal(db));
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
    async startSyncing() {
      if (!this.isOnline) {
        this.setSyncStatus("announcements", "failure", "Network error");
        this.setSyncStatus("articles", "failure", "Network error");
        console.log("Offline");
        return;
      }

      try {
        const session = await this.$pouch.getSession();
        if (session.error) {
          // Not signed in
          const user = await this.signIn();
          if (!user.hasAccess) {
            throw new Error(user);
          }
        }
        this.pullAnnouncements();
        this.pullArticles();
      } catch (error) {
        console.log(error);
        this.setSyncStatus("announcements", "failure", "Authentication error");
        this.setSyncStatus("articles", "failure", "Authentication error");
      }
    },
    pullAnnouncements() {
      this.$pouch.pull(this.localAnnouncements, this.remoteAnnouncements);
    },
    pullArticles() {
      this.$pouch.pull(this.localArticles, this.remoteArticles);
    },
    setupListeners() {
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
