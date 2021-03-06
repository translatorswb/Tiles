<template>
  <div>
    <v-row align="stretch" class="pb-6">
      <v-col cols="12">
        <VBorderCard :color="color">
          <template v-slot:card-media>
            <v-icon size="48" left :style="{ color }">{{
              icon.information
            }}</v-icon>
          </template>
          <template v-slot:card-title>
            {{ $t("information") }}
          </template>
          <template v-slot:card-actions>
            <PlayButtonInstruction
              :color="secondaryColor"
              :src="audioSrc('information')"
            />
            <NextButton :color="secondaryColor" :to="localePath('info')" />
          </template>
        </VBorderCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <VTitle :color="color">
          <template v-slot:title>
            {{ $t("announcements") }}
          </template>
          <template v-slot:title-append>
            <PlayButtonInstruction
              :color="secondaryColor"
              :src="audioSrc('announcement')"
            />
          </template>
        </VTitle>
      </v-col>
      <v-col cols="12">
        <AnnouncementList />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiBookOpen } from "@mdi/js";
import { mapGetters } from "vuex";
import VBorderCard from "@/components/VBorderCard.vue";
import PlayButtonInstruction from "@/components/PlayButtonInstruction";
import NextButton from "@/components/NextButton";
import VTitle from "@/components/VTitle";
import AnnouncementList from "@/components/AnnouncementList";

export default {
  components: {
    VBorderCard,
    PlayButtonInstruction,
    NextButton,
    VTitle,
    AnnouncementList
  },
  data() {
    return {
      icon: {
        information: mdiBookOpen
      }
    };
  },
  computed: {
    ...mapGetters(["hasAudioInstruction", "getLocaleColor"]),
    locale() {
      return this.$i18n.locale;
    },
    color() {
      return this.getLocaleColor("primary", this.$i18n.locale);
    },
    secondaryColor() {
      return this.getLocaleColor("secondary", this.$i18n.locale);
    }
  },
  methods: {
    audioSrc(item) {
      const key = `welcome/${item}`;
      return this.hasAudioInstruction(key, this.locale)
        ? `/audio/${key}/${this.locale}.mp3`
        : null;
    }
  }
};
</script>

<style scoped>
.v-card--link {
  height: 100%;
}
</style>
