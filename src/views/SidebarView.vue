<script setup lang="ts">
import CartView from '@/components/CartView.vue'
import CategoriesView from '@/components/CategoriesView.vue'
import HomeIconView from '@/components/HomeIconView.vue'
</script>

<template>
  <div class="sidebar">
    <div class="top">
      <div class="home-wrapper"><HomeIconView /></div>
      <div class="categories-wrapper"><CategoriesView /></div>
    </div>
    <div class="cart-wrapper"><CartView /></div>
  </div>
</template>

<style scoped>
.sidebar {
  background-color: #133337;
  width: 260px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;

  .top {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  .home-wrapper {
    /* padding: 32px; */
  }

  .categories-wrapper {
    /* padding: 32px; */
  }

  .cart-wrapper {
    width: 100%;
    padding: 32px;
  }
}
</style>
