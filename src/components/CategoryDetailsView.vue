<script setup lang="ts">
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
import type { ICategory } from '@/interfaces/category-interfaces'
import type { EventHandlersService } from '@/services/event-handlers.service'
import { useCategoryStore } from '@/stores/categoryStore'

const route = useRoute()
const { currentCategory } = storeToRefs(useCategoryStore())
const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService

eventHandlers.onCategoryRouteChange(Number(route.params?.categoryId))

onMounted(() => {
  if (currentCategory.value) {
    eventHandlers.onCategoryMount(currentCategory.value)
  }
  watch(
    () => currentCategory.value,
    (cat) => eventHandlers.onCategoryMount(cat as ICategory)
  )
  watch(
    () => route.params.categoryId,
    (newId) => eventHandlers.onCategoryRouteChange(Number(newId))
  )
})
</script>

<template>
  <div class="category-details">
    <div class="image-wrapper">
      <img v-bind:src="currentCategory?.imageUrl" />
    </div>
  </div>
</template>

<style scoped>
.category-details {
  height: 260px;
  box-sizing: border-box;
  display: flex;
  gap: 32px;
  border-bottom: 2px solid var(--secondary-color);

  .image-wrapper {
    height: 100%;
    min-width: 440px;
    width: fit-content;
    padding: 8px;
    box-sizing: border-box;
    border-right: 2px solid var(--secondary-color);
    display: flex;

    img {
      height: 100%;
      width: auto;
      border-radius: 8px;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
