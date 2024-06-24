<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { IProduct } from '@/interfaces/product-interfaces'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'
import ButtonView from '@/components/ButtonView.vue'
import IconShoppingCartSmall from '@/icons/IconShoppingCartSmall.vue'
import { getProductName } from '@/services/utils'

const props = defineProps<{
  item: IProduct
  onProductClick: () => void
  onAddClick: () => void
  onReduceClick: () => void
  style?: string
}>()

const { productIds } = storeToRefs(useShoppingCartStore())

const count = ref<number>(productIds.value.filter((id) => id === props.item.id).length)

watch(
  () => productIds,
  (ids) => {
    count.value = ids.value.filter((id) => id === props.item.id).length
  },
  { deep: true }
)
</script>

<template>
  <div class="product-item" :class="style" @click="onProductClick">
    <div class="img-wrapper">
      <img v-bind:src="item.imageUrl" v-bind:alt="item.name" />
    </div>

    <div class="name">{{ getProductName(item.name) }}</div>

    <div class="price">{{ item.price }} &#8381;</div>

    <div class="cart">
      <IconShoppingCartSmall />
      <div v-if="count > 0">{{ count }}</div>
    </div>

    <div class="buttons">
      <ButtonView
        type="circle"
        text="+"
        :on-click="onAddClick"
      />

      <ButtonView
        type="circle"
        text="-"
        :on-click="onReduceClick"
        :disabled="!productIds.includes(item.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.product-item {
  height: fit-content;
  width: 200px;
  flex-shrink: 0;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  border: 2px solid var(--secondary-color);
  border-radius: 8px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 8px;
  transition: transform 0.2s ease;
  z-index: 10;
  cursor: pointer;

  &.large {
    width: 300px;
    padding: 18px;
    gap: 18px;
  }

  &:hover {
    transform: scale(1.02);
  }

  .img-wrapper {
    width: 100%;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }

  .name {
    font-size: 22px;
    font-weight: 500;
    line-height: 1;

    span {
      color: #0000ff;
    }
  }

  .price {
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
  }

  .cart {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .buttons {
    display: flex;
    gap: 24px;
  }
}
</style>
