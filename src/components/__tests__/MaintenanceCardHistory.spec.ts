import MaintenanceCardHistory from '@/components/maintenance/MaintenanceCardHistory.vue'
import { describe, expect, it } from '@jest/globals'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/services/:id', name: 'service-detail', component: {} }]
})

describe('MaintenanceCardHistory', () => {
  const mockService = {
    id: 1,
    name: 'Тестовый сервис',
    address: 'ул. Тестовая, 1'
  }

  const createWrapper = (props = {}, initialState = {}) => {
    return mount(MaintenanceCardHistory, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            initialState: {
              services: {
                services: [mockService]
              },
              ...initialState
            }
          }),
          router
        ],
        stubs: {
          PersonIcon: true,
          DateIcon: true,
          ServiceIcon: true,
          AdressIcon: true
        }
      },
      props: {
        maintenanceRecord: {
          id: 1,
          title: 'Тестовое ТО',
          date: '2024-03-20',
          maintenance_performer: 'owner',
          service_id: null,
          ...props.maintenanceRecord
        },
        ...props
      }
    })
  }

  it('отображает основную информацию о записи', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.maintenance-card-history__title').text()).toBe(
      'Тестовое ТО'
    )
    expect(wrapper.find('.maintenance-card-history__date').text()).toContain(
      '20.03.2024'
    )
  })

  it('отображает информацию о личном обслуживании', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Запись о личном техническом обслуживании')
  })

  it('отображает информацию о незарегистрированном сервисе', () => {
    const wrapper = createWrapper({
      maintenanceRecord: {
        maintenance_performer: 'unregistered_service'
      }
    })
    expect(wrapper.text()).toContain(
      'Запись об обслуживании в незарегистрированном сервисе'
    )
  })

  it('отображает информацию о зарегистрированном сервисе', () => {
    const wrapper = createWrapper({
      maintenanceRecord: {
        maintenance_performer: 'registered_service',
        service_id: 1
      }
    })
    expect(wrapper.text()).toContain('Сервис: Тестовый сервис')
    expect(wrapper.text()).toContain('Адрес: ул. Тестовая, 1')
  })

  it('эмитит событие click с данными записи', async () => {
    const wrapper = createWrapper()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')?.[0]).toEqual([
      wrapper.vm.maintenanceRecord
    ])
  })

  it('показывает кнопку генерации накладной только для зарегистрированного сервиса', () => {
    const wrapper = createWrapper({
      maintenanceRecord: {
        maintenance_performer: 'registered_service',
        service_id: 1
      }
    })
    router.currentRoute.value.params.id = '1'
    expect(
      wrapper.find('.maintenance-card-details__generate-button').exists()
    ).toBe(true)
  })

  it('не показывает кнопку генерации накладной для других типов обслуживания', () => {
    const wrapper = createWrapper()
    expect(
      wrapper.find('.maintenance-card-details__generate-button').exists()
    ).toBe(false)
  })

  it('вызывает генерацию накладной при клике на кнопку', async () => {
    const wrapper = createWrapper({
      maintenanceRecord: {
        maintenance_performer: 'registered_service',
        service_id: 1
      }
    })
    router.currentRoute.value.params.id = '1'

    const button = wrapper.find('.maintenance-card-details__generate-button')
    await button.trigger('click')

    const maintenanceStore = wrapper.vm.maintenanceStore
    expect(maintenanceStore.getMaintenancePurchaseOrders).toHaveBeenCalledWith(
      1
    )
  })
})
