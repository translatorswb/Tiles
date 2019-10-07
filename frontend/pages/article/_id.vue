<template>
  <article v-if="article" class="article markdown text-container">
    <h1
      class="article-title flex-grow-1 accent--text font-weight-bold my-6"
      :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-2'"
    >
      {{ article.name }}
    </h1>
    <div class="mb-4">
      <img
        alt="logo"
        class="article-author-logo"
        src="~/assets/images/TWB_Interim_Logo@1x.png"
      />
    </div>
    <div v-if="recording" class="mb-4">
      <audio
        style="width: 100%"
        :src="recording.src"
        controls
        @canplaythrough="onCanPlayThrough"
      />
    </div>
    <div class="article-content" v-html="content"></div>
  </article>
  <article v-else class="text-container">{{ error }}</article>
</template>

<script>
import showdown from "showdown";
import createDOMPurify from "dompurify";
import { createObjectURL, revokeObjectURL, blobToDataURL } from "blob-util";
import { getAudio, getAssets } from "@/utils/pouchdb-utils";

export default {
  data() {
    return {
      article: null,
      error: null,
      content: null,
      recording: null
    };
  },
  async created() {
    const [database, _id] = this.$route.params.id.split("_");
    try {
      const doc = await this.$pouch.get(
        _id,
        { attachments: true, binary: true },
        database
      );

      this.article = doc;

      // Get audio
      const audioBlob = getAudio(doc, this.$i18n.locale);
      if (audioBlob) {
        this.recording = {
          src: createObjectURL(audioBlob)
        };
      }

      // Get markdown file
      const mdBlob = doc._attachments[`${this.$i18n.locale}.md`];
      const mdText = await mdBlob.data.text();
      const converter = new showdown.Converter();
      const dirty = converter.makeHtml(mdText);
      const DOMPurify = createDOMPurify(window);
      let clean = DOMPurify.sanitize(dirty);

      // Get images
      const assets = getAssets(doc);
      const assetsNames = Object.keys(assets);
      const assetsDataURLs = await Promise.all(
        Object.values(assets).map(info => {
          return blobToDataURL(info.data);
        })
      );
      assetsNames.forEach((name, i) => {
        const dataURL = assetsDataURLs[i];
        clean = clean.replace(name, dataURL);
      });

      this.content = clean;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    onCanPlayThrough() {
      revokeObjectURL(this.recording.src);
    }
  }
};
</script>

<style scoped>
.article-author-logo {
  max-width: 240px;
}
</style>
