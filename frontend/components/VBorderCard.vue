<template>
	<v-card tile class="border-card primary--text border-left">
		<div class="d-flex">
			<slot name="card-media" />
			<div>
				<div
					class="accent--text"
					:class="$vuetify.breakpoint.xs ? 'title' : 'headline'"
				>
					<slot name="card-title" />
				</div>
				<div class="black--text">
					<slot name="card-subtitle" />
				</div>
			</div>
		</div>
		<div class="d-flex align-end">
			<div class="flex-grow-1"></div>
			<slot name="card-actions" />
		</div>
	</v-card>
</template>

<style scoped>
.border-card {
	padding: 16px;
}

.border-left {
	border-left: 8px solid #e8991c !important;
	padding-left: 16px;
}
</style>
