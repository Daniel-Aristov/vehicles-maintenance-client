import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'
import LoginForm from '@/components/auth/LoginForm.vue'
import CustomInput from '@/components/ui/CustomInput.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/register', name: 'register', component: {} }]
})

describe('LoginForm', () => {
  const createWrapper = (props = {}) => {
    return mount(LoginForm, {
      global: {
        plugins: [router],
        stubs: {
          CustomInput: true,
          EyeIcon: true
        }
      },
      props
    })
  }

  it('отображает форму авторизации', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.login-form__title').text()).toBe('Авторизация')
    expect(wrapper.findAll('custominput-stub')).toHaveLength(2)
    expect(wrapper.find('.login-form__button').text()).toBe('Войти')
  })

  it('отображает ошибку если она передана', () => {
    const error = 'Тестовая ошибка'
    const wrapper = createWrapper({ error })
    expect(wrapper.find('.form-error').text()).toBe(error)
  })

  it('кнопка отправки формы заблокирована если поля пустые', async () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.login-form__button').attributes('disabled')).toBeDefined()
  })

  it('эмитит событие submit с данными формы', async () => {
    const wrapper = createWrapper()
    await wrapper.setData({
      email: 'test@test.com',
      password: 'password123'
    })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')?.[0][0]).toEqual({
      email: 'test@test.com',
      password: 'password123'
    })
  })

  it('переключает видимость пароля', async () => {
    const wrapper = createWrapper()
    expect(wrapper.vm.passwordVisible).toBe(false)

    await wrapper.find('eyeicon-stub').trigger('click')
    expect(wrapper.vm.passwordVisible).toBe(true)

    await wrapper.find('eyeicon-stub').trigger('click')
    expect(wrapper.vm.passwordVisible).toBe(false)
  })
})
