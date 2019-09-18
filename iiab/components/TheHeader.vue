<template>
  <v-app-bar app dark color="primary">
    <v-toolbar-title v-if="!showBack"
      ><nuxt-link :to="localePath('info')" class="white--text px-4"
        >IIAB</nuxt-link
      ></v-toolbar-title
    >
    <v-toolbar-items v-else>
      <v-btn text @click="goBack"
        ><v-icon>{{ icon.chevronLeft }}</v-icon></v-btn
      >
    </v-toolbar-items>
    <div class="flex-grow-1"></div>
    <v-toolbar-items>
      <v-btn text nuxt :to="localePath('info')"
        ><v-icon>{{ icon.information }}</v-icon></v-btn
      >
      <v-btn text nuxt :to="localePath('feedback')"
        ><v-icon>{{ icon.pencil }}</v-icon></v-btn
      >
      <v-btn text nuxt to="/"
        ><v-icon :left="showText">{{ icon.web }}</v-icon
        ><span v-if="showText">{{ currentLocaleName }}</span></v-btn
      >
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mdiChevronLeft, mdiInformation, mdiPencil, mdiWeb } from "@mdi/js";
export default {
  data() {
    return {
      icon: {
        chevronLeft: mdiChevronLeft,
        information: mdiInformation,
        pencil: mdiPencil,
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
      return !["index", "info"].includes(base);
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
