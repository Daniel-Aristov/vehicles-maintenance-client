import VehicleCard from '@/components/vehicles/VehicleCard.vue'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/vehicles/:id', name: 'vehicle-detail', component: {} }]
})

describe('VehicleCard', () => {
  const mockVehicle = {
    id: 1,
    make: {
      name: 'Toyota'
    },
    model: {
      name: 'Camry'
    },
    generation: {
      full_name: '(XV70) 2017-2021',
      photo_url: 'http://example.com/photo.jpg'
    }
  }

  const createWrapper = (props = {}) => {
    return mount(VehicleCard, {
      global: {
        plugins: [router]
      },
      props: {
        vehicle: mockVehicle,
        ...props
      }
    })
  }

  it('отображает информацию о транспортном средстве', () => {
    const wrapper = createWrapper()
    const title = wrapper.find('.vehicle-card__title')
    expect(title.text()).toContain('Toyota')
    expect(title.text()).toContain('Camry')
    expect(wrapper.find('.vehicle-card__generation').text()).toBe(
      '(XV70) 2017-2021'
    )
  })

  it('устанавливает фоновое изображение если оно есть', () => {
    const wrapper = createWrapper()
    expect(wrapper.attributes('style')).toContain(
      `background-image: url(${mockVehicle.generation.photo_url})`
    )
  })

  it('не устанавливает фоновое изображение если его нет', () => {
    const vehicleWithoutPhoto = {
      ...mockVehicle,
      generation: {
        ...mockVehicle.generation,
        photo_url: null
      }
    }
    const wrapper = createWrapper({ vehicle: vehicleWithoutPhoto })
    expect(wrapper.attributes('style')).toContain('background-image: none')
  })

  it('переходит на страницу детальной информации при клике', async () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = mount(VehicleCard, {
      global: {
        mocks: {
          $router: mockRouter
        }
      },
      props: {
        vehicle: mockVehicle
      }
    })

    await wrapper.trigger('click')
    expect(mockRouter.push).toHaveBeenCalledWith(`/vehicles/${mockVehicle.id}`)
  })
})
