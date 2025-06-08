import ServiceCard from '@/components/services/ServiceCard.vue'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/services/:id', name: 'service-detail', component: {} }]
})

describe('ServiceCard', () => {
  const mockService = {
    id: 1,
    name: 'Тестовый сервис',
    timetable: '9:00 - 18:00',
    summary: 'Описание сервиса',
    address: 'ул. Тестовая, 1',
    website: 'test.com'
  }

  const createWrapper = (props = {}) => {
    return mount(ServiceCard, {
      global: {
        plugins: [router],
        stubs: {
          TimeIcon: true,
          AdressIcon: true,
          InternetIcon: true
        }
      },
      props: {
        service: mockService,
        ...props
      }
    })
  }

  it('отображает информацию о сервисе', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.service-card__title').text()).toBe(mockService.name)
    expect(wrapper.find('.service-card__timetable').text()).toBe(
      mockService.timetable
    )
    expect(wrapper.find('.service-card__summary').text()).toBe(
      mockService.summary
    )
    expect(wrapper.findAll('.service-card__text')[0].text()).toBe(
      mockService.address
    )
    expect(wrapper.findAll('.service-card__text')[1].text()).toBe(
      mockService.website
    )
  })

  it('переходит на страницу сервиса при клике', async () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = mount(ServiceCard, {
      global: {
        mocks: {
          $router: mockRouter
        },
        stubs: {
          TimeIcon: true,
          AdressIcon: true,
          InternetIcon: true
        }
      },
      props: {
        service: mockService
      }
    })

    await wrapper.find('.service-card').trigger('click')
    expect(mockRouter.push).toHaveBeenCalledWith(`/services/${mockService.id}`)
  })
})
