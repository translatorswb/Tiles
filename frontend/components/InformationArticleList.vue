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
import InformationArticleListItem from "@/components/InformationArticleListItem.vue";

export default {
  components: {
    InformationArticleListItem
  },
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
};
</script>
