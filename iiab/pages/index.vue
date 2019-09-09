<template>
  <v-row>
    <v-col
      v-for="article in content"
      :key="article.attributes.title + article.attributes.date"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
    >
      <article class="article">
        <h2 class="article-title">
          <nuxt-link class="accent--text" :to="article.attributes.link">
            {{ article.attributes.title }}
          </nuxt-link>
        </h2>
        <p class="article-meta caption">{{ article.attributes.date }}</p>
        <p>{{ article.attributes.description }}</p>
        <p>
          <nuxt-link :to="article.attributes.link">
            Read More
          </nuxt-link>
        </p>
      </article>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    content() {
      return this.$store.state.content;
    }
  }
};
</script>

<style scoped>
.article {
  box-sizing: border-box;
  margin-bottom: 2.4em;
  padding-left: 12px;
  border-left: 4px solid #e8991c;
}

.article-title {
  margin-right: 24%;
  margin-bottom: 1em;
}

.article-title a {
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.article-title:hover a {
  color: #e8991c !important;
}
</style>
