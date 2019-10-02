<template>
  <v-expansion-panels multiple v-model="openedSectors">
    <InformationSectorListItem
      v-for="sector in sectors"
      :key="sector"
      :item="sector"
    />
  </v-expansion-panels>
</template>

<script>
import { mapState } from "vuex";
import InformationSectorListItem from "@/components/InformationSectorListItem.vue";
export default {
  components: { InformationSectorListItem },
  data() {
    return {
      openedSectors: []
    };
  },
  computed: {
    ...mapState(["sectors"])
  },
  created() {
    this.openedSectors = [...Array(this.sectors.length).keys()].map(
      (k, i) => i
    );
  }
};
</script>
