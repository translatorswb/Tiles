<template>
  <PlayButton v-if="src" :src="src" :color="color" />
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
    color: {
      type: String,
      default: ""
    }
  }
};
</script>
