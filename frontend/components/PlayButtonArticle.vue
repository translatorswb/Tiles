<template>
  <PlayButton
    v-if="audioId"
    :src="src"
    :requires-init="true"
    :color="color"
    @init="initAudio"
  />
</template>

<script>
import { createObjectURL } from "blob-util";
import PlayButton from "@/components/PlayButton.vue";
import objectURLsMixin from "@/mixins/objectURLs-mixin";

export default {
  components: {
    PlayButton
  },
  mixins: [objectURLsMixin],
  props: {
    docId: {
      type: String,
      required: true
    },
    audioId: {
      type: [String, Boolean],
      required: true
    },
    database: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      src: null
    };
  },
  methods: {
    async initAudio() {
      const audioBlob = await this.$pouch.getAttachment(
        this.docId,
        this.audioId,
        this.database
      );
      const objectURL = createObjectURL(audioBlob);
      this.addObjectURL(objectURL);
      this.src = objectURL;
    }
  }
};
</script>
