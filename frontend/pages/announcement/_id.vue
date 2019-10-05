<template>
  <article class="article markdown text-container">
    <div
      class="d-flex"
      :class="$vuetify.breakpoint.xs ? 'flex-column' : 'align-center'"
    >
      <h1
        class="article-title flex-grow-1 accent--text font-weight-bold my-6"
        :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-2'"
      >
        {{ article.attributes.title }}
      </h1>
      <div
        class="article-audio"
        :class="$vuetify.breakpoint.xs ? 'align-self-end' : ''"
      >
        <v-btn class="mx-2" fab dark color="primary" @click.prevent="playAudio">
          <v-icon dark>{{ icon.audio }}</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="mb-4">
      <img
        alt="logo"
        class="article-author-logo"
        src="~/assets/images/TWB_Interim_Logo@1x.png"
      />
    </div>
    <div class="article-content" v-html="article.html"></div>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import { mdiVolumeHigh } from "@mdi/js";
export default {
  data() {
    return {
      icon: {
        audio: mdiVolumeHigh
      }
    };
  },
  computed: {
    ...mapGetters(["getAnnouncement"]),
    article() {
      const locale = this.$i18n.locale;
      const id = this.$route.params.id;
      console.log(id);
      return this.getAnnouncement(locale, id);
    }
  },
  methods: {
    playAudio(e) {
      console.log("Play audio");
    }
  }
};
</script>

<style scoped>
.article-author-logo {
  max-width: 240px;
}
</style>
