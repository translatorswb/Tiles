<template>
  <v-row>
    <v-col
      v-for="category in categories"
      :key="category"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
    >
      <article :class="$vuetify.rtl ? 'category-rtl' : 'category'">
        <h2 class="category-title">
          <nuxt-link
            class="accent--text"
            :to="localePath({ name: 'info-category', params: { category } })"
          >
            {{ $t(`infoCategories.${category}`) }}
          </nuxt-link>
        </h2>
      </article>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["categories"])
  }
};
</script>

<style scoped>
.category {
  box-sizing: border-box;
  padding-left: 12px;
  border-left: 4px solid #e8991c;
}

.category-rtl {
  box-sizing: border-box;
  padding-right: 12px;
  border-right: 4px solid #e8991c;
}

.category-title a {
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.category-title:hover a {
  color: #e8991c !important;
}
</style>
