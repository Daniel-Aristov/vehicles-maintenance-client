import ChangeOwnerModal from '@/components/vehicles/ChangeOwnerModal.vue'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'

describe('ChangeOwnerModal', () => {
  const createWrapper = (props = {}) => {
    return mount(ChangeOwnerModal, {
      props: {
        isOpen: true,
        ...props
      },
      global: {
        stubs: {
          CloseIcon: true
        }
      }
    })
  }

  it('не отображает модальное окно если isOpen = false', () => {
    const wrapper = createWrapper({ isOpen: false })
    expect(wrapper.find('.modal').exists()).toBe(false)
  })

  it('отображает модальное окно если isOpen = true', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.modal').exists()).toBe(true)
    expect(wrapper.find('.modal-title').text()).toBe('Передать автомобиль')
  })

  it('закрывает модальное окно при клике на крестик', async () => {
    const wrapper = createWrapper()
    await wrapper.find('.modal-close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('эмитит событие submit с email и закрывает модальное окно', async () => {
    const wrapper = createWrapper()
    const email = 'test@test.com'

    await wrapper.find('input[type="email"]').setValue(email)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')?.[0]).toEqual([{ email }])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('очищает форму после отправки', async () => {
    const wrapper = createWrapper()
    const email = 'test@test.com'

    await wrapper.find('input[type="email"]').setValue(email)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.vm.form.email).toBe('')
  })

  it('требует заполнения email', async () => {
    const wrapper = createWrapper()
    const emailInput = wrapper.find('input[type="email"]')
    expect(emailInput.attributes('required')).toBeDefined()
  })
})
