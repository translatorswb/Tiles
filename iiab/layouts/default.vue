<template>
  <v-app>
    <TheHeader />
    <v-content>
      <v-container class="fill-height px-8" fluid>
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
