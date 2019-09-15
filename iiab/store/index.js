import { contentDict } from "./importContent";
import { content } from "@/content";
import { langInfo } from "@/lang";

export const state = () => ({
  langInfo,
  content,
  sectors: content.map(d => d.sector),
  contentDict
});

export const getters = {
  getSectorArticles: state => (locale, sector) =>
    state.content
      .find(d => d.sector === sector)
      .articles.map(id => state.contentDict[locale][id]),
  getArticle: state => (locale, id) => state.contentDict[locale][id]
};
