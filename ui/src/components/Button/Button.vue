<script setup lang="ts">
import type { IButtonProps } from './types'

defineProps<IButtonProps>()
</script>

<template>
  <button
    class="ss-button"
    :class="{
      'ss-button--disabled': disabled,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.ss-button {
  background-color: $c-primary;
  min-height: $input-height;
  color: $c-white;
  border: none;
  padding: $s2 $s4;
  border-radius: $border-radius-base;
  cursor: pointer;
  transition: $transition-base;
  flex-shrink: 0;

  &:hover {
    background-color: $c-primary-hover;
  }
}

// modifiers
.ss-button--disabled {
  opacity: $opacity-disabled;
  pointer-events: none;
}
</style>
