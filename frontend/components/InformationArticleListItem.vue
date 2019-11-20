<template>
  <div class="mb-4">
    <VBorderCard :color="color">
      <template v-slot:card-media>
        <div class="mr-4">
          <i :class="icon" class="primary--text x-large"></i>
        </div>
      </template>
      <template v-slot:card-title>
        {{ item.title[$i18n.locale] }}
      </template>
      <template v-slot:card-actions>
        <PlayButtonArticle
          :doc-id="item._id"
          :audio-id="item.hasAudio"
          :database="localDB"
          :color="secondaryColor"
        />
        <NextButton
          :to="
            localePath({
              name: 'article-id',
              params: { id: `articles_${item._id}` }
            })
          "
          :color="color"
        />
      </template>
    </VBorderCard>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getDatabaseName } from "@/utils/pouchdb-utils";
import VBorderCard from "@/components/VBorderCard.vue";
import PlayButtonArticle from "@/components/PlayButtonArticle.vue";
import NextButton from "@/components/NextButton";

export default {
  components: {
    VBorderCard,
    PlayButtonArticle,
    NextButton
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["selectedCamp"]),
    ...mapGetters(["getLocaleColor"]),
    localDB() {
      return getDatabaseName("local", this.selectedCamp, "articles");
    },
    color() {
      return this.getLocaleColor("primary", this.$i18n.locale);
    },
    secondaryColor() {
      return this.getLocaleColor("secondary", this.$i18n.locale);
    },
    icon() {
      const snakeCase = this.item.icon.toLowerCase().replace(/ /g, "-");
      return `humanitarianicons-${snakeCase[0].toUpperCase()}${snakeCase.slice(
        1
      )}`;
    }
  }
};
</script>
