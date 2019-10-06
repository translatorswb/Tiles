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
import { filterLocaleDocs, hasAudio } from "@/utils/pouchdb-utils";
import InformationArticleListItem from "@/components/InformationArticleListItem.vue";

export default {
  components: {
    InformationArticleListItem
  },
  props: {
    sector: {
      type: String,
      required: true
    }
  },
  computed: {
    localeArticles() {
      if (!this.articles) return [];
      const localeArticles = filterLocaleDocs(this.articles, this.$i18n.locale);
      localeArticles.forEach(article => {
        article.hasAudio = hasAudio(article, this.$i18n.locale);
      });
      return localeArticles;
    }
  },
  pouch: {
    articles() {
      return { sector: this.sector };
    }
  }
};
</script>
