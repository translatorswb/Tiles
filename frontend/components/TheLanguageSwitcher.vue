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
      sm="6"
      lg="4"
    >
      <VBorderedCard :to="localePath(path, lang.code)">
        <h2 class="display-1 accent--text">{{ lang.name }}</h2>
      </VBorderedCard>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import VBorderedCard from "@/components/VBorderedCard";
export default {
  components: {
    VBorderedCard
  },
  props: {
    from: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["langInfo"]),
    path() {
      const base = this.getRouteBaseName(this.from);
      return {
        name: base || "info",
        params: this.from ? this.from.params : {}
      };
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
  animation: topToBottom 18s linear infinite 0s;
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

@keyframes topToBottom {
  0% {
    opacity: 0;
    transform: translate(-50%, -30px);
  }
  3% {
    opacity: 1;
    transform: translate(-50%, 0px);
  }
  8% {
    opacity: 1;
    transform: translate(-50%, 0px);
  }
  11% {
    opacity: 0;
    transform: translate(-50%, 30px);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 30px);
  }
}
</style>
