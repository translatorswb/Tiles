import { langInfo } from "@/lang";

const contentDict = {};
Object.values(langInfo).forEach(l => {
  contentDict[l.code] = {};
});
function importAll(r) {
  r.keys().forEach(path => {
    const [, folderName, fileName] = path.split("/");
    const code = langInfo[fileName.slice(0, -3)].code;
    const article = r(path);
    const id = folderName.toLowerCase().replace(/[^a-zA-Z0-9_-]/, "-");
    article.id = id;
    contentDict[code][id] = article;
  });
}
importAll(require.context("@/content/categorizedArticles/", true, /\.md$/));

export { contentDict };
