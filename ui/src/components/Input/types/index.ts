import type { InputHTMLAttributes } from 'vue'

export interface IInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  modelValue: string
  name: string
  label?: string
  disabled?: boolean
}

export type IInputEvents = (e: 'update:modelValue', value: string) => () => void
