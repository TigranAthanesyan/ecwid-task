<script setup lang="ts">
import IconHome from '@/icons/IconHome.vue'
import { inject } from 'vue'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
import type { EventHandlersService } from '@/services/event-handlers.service'
const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService
</script>

<template>
  <button @click="eventHandlers.onHomeIconClick">
    <IconHome />
  </button>
</template>

<style scoped>
button {
  border: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
