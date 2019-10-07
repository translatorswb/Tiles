<template>
  <v-btn class="mx-2" fab dark color="primary" @click.stop="playAudio">
    <v-icon dark>{{ audioIcon }}</v-icon>
    <audio
      ref="audio"
      v-if="recording"
      :src="recording.src"
      @canplaythrough="onCanPlayThrough"
    />
  </v-btn>
</template>

<script>
import { mdiVolumeHigh, mdiPause } from "@mdi/js";
import { createObjectURL, revokeObjectURL } from "blob-util";

export default {
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
      this.recording = {
        src: createObjectURL(audioBlob)
      };
    },
    onCanPlayThrough() {
      revokeObjectURL(this.recording.src);
    }
  }
};
</script>
