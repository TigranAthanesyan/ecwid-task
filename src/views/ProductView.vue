<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'
import type { EventHandlersService } from '@/services/event-handlers.service'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
import { getProductName } from '@/services/utils'
import type { IProduct } from '@/interfaces/product-interfaces'
import ButtonView from '@/components/ButtonView.vue'
import IconShoppingCartSmall from '@/icons/IconShoppingCartSmall.vue'

const { product } = storeToRefs(useProductStore())
const { productIds } = storeToRefs(useShoppingCartStore())

const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService

const productIdFromRoute = Number(useRoute().params?.productId)
if (productIdFromRoute) {
  eventHandlers.onProductIdRouteChange(productIdFromRoute)
}

const count = ref<number>(
  productIds.value.filter((id) => id === (product.value as IProduct)?.id).length
)

onMounted(() => {
  if (product.value) {
    eventHandlers.onProductMount(product.value)
  } else {
    watch(
      () => product.value,
      (p) => eventHandlers.onProductMount(p as IProduct)
    )
  }
})

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
          <ButtonView
            type="circle"
            text="+"
            :on-click="() => eventHandlers.onAddProduct(product as IProduct)"
          />

          <ButtonView
            type="circle"
            text="-"
            :on-click="() => eventHandlers.onReduceProduct(product?.id as number)"
            :disabled="!productIds.includes(product.id)"
          />
        </div>
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
  border: 2px solid var(--secondary-color);
  border-radius: 8px;
  box-sizing: border-box;

  .img-wrapper {
    height: 100%;
    flex-shrink: 0;
    box-sizing: border-box;

    img {
      height: 100%;
      width: auto;
      border-radius: 8px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: fit-content;
    padding-right: 16px;

    .name {
      font-size: 22px;
    }

    .price {
      font-size: 20px;
      font-weight: 700;
    }

    .cart {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .buttons {
      margin-top: 8px;
      display: flex;
      gap: 32px;
    }
  }
}
</style>
