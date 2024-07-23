<template>
  <div class="ss-card">
    <slot />
  </div>
</template>

<style lang="scss">
.ss-card {
  border-radius: $border-radius-base;
  padding: $input-gutter;
  background-color: $c-white;
  border: $border-base;
}

@include tablet {
  .ss-card {
    padding: $s8;
  }
}
</style>
