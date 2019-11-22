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
          class="rotate-text"
        >
          {{ $t("selectLanguage", lang.code) }}
        </div>
      </div>
    </v-col>
    <v-col
      v-for="(lang, i) in Object.values(langInfo)"
      :key="lang.code"
      cols="12"
    >
      <div @click="clicked(i)" ref="langCard">
        <VBorderCard :color="getLocaleColor('primary', lang.code)">
          <template v-slot:card-media>
            <v-img
              max-width="120"
              aspect-ratio="1"
              :src="require(`@/assets/images/${lang.code}.jpg`)"
              class="grey lighten-2 mr-4"
            ></v-img>
          </template>
          <template v-slot:card-title>
            {{ lang.name }}
          </template>
          <template v-slot:card-actions>
            <PlayButtonInstruction
              :src="audioSrc(lang.code)"
              :color="getLocaleColor('secondary', lang.code)"
            />
            <NextButton
              :to="to(lang.code)"
              :color="getLocaleColor('secondary', lang.code)"
            />
          </template>
        </VBorderCard>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VBorderCard from "@/components/VBorderCard.vue";
import PlayButtonInstruction from "@/components/PlayButtonInstruction";
import NextButton from "@/components/NextButton";

export default {
  components: {
    VBorderCard,
    PlayButtonInstruction,
    NextButton
  },
  computed: {
    ...mapState(["langInfo"]),
    ...mapGetters(["hasAudioInstruction", "getLocaleColor"])
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
    },
    clicked(i) {
      const buttons = this.$refs.langCard[i].querySelectorAll("button");
      buttons.forEach(button => {
        button.classList.add("jello-horizontal");
        setTimeout(() => {
          button.classList.remove("jello-horizontal");
        }, 1000);
      });
    }
  }
};
</script>

<style>
.jello-horizontal {
  animation: jello-horizontal 0.9s both;
}

@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>

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
