<script setup lang="ts">
import { storeToRefs } from 'pinia' 
import IconDelete from '@/icons/IconDelete.vue'
import type { IProduct } from '@/interfaces/product-interfaces'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'
import CircleButtonView from './CircleButtonView.vue'

defineProps<{
  item: IProduct
  onProductClick: () => void
  onAddClick: () => void
  onReduceClick: () => void
  count?: number
  onRemoveClick?: () => void
}>()

const { productIds } = storeToRefs(useShoppingCartStore())

const displayName = (name: string): string => {
  if (name.startsWith(PRODUCT_PREFIX)) {
    return name.slice(PRODUCT_PREFIX.length)
  }
  return name
}
</script>

<template>
  <div class="cart-product-item" @click="onProductClick">
    <div class="img-wrapper">
      <img v-bind:src="item.imageUrl" v-bind:alt="item.name" />
    </div>
    <div class="content">
      <div class="name">{{ displayName(item.name) }}</div>
      <div class="price">{{ item.price }} &#8381;</div>
      <div class="buttons">
        <CircleButtonView :text="'+'" :on-click="onAddClick" :disabled="false" />
        <CircleButtonView
          :text="'-'"
          :on-click="onReduceClick"
          :disabled="!productIds.includes(item.id)"
        />
      </div>
    </div>
    <div v-if="count" class="right">
      <div class="count">{{ count }}</div>
      <button type="button" class="delete-btn" @click="onRemoveClick">
        <IconDelete />
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-product-item {
  height: 200px;
  width: 100%;
  max-width: 700px;
  display: flex;
  gap: 16px;
  border: 2px solid #eeeeee;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 8px;
  transition: transform 0.2s ease;
  z-index: 10;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  .img-wrapper {
    height: 100%;

    img {
      height: 100%;
      width: auto;
      border-radius: 8px;
    }
  }

  .content {
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: start;

    .name {
      font-size: 22px;
      line-height: 1;
    }

    .price {
      font-size: 18px;
      line-height: 1;
      color: #0a75ad;
    }

    .buttons {
      display: flex;
      gap: 24px;
    }
  }

  .right {
    display: flex;
    gap: 16px;
    align-items: center;

    .count {
    }
  }
  .delete-btn {
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
