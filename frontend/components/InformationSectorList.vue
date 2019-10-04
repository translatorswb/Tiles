<template>
  <v-expansion-panels v-model="openedSectors" multiple>
    <InformationSectorListItem
      v-for="(item, ii) in content"
      :key="ii"
      :item="item"
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
    ...mapState(["content"])
  },
  created() {
    this.openedSectors = [...Array(this.content.length).keys()].map(
      (k, i) => i
    );
  }
};
</script>
