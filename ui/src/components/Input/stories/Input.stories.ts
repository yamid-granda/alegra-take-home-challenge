import type { Meta, StoryObj } from '@storybook/vue3'
import Input from '../Input.vue'

const meta = {
  title: 'UI Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const name = 'default-input-example'
const label = 'Input label'

export const Default: Story = {
  args: {
    modelValue: '',
    name,
    label,
  },
}

export const InitialValue: Story = {
  args: {
    modelValue: 'initial value',
    name,
  },
}

export const WithLabel: Story = {
  args: {
    modelValue: '',
    name,
    label,
  },
}
