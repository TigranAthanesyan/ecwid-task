<script setup lang="ts">
defineProps<{
  text: string
  onClick: () => void
  disabled: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="circle-button"
    :disabled="disabled"
    @click="
      (e) => {
        e.stopPropagation()
        onClick()
      }
    "
  >
    {{ text }}
  </button>
</template>

<style scoped>
.circle-button {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: transform 0.2s ease;
  font-size: 24px !important;
  background-color: #f5f5f5 !important;
  color: #008000 !important;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: #008000 !important;
    transform: scale(0.8) !important;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;

    &:hover {
      transform: scale(1);
    }

    &:active {
      background-color: #f5f5f5 !important;
      transform: scale(1) !important;
    }
  }
}
</style>
