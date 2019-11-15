<template>
	<div>
		<VTitle>
			<template v-slot:title>
				{{ $t("information") }}
			</template>
			<template v-slot:title-append>
				<PlayButtonInstruction :src="audioSrc" />
			</template>
		</VTitle>
		<InformationSectorList />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import VTitle from "@/components/VTitle";
import PlayButtonInstruction from "@/components/PlayButtonInstruction";
import InformationSectorList from "@/components/InformationSectorList.vue";
export default {
	components: { VTitle, PlayButtonInstruction, InformationSectorList },
	computed: {
		...mapGetters(["hasAudioInstruction"]),
		locale() {
			return this.$i18n.locale;
		},
		audioSrc() {
			const key = "info";
			return this.hasAudioInstruction(key, this.locale)
				? `/audio/${key}/${this.locale}.mp3`
				: null;
		}
	}
};
</script>
