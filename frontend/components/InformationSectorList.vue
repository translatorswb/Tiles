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
import {
  getDatabaseName,
  filterLocaleDocs,
  hasAudio
} from "@/utils/pouchdb-utils";
import InformationSectorListItem from "@/components/InformationSectorListItem.vue";
export default {
  components: { InformationSectorListItem },
  data() {
    return {
      openedSectors: [],
      articles: []
    };
  },
  computed: {
    ...mapState(["sectors", "selectedCamp"]),
    localArticlesDB() {
      return getDatabaseName("local", this.selectedCamp, "articles");
    },
    localeArticles() {
      if (this.articles.length === 0) return [];
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
        sectorsInfo[sector.key] = {
          key: sector.key,
          icon: sector.icon,
          articles: []
        };
      });
      this.localeArticles.forEach(article => {
        sectorsInfo[article.sector].articles.push(article);
      });
      return sectorsInfo;
    }
  },
  watch: {
    localArticlesDB(value) {
      if (value) {
        this.getArticles();
      }
    }
  },
  created() {
    this.openedSectors = [...Array(this.sectors.length).keys()].map(
      (k, i) => i
    );
    this.getArticles();
  },
  methods: {
    async getArticles() {
      try {
        const all = await this.$pouch.allDocs({}, this.localArticlesDB);
        this.articles = all.rows.map(row => row.doc);
      } catch (error) {
        this.articles = [];
      }
    }
  }
};
</script>
