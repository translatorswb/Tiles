<template>
  <TheInfoArticleList :page="page" />
</template>

<script>
import TheInfoArticleList from "@/components/TheInfoArticleList.vue";
export default {
  components: {
    TheInfoArticleList
  },
  computed: {
    page() {
      return Number(this.$route.params.page) || 1;
    }
  }
};
</script>
