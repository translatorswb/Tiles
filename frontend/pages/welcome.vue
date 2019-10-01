<template>
  <div>
    <div class="display-3 text-center py-12">
      Welcome
    </div>
    <TheTopAnnouncements />
    <div class="pt-8">
      <div class="display-1">Learn more about your camp</div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        magnam culpa a adipisci mollitia aperiam, numquam alias veniam dolor
        consequuntur.
      </p>
      <v-btn block color="primary" dark :to="localePath('info')"
        >Learn more <v-icon right>{{ icon.learnMore }}</v-icon>
      </v-btn>
    </div>
    <div class="pt-10">
      <div class="display-1">
        Leave us feedback
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        magnam culpa a adipisci mollitia aperiam, numquam alias veniam dolor
        consequuntur.
      </p>
      <v-btn block color="primary" dark :to="localePath('feedback')"
        >Leave feedback <v-icon right>{{ icon.leaveFeedback }}</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import { mdiVoice, mdiBookOpen } from "@mdi/js";
import TheTopAnnouncements from "@/components/TheTopAnnouncements";

export default {
  components: {
    TheTopAnnouncements
  },
  data() {
    return {
      icon: {
        learnMore: mdiBookOpen,
        leaveFeedback: mdiVoice
      }
    };
  }
};
</script>
