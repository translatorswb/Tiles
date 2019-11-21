<template>
  <v-btn text color="white" @click="goBack">
    <v-icon x-large>{{ icon.back }}</v-icon>
  </v-btn>
</template>

<script>
import { mdiChevronLeft } from "@mdi/js";
export default {
  data() {
    return {
      icon: {
        back: mdiChevronLeft
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
