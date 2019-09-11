<template>
  <v-row>
    <v-col v-for="category in categories" :key="category" cols="12" sm="6">
      <VBorderedCard
        :to="localePath({ name: 'info-category', params: { category } })"
      >
        <h2 class="display-1 accent--text">
          {{ $t(`infoCategories.${category}`) }}
        </h2>
      </VBorderedCard>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import VBorderedCard from "@/components/VBorderedCard";
export default {
  components: {
    VBorderedCard
  },
  computed: {
    ...mapState(["categories"])
  }
};
</script>
