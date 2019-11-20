<template>
  <v-card
    tile
    :style="{
      'border-left': `8px solid ${borderColor}`,
      padding: '16px'
    }"
  >
    <div class="d-flex">
      <slot name="card-media" />
      <div>
        <div :class="$vuetify.breakpoint.xs ? 'title' : 'headline'">
          <slot name="card-title" />
        </div>
        <div>
          <slot name="card-subtitle" />
        </div>
      </div>
    </div>
    <div class="d-flex align-end">
      <div class="flex-grow-1"></div>
      <slot name="card-actions" />
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["colors"]),
    borderColor() {
      return this.color || this.colors.primary;
    }
  }
};
</script>
