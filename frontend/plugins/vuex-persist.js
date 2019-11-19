import VuexPersistence from "vuex-persist";

export default ({ store }) => {
	window.onNuxtReady(() => {
		new VuexPersistence({
			key: "tiles",
			storage: window.localStorage,
			reducer: state => ({
				selectedCamp: state.selectedCamp,
				toUploadRecordingsCount: state.toUploadRecordingsCount
			}),
			filter: mutation =>
				mutation.type === "selectCamp" ||
				mutation.type === "updateToUploadRecordingsCount"
		}).plugin(store);
	});
};
