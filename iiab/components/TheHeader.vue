<template>
  <v-app-bar app dark color="primary">
    <v-toolbar-title v-if="!showBack"
      ><nuxt-link to="/" class="white--text">IIAB</nuxt-link></v-toolbar-title
    >
    <v-toolbar-items v-else>
      <v-btn text @click="goBack"
        ><v-icon :left="showText">mdi-chevron-left</v-icon
        ><span>Back</span></v-btn
      >
    </v-toolbar-items>
    <div class="flex-grow-1"></div>
    <v-toolbar-items>
      <v-btn text nuxt to="/"
        ><v-icon :left="showText">mdi-information</v-icon
        ><span v-if="showText">Information</span></v-btn
      >
      <v-btn text nuxt to="/feedback"
        ><v-icon :left="showText">mdi-pencil</v-icon
        ><span v-if="showText">Feedback</span></v-btn
      >
      <v-btn text
        ><v-icon :left="showText">mdi-web</v-icon
        ><span v-if="showText">English</span></v-btn
      >
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    showText() {
      return this.$vuetify.breakpoint.smAndUp;
    },
    showBack() {
      return this.$route.name === "content-slug";
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
