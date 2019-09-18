<template>
  <v-row>
    <v-col v-for="article in articles" :key="article.id" cols="12">
      <VBorderedCard
        :to="
          localePath({
            name: 'article-id',
            params: { id: article.id }
          })
        "
      >
        <h2 class="display-1 accent--text">
          {{ article.attributes.title }}
        </h2>
      </VBorderedCard>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import VBorderedCard from "@/components/VBorderedCard";
export default {
  components: {
    VBorderedCard
  },
  computed: {
    ...mapGetters(["getSectorArticles"]),
    articles() {
      const locale = this.$i18n.locale;
      const sector = this.$route.params.sector;
      return this.getSectorArticles(locale, sector);
    }
  }
};
</script>
