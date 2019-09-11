<template>
  <article class="article markdown">
    <h1 class="article-title accent--text display-2 font-weight-bold">
      {{ article.attributes.title }}
    </h1>
    <p class="article-meta caption">{{ article.attributes.date }}</p>
    <span class="article-content" v-html="article.html"></span>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getArticle"]),
    article() {
      return this.getArticle(this.$route.params.article);
    }
  }
};
</script>

<style scoped>
.article-title {
  margin: 1em auto;
}
</style>
