import hau from "./messages/hausa-hau.js";
import kau from "./messages/kanuri-kau.js";
import shu from "./messages/shuwa-shu.js";
import shuAr from "./messages/shuwa-shu-ar.js";
import mrt from "./messages/marghi-mrt.js";
import bwr from "./messages/bura-bwr.js";
import mfi from "./messages/mandara-mfi.js";
import ful from "./messages/fulfulde-ful.js";
import ckl from "./messages/kibaku-ckl.js";
import wja from "./messages/waha-wja.js";

export const langInfo = {
  hau: {
    name: "Hausa",
    rtl: false,
    code: "hau"
  },
  kau: {
    name: "Kanuri",
    rtl: false,
    code: "kau"
  },
  shu: {
    name: "Shuwa",
    rtl: false,
    code: "shu"
  },
  "shu-ar": {
    name: "لهجة تشادية",
    rtl: true,
    code: "shu-ar"
  },
  mrt: {
    name: "Marghi",
    rtl: false,
    code: "mrt"
  },
  bwr: {
    name: "Bura",
    rtl: false,
    code: "bwr"
  },
  mfi: {
    name: "Mandara",
    rtl: false,
    code: "mfi"
  },
  ful: {
    name: "Fulfulde",
    rtl: false,
    code: "ful"
  },
  ckl: {
    name: "Kibaku",
    rtl: false,
    code: "ckl"
  },
  wja: {
    name: "Waha",
    rtl: false,
    code: "wja",
    file: "waha-wja.js"
  }
};

export const messages = {
  hau,
  kau,
  shu,
  "shu-ar": shuAr,
  mrt,
  bwr,
  mfi,
  ful,
  ckl,
  wja
};
