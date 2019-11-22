<template>
  <v-btn
    class="mx-2"
    fab
    x-large
    dark
    :color="buttonColor"
    @click.stop="playAudio"
  >
    <v-icon x-large dark>{{ audioIcon }}</v-icon>
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
import { mapState } from "vuex";
import { mdiPlay, mdiPause } from "@mdi/js";
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
    color: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      icon: {
        play: mdiPlay,
        pause: mdiPause
      },
      isPlaying: false
    };
  },
  computed: {
    ...mapState(["colors"]),
    buttonColor() {
      return this.color || this.colors.secondary;
    },
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
