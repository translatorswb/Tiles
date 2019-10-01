import { contentDict } from "./importContent";
import { announcements } from "./importAnnouncements";
import { content } from "@/content";
import { langInfo } from "@/lang";

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

export const state = () => ({
  langInfo,
  content,
  sectors: content.map(d => d.sector),
  contentDict,
  announcements
});

export const getters = {
  getSectorArticles: state => (locale, sector) =>
    state.content
      .find(d => d.sector === sector)
      .articles.map(id => state.contentDict[locale][id]),
  getArticle: state => (locale, id) => state.contentDict[locale][id],
  getDisplayMonth: state => date => months[date.getMonth()]
};
