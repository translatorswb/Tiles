<template>
  <PlayButton v-if="src" :src="src" />
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
    }
  }
};
</script>
