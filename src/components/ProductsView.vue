<script setup lang="ts">
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/productStore'
import ProductItemView from '@/components/ProductItemView.vue'
import type { EventHandlersService } from '@/services/event-handlers.service'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
const { productsOfCurrentCategory } = storeToRefs(useProductStore())
const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService
</script>

<template>
  <div class="products-container">
    <div v-if="productsOfCurrentCategory?.length" class="products">
      <ProductItemView
        v-for="p in productsOfCurrentCategory"
        :key="p.id"
        :item="p"
        :on-product-click="() => eventHandlers.onProductClick(p.id)"
        :on-add-click="() => eventHandlers.onAddProduct(p)"
        :on-reduce-click="() => eventHandlers.onReduceProduct(p.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.products-container {
  flex: 1;
  padding: 16px;
}
.products {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 6px;
  height: 100%;
  overflow: auto;
}
</style>
