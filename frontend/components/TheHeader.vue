<template>
  <v-app-bar app dark :color="bgColor" height="72">
    <div v-if="showBack">
      <TheHeaderBackButton :color="secondaryColor" />
    </div>

    <div class="flex-grow-1"></div>
    <v-toolbar-items>
      <TheHeaderLanguage v-if="showLanguage" />
      <TheHeaderCamp v-if="showCamp" />
      <TheHeaderSync />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import TheHeaderBackButton from "@/components/TheHeaderBackButton.vue";
import TheHeaderLanguage from "@/components/TheHeaderLanguage.vue";
import TheHeaderCamp from "@/components/TheHeaderCamp.vue";
import TheHeaderSync from "@/components/TheHeaderSync.vue";
export default {
  components: {
    TheHeaderBackButton,
    TheHeaderLanguage,
    TheHeaderCamp,
    TheHeaderSync
  },
  computed: {
    ...mapGetters(["getLocaleColor"]),
    routeName() {
      return this.getRouteBaseName(this.$route);
    },
    showBack() {
      return !["index", "language", "camp"].includes(this.routeName);
    },
    showLanguage() {
      return !["index", "language", "camp"].includes(this.routeName);
    },
    showCamp() {
      return ["language", "camp"].includes(this.routeName);
    },
    color() {
      return this.getLocaleColor("primary", this.$i18n.locale);
    },
    secondaryColor() {
      return this.getLocaleColor("secondary", this.$i18n.locale);
    },
    bgColor() {
      if (["index", "language", "camp"].includes(this.routeName)) {
        return this.getLocaleColor("primary");
      } else {
        return this.color;
      }
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
