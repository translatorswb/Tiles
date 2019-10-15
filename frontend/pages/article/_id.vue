<template>
  <article v-if="article" class="article markdown text-container">
    <h1
      class="article-title flex-grow-1 accent--text font-weight-bold my-6"
      :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-2'"
    >
      {{ article.title[$i18n.locale] }}
    </h1>
    <div v-if="author" class="mb-4">
      <img alt="logo" class="article-author-logo" :src="author" />
    </div>
    <div v-if="recording" class="mb-4">
      <audio style="width: 100%" :src="recording.src" controls>
        Sorry, your browser doesn't support embedded audios.
      </audio>
    </div>
    <div class="article-content" v-html="content"></div>
  </article>
  <article v-else class="text-container">{{ error }}</article>
</template>

<script>
import showdown from "showdown";
import createDOMPurify from "dompurify";
import { createObjectURL, blobToDataURL } from "blob-util";
import { getAuthorImage, getAudio, getAssets } from "@/utils/pouchdb-utils";
import objectURLsMixin from "@/mixins/objectURLs-mixin";

export default {
  mixins: [objectURLsMixin],
  data() {
    return {
      article: null,
      author: null,
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

      // Get author
      const authorImage = getAuthorImage(doc);
      if (authorImage) {
        this.author = await blobToDataURL(authorImage);
      }

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
      const assetsObjectURLs = await Promise.all(
        Object.values(assets).map(info => {
          return blobToDataURL(info.data);
        })
      );
      assetsNames.forEach((name, i) => {
        const objectURL = assetsObjectURLs[i];
        this.addObjectURL(objectURL);
        clean = clean.replace(name, objectURL);
      });

      this.content = clean;
    } catch (error) {
      this.error = error;
    }
  }
};
</script>

<style scoped>
.article-author-logo {
  max-width: 240px;
}
</style>
