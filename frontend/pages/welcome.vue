<template>
  <div>
    <v-row align="stretch" class="pb-6">
      <v-col cols="12" md="6">
        <VBorderedCardWithAudio
          :to="localePath('info')"
          :src="audioSrc('information')"
          :is-instruction="true"
        >
          <div class="display-1 accent--text d-flex">
            <v-icon x-large left class="primary--text">{{
              icon.information
            }}</v-icon>
            {{ $t("information") }}
          </div>
        </VBorderedCardWithAudio>
      </v-col>
      <v-col cols="12" md="6">
        <VBorderedCardWithAudio
          :to="localePath('feedback')"
          :src="audioSrc('feedback')"
          :is-instruction="true"
        >
          <div class="display-1 accent--text d-flex">
            <v-icon x-large left class="primary--text">{{
              icon.feedback
            }}</v-icon>
            {{ $t("feedback") }}
          </div>
        </VBorderedCardWithAudio>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <VTitleWithAudio
          :title="$t('announcements')"
          :src="audioSrc('announcement')"
          :is-instruction="true"
        />
      </v-col>
      <v-col cols="12">
        <AnnouncementList />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiMicrophone, mdiBookOpen } from "@mdi/js";
import VBorderedCardWithAudio from "@/components/VBorderedCardWithAudio";
import VTitleWithAudio from "@/components/VTitleWithAudio";
import AnnouncementList from "@/components/AnnouncementList";

export default {
  components: {
    VBorderedCardWithAudio,
    VTitleWithAudio,
    AnnouncementList
  },
  data() {
    return {
      icon: {
        information: mdiBookOpen,
        feedback: mdiMicrophone
      }
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    audioSrc(item) {
      return `audio/welcome/${item}/${this.locale}.mp3`;
    }
  }
};
</script>

<style scoped>
.v-card--link {
  height: 100%;
}
</style>
