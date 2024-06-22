<script setup lang="ts">
import { inject, ref } from 'vue'
import { storeToRefs } from 'pinia'
import ProductItemView from '@/components/ProductItemView.vue'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
import type { EventHandlersService } from '@/services/event-handlers.service'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'

const { products, totalCount, totalPrice } = storeToRefs(useShoppingCartStore())
const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService

const isModalOpen = ref<boolean>(false)
const transactionState = ref<'initial' | 'in-progress' | 'done'>('initial')

const productsWithCorrectEnding = (count: number): string => {
  if (count === 1) {
    return 'продукт'
  }
  if (count === 2 || count === 3 || count === 4) {
    return 'продукта'
  }
  return 'продуктов'
}

const doTransaction = (): void => {
  transactionState.value = 'in-progress'
  setTimeout(() => {
    transactionState.value = 'done'
  }, 1000)
}
</script>

<template>
  <div class="shopping-cart">
    <ProductItemView
      v-for="p of products"
      :key="p.product.id"
      :item="p.product"
      :count="p.count"
      :on-product-click="() => eventHandlers.onProductClick(p.product.id)"
      :on-add-click="() => eventHandlers.onAddProduct(p.product)"
      :on-reduce-click="() => eventHandlers.onReduceProduct(p.product.id)"
      :on-remove-click="() => eventHandlers.onRemoveProduct(p.product.id)"
    />

    <button
      v-if="totalCount > 0"
      type="button"
      class="order-button"
      @click="() => (isModalOpen = true)"
    >
      Заказать
    </button>

    <div v-show="isModalOpen" class="modal-overlay">
      <div class="modal-container">
        <div v-if="transactionState === 'initial'" class="modal-content">
          <div>
            Вы уверены, что хотите заказать {{ totalCount }}
            {{ productsWithCorrectEnding(totalCount) }} за {{ totalPrice }} рублей?
          </div>
          <div class="buttons">
            <button class="cta" @click="doTransaction">Да</button>
            <button class="cta" @click="() => (isModalOpen = false)">Нет</button>
          </div>
        </div>

        <div v-if="transactionState === 'in-progress'" class="loader" />

        <div v-if="transactionState === 'done'" class="modal-content">
          <div>Ваш заказ выполнен успешно!</div>
          <button class="cta" @click="eventHandlers.onTransactionComplete">Хорошо</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.shopping-cart {
  display: flex;
  width: 100%;
  overflow: auto;
  flex-direction: column;
  gap: 10px;
  padding: 16px;

  .order-button {
    position: fixed;
    top: 32px;
    right: 32px;
    padding: 14px;
    font-size: 20px;
    background-color: #008000;
    /* border: 1px solid #008000; */
    border-radius: 16px;
    color: #eeeeee;

    &:hover {
      transform: scale(1.05);
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .modal-container {
      background: #ffffff;
      margin: 0;
      width: 300px;
      height: 200px;
      padding: 32px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .modal-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: space-between;
        font-size: 22px;
        line-height: 30px;

        .buttons {
          display: flex;
          gap: 32px;

          .cta {
          }
        }
      }
    }
  }
}
.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
