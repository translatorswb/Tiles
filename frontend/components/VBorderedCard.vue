<template>
  <v-card
    ripple
    tile
    hover
    nuxt
    class="bordered-card primary--text"
    :class="$vuetify.rtl ? 'bordered-right' : 'bordered-left'"
    @click="navigateTo"
  >
    <slot />
  </v-card>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: false
    }
  },
  methods: {
    navigateTo() {
      if (this.to) {
        this.$router.push(this.to);
      } else {
        this.$emit("click");
      }
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
