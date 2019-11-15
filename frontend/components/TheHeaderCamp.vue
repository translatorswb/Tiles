<template>
	<v-btn text nuxt to="/camp"
		><v-icon :left="showText">{{ icon.camp }}</v-icon
		><span v-if="showText">{{ currentCampName }}</span></v-btn
	>
</template>

<script>
import { mapGetters } from "vuex";
import { mdiMapMarker } from "@mdi/js";
export default {
	data() {
		return {
			icon: {
				camp: mdiMapMarker
			}
		};
	},
	computed: {
		...mapGetters(["getSelectedCamp"]),
		currentCampName() {
			return this.getSelectedCamp && this.getSelectedCamp.name;
		},
		showText() {
			return this.currentCampName && !this.$vuetify.breakpoint.xs;
		}
	}
};
</script>
