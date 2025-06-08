import RegistrationEmailConfirm from '@/components/auth/RegistrationEmailConfirm.vue'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/login', name: 'login', component: {} }]
})

describe('RegistrationEmailConfirm', () => {
  const createWrapper = (props = {}) => {
    return mount(RegistrationEmailConfirm, {
      global: {
        plugins: [router],
        mocks: {
          $router: router
        }
      },
      props: {
        email: 'test@test.com',
        ...props
      }
    })
  }

  it('отображает компонент подтверждения email', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('h2').text()).toBe(
      'Подтвердите адрес электронной почты'
    )
    expect(wrapper.find('.email').text()).toBe('test@test.com')
  })

  it('переходит на страницу логина при клике на кнопку', async () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = mount(RegistrationEmailConfirm, {
      global: {
        mocks: {
          $router: mockRouter
        }
      },
      props: {
        email: 'test@test.com'
      }
    })

    await wrapper.find('.back-button').trigger('click')
    expect(mockRouter.push).toHaveBeenCalledWith('/login')
  })
})
