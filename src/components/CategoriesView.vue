<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '../stores/categoryStore'
const { categories, currentCategoryId } = storeToRefs(useCategoryStore())
</script>

<template>
  <nav>
    <ul v-if="categories">
      <li v-for="category in categories" :key="category.id">
        <RouterLink
          :to="{ name: 'Category', params: { categoryId: category.id } }"
          :class="{ disabled: category.id === currentCategoryId }"
        >
          {{ category.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  /* padding: 24px 32px; */
}

nav ul li a {
  text-decoration: none;
  color: #eeeeee;
  font-size: 18px;

  &.disabled {
    color: #6c757d;
    cursor: default;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
