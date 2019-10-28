<template>
  <v-btn class="mx-2" fab dark color="primary" @click.stop="playAudio">
    <v-icon dark>{{ audioIcon }}</v-icon>
    <audio ref="audio" :src="recording" v-if="recording" />
  </v-btn>
</template>

<script>
import { mdiVolumeHigh, mdiPause } from "@mdi/js";

export default {
  props: {
    langCode: {
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
      isPlaying: false
    };
  },
  computed: {
    audioIcon() {
      return this.isPlaying ? this.icon.pause : this.icon.play;
    },
    recording() {
      console.log(this.langCode);
      return `lang/${this.langCode}.mp3`;
    }
  },
  methods: {
    playAudio() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    }
  }
};
</script>
