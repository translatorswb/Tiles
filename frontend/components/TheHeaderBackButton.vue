<template>
  <v-btn fab x-large dark :color="buttonColor" @click="goBack">
    <v-icon x-large>{{ icon.back }}</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from "vuex";
import { mdiChevronLeft } from "@mdi/js";
export default {
  props: {
    color: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      icon: {
        back: mdiChevronLeft
      }
    };
  },
  computed: {
    ...mapState(["colors"]),
    buttonColor() {
      return this.color || this.colors.secondary;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
