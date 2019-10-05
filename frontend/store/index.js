import { announcementDict } from "./importAnnouncements";
import { contentDict } from "./importContent";
import { content } from "@/content/categorizedArticles";
import { langInfo } from "@/lang";

export const state = () => ({
  langInfo,
  content,
  contentDict,
  announcementDict
});

export const getters = {
  getSectorArticles: state => (locale, sector) =>
    state.content
      .find(d => d.sector === sector)
      .articles.map(id => state.contentDict[locale][id]),
  getArticle: state => (locale, id) => state.contentDict[locale][id],
  getAnnouncements: state => locale => state.announcementDict[locale],
  getAnnouncement: state => (locale, id) => state.announcementDict[locale][id]
};
