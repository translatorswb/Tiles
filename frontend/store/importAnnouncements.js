import rawAnnouncements from "@/content/announcements/announcements.json";

const announcements = rawAnnouncements.map(function(x) {
  x.date = new Date(x.date);
  return x;
});

export { announcements };
