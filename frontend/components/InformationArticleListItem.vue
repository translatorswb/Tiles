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
      <div class="article-item d-flex">
        <div class="article-item-main flex-grow-1">
          <div class="article-item-title accent--text headline">
            {{ item.attributes.title }}
          </div>
        </div>
        <div class="article-item-audio">
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
import { mdiVolumeHigh } from "@mdi/js";
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
        audio: mdiVolumeHigh
      }
    };
  },
  methods: {
    playAudio(e) {
      console.log("Play audio");
    }
  }
};
</script>
