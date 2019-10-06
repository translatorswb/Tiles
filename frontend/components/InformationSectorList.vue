<template>
  <v-expansion-panels v-model="openedSectors" multiple>
    <InformationSectorListItem
      v-for="(item, ii) in sectorsInfo"
      :key="ii"
      :item="item"
    />
  </v-expansion-panels>
</template>

<script>
import { mapState } from "vuex";
import { filterLocaleDocs, hasAudio } from "@/utils/pouchdb-utils";
import InformationSectorListItem from "@/components/InformationSectorListItem.vue";
export default {
  components: { InformationSectorListItem },
  data() {
    return {
      openedSectors: []
    };
  },
  computed: {
    ...mapState(["sectors"]),
    localeArticles() {
      if (!this.articles) return [];
      const localeArticles = filterLocaleDocs(this.articles, this.$i18n.locale);
      localeArticles.forEach(article => {
        article.hasAudio = hasAudio(article, this.$i18n.locale);
      });
      return localeArticles;
    },
    sectorsInfo() {
      if (!this.localeArticles) return [];
      const sectorsInfo = {};
      this.sectors.forEach(sector => {
        sectorsInfo[sector] = { sector, articles: [] };
      });
      this.localeArticles.forEach(article => {
        sectorsInfo[article.sector].articles.push(article);
      });
      return sectorsInfo;
    }
  },
  pouch: {
    articles: {}
  },
  created() {
    this.openedSectors = [...Array(this.sectors.length).keys()].map(
      (k, i) => i
    );
  }
};
</script>
