<template>
  <v-row>
    <v-col
      v-for="article in articles"
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
    <v-col cols="12" class="d-flex justify-space-between">
      <v-btn
        v-if="hasPrev"
        next
        rounded
        outlined
        color="primary"
        :to="prevLink"
      >
        <v-icon left>mdi-chevron-left</v-icon> Previous Page
      </v-btn>
      <div class="flex-grow-1"></div>
      <v-btn
        v-if="hasNext"
        next
        rounded
        outlined
        color="primary"
        :to="nextLink"
      >
        Next Page <v-icon right>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapState(["content", "perPage"]),
    hasPrev() {
      return this.page > 1;
    },
    hasNext() {
      return this.page * this.perPage < this.content.length;
    },
    articles() {
      const start = (this.page - 1) * this.perPage;
      const end = this.page * this.perPage;
      return this.content.slice(start, end);
    },
    prevLink() {
      return this.page === 2 ? "/" : `/info/${this.page - 1}`;
    },
    nextLink() {
      return `/info/${this.page + 1}`;
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
