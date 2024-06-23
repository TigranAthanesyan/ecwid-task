<script setup lang="ts">
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/globalStore'
import CartView from '@/components/CartView.vue'
import IconBack from '@/icons/IconBack.vue'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
import type { EventHandlersService } from '@/services/event-handlers.service'

const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService
const { title, backEnabled, showCart } = storeToRefs(useGlobalStore())
</script>

<template>
  <div class="navbar">
    <div class="start">
      <button
        class="back-button"
        @click="eventHandlers.onGoBack"
        :disabled="!backEnabled"
      >
        <IconBack />
      </button>
      <div>{{ title }}</div>
    </div>

    <CartView v-show="showCart" />
  </div>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  width: 100%;
  height: 74px;
  flex-shrink: 0;
  padding: 0 32px 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);

  .start {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 28px;
    font-weight: bold;

    .back-button {
      &:hover {
        transform: scale(1.1);
      }

      &:disabled {
        opacity: 0.5;
        cursor: auto;

        &:hover {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
