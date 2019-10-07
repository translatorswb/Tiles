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
          <v-icon x-large color="primary">{{ icon.icon }}</v-icon>
        </div>
        <div
          class="announcement-item-main flex-grow-1"
          :class="$vuetify.breakpoint.xs ? '' : 'mx-4'"
        >
          <div
            class="announcement-item-title accent--text headline mb-2"
            :class="$vuetify.breakpoint.xs ? 'title' : 'headline'"
          >
            {{ item.name }}
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
          <AudioPlayButton
            :docId="item._id"
            :audioId="item.hasAudio"
            database="announcements"
          />
        </div>
      </div>
    </VBorderedCard>
  </div>
</template>

<script>
import { mdiCupWater } from "@mdi/js";
import dayjs from "dayjs";
import VBorderedCard from "@/components/VBorderedCard.vue";
import AudioPlayButton from "@/components/AudioPlayButton.vue";

export default {
  components: {
    VBorderedCard,
    AudioPlayButton
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      icon: {
        icon: mdiCupWater
      }
    };
  },
  computed: {
    fromNow() {
      return dayjs().diff(dayjs(+this.item._id), "day");
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
