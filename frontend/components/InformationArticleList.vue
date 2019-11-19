<template>
  <div>
    <InformationArticleListItem
      v-for="(article, i) in localeArticles"
      :key="i"
      :item="article"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getDatabaseName,
  filterLocaleDocs,
  hasAudio
} from "@/utils/pouchdb-utils";
import InformationArticleListItem from "@/components/InformationArticleListItem.vue";

export default {
  components: {
    InformationArticleListItem
  },
  data() {
    return {
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
