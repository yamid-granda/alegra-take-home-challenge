<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IInputEvents, IInputProps } from './types'

const props = defineProps<IInputProps>()
const emit = defineEmits<IInputEvents>()

const text = ref<string>('')
const isFocused = ref<boolean>(false)

watch(() => props.modelValue, (newValue) => {
  text.value = newValue
}, { immediate: true })

function onInput() {
  emit('update:modelValue', text.value)
}

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) {
    event.preventDefault()
  }
}
</script>

<template>
  <div
    class="ss-input"
    :class="{
      'ss-input--focused': isFocused,
      'ss-input--disabled': props.disabled,
    }"
  >
    <label
      v-if="props.label"
      class="ss-input__label"
      :for="props.name"
    >
      {{ props.label }}
    </label>

    <input
      v-bind="$attrs"
      :id="props.name"
      v-model="text"
      class="ss-input__input"
      :name="props.name"
      :data-testid="props.name"
      @keydown="onKeydown"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    >
  </div>
</template>

<style lang="scss">
.ss-input {
  border-radius: $border-radius-base;
  position: relative;
}

.ss-input__label {
  display: inline-block;
  top: $s2;
  margin-bottom: $s2;
}

.ss-input__input {
  border: $border-base;
  width: 100%;
  height: $input-height;
  padding: $input-padding;
  background-color: $c-white;
  border-radius: $border-radius-base;
  color: $c-text;
  transition: $transition-base;
  outline: $s-double solid transparent;

  &:focus {
    outline: $border-accessible-outline;
    border-color: $c-primary;
  }

  &::placeholder {
    color: $c-text-light;
  }
}

// modifiers
.ss-input--disabled {
  user-select: none;
  opacity: $opacity-disabled;
  pointer-events: none;
}
</style>
