<template>
	<div class="d-flex flex-wrap align-center justify-center py-6">
		<div
			class="text-center font-weight-bold accent--text text-uppercase"
			:class="$vuetify.breakpoint.xs ? 'headline' : 'display-1'"
		>
			<slot name="title" />
		</div>
		<div>
			<slot name="title-append" />
		</div>
	</div>
</template>
