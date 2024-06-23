<script setup lang="ts">
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants';
import type { EventHandlersService } from '@/services/event-handlers.service';
import { inject, onMounted } from 'vue';

const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService
onMounted(() => eventHandlers.onHomeMount())
</script>

<template>
    <div class="home">
    </div>
</template>

<style>

.home {
  flex: 1;
}
</style>
