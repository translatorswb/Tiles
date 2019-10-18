import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: "tiles",
      storage: window.localStorage,
      reducer: state => ({ selectedCamp: state.selectedCamp }),
      filter: mutation => mutation.type === "selectCamp"
    }).plugin(store);
  });
};
