<template>
  <PlayButton v-if="src" :src="src" :is-instruction="isInstruction" />
</template>

<script>
import PlayButton from "@/components/PlayButton.vue";

export default {
  components: {
    PlayButton
  },
  props: {
    src: {
      type: String,
      required: false
    },
    isInstruction: {
      type: Boolean,
      default: false
    }
  }
};
</script>
