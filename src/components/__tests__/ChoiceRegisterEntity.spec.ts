import ChoiceRegisterEntity from '@/components/auth/ChoiceRegisterEntity.vue'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/login', name: 'login', component: {} }]
})

describe('ChoiceRegisterEntity', () => {
  const createWrapper = () => {
    return mount(ChoiceRegisterEntity, {
      global: {
        plugins: [router]
      }
    })
  }

  it('отображает заголовок и кнопки выбора', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.choice-register-entity__title').text()).toBe(
      'Выберите тип регистрации'
    )
    expect(wrapper.findAll('.choice-register-entity__button')).toHaveLength(3)
  })

  it('эмитит событие selectedEntity при клике на кнопку автовладельца', async () => {
    const wrapper = createWrapper()
    await wrapper.findAll('.choice-register-entity__button')[0].trigger('click')
    expect(wrapper.emitted('selectedEntity')?.[0]).toEqual(['account'])
  })

  it('эмитит событие selectedEntity при клике на кнопку владельца сервиса', async () => {
    const wrapper = createWrapper()
    await wrapper.findAll('.choice-register-entity__button')[1].trigger('click')
    expect(wrapper.emitted('selectedEntity')?.[0]).toEqual(['service'])
  })

  it('эмитит событие selectedEntity при клике на кнопку сотрудника', async () => {
    const wrapper = createWrapper()
    await wrapper.findAll('.choice-register-entity__button')[2].trigger('click')
    expect(wrapper.emitted('selectedEntity')?.[0]).toEqual(['worker'])
  })

  it('отображает ссылку на страницу логина', () => {
    const wrapper = createWrapper()
    const loginLink = wrapper.find('.register-form__link')
    expect(loginLink.text()).toBe('Уже есть учетная запись? Войдите')
    expect(loginLink.attributes('to')).toBe('/login')
  })
})
