<template>
  <div>
    <div
      class="font-weight-bold text-uppercase text-center accent--text py-12"
      :class="$vuetify.breakpoint.xs ? 'display-1' : 'display-3'"
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
