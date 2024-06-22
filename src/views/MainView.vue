<script setup lang="ts">
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { EventHandlersService } from '../services/event-handlers.service'
import { EVENT_HANDLERS_SERVICE_KEY } from '../constants/global-constants'
import SidebarView from './SidebarView.vue'

const route = useRoute()

const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService

onMounted(() => eventHandlers.onStoreMount(Number(route.params.categoryId)))

watch(
  () => route.params.categoryId,
  (newId) => eventHandlers.onCategoryRouteChange(Number(newId))
)

watch(
  () => route.params.productId,
  (newId) => eventHandlers.onProductIdRouteChange(Number(newId))
)
</script>

<template>
  <div class="store">
    <SidebarView />
    <RouterView />
  </div>
</template>

<style>
.store {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
