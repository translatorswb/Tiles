import { content, perPage } from "@/content";

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
  perPage
});

export const getters = {
  getArticle: state => slug => state.content.find(d => d.slug === slug)
};
