<script setup lang="ts">
import HomeIconView from '@/components/HomeIconView.vue'
import CategoriesView from '@/components/CategoriesView.vue'
</script>

<template>
  <div class="sidebar">
      <div class="home-wrapper"><HomeIconView /></div>
      <CategoriesView />
  </div>
</template>

<style scoped>
.sidebar {
  background-color: var(--primary-color);
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  flex-shrink: 0;
  padding: 0 32px;
  box-sizing: border-box;

  .top {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  .home-wrapper {
    height: 74px;
    display: flex;
    align-items: center;
  }
}
</style>
