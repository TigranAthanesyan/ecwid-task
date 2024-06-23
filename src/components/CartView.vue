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
  <button class="cart-item" @click="onCartIconClick">
    <IconShoppingCart />
    <div>{{ productIds.length }}</div>
  </button>
</template>

<style scoped>
.cart-item {
  display: flex;
  gap: 4px;
  align-items: start;
  font-size: 20px;
  font-weight: 600;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
