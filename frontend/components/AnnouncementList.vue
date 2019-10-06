<template>
  <div>
    <AnnouncementListItem
      v-for="(article, i) in localeAnnouncements"
      :key="i"
      :item="article"
    />
  </div>
</template>

<script>
import { filterLocaleDocs, hasAudio } from "@/utils/pouchdb-utils";
import AnnouncementListItem from "@/components/AnnouncementListItem.vue";

export default {
  components: {
    AnnouncementListItem
  },
  computed: {
    localeAnnouncements() {
      if (!this.announcements) return [];
      const localeAnnouncements = filterLocaleDocs(
        this.announcements,
        this.$i18n.locale
      );
      localeAnnouncements.forEach(announcement => {
        announcement.hasAudio = hasAudio(announcement, this.$i18n.locale);
      });
      return localeAnnouncements;
    }
  },
  pouch: {
    announcements: {}
  }
};
</script>

<style></style>
