<template>
  <v-expansion-panel class="sector-item">
    <v-expansion-panel-header class="sector-item-header">
      <div class="sector-item-header-icon">
        <v-icon x-large color="primary">{{
          getSectorIcon(item.sector)
        }}</v-icon>
      </div>
      <div
        class="sector-item-header-title accent--text"
        :class="$vuetify.breakpoint.xs ? 'title mx-2' : 'display-1 mx-4'"
      >
        {{ $t(`infoSectors.${item.sector}`) }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="sector-item-body">
      <InformationArticleList :articles="item.articles" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import {
  mdiFoodApple,
  mdiHome,
  mdiHanger,
  mdiBottleTonicPlus,
  mdiCupWater,
  mdiBasketball,
  mdiShieldPlus,
  mdiSchool
} from "@mdi/js";

import InformationArticleList from "@/components/InformationArticleList.vue";

const sectorIcons = {
  food: mdiFoodApple,
  shelter: mdiHome,
  nonfoodItems: mdiHanger,
  health: mdiBottleTonicPlus,
  waterSanitation: mdiCupWater,
  wellbeing: mdiBasketball,
  protection: mdiShieldPlus,
  education: mdiSchool
};

export default {
  components: {
    InformationArticleList
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icon: mdiFoodApple
    };
  },
  methods: {
    getSectorIcon(sector) {
      return sectorIcons[sector];
    }
  }
};
</script>

<style scoped>
.sector-item-header {
  display: flex;
}

.sector-item-header-icon {
  flex: 0;
}
</style>
