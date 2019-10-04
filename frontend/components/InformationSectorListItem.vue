<template>
  <v-expansion-panel class="sector-item">
    <v-expansion-panel-header class="sector-item-header">
      <div class="sector-item-header-icon">
        <v-icon x-large color="primary">{{ item.icon }}</v-icon>
      </div>
      <div
        class="sector-item-header-title accent--text"
        :class="$vuetify.breakpoint.xs ? 'title mx-2' : 'display-1 mx-4'"
      >
        {{ $t(`infoSectors.${item.sector}`) }}
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="sector-item-body">
      <InformationArticleList :sector="item.sector" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mdiFoodApple } from "@mdi/js";
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
      icon: mdiFoodApple
    };
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
