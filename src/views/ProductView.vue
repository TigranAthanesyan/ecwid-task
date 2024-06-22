<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'
import type { EventHandlersService } from '@/services/event-handlers.service'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
import { getProductName } from '@/services/utils'
import type { IProduct } from '@/interfaces/product-interfaces'
import CircleButtonView from '@/components/CircleButtonView.vue'
import IconShoppingCartSmall from '@/icons/IconShoppingCartSmall.vue'

const { product } = storeToRefs(useProductStore())
const { productIds } = storeToRefs(useShoppingCartStore())
const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService
eventHandlers.onProductIdRouteChange(Number(useRoute().params?.productId))

const count = ref<number>(
  productIds.value.filter((id) => id === (product.value as IProduct)?.id).length
)

watch(
  () => productIds,
  (ids) => {
    count.value = ids.value.filter((id) => id === (product.value as IProduct)?.id).length
  },
  { deep: true }
)
</script>

<template>
  <div class="product-container">
    <div v-if="product" class="product">
      <div class="img-wrapper">
        <img v-bind:src="product.imageUrl" v-bind:alt="product.name" />
      </div>
      <div class="content">
        <div class="name">{{ getProductName(product.name) }}</div>

        <div class="price">{{ product.defaultDisplayedPriceFormatted }}</div>

        <div v-html="product.description" />

        <div class="cart">
          <IconShoppingCartSmall />
          <div v-if="count > 0">{{ count }}x - {{ product.price * count }} &#8381;</div>
        </div>

        <div class="buttons">
          <CircleButtonView
            :text="'+'"
            :on-click="() => eventHandlers.onAddProduct(product as IProduct)"
            :disabled="false"
          />
          <CircleButtonView
            :text="'-'"
            :on-click="() => eventHandlers.onReduceProduct(product?.id as number)"
            :disabled="!productIds.includes(product.id)"
          />
        </div>
        <button type="button" class="back-button" @click="eventHandlers.onGoBack">Назад</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 16px;
  box-sizing: border-box;
}
.product {
  padding: 16px 24px 16px 16px;
  height: 100%;
  width: 100%;
  display: flex;
  gap: 16px;

  border: 2px solid #eeeeee;
  border-radius: 8px;
  box-sizing: border-box;

  .img-wrapper {
    width: 400px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }

  .content {
    /* margin-top: auto; */
    /* margin-bottom: auto; */
    display: flex;
    flex-direction: column;
    gap: 16px;

    .cart {
      display: flex;
      align-items: center;
      gap: 8px;

      div {
        /* color: #008000; */
      }
    }

    .buttons {
      display: flex;
      gap: 24px;
    }

    .back-button {
      width: fit-content;
      padding: 8px;
    }
  }

  .right {
    display: flex;
    gap: 16px;
    align-items: center;

    .count {
    }
  }
}
</style>
