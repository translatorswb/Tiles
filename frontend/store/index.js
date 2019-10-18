import { langInfo } from "@/lang";

export const state = () => ({
  selectedCamp: null,
  langInfo,
  camps: [
    { id: "c001", name: "Camp 1" },
    { id: "c002", name: "Camp 2" },
    { id: "c003", name: "Camp 3" }
  ],
  sectors: [
    { key: "food", icon: "humanitarianicons-Food-Security" },
    { key: "shelter", icon: "humanitarianicons-Shelter" },
    { key: "nonfoodItems", icon: "humanitarianicons-Non-food-items-2" },
    { key: "health", icon: "humanitarianicons-Health" },
    {
      key: "waterSanitation",
      icon: "humanitarianicons-Water-Sanitation-and-Hygiene"
    },
    { key: "wellbeing", icon: "humanitarianicons-Environment" },
    { key: "protection", icon: "humanitarianicons-Protection" },
    { key: "education", icon: "humanitarianicons-Education" }
  ]
});

export const mutations = {
  selectCamp: (state, campId) => {
    state.selectedCamp = campId;
  }
};

export const actions = {
  selectCamp: ({ commit, state }, campId) => {
    if (state.selectedCamp !== campId) {
      commit("selectCamp", campId);
    }
  }
};

export const getters = {
  getSelectedCamp: state => {
    return state.camps.find(camp => camp.id === state.selectedCamp);
  },

  validateCampId: state => campId => {
    const foundCamp = state.camps.find(camp => camp.id === campId);
    return !!foundCamp;
  }
};
