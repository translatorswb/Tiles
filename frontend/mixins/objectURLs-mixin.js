import { revokeObjectURL } from "blob-util";
import { mapState, mapActions } from "vuex";

export default {
	computed: {
		...mapState({
			objectURLs: state => state.objectURLs.objectURLs
		})
	},
	beforeDestroy() {
		this.objectURLs.forEach(objectURL => {
			revokeObjectURL(objectURL);
		});
		this.removeAllObjectURLs();
	},
	methods: {
		...mapActions({
			addObjectURL: "objectURLs/add",
			removeAllObjectURLs: "objectURLs/removeAll"
		})
	}
};
