<template>
  <v-btn class="mx-2" fab x-large dark :color="buttonColor" @click="navigateTo">
    <v-icon x-large dark>{{ nextIcon }}</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from "vuex";
import { mdiChevronRight } from "@mdi/js";
export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    color: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      nextIcon: mdiChevronRight
    };
  },
  computed: {
    ...mapState(["colors"]),
    buttonColor() {
      return this.color || this.colors.secondary;
    }
  },
  methods: {
    navigateTo() {
      this.$router.push(this.to);
    }
  }
};
</script>
