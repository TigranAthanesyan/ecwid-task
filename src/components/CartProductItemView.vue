<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'
import { getProductName } from '@/services/utils'
import type { IProduct } from '@/interfaces/product-interfaces'
import ButtonView from '@/components/ButtonView.vue'
import IconShoppingCartSmall from '@/icons/IconShoppingCartSmall.vue'
import IconDelete from '@/icons/IconDelete.vue'

const props = defineProps<{
  item: IProduct
  onProductClick: () => void
  onAddClick: () => void
  onReduceClick: () => void
  onRemoveClick: () => void
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
  <div class="product-item" @click="onProductClick">
    <div class="img-wrapper">
      <img v-bind:src="item.imageUrl" v-bind:alt="item.name" />
    </div>

    <div class="content">
      <div class="name">{{ getProductName(item.name) }}</div>

      <div class="price">{{ item.price }} &#8381;</div>

      <div class="cart">
        <IconShoppingCartSmall />
        <div v-if="count > 0">{{ count }}x - {{ item.price * count }} &#8381;</div>
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

    <div class="right">
      <button
        class="delete-btn"
        @click="
          (e) => {
            e.stopPropagation()
            onRemoveClick()
          }
        "
      >
        <IconDelete />
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-item {
  height: 200px;
  width: 560px;
  display: flex;
  gap: 16px;
  border: 2px solid var(--secondary-color);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
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

  .right {
    margin-left: auto;

    .delete-btn {
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
