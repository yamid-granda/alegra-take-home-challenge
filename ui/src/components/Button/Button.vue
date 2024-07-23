<template>
  <button class="ss-button">
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

  &:hover {
    background-color: $c-primary-hover;
  }
}
</style>
