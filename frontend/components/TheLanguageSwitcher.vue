<template>
  <v-row>
    <v-col cols="12" class="text-center my-8">
      <img
        alt="twb logo"
        srcset="
          ~/assets/images/TWB_Interim_Logo@1x.png,
          ~/assets/images/TWB_Interim_Logo@2x.png 2x
        "
        src="~/assets/images/TWB_Interim_Logo@2x.png"
      />
    </v-col>
    <v-col cols="12">
      <div class="rotate-text-container">
        <div
          v-for="lang in Object.values(langInfo)"
          :key="lang.code"
          class="rotate-text accent--text"
        >
          {{ $t("selectLanguage", lang.code) }}
        </div>
      </div>
    </v-col>
    <v-col
      v-for="lang in Object.values(langInfo)"
      :key="lang.code"
      cols="12"
      md="6"
      lg="4"
    >
      <VBorderedCardWithAudio :to="to(lang.code)" :src="audioSrc(lang.code)">
        <div class="display-1 accent--text">{{ lang.name }}</div>
      </VBorderedCardWithAudio>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VBorderedCardWithAudio from "@/components/VBorderedCardWithAudio";

export default {
  components: {
    VBorderedCardWithAudio
  },
  computed: {
    ...mapState(["langInfo"]),
    ...mapGetters(["hasAudioInstruction"])
  },
  methods: {
    audioSrc(locale) {
      const key = "language";
      return this.hasAudioInstruction(key, locale)
        ? `/audio/${key}/${locale}.mp3`
        : null;
    },
    to(locale) {
      return this.localePath("welcome", locale);
    }
  }
};
</script>

<style scoped>
img {
  width: 417px;
  max-width: 100%;
  height: auto;
}

.rotate-text-container {
  position: relative;
  height: 50px;
}

.rotate-text {
  white-space: nowrap;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  left: 50%;
  animation: topToBottom 20s linear infinite 0s;
}

.rotate-text:nth-child(2) {
  animation-delay: 2s;
}

.rotate-text:nth-child(3) {
  animation-delay: 4s;
}

.rotate-text:nth-child(4) {
  animation-delay: 6s;
}

.rotate-text:nth-child(5) {
  animation-delay: 8s;
}

.rotate-text:nth-child(6) {
  animation-delay: 10s;
}

.rotate-text:nth-child(7) {
  animation-delay: 12s;
}

.rotate-text:nth-child(8) {
  animation-delay: 14s;
}

.rotate-text:nth-child(9) {
  animation-delay: 16s;
}

.rotate-text:nth-child(10) {
  animation-delay: 18s;
}

@keyframes topToBottom {
  0% {
    opacity: 0;
    transform: translate(-50%, -30px);
  }
  2% {
    opacity: 1;
    transform: translate(-50%, 0px);
  }
  8% {
    opacity: 1;
    transform: translate(-50%, 0px);
  }
  10% {
    opacity: 0;
    transform: translate(-50%, 30px);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 30px);
  }
}
</style>
