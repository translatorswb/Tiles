<template>
  <v-btn class="mx-2" fab dark color="primary" @click="navigateTo">
    <v-icon dark>{{ nextIcon }}</v-icon>
  </v-btn>
</template>

<script>
import { mdiChevronRight } from "@mdi/js";
export default {
  props: {
    to: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      nextIcon: mdiChevronRight
    };
  },
  methods: {
    navigateTo() {
      if (this.to) {
        this.$router.push(this.to);
      } else {
        this.$emit("click");
      }
    }
  }
};
</script>
