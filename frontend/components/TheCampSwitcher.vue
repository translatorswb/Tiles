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
    <v-col v-for="camp in camps" :key="camp.id" cols="12">
      <VBorderCard>
        <template v-slot:card-title>
          {{ camp.name }}
        </template>
        <template v-slot:card-actions>
          <NextButton @click="clickCamp(camp.id)" />
        </template>
      </VBorderCard>
    </v-col>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-card-title class="headline">Switch Camp?</v-card-title>
        <v-card-text
          ><p>
            {{ currentCampName }} <v-icon>{{ icon.to }}</v-icon>
            {{ attemptCampName }}
          </p>
          <p v-if="isOnline">
            This will erase the current camp's data and download the new camp's
            data.
          </p>
          <p v-else>
            Switch camp requires internet connection. Please try again later
            when connected to interent.
          </p></v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="colors.primary" dark @click="dialog = false"
            ><v-icon dark left>{{ icon.cancel }}</v-icon> Cancel</v-btn
          >
          <v-btn
            v-if="isOnline"
            :color="colors.primary"
            dark
            @click="switchCamp"
            ><v-icon dark left>{{ icon.confirm }}</v-icon> Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { mdiCheckCircle, mdiCloseCircle, mdiArrowRight } from "@mdi/js";
import VBorderCard from "@/components/VBorderCard.vue";
import NextButton from "@/components/NextButton";
export default {
  components: {
    VBorderCard,
    NextButton
  },
  data() {
    return {
      currentCamp: null,
      attemptCamp: null,
      dialog: false,
      icon: {
        cancel: mdiCloseCircle,
        confirm: mdiCheckCircle,
        to: mdiArrowRight
      }
    };
  },
  computed: {
    ...mapState(["isOnline", "selectedCamp", "camps", "colors"]),
    currentCampName() {
      return this.getCampName(this.currentCamp);
    },
    attemptCampName() {
      return this.getCampName(this.attemptCamp);
    }
  },
  mounted() {
    this.currentCamp = this.$route.query.camp || this.selectedCamp;
    this.attemptCamp = this.$route.query.switch;
    if (
      this.currentCamp &&
      this.attemptCamp &&
      this.currentCamp !== this.attemptCamp
    ) {
      this.dialog = true;
    }
  },
  methods: {
    ...mapActions(["selectCamp"]),
    clickCamp(campId) {
      this.attemptCamp = campId;
      if (!this.selectedCamp || this.selectedCamp === this.attemptCamp) {
        this.selectCamp(this.attemptCamp);
        this.$router.push("/language");
      } else {
        this.dialog = true;
      }
    },
    switchCamp() {
      this.selectCamp(this.attemptCamp);
      this.$router.push("/language");
      this.dialog = false;
    },
    getCampName(campId) {
      const foundCamp = this.camps.find(camp => camp.id === campId);
      return foundCamp ? foundCamp.name : "";
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
</style>
