import { langInfo } from "@/lang";

export const state = () => ({
  isOnline: true,
  selectedCamp: null,
  toUploadRecordingsCount: 0,
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
  updateOnlineStatus: (state, status) => {
    state.isOnline = status;
  },
  selectCamp: (state, campId) => {
    state.selectedCamp = campId;
  },
  updateToUploadRecordingsCount: (state, count) => {
    state.toUploadRecordingsCount = count;
  }
};

export const actions = {
  updateOnlineStatus: ({ commit }, status) => {
    commit("updateOnlineStatus", status);
  },
  selectCamp: ({ commit, state }, campId) => {
    if (state.selectedCamp !== campId) {
      commit("selectCamp", campId);
    }
  },
  updateToUploadRecordingsCount: ({ commit }, count) => {
    commit("updateToUploadRecordingsCount", count);
  }
};

export const getters = {
  getSelectedCamp: state => {
    return state.camps.find(camp => camp.id === state.selectedCamp);
  },

  validateCampId: state => campId => {
    const foundCamp = state.camps.find(camp => camp.id === campId);
    return !!foundCamp;
  },

  isLangRtl: state => code => {
    return state.langInfo[code].rtl;
  }
};
