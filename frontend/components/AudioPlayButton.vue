<template>
  <v-btn class="mx-2" fab dark color="primary" @click.stop="playAudio">
    <v-icon dark>{{ audioIcon }}</v-icon>
    <audio v-if="recording" ref="audio" :src="recording" />
  </v-btn>
</template>

<script>
import { mdiVolumeHigh, mdiPause } from "@mdi/js";
import { createObjectURL } from "blob-util";
import objectURLsMixin from "@/mixins/objectURLs-mixin";

export default {
  mixins: [objectURLsMixin],
  props: {
    docId: {
      type: String,
      required: true
    },
    audioId: {
      type: String,
      required: true
    },
    database: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      icon: {
        play: mdiVolumeHigh,
        pause: mdiPause
      },
      isPlaying: false,
      recording: null
    };
  },
  computed: {
    audioIcon() {
      return this.isPlaying ? this.icon.pause : this.icon.play;
    }
  },
  methods: {
    async playAudio() {
      if (!this.recording) {
        await this.initAudio();
      }
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    async initAudio() {
      const audioBlob = await this.$pouch.getAttachment(
        this.docId,
        this.audioId,
        this.database
      );
      const objectURL = createObjectURL(audioBlob);
      this.addObjectURL(objectURL);
      this.recording = objectURL;
    }
  }
};
</script>
