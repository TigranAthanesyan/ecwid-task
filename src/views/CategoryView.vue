<script setup lang="ts">
import CategoryDetailsView from '../components/CategoryDetailsView.vue'
import ProductsView from '../components/ProductsView.vue'
</script>

<template>
  <div class="category">
    <CategoryDetailsView />
    <ProductsView />
  </div>
</template>

<style scoped>
.category {
  display: flex;
  height: 100%;
  flex: 1;
}
</style>
