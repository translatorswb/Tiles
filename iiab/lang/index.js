import hau from "./messages/hausa.js";
import kau from "./messages/kanuri.js";
import shu from "./messages/shuwa.js";
import mrt from "./messages/marghi.js";
import bwr from "./messages/bura.js";
import mfi from "./messages/mandara.js";
import ful from "./messages/fulfulde.js";
import ckl from "./messages/kibaku.js";
import wja from "./messages/waha.js";

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
    name: "Shuwa Arab شُوَ أرَب",
    rtl: false,
    code: "shu"
  },
  mrt: {
    name: "Marghi",
    rtl: false,
    code: "mrt"
  },
  bwr: {
    name: "Bura or Pabər",
    rtl: false,
    code: "bwr"
  },
  mfi: {
    name: "Mandara",
    rtl: false,
    code: "mfi"
  },
  ful: {
    name: "Myar Marghi",
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
  mrt,
  bwr,
  mfi,
  ful,
  ckl,
  wja
};
