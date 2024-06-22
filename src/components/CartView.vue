<script setup lang="ts">
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'
import type { EventHandlersService } from '@/services/event-handlers.service'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
import IconShoppingCart from '@/icons/IconShoppingCart.vue'

const { productIds } = storeToRefs(useShoppingCartStore())
const { onCartIconClick } = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService
</script>

<template>
    <button @click="onCartIconClick"><IconShoppingCart /></button>
</template>

<style scoped>
button {
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
