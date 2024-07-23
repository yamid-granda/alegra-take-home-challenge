<script setup lang="ts">
import { computed } from 'vue'
import type { IProgressBarProps } from './types'

const props = defineProps<IProgressBarProps>()

const max = 20

const progress = computed<number>(() => {
  const progress = (props.value / max) * 100
  return progress > 100 ? 100 : progress
})
</script>

<template>
  <div class="ss-progress-bar">
    <div class="ss-progress-bar__info">
      <span>{{ value }} puntos</span>
      <span>de {{ max }}</span>
    </div>

    <div class="ss-progress-bar__bar">
      <div
        class="ss-progress-bar__progress"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </div>
</template>

<style lang="scss">
.ss-progress-bar__bar {
  position: relative;
  width: 100%;
  border: $border-base;
  height: $s4;
  border-radius: $border-radius-base;
  overflow: hidden;
}

.ss-progress-bar__info {
  display: flex;
  justify-content: space-between;
  margin-bottom: $s1;
}

.ss-progress-bar__progress {
  transition: $transition-base;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0%;
  background-color: $c-primary;
}
</style>
