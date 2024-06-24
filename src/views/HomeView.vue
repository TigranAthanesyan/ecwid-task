<script setup lang="ts">
import { inject, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useProductStore } from '@/stores/productStore'
import { EVENT_HANDLERS_SERVICE_KEY } from '@/constants/global-constants'
import type { EventHandlersService } from '@/services/event-handlers.service'
import ProductItemView from '@/components/ProductItemView.vue'
import 'vue3-carousel/dist/carousel.css'

const { allProducts } = storeToRefs(useProductStore())
const eventHandlers = inject(EVENT_HANDLERS_SERVICE_KEY) as EventHandlersService
onMounted(() => eventHandlers.onHomeMount())
</script>

<template>
  <div class="home">
    <Carousel :items-to-show="3.1" :wrap-around="true">
      <Slide v-for="product in allProducts" :key="product.id">
        <ProductItemView
          :key="product.id"
          :item="product"
          :on-product-click="() => eventHandlers.onProductClick(product.id)"
          :on-add-click="() => eventHandlers.onAddProduct(product)"
          :on-reduce-click="() => eventHandlers.onReduceProduct(product.id)"
          :style="'large'"
        />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 48px 64px 48px;

  .carousel {
    height: 90%;

    .carousel__viewport {
      height: 100%;

      .carousel__track {
        height: 100%;
      }
    }

    .carousel__prev,
    .carousel__next {
      svg {
        color: var(--primary-color);
      }
    }

    .carousel__pagination-button {
      &::after {
        background-color: var(--primary-color);
        opacity: 0.8;
      }
    }

    .carousel__pagination-button--active {
      &::after {
        background-color: var(--secondary-color);
      }
    }
  }
}
</style>
