import hau from "./messages/hausa.js";
import kau from "./messages/kanuri.js";
import shu from "./messages/shuwa.js";
import mrt from "./messages/marghi.js";
import bwr from "./messages/bura.js";
import mfi from "./messages/mandara.js";
import ful from "./messages/fulfulde.js";
import ckl from "./messages/kibaku.js";
import wja from "./messages/waha.js";
import en from "./messages/en.js";

export const langInfo = {
  hausa: {
    name: "Hausa",
    rtl: false,
    code: "hau"
  },
  kanuri: {
    name: "Kanuri",
    rtl: false,
    code: "kau"
  },
  shuwa: {
    name: "Shuwa Arab شُوَ أرَب",
    rtl: false,
    code: "shu"
  },
  marghi: {
    name: "Marghi",
    rtl: false,
    code: "mrt"
  },
  en: {
    name: "English",
    rtl: false,
    code: "en"
  },
  bura: {
    name: "Bura or Pabər",
    rtl: false,
    code: "bwr"
  },
  mandara: {
    name: "Mandara",
    rtl: false,
    code: "mfi"
  },
  fulfulde: {
    name: "Myar Marghi",
    rtl: false,
    code: "ful"
  },
  kibaku: {
    name: "Kibaku",
    rtl: false,
    code: "ckl"
  },
  waha: {
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
  mrt,
  bwr,
  mfi,
  ful,
  ckl,
  wja,
  en
};
