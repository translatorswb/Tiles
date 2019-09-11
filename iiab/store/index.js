import { content, categories } from "@/content";
import { langInfo } from "@/lang";

const contentDict = {};
function importAll(r) {
  r.keys().forEach(key => {
    contentDict[key] = r(key);
  });
}
importAll(require.context("@/content/", false, /\.md$/));

export const state = () => ({
  content: content.map(title => {
    const article = contentDict[`./${title}.md`];
    article.attributes.link = `content/${title}`;
    article.slug = title;
    return article;
  }),
  langInfo,
  categories
});

export const getters = {
  getArticle: state => slug => state.content.find(d => d.slug === slug)
};
