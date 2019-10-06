<template>
  <v-btn class="mx-2" fab dark color="primary" @click.prevent="playAudio">
    <v-icon dark>{{ audioIcon }}</v-icon>
  </v-btn>
</template>

<script>
import { mdiVolumeHigh, mdiPause } from "@mdi/js";

export default {
  props: {
    doc: {
      type: Object,
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
    }
  },
  methods: {
    playAudio() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        console.log("Play");
      } else {
        console.log("Pause");
      }
    }
  }
};
</script>
