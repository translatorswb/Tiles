<template>
  <v-btn class="mx-2" fab dark color="primary" @click.stop="playAudio">
    <v-icon dark>{{ audioIcon }}</v-icon>
    <audio
      ref="audio"
      :src="src"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @canplay="onCanPlay"
    />
  </v-btn>
</template>

<script>
import { mdiVolumeHigh, mdiPause } from "@mdi/js";
export default {
  props: {
    src: {
      type: String,
      default: null
    },
    requiresInit: {
      type: Boolean,
      default: false
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
    }
  },
  methods: {
    playAudio() {
      if (!this.src && this.requiresInit) {
        this.$emit("init");
        return;
      }
      if (this.isPlaying) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    },
    onPlay() {
      this.isPlaying = true;
    },
    onPause() {
      this.isPlaying = false;
    },
    onEnded() {
      this.isPlaying = false;
    },
    onCanPlay() {
      if (this.requiresInit) {
        this.playAudio();
      }
    }
  }
};
</script>
