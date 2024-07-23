import { afterAll, describe, expect, it } from 'vitest'
import type { Component, ComponentPublicInstance } from 'vue'
import { ref } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { cleanup, render, screen } from '@testing-library/vue'
import Input from '../Input.vue'
import type { IInputProps } from '../types'

type ITestWrapper<T> = VueWrapper<ComponentPublicInstance & T>

type IInputImplementation = ITestWrapper<Partial<{
  updateInputText: () => void
  value: string
}>>

const label = 'test label'
const name = 'test-name'
const textUpdated = 'input text updated'

const props: IInputProps = {
  modelValue: '',
  name,
  label,
}

const InputImplementation: Component = {
  template: `
    <template>
      <Input
        v-model="value"
        name="${name}"
        label="${label}"
      />
    </template>
  `,
  components: { Input },
  setup() {
    const value = ref('initial')

    function updateInputText() {
      value.value = textUpdated
    }

    return { value, updateInputText }
  },
}

afterAll(() => {
  cleanup()
})

describe('<Input> component', () => {
  describe('two way data binding', () => {
    it.concurrent('v-model from child to parent ', async () => {
      // GIVEN
      const wrapper: IInputImplementation = mount(InputImplementation)
      const input = wrapper.find('input')
      const newText = 'new text'

      // WHEN
      await input.setValue(newText)

      // THEN
      expect(wrapper.vm.value).toBe(newText)
    })

    it.concurrent('v-model from parent to child', async () => {
      // GIVEN
      const wrapper: IInputImplementation = mount(InputImplementation)
      const input = wrapper.find('input')

      // WHEN
      wrapper.vm.updateInputText?.()
      await wrapper.vm.$nextTick()

      // THEN
      expect(input.element.value).toBe(textUpdated)
    })
  })

  describe('started value', () => {
    it('empty', async () => {
      // GIVEN
      render(Input, { props })
      const input: HTMLInputElement = screen.getByLabelText(label)

      // THEN
      expect(input.value).toBe('')
    })

    it('initial text', async () => {
      // GIVEN
      const initialText = 'initial text'

      render(Input, {
        props: {
          ...props,
          modelValue: initialText,
        },
      })

      const input: HTMLInputElement = screen.getByLabelText(label)

      // THEN
      expect(input.value).toBe(initialText)
    })
  })

  it('allows input attributes', async () => {
    // GIVEN
    render(Input, {
      props: {
        ...props,
        type: 'password',
      },
    })

    const input = screen.getByLabelText(label)

    // THEN
    expect(input).toHaveAttribute('type', 'password')
  })
})
