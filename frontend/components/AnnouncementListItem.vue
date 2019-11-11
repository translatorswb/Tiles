<template>
  <div class="mb-4">
    <VBorderedCard
      :to="
        localePath({
          name: 'article-id',
          params: { id: `announcements_${item._id}` }
        })
      "
    >
      <div
        class="announcement-item d-flex"
        :class="$vuetify.breakpoint.xs ? 'flex-column' : ''"
      >
        <div class="announcement-item-icon">
          <i :class="item.icon" class="primary--text x-large"></i>
        </div>
        <div
          class="announcement-item-main flex-grow-1"
          :class="$vuetify.breakpoint.xs ? '' : 'mx-4'"
        >
          <div
            class="announcement-item-title accent--text mb-2"
            :class="$vuetify.breakpoint.xs ? 'title' : 'headline'"
          >
            {{ item.title[$i18n.locale] }}
          </div>
          <div class="announcement-item-date black--text">
            {{ $tc("day", fromNow) }}
          </div>
        </div>
        <div
          v-if="item.hasAudio"
          class="announcement-item-audio"
          :class="$vuetify.breakpoint.xs ? 'align-self-end' : ''"
        >
          <PlayButtonArticle
            :doc-id="item._id"
            :audio-id="item.hasAudio"
            :database="localDB"
          />
        </div>
      </div>
    </VBorderedCard>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
import { getDatabaseName } from "@/utils/pouchdb-utils";
import VBorderedCard from "@/components/VBorderedCard.vue";
import PlayButtonArticle from "@/components/PlayButtonArticle.vue";

export default {
  components: {
    VBorderedCard,
    PlayButtonArticle
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["selectedCamp"]),
    fromNow() {
      return dayjs().diff(dayjs(+this.item.createdOn), "day");
    },
    localDB() {
      return getDatabaseName("local", this.selectedCamp, "announcements");
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

.announcement-item-audio {
  width: 64px;
}
</style>
