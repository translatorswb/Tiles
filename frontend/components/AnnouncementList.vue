<template>
  <div>
    <AnnouncementListItem
      v-for="(announcement, i) in announcements"
      :key="i"
      :item="announcement"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AnnouncementListItem from "@/components/AnnouncementListItem.vue";

export default {
  components: {
    AnnouncementListItem
  },
  computed: {
    ...mapState(["announcements"])
  }
};
</script>

<style></style>
