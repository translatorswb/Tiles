<template>
  <v-btn text nuxt to="/language"
    ><v-icon :left="showText">{{ icon.language }}</v-icon
    ><span v-if="showText">{{ currentLocaleName }}</span></v-btn
  >
</template>

<script>
import { mdiWeb } from "@mdi/js";
export default {
  data() {
    return {
      icon: {
        language: mdiWeb
      }
    };
  },
  computed: {
    currentLocaleName() {
      const locale = this.$i18n.locales.find(i => i.code === this.$i18n.locale);
      return locale && locale.name;
    },
    showText() {
      return this.currentLocaleName && !this.$vuetify.breakpoint.xs;
    }
  }
};
</script>
