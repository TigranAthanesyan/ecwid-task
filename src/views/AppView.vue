<script setup lang="ts">
import { inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { EventHandlersService } from '../services/event-handlers.service'
import { EVENT_HANDLERS_SERVICE_KEY } from '../constants/global-constants'
import SidebarView from './SidebarView.vue'
import NavbarView from './NavbarView.vue'

const route = useRoute()
const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService

onMounted(() => eventHandlers.onStoreMount(Number(route.params.categoryId)))

watch(
  () => route,
  () => {
    eventHandlers.onRouteChange()
  },
  { deep: true }
)
</script>

<template>
  <div class="app-container">
    <SidebarView />
    <div class="main-container">
      <NavbarView />
      <div class="main-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;

  .main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;

    .main-content {
      overflow-y: auto;
    }
  }
}
</style>
