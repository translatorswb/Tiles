<template>
  <v-row>
    <v-col v-for="sector in sectors" :key="sector" cols="12" sm="6">
      <VBorderedCard
        :to="localePath({ name: 'info-sector', params: { sector } })"
      >
        <h2 class="display-1 accent--text">
          {{ $t(`infoSectors.${sector}`) }}
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
    ...mapState(["sectors"])
  }
};
</script>
