<template>
  <div class="mb-4">
    <VBorderCard :color="color">
      <template v-slot:card-media>
        <div class="mr-2">
          <i :class="icon" class="x-large" :style="{ color }"></i>
        </div>
      </template>
      <template v-slot:card-title>
        {{ item.title[$i18n.locale] }}
      </template>
      <template v-slot:card-subtitle>
        {{ $tc("day", fromNow) }}
      </template>
      <template v-slot:card-actions>
        <PlayButtonArticle
          :doc-id="item._id"
          :audio-id="item.hasAudio"
          :database="localDB"
          :color="secondaryColor"
        />
        <NextButton
          :to="{
            path: localePath({
              name: 'article'
            }),
            query: { id: `announcements_${item._id}` }
          }"
          :color="secondaryColor"
        />
      </template>
    </VBorderCard>
  </div>
</template>

<script>
import dayjs from "dayjs";
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
    fromNow() {
      return dayjs().diff(dayjs(+this.item.createdOn), "day");
    },
    localDB() {
      return getDatabaseName("local", this.selectedCamp, "announcements");
    },
    color() {
      return this.getLocaleColor("primary", this.$i18n.locale);
    },
    secondaryColor() {
      return this.getLocaleColor("secondary", this.$i18n.locale);
    },
    icon() {
      return `humanitarianicons-${this.item.icon
        .toLowerCase()
        .replace(/ /g, "-")}`;
    }
  }
};
</script>

<style scoped>
.announcement-item-icon {
  width: 64px;
}

.announcement-item-icon svg {
  width: 64px !important;
  height: 64px !important;
}
</style>
