<template>
  <VBorderedCard :to="localePath('welcome', lang.code)">
    <div
      class="article-item d-flex"
      :class="$vuetify.breakpoint.xs ? 'flex-column' : ''"
    >
      <div class="article-item-main flex-grow-1">
        <div
          class="article-item-title accent--text"
          :class="$vuetify.breakpoint.xs ? 'title' : 'headline'"
        >
          <h2 class="display-1 accent--text">{{ lang.name }}</h2>
        </div>
      </div>
      <div
        class="article-item-audio"
        :class="$vuetify.breakpoint.xs ? 'align-self-end' : ''"
      >
        <PlayButtonLanguage :lang-code="lang.code" />
      </div>
    </div>
  </VBorderedCard>
</template>

<script>
import VBorderedCard from "@/components/VBorderedCard";
import PlayButtonLanguage from "@/components/PlayButtonLanguage";

export default {
  props: { lang: { type: Object, required: true } },
  components: {
    VBorderedCard,
    PlayButtonLanguage
  }
};
</script>
