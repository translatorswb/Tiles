<template>
  <div>
    <InformationArticleListItem
      v-for="(article, i) in articles"
      :key="i"
      :item="article"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["getSectorArticles"]),
    articles() {
      return this.getSectorArticles(this.$i18n.locale, this.sector);
    }
  }
};
</script>
