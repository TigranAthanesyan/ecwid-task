<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore';
import { storeToRefs } from 'pinia'

const { currentCategory } = storeToRefs(useCategoryStore())
</script>

<template>
  	<div class="category-details">
		<h1>{{ currentCategory?.name }}</h1>
		<img v-bind:src="currentCategory?.originalImage.url"/>
	</div>
   
</template>

<style scoped>
h1 {
	color: #133337;
}
.category-details {
	width: 300px;
	padding: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-right: 2px solid #eeeeee;

	img {
		width: 100%;
		height: auto;
		border-radius: 8px;
	}
}
</style>
