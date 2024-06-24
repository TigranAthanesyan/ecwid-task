<script setup lang="ts">
defineProps<{
  text: string
  onClick: () => void
  type: 'circle' | 'primary' | 'secondary'
  disabled?: boolean
}>()
</script>

<template>
  <button
    class="button-view"
    :class="type"
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
.button-view {
  transition: transform 0.2s ease;
  transition: opacity 0.2s ease;
  transition: background-color 0.2s ease;

  &.circle {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    font-size: 24px;
    background-color: #f5f5f5;
    color: #008000;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      background-color: #008000;
      transform: scale(0.8);
    }

    &:disabled {
      &:active {
        background-color: #f5f5f5;
      }
    }
  }

  &.primary {
    width: fit-content;
    padding: 12px 16px;
    font-size: 20px;
    background-color: var(--primary-color);
    border-radius: 20px;
    color: #ffffff;

    &:hover {
      opacity: 0.8;
    }
  }

  &.secondary {
    width: fit-content;
    padding: 12px 16px;
    font-size: 20px;
    background-color: #ffffff;
    border: 2px solid var(--primary-color);
    border-radius: 20px;
    color: var(--primary-color);

    &:hover {
      opacity: 1;
      background-color: var(--secondary-color);
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;

    &:hover {
      transform: scale(1);
    }

    &:active {
      transform: scale(1);
    }
  }
}
</style>
