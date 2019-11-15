<template>
  <v-app-bar app dark color="primary">
    <v-toolbar-items v-if="showBack">
      <TheHeaderBackButton />
    </v-toolbar-items>

    <div class="flex-grow-1"></div>
    <v-toolbar-items>
      <TheHeaderLanguage v-if="showLanguage" />
      <TheHeaderCamp v-if="showCamp" />
      <TheHeaderSync />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
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
    routeName() {
      return this.getRouteBaseName(this.$route);
    },
    showBack() {
      return !["index", "language", "camp", "welcome"].includes(this.routeName);
    },
    showLanguage() {
      return !["index", "language", "camp"].includes(this.routeName);
    },
    showCamp() {
      return ["language", "camp"].includes(this.routeName);
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
