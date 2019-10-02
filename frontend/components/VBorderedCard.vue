<template>
  <v-card
    ripple
    tile
    hover
    nuxt
    :to="to"
    class="bordered-card primary--text"
    :class="$vuetify.rtl ? 'bordered-right' : 'bordered-left'"
  >
    <slot />
  </v-card>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.bordered-card {
  padding: 16px;
}

.bordered-left {
  border-left: 8px solid #e8991c !important;
  padding-left: 16px;
}

.bordered-right {
  border-right: 8px solid #e8991c !important;
  padding-right: 16px;
}
</style>
