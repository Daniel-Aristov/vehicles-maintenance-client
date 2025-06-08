import MaintenanceCardDetails from '@/components/maintenance/MaintenanceCardDetails.vue'
import { describe, expect, it } from '@jest/globals'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

describe('MaintenanceCardDetails', () => {
  const mockService = {
    id: 1,
    name: 'Тестовый сервис'
  }

  const mockMaintenanceRecord = {
    id: 1,
    title: 'Замена масла',
    description: 'Замена масла и фильтров',
    date: '2024-03-20',
    mileage: 50000,
    maintenance_performer: 'owner',
    parts_cost: 2000,
    labor_cost: 1000,
    total_cost: 3000,
    service_id: null,
    photos: [{ photo_path: '/photos/test.jpg' }],
    documents: [{ document_path: '/docs/test.pdf' }],
    responsible: {
      first_name: 'Иван',
      last_name: 'Иванов',
      patronymic: 'Иванович'
    }
  }

  const createWrapper = (props = {}, initialState = {}) => {
    return mount(MaintenanceCardDetails, {
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
          })
        ],
        stubs: {
          CloseIcon: true,
          DocsIcon: true
        }
      },
      props: {
        maintenanceRecord: mockMaintenanceRecord,
        ...props
      }
    })
  }

  it('отображает основную информацию о техническом обслуживании', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.maintenance-card-details__title').text()).toBe(
      'Информация о техническом обслуживании'
    )
    expect(wrapper.text()).toContain('Замена масла')
    expect(wrapper.text()).toContain('Замена масла и фильтров')
    expect(wrapper.text()).toContain('20.03.2024')
    expect(wrapper.text()).toContain('50000 км')
  })

  it('отображает информацию о стоимости', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('2000 ₽')
    expect(wrapper.text()).toContain('1000 ₽')
    expect(wrapper.text()).toContain('3000 ₽')
  })

  it('отображает фотографии если они есть', () => {
    const wrapper = createWrapper()
    const photos = wrapper.findAll('.maintenance-card-details__photos img')
    expect(photos).toHaveLength(1)
    expect(photos[0].attributes('src')).toBe(
      'http://localhost:8000/photos/test.jpg'
    )
  })

  it('отображает документы если они есть', () => {
    const wrapper = createWrapper()
    const documents = wrapper.findAll('.maintenance-card-details__document')
    expect(documents).toHaveLength(1)
    expect(documents[0].attributes('href')).toBe(
      'http://localhost:8000/docs/test.pdf'
    )
  })

  it('отображает правильный label для владельца', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Владелец')
  })

  it('отображает правильный label для незарегистрированного сервиса', () => {
    const wrapper = createWrapper({
      maintenanceRecord: {
        ...mockMaintenanceRecord,
        maintenance_performer: 'unregistered_service'
      }
    })
    expect(wrapper.text()).toContain('Незарегистрированный сервис')
  })

  it('отображает название сервиса для зарегистрированного сервиса', () => {
    const wrapper = createWrapper({
      maintenanceRecord: {
        ...mockMaintenanceRecord,
        maintenance_performer: 'registered_service',
        service_id: 1
      }
    })
    expect(wrapper.text()).toContain('Тестовый сервис')
  })

  it('отображает информацию об ответственном', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Иванов Иван Иванович')
  })

  it('эмитит событие close при нажатии на кнопку закрытия', async () => {
    const wrapper = createWrapper()
    await wrapper.find('.maintenance-card-details__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
