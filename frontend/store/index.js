import { langInfo } from "@/lang";
import en from "@/lang/messages/en";

export const state = () => ({
  langInfo,
  sectors: Object.keys(en.infoSectors)
});
