<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import CartProductItemView from '@/components/CartProductItemView.vue'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
import type { EventHandlersService } from '@/services/event-handlers.service'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'
import { getProductsWithCorrectEnding } from '@/services/utils'
import IconShoppingCart from '@/icons/IconShoppingCart.vue'

const { products, totalCount, totalPrice } = storeToRefs(useShoppingCartStore())
const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService

const isModalOpen = ref<boolean>(false)
const transactionState = ref<'initial' | 'in-progress' | 'done'>('initial')

onMounted(() => eventHandlers.onCartMount())

onUnmounted(() => eventHandlers.onCartUnmount())

const doTransaction = (): void => {
  transactionState.value = 'in-progress'
  setTimeout(() => {
    transactionState.value = 'done'
  }, 1000)
}
</script>

<template>
  <div class="shopping-cart">
    <div class="products-container">
      <CartProductItemView
        v-for="p of products"
        :key="p.product.id"
        :item="p.product"
        :count="p.count"
        :on-product-click="() => eventHandlers.onProductClick(p.product.id)"
        :on-add-click="() => eventHandlers.onAddProduct(p.product)"
        :on-reduce-click="() => eventHandlers.onReduceProduct(p.product.id)"
        :on-remove-click="() => eventHandlers.onRemoveProduct(p.product.id)"
      />
    </div>

    <div class="order-details">
      <IconShoppingCart />

      <div v-if="totalCount > 0">
        <div>В корзине {{ totalCount }} {{ getProductsWithCorrectEnding(totalCount) }}</div>
        <div>Общая сумма: {{ totalPrice }} &#8381;</div>
      </div>

      <div v-else>Ваша корзина пуста</div>

      <button v-if="totalCount > 0" class="order-button" @click="() => (isModalOpen = true)">
        Заказать
      </button>
    </div>

    <div v-show="isModalOpen" class="modal-overlay">
      <div class="modal-container">
        <div v-if="transactionState === 'initial'" class="modal-content">
          <div>
            Вы уверены, что хотите заказать {{ totalCount }}
            {{ getProductsWithCorrectEnding(totalCount) }} за {{ totalPrice }} рублей?
          </div>

          <div class="buttons">
            <button @click="doTransaction">Да</button>
            <button @click="() => (isModalOpen = false)">Нет</button>
          </div>
        </div>

        <div v-if="transactionState === 'in-progress'" class="loader" />

        <div v-if="transactionState === 'done'" class="modal-content">
          <div>Ваш заказ выполнен успешно!</div>
          <button @click="eventHandlers.onTransactionComplete">Хорошо</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.shopping-cart {
  width: 100%;
  display: flex;
  overflow: auto;
  gap: 16px;

  .products-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: auto;
    padding: 16px;
    box-sizing: border-box;
  }

  .order-details {
    position: fixed;
    top: 120px;
    right: 48px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: left;
    border: 2px solid var(--primary-color);
    border-radius: 16px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    padding: 40px;
    height: fit-content;
    margin-left: auto;
    margin-right: auto;

    div {
      font-size: 20px;
      font-weight: 500;
      line-height: 40px;
    }

    .order-button {
      margin-top: 30px;
      width: fit-content;
      padding: 12px 16px;
      font-size: 20px;
      background-color: var(--primary-color);
      border-radius: 16px;
      color: #ffffff;

      &:hover {
        transform: scale(1.05);
      }
    }
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
      line-height: 32px;

      button {
        &:hover {
          transform: scale(1.1);
        }
      }

      .buttons {
        display: flex;
        gap: 32px;

        button {
          &:hover {
            transform: scale(1.1);
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
