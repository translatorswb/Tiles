<template>
  <div>
    <TheLanguageSwitcher :from="from" />
  </div>
</template>

<script>
import TheLanguageSwitcher from "@/components/TheLanguageSwitcher.vue";
export default {
  components: {
    TheLanguageSwitcher
  },
  data() {
    return {
      from: { name: "welcome", params: {} }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name) vm.from = from;
      vm.$vuetify.rtl = false;
    });
  }
};
</script>
