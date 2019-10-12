<template>
  <div class="mb-4">
    <VBorderedCard
      :to="
        localePath({
          name: 'article-id',
          params: { id: `articles_${item._id}` }
        })
      "
    >
      <div
        class="article-item d-flex"
        :class="$vuetify.breakpoint.xs ? 'flex-column' : ''"
      >
        <div class="article-item-main flex-grow-1">
          <div
            class="article-item-title accent--text"
            :class="$vuetify.breakpoint.xs ? 'title' : 'headline'"
          >
            {{ item.name }}
          </div>
        </div>
        <div
          v-if="item.hasAudio"
          class="article-item-audio"
          :class="$vuetify.breakpoint.xs ? 'align-self-end' : ''"
        >
          <AudioPlayButton
            :doc-id="item._id"
            :audio-id="item.hasAudio"
            database="articles"
          />
        </div>
      </div>
    </VBorderedCard>
  </div>
</template>

<script>
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
  }
};
</script>
