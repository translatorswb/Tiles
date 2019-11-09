<template>
  <div class="d-flex flex-wrap align-center justify-center py-6">
    <div
      class="text-center font-weight-bold accent--text text-uppercase"
      :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-3'"
    >
      {{ title }}
    </div>
    <div v-if="src">
      <PlayButtonInstruction :src="src" :is-instruction="isInstruction" />
    </div>
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
      default: null
    },
    isInstruction: {
      type: Boolean,
      default: false
    }
  }
};
</script>
