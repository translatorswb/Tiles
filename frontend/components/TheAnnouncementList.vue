<template>
  <div>
    <TheAnnouncementListItem
      v-for="(announcement, i) in announcements"
      :key="i"
      :item="announcement"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TheAnnouncementListItem from "@/components/TheAnnouncementListItem.vue";

export default {
  components: {
    TheAnnouncementListItem
  },
  computed: {
    ...mapState(["announcements"])
  }
};
</script>

<style></style>
