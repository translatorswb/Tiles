export const state = () => ({
	objectURLs: []
});

export const mutations = {
	add(state, objectURL) {
		state.objectURLs.push(objectURL);
	},
	removeAll(state) {
		state.objectURLs = [];
	}
};

export const actions = {
	add({ commit }, objectURL) {
		commit("add", objectURL);
	},
	removeAll({ commit }) {
		commit("removeAll");
	}
};
