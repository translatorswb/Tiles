<template>
  <div class="d-flex flex-wrap align-center justify-center">
    <div
      class="text-center py-6 font-weight-bold accent--text text-uppercase"
      :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-3'"
    >
      {{ title }}
    </div>
    <PlayButtonInstruction :src="src" :is-instruction="isInstruction" />
  </div>
</template>

<script>
import PlayButtonInstruction from "@/components/PlayButtonInstruction";
export default {
  components: {
    PlayButtonInstruction
  },
  props: {
    title: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    isInstruction: {
      type: Boolean,
      default: false
    }
  }
};
</script>
