<template>
  <div>
    <VTitle>
      <template v-slot:title>
        {{ $t("information") }}
      </template>
      <template v-slot:title-append>
        <PlayButtonInstruction :color="secondaryColor" :src="audioSrc" />
      </template>
    </VTitle>
    <InformationArticleList />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VTitle from "@/components/VTitle";
import PlayButtonInstruction from "@/components/PlayButtonInstruction";
import InformationArticleList from "@/components/InformationArticleList.vue";
export default {
  components: { VTitle, PlayButtonInstruction, InformationArticleList },
  computed: {
    ...mapGetters(["hasAudioInstruction", "getLocaleColor"]),
    locale() {
      return this.$i18n.locale;
    },
    audioSrc() {
      const key = "info";
      return this.hasAudioInstruction(key, this.locale)
        ? `/audio/${key}/${this.locale}.mp3`
        : null;
    },
    secondaryColor() {
      return this.getLocaleColor("secondary", this.$i18n.locale);
    }
  }
};
</script>
