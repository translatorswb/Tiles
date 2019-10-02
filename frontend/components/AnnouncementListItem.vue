<template>
  <div class="mb-4">
    <VBorderedCard
      :to="
        localePath({
          name: 'article-id',
          params: { id: item.id }
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
            {{ item.title }}
          </div>
          <div class="announcement-item-date black--text">
            {{ $tc("day", fromNow(item.date)) }}
          </div>
        </div>
        <div
          class="announcement-item-audio"
          :class="$vuetify.breakpoint.xs ? 'align-self-end' : ''"
        >
          <v-btn
            class="mx-2"
            fab
            dark
            color="primary"
            @click.prevent="playAudio"
          >
            <v-icon dark>{{ icon.audio }}</v-icon>
          </v-btn>
        </div>
      </div>
    </VBorderedCard>
  </div>
</template>

<script>
import { mdiCupWater, mdiVolumeHigh } from "@mdi/js";
import dayjs from "dayjs";
import VBorderedCard from "@/components/VBorderedCard.vue";
export default {
  components: {
    VBorderedCard
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
        icon: mdiCupWater,
        audio: mdiVolumeHigh
      }
    };
  },
  methods: {
    playAudio(e) {
      console.log("Play audio");
    },
    fromNow(date) {
      return dayjs().diff(dayjs(date), "day");
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
