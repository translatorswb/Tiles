<template>
  <div>
    <AnnouncementListItem
      v-for="(article, i) in announcements"
      :key="i"
      :item="article"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AnnouncementListItem from "@/components/AnnouncementListItem.vue";

export default {
  components: {
    AnnouncementListItem
  },

  computed: {
    ...mapGetters(["getAnnouncements"]),
    announcements() {
      return this.getAnnouncements(this.$i18n.locale);
    }
  }
};
</script>

<style></style>
