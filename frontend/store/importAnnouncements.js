import { langInfo } from "@/lang";

const announcementDict = {};
Object.values(langInfo).forEach(l => {
  announcementDict[l.code] = {};
});
function importAll(r) {
  r.keys().forEach(path => {
    const [, folderName, fileName] = path.split("/");
    const code = langInfo[fileName.slice(0, -3)].code;
    const article = r(path);
    const id = folderName.toLowerCase().replace(/[^a-zA-Z0-9_-]/, "-");
    article.id = id;
    announcementDict[code][id] = article;
  });
}
importAll(require.context("@/content/announcements/", true, /\.md$/));
export { announcementDict };
