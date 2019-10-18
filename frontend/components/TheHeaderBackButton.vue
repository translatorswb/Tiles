<template>
  <v-btn text color="white" @click="goBack">
    <v-icon>{{ icon.back }}</v-icon>
  </v-btn>
</template>

<script>
import { mdiChevronLeftCircle } from "@mdi/js";
export default {
  data() {
    return {
      icon: {
        back: mdiChevronLeftCircle
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
