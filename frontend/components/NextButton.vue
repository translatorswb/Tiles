<template>
  <v-btn class="mx-2" fab dark :color="buttonColor" @click="navigateTo">
    <v-icon dark>{{ nextIcon }}</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from "vuex";
import { mdiChevronRight } from "@mdi/js";
export default {
  props: {
    to: {
      type: String,
      required: false
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
      return this.color || this.colors.primary;
    }
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
