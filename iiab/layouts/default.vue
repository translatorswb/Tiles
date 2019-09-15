<template>
  <v-app>
    <TheHeader />
    <v-content>
      <v-container class="px-8 container" fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
export default {
  components: {
    TheHeader
  }
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
