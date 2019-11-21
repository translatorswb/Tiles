<template>
  <v-btn text color="white" @click="goBack">
    <v-icon x-large>{{ icon.back }}</v-icon>
  </v-btn>
</template>

<script>
import { mdiChevronLeftCircleOutline } from "@mdi/js";
export default {
  data() {
    return {
      icon: {
        back: mdiChevronLeftCircleOutline
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
