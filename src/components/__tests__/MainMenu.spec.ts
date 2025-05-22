import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import MainMenu from '@/components/MainMenu.vue'
import { describe, expect, it, jest } from '@jest/globals'

describe('MainMenu', () => {
  const mockRouter = {
    push: jest.fn()
  }

  const createWrapper = (userData = {}) => {
    return mount(MainMenu, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            initialState: {
              user: { user: userData }
            }
          })
        ],
        mocks: {
          $router: mockRouter
        }
      }
    })
  }

  it('отображает имя пользователя', () => {
    const wrapper = createWrapper({
      first_name: 'Иван',
      last_name: 'Иванов'
    })

    expect(wrapper.text()).toContain('Иван Иванов')
  })

  it('переходит на страницу профиля при клике на профиль', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.sidebar__profile').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'profile' })
  })

  it('переходит на страницу гаража при клике на кнопку гаража', async () => {
    const wrapper = createWrapper()

    await wrapper.findAll('.sidebar__menu-item')[0].trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'garage' })
  })

  it('переходит на страницу сервисов при клике на кнопку сервисов', async () => {
    const wrapper = createWrapper()

    await wrapper.findAll('.sidebar__menu-item')[1].trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'services' })
  })
})
