<script setup lang="ts">
import Card from '@ui/components/Card/Card.vue'
import Loader from '@ui/components/Loader/Loader.vue'
import { computed, ref } from 'vue'
import ProgressBar from '@ui/components/ProgressBar/ProgressBar.vue'
import type { ISellerGameBoardEvents, ISellerGameBoardProps } from './types'

// config
const props = withDefaults(defineProps<ISellerGameBoardProps>(), { points: 0 })
const emit = defineEmits<ISellerGameBoardEvents>()

// data
const hasImageError = ref(false)

// computed
const imageSrc = computed<string>(() => {
  if (!props.image)
    return ''

  if (hasImageError.value)
    return props.image.image.thumbnailLink

  return props.image.link
})

// events
function onImageError() {
  hasImageError.value = true
}

function onImageLoad() {
  emit('ready')
}
</script>

<template>
  <Card
    class="ss-seller-game-board"
    :class="{
      'ss-seller-game-board--visible': isImageVisible,
    }"
  >
    <div class="ss-seller-game-board__img-container">
      <Loader v-if="isLoading" />

      <img
        class="ss-seller-game-board__img"
        :src="imageSrc"
        :alt="image?.title"
        @load="onImageLoad"
        @error="onImageError"
      >
    </div>

    <div class="ss-seller-game-board__data">
      <div><b>Vendedor</b>: {{ seller.name }}</div>
      <ProgressBar :value="points" />
    </div>
  </Card>
</template>

<style lang="scss">
.ss-seller-game-board {
  display: flex;
  transition: $transition-base;
  cursor: pointer;
  user-select: none;

  &:hover {
    box-shadow: $box-shadow-base;
    border-color: $c-primary;
  }
}

.ss-seller-game-board__img-container {
  height: 100px;
  flex-basis: 100px;
  flex-shrink: 0;
  position: relative;
  border: $border-base;
  border-radius: $border-radius-base;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ss-seller-game-board__img {
  position: absolute;
  object-fit: cover;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: $border-radius-base;
  opacity: 0;
  transition: $transition-base;
}

.ss-seller-game-board__data {
  flex-grow: 1;
  padding-left: $input-gutter;
  display: flex;
  flex-direction: column;
  gap: $s2;
}

// modifiers
.ss-seller-game-board--visible {
  .ss-seller-game-board__img {
    opacity: 1;
  }
}

@include tablet {
  .ss-seller-game-board {
    flex-direction: column;
  }

  .ss-seller-game-board__img-container {
    flex-basis: 320px;
    flex-grow: 1;
  }

  .ss-seller-game-board__data {
    padding: $input-gutter 0 0;
  }
}
</style>
