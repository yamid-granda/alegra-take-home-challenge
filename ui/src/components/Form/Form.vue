<script setup lang="ts">
import type { IFormEvents } from './types'

const emit = defineEmits<IFormEvents>()

function onSubmit() {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>
