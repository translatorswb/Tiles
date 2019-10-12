<template>
  <v-expansion-panel class="sector-item">
    <v-expansion-panel-header class="sector-item-header">
      <div class="sector-item-header-icon">
        <i
          :class="getSectorIcon(item.sector)"
          class="primary--text x-large"
        ></i>
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
import InformationArticleList from "@/components/InformationArticleList.vue";

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
      sectorIcons: {
        food: "humanitarianicons-Food-Security",
        shelter: "humanitarianicons-Shelter",
        nonfoodItems: "humanitarianicons-Non-food-items-2",
        health: "humanitarianicons-Health",
        waterSanitation: "humanitarianicons-Water-Sanitation-and-Hygiene",
        wellbeing: "humanitarianicons-Environment",
        protection: "humanitarianicons-Protection",
        education: "humanitarianicons-Education"
      }
    };
  },
  methods: {
    getSectorIcon(sector) {
      return this.sectorIcons[sector];
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
