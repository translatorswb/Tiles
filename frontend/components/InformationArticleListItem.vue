<template>
	<div class="mb-4">
		<VBorderCard>
			<template v-slot:card-media>
				<div class="announcement-item-icon">
					<i :class="item.icon" class="primary--text x-large"></i>
				</div>
			</template>
			<template v-slot:card-title>
				{{ item.title[$i18n.locale] }}
			</template>
			<template v-slot:card-actions>
				<PlayButtonArticle
					:doc-id="item._id"
					:audio-id="item.hasAudio"
					:database="localDB"
				/>
				<NextButton
					:to="
						localePath({
							name: 'article-id',
							params: { id: `articles_${item._id}` }
						})
					"
				/>
			</template>
		</VBorderCard>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { getDatabaseName } from "@/utils/pouchdb-utils";
import VBorderCard from "@/components/VBorderCard.vue";
import PlayButtonArticle from "@/components/PlayButtonArticle.vue";
import NextButton from "@/components/NextButton";

export default {
	components: {
		VBorderCard,
		PlayButtonArticle,
		NextButton
	},
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapState(["selectedCamp"]),
		localDB() {
			return getDatabaseName("local", this.selectedCamp, "articles");
		}
	}
};
</script>
