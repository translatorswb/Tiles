<template>
  <v-app>
    <v-content>
      <v-container
        class="main-container"
        :class="$vuetify.breakpoint.xs ? 'px-4' : 'px-8'"
        fluid
      >
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<style scoped>
.main-container {
  max-width: 1280px;
}
</style>
