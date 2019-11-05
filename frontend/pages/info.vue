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
import VTitleWithAudio from "@/components/VTitleWithAudio";
import InformationSectorList from "@/components/InformationSectorList.vue";
export default {
  components: { VTitleWithAudio, InformationSectorList },
  computed: {
    audioSrc() {
      return `audio/info/${this.$i18n.locale}.mp3`;
    }
  }
};
</script>
