<template>
  <VBorderedCard :to="to">
    <div
      class="item d-flex"
      :class="$vuetify.breakpoint.xs ? 'flex-column' : ''"
    >
      <div class="item-main flex-grow-1">
        <div
          class="item-title accent--text"
          :class="$vuetify.breakpoint.xs ? 'title' : 'headline'"
        >
          <slot></slot>
        </div>
      </div>
      <div
        v-if="src"
        class="item-audio"
        :class="$vuetify.breakpoint.xs ? 'align-self-end' : ''"
      >
        <PlayButtonInstruction :src="src" :is-instruction="isInstruction" />
      </div>
    </div>
  </VBorderedCard>
</template>

<script>
import VBorderedCard from "@/components/VBorderedCard";
import PlayButtonInstruction from "@/components/PlayButtonInstruction";

export default {
  components: {
    VBorderedCard,
    PlayButtonInstruction
  },
  props: {
    to: { type: String, required: true },
    src: { type: String, default: null },
    isInstruction: {
      type: Boolean,
      default: false
    }
  }
};
</script>
