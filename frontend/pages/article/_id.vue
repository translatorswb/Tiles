<template>
  <article class="article markdown text-container">
    <h1 class="article-title accent--text display-2 font-weight-bold my-6">
      {{ article.attributes.title }}
    </h1>
    <span class="article-content" v-html="article.html"></span>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getArticle"]),
    article() {
      const locale = this.$i18n.locale;
      const id = this.$route.params.id;
      return this.getArticle(locale, id);
    }
  }
};
</script>
