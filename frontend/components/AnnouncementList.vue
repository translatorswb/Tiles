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
import { mapState } from "vuex";
import {
  getDatabaseName,
  filterLocaleDocs,
  hasAudio
} from "@/utils/pouchdb-utils";
import AnnouncementListItem from "@/components/AnnouncementListItem.vue";

export default {
  components: {
    AnnouncementListItem
  },
  data() {
    return {
      announcements: []
    };
  },
  computed: {
    ...mapState(["selectedCamp"]),
    localAnnouncementsDB() {
      return getDatabaseName("local", this.selectedCamp, "announcements");
    },
    localeAnnouncements() {
      if (this.announcements.length === 0) return [];
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
  watch: {
    localAnnouncementsDB(value) {
      if (value) {
        this.getAnnouncements();
      }
    }
  },
  created() {
    this.getAnnouncements();
  },
  methods: {
    async getAnnouncements() {
      try {
        const all = await this.$pouch.allDocs({}, this.localAnnouncementsDB);
        this.announcements = all.rows.map(row => row.doc);
      } catch (error) {
        this.announcements = [];
      }
    }
  }
};
</script>

<style></style>
