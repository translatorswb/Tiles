<template>
  <div>
    <VTitleWithAudio
      :title="$t('information')"
      :src="audioSrc"
      :is-instruction="true"
    />
    <InformationSectorList />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VTitleWithAudio from "@/components/VTitleWithAudio";
import InformationSectorList from "@/components/InformationSectorList.vue";
export default {
  components: { VTitleWithAudio, InformationSectorList },
  computed: {
    ...mapGetters(["hasAudioInstruction"]),
    locale() {
      return this.$i18n.locale;
    },
    audioSrc() {
      const key = "info";
      return this.hasAudioInstruction(key, this.locale)
        ? `/audio/${key}/${this.locale}.mp3`
        : null;
    }
  }
};
</script>
