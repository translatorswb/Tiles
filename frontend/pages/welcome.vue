<template>
  <div>
    <v-row align="stretch">
      <v-col cols="12" sm="6">
        <v-card color="primary" dark nuxt ripple tile :to="localePath('info')">
          <v-card-title>
            <v-icon large left>
              {{ icon.learnMore }}
            </v-icon>
            <span class="title font-weight-light text-uppercase"
              >Learn More</span
            >
          </v-card-title>
          <v-card-text class="headline font-weight-bold">
            You can learn more about the camp and find answers to most of your
            questions here
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
          color="primary"
          dark
          nuxt
          ripple
          tile
          :to="localePath('feedback')"
        >
          <v-card-title>
            <v-icon large left>
              {{ icon.leaveFeedback }}
            </v-icon>
            <span class="title font-weight-light text-uppercase"
              >Leave Feedback</span
            >
          </v-card-title>
          <v-card-text class="headline font-weight-bold">
            If you have feedback or any unanswered questions, you can record a
            voice message here
          </v-card-text>
        </v-card>
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
        learnMore: mdiBookOpen,
        leaveFeedback: mdiMicrophone
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
