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
import { mdiVolumeHigh, mdiPause, mdiCommentQuestion } from "@mdi/js";
export default {
  props: {
    src: {
      type: String,
      default: null
    },
    requiresInit: {
      type: Boolean,
      default: false
    },
    isInstruction: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icon: {
        play: mdiVolumeHigh,
        pause: mdiPause,
        instruction: mdiCommentQuestion
      },
      isPlaying: false
    };
  },
  computed: {
    playIcon() {
      return this.isInstruction ? this.icon.instruction : this.icon.play;
    },
    audioIcon() {
      return this.isPlaying ? this.icon.pause : this.playIcon;
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
