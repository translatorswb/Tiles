<template>
  <div>
    <v-row>
      <v-col cols="12" class="text-center">
        <video controls style="width: 100%; max-width: 720px">
          <source src="/radio_manual_compressed.mp4" type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </v-col>
    </v-row>
    <v-row align="stretch">
      <v-col cols="12" sm="6">
        <v-btn
          color="primary"
          dark
          x-large
          block
          nuxt
          :to="localePath('info')"
          class="title"
        >
          <v-icon x-large left>{{ icon.information }}</v-icon>
          {{ $t("information") }}
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn
          color="primary"
          dark
          x-large
          block
          nuxt
          :to="localePath('feedback')"
          class="title"
        >
          <v-icon x-large left>{{ icon.feedback }}</v-icon>
          {{ $t("feedback") }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div
          class="text-center py-6 font-weight-bold accent--text text-uppercase"
          :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-3'"
        >
          Welcome
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <AnnouncementList />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiMicrophone, mdiBookOpen } from "@mdi/js";
import AnnouncementList from "@/components/AnnouncementList";

export default {
  components: {
    AnnouncementList
  },
  data() {
    return {
      icon: {
        information: mdiBookOpen,
        feedback: mdiMicrophone
      }
    };
  }
};
</script>

<style scoped>
.v-card--link {
  height: 100%;
}
</style>
