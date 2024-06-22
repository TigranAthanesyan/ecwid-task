<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
body {
  height: 100vh;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
div {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  color: #133337;
}
button {
  margin: 0;
  padding: 0;
  background: none;
  overflow: visible;
  color: inherit;
  font: inherit;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease;
}
#app {
  height: 100%;
}
.app {
  display: flex;
  width: 100%;
  height: 100%;
  /* padding: 16px; */
  box-sizing: border-box;
  font-family: sans-serif;
}

:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-color: #f8f9fa;
  --dark-color: #343a40;

  --primary-bg-color: #007bff;
  --secondary-bg-color: #6c757d;
  --success-bg-color: #28a745;
  --danger-bg-color: #dc3545;
  --warning-bg-color: #ffc107;
  --info-bg-color: #17a2b8;
  --light-bg-color: #f8f9fa;
  --dark-bg-color: #343a40;

  --text-primary-color: #ffffff;
  --text-secondary-color: #212529;
}
</style>
