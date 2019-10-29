<template>
  <PlayButton :src="src" />
</template>

<script>
import PlayButton from "@/components/PlayButton.vue";

export default {
  components: {
    PlayButton
  },
  props: {
    langCode: {
      type: String,
      required: true
    }
  },
  computed: {
    src() {
      return `lang/${this.langCode}.mp3`;
    }
  }
};
</script>
