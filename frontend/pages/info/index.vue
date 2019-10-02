<template>
  <div>
    <div
      class="display-3 font-weight-bold text-uppercase text-center accent--text py-12"
    >
      Information
    </div>
    <InformationSectorList />
  </div>
</template>

<script>
import InformationSectorList from "@/components/InformationSectorList.vue";
export default {
  components: { InformationSectorList }
};
</script>
