import MaintenanceHistory from '@/components/maintenance/MaintenanceHistory.vue'
import { useMaintenanceStore } from '@/store/maintenace.store'
import { describe, expect, it } from '@jest/globals'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/services/:id', name: 'service-detail', component: {} }]
})

describe('MaintenanceHistory', () => {
  const mockMaintenanceRecord = {
    id: 1,
    date: '2024-03-20',
    mileage: 50000,
    description: 'Тестовое ТО',
    cost: 5000,
    service: {
      id: 1,
      name: 'Тестовый сервис'
    }
  }

  const createWrapper = (props = {}, initialState = {}) => {
    return mount(MaintenanceHistory, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            initialState
          }),
          router
        ],
        stubs: {
          PlusIcon: true,
          MaintenanceCardHistory: true,
          CreateMaintenanceFormDriver: true,
          CreateMaintenanceFormWorker: true,
          MaintenanceCardDetails: true
        }
      },
      props: {
        vehicleId: 1,
        isServiceContext: false,
        ...props
      }
    })
  }

  it('отображает заголовок и кнопку добавления', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('История технического обслуживания')
    expect(wrapper.find('.maintenance-history__button').exists()).toBe(true)
  })

  it('отображает сообщение если нет записей', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.maintenance-history__empty').text()).toBe(
      'Записей технического обслуживания нет!'
    )
  })

  it('отображает список записей если они есть', () => {
    const wrapper = createWrapper(
      {},
      {
        maintenance: {
          maintenanceRecords: [mockMaintenanceRecord]
        }
      }
    )
    expect(
      wrapper.findComponent({ name: 'MaintenanceCardHistory' }).exists()
    ).toBe(true)
  })

  it('показывает форму создания для сервиса при нажатии на кнопку', async () => {
    const wrapper = createWrapper({ isServiceContext: true })
    await wrapper.find('.maintenance-history__button').trigger('click')
    expect(
      wrapper.findComponent({ name: 'CreateMaintenanceFormWorker' }).exists()
    ).toBe(true)
  })

  it('показывает форму создания для водителя при нажатии на кнопку', async () => {
    const wrapper = createWrapper({ isServiceContext: false })
    await wrapper.find('.maintenance-history__button').trigger('click')
    expect(
      wrapper.findComponent({ name: 'CreateMaintenanceFormDriver' }).exists()
    ).toBe(true)
  })

  it('загружает записи при монтировании', () => {
    const wrapper = createWrapper()
    const maintenanceStore = useMaintenanceStore()
    expect(maintenanceStore.getMaintenanceRecords).toHaveBeenCalledWith(1)
  })

  it('показывает детали записи при клике на карточку', async () => {
    const wrapper = createWrapper(
      {},
      {
        maintenance: {
          maintenanceRecords: [mockMaintenanceRecord]
        }
      }
    )

    await wrapper
      .findComponent({ name: 'MaintenanceCardHistory' })
      .vm.$emit('click', mockMaintenanceRecord)
    expect(
      wrapper.findComponent({ name: 'MaintenanceCardDetails' }).exists()
    ).toBe(true)
    expect(wrapper.emitted('update:selectedRecord')?.[0]).toEqual([
      mockMaintenanceRecord
    ])
  })

  it('скрывает детали при закрытии', async () => {
    const wrapper = createWrapper()
    await wrapper.setData({ selectedRecord: mockMaintenanceRecord })

    await wrapper
      .findComponent({ name: 'MaintenanceCardDetails' })
      .vm.$emit('close')
    expect(
      wrapper.findComponent({ name: 'MaintenanceCardDetails' }).exists()
    ).toBe(false)
    expect(wrapper.emitted('update:selectedRecord')?.[0]).toEqual([null])
  })
})
