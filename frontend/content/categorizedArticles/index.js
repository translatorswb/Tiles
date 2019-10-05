import {
  mdiFoodApple,
  mdiHome,
  mdiHanger,
  mdiBottleTonicPlus,
  mdiCupWater,
  mdiBasketball,
  mdiShieldPlus,
  mdiSchool
} from "@mdi/js";

export const content = [
  {
    sector: "food",
    articles: [
      "curabitur-molestie-suscipit-vehicula",
      "aenean-nisi-nisi-lacinia-in-tincidunt-id"
    ],
    icon: mdiFoodApple
  },
  { sector: "shelter", articles: [], icon: mdiHome },
  { sector: "nonfoodItems", articles: [], icon: mdiHanger },
  { sector: "health", articles: [], icon: mdiBottleTonicPlus },
  { sector: "waterSanitation", articles: [], icon: mdiCupWater },
  { sector: "wellbeing", articles: [], icon: mdiBasketball },
  { sector: "protection", articles: [], icon: mdiShieldPlus },
  { sector: "education", articles: [], icon: mdiSchool }
];
