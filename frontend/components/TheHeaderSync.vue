<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on"
        ><v-icon>{{ syncIcon }}</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title class="headline">Sync</v-card-title>
      <v-card-text>
        <v-list disabled>
          <v-list-item-group>
            <v-list-item v-for="item in items" :key="item.name">
              <v-list-item-icon>
                <v-icon
                  class="primary--text"
                  :class="{ 'rotate-sync': item.status === 'syncing' }"
                  v-text="icon[item.status]"
                ></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div v-if="error" class="error--text">{{ error }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="dialog = false"
          ><v-icon dark left>{{ icon.confirm }}</v-icon> OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiSync, mdiSyncAlert, mdiCheckCircle, mdiCloseCircle } from "@mdi/js";
import { mapState } from "vuex";
import pouchdbMixin from "@/mixins/pouchdb-mixin";
export default {
  mixins: [pouchdbMixin],
  data() {
    return {
      icon: {
        sync: mdiSync,
        syncAlert: mdiSyncAlert,
        cancel: mdiCloseCircle,
        confirm: mdiCheckCircle,
        syncing: mdiSync,
        success: mdiCheckCircle,
        failure: mdiCloseCircle
      },
      dialog: false,
      items: [
        { name: "Recordings", status: "success" },
        { name: "Announcements", status: "success" },
        { name: "Articles", status: "success" }
      ],
      error: null
    };
  },
  computed: {
    ...mapState(["selectedCamp", "toUploadRecordingsCount"]),
    syncIcon() {
      return this.toUploadRecordingsCount > 0
        ? this.icon.syncAlert
        : this.icon.sync;
    },
    syncFinished() {
      return this.items.filter(item => item.status === "syncing").length === 0;
    }
  },
  watch: {
    selectedCamp(newValue, oldValue) {
      if (oldValue) {
        this.cleanupOldDatabases();
      }
      if (newValue) {
        if (oldValue) {
          this.dialog = true; // Only show dialog when switching camp, not when initial loading
        }
        this.startSyncing();
      }
    },
    dialog(value) {
      if (value && this.syncFinished) {
        this.error = null;
        this.items.forEach(item => (item.status = "syncing"));
        this.startSyncing();
      }
    }
  },
  created() {
    this.setupListeners();
  },
  methods: {
    setSyncStatus(name, status) {
      const updated = this.items.slice();
      updated.find(item => item.name === name).status = status;
      this.items = updated;
    }
  }
};
</script>

<style scoped>
.rotate-sync {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
