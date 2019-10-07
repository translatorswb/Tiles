<template>
  <v-app-bar app dark color="primary">
    <v-toolbar-items v-if="showBack">
      <v-btn text color="white" @click="goBack">
        <v-icon large>{{ icon.back }}</v-icon>
      </v-btn>
    </v-toolbar-items>

    <div class="flex-grow-1"></div>
    <v-toolbar-items>
      <v-btn text nuxt to="/"
        ><v-icon :left="showText">{{ icon.web }}</v-icon
        ><span v-if="showText">{{ currentLocaleName }}</span></v-btn
      >
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mdiChevronLeftCircle, mdiWeb } from "@mdi/js";
export default {
  data() {
    return {
      icon: {
        back: mdiChevronLeftCircle,
        web: mdiWeb
      }
    };
  },
  computed: {
    showText() {
      return this.$vuetify.breakpoint.smAndUp;
    },
    showBack() {
      const base = this.getRouteBaseName(this.$route);
      const notHomePage = !["index", "welcome"].includes(base);
      const notFirstPage = window.history.length > 1;
      return notHomePage && notFirstPage;
    },
    currentLocaleName() {
      return this.$i18n.locales.find(i => i.code === this.$i18n.locale).name;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
