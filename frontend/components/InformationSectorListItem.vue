<template>
	<v-expansion-panel class="sector-item">
		<v-expansion-panel-header class="sector-item-header">
			<div class="sector-item-header-icon">
				<i :class="item.icon" class="primary--text x-large"></i>
			</div>
			<div class="sector-item-header-title accent--text headline mx-2">
				{{ $t(`infoSectors.${item.key}`) }}
			</div>
		</v-expansion-panel-header>
		<v-expansion-panel-content class="sector-item-body">
			<InformationArticleList :articles="item.articles" />
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script>
import InformationArticleList from "@/components/InformationArticleList.vue";

export default {
	components: {
		InformationArticleList
	},
	props: {
		item: {
			type: Object,
			required: true
		}
	}
};
</script>

<style scoped>
.sector-item-header {
	display: flex;
}

.sector-item-header-icon {
	flex: 0;
}
</style>
