<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on"
        ><v-icon>{{ syncIcon }}</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title class="headline">Sync</v-card-title>
      <v-card-text>Sync status</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="dialog = false"
          ><v-icon dark left>{{ icon.cancel }}</v-icon> Cancel</v-btn
        >
        <v-btn color="primary" dark @click="dialog = false"
          ><v-icon dark left>{{ icon.confirm }}</v-icon> Confirm</v-btn
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
        confirm: mdiCheckCircle
      },
      dialog: false
    };
  },
  computed: {
    ...mapState(["selectedCamp"]),
    syncIcon() {
      return this.recordingsCount > 0 ? this.icon.syncAlert : this.icon.sync;
    }
  },
  watch: {
    selectedCamp(newValue, oldValue) {
      if (oldValue) {
        this.cleanupOldDatabases();
      }
      if (newValue) {
        this.setupNewDatabases();
      }
    },
    dialog(value) {
      if (value) {
        // TODO: Implement sync
        console.log("SYNC");
      }
    }
  }
};
</script>
