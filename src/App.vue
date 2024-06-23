<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
:root {
  --primary-color: #133337;
  --secondary-color: #eeeeee;
  --secondary-disabled-color: #6c757d;
}
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
  color: var(--primary-color);
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
  box-sizing: border-box;
  font-family: sans-serif;
}
</style>
