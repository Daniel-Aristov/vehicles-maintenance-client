import VehiclesCreateForm from '@/components/vehicles/VehiclesCreateForm.vue'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'

describe('VehiclesCreateForm', () => {
  const mockOptions = {
    makeOptions: [{ value: 1, label: 'Toyota' }],
    modelOptions: [{ value: 1, label: 'Camry' }],
    rangeOptions: [{ value: 1, label: 'XV70' }],
    generationOptions: [{ value: 1, label: '2017-2021' }],
    configurationOptions: [{ value: 1, label: '2.5 AT' }]
  }

  const createWrapper = (props = {}) => {
    return mount(VehiclesCreateForm, {
      props: {
        ...mockOptions,
        ...props
      },
      global: {
        stubs: {
          CustomSelect: {
            template: '<div class="custom-select"><slot /></div>',
            props: ['modelValue', 'options', 'placeholder', 'disabled'],
            emits: ['update:modelValue']
          },
          CustomInput: {
            template: '<input />',
            props: ['modelValue'],
            emits: ['update:modelValue']
          }
        }
      }
    })
  }

  it('отображает форму создания автомобиля', () => {
    const wrapper = createWrapper()
    expect(wrapper.findAll('.custom-select')).toHaveLength(5)
    expect(wrapper.findAll('input')).toHaveLength(4)
  })

  it('эмитит события при выборе марки/модели/поколения', async () => {
    const wrapper = createWrapper()
    const selects = wrapper.findAll('.custom-select')

    await selects[0].vm.$emit('update:modelValue', 1)
    expect(wrapper.emitted('selectMake')?.[0]).toEqual([1])

    await selects[1].vm.$emit('update:modelValue', 1)
    expect(wrapper.emitted('selectModel')?.[0]).toEqual([1])

    await selects[2].vm.$emit('update:modelValue', 1)
    expect(wrapper.emitted('selectRange')?.[0]).toEqual([1])

    await selects[3].vm.$emit('update:modelValue', 1)
    expect(wrapper.emitted('selectGeneration')?.[0]).toEqual([1])

    await selects[4].vm.$emit('update:modelValue', 1)
    expect(wrapper.emitted('selectConfiguration')?.[0]).toEqual([1])
  })

  it('блокирует селекты если предыдущие не выбраны', () => {
    const wrapper = createWrapper()
    const selects = wrapper.findAll('.custom-select')

    expect(selects[1].attributes('disabled')).toBeDefined()
    expect(selects[2].attributes('disabled')).toBeDefined()
    expect(selects[3].attributes('disabled')).toBeDefined()
    expect(selects[4].attributes('disabled')).toBeDefined()
  })

  it('отображает ошибку если она передана', () => {
    const error = 'Тестовая ошибка'
    const wrapper = createWrapper({ error })
    expect(wrapper.find('.form-error').text()).toBe(error)
  })

  it('эмитит событие submit с данными формы', async () => {
    const wrapper = createWrapper()

    // Заполняем форму
    await wrapper.setData({
      selectedMake: 1,
      selectedModel: 1,
      selectedRange: 1,
      selectedGeneration: 1,
      selectedConfiguration: 1,
      color: 'black',
      manufactureYear: '2020',
      mileage: '50000',
      vin: 'TEST12345678901',
      registrationPlate: 'A123BC'
    })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')?.[0][0]).toEqual({
      make_id: 1,
      model_id: 1,
      range_id: 1,
      generation_id: 1,
      configuration_id: 1,
      color: 'black',
      manufacture_year: 2020,
      mileage: 50000,
      vin: 'TEST12345678901',
      registration_plate: 'A123BC',
      photo: null
    })
  })

  it('сбрасывает форму при нажатии на кнопку сброса', async () => {
    const wrapper = createWrapper()

    // Заполняем форму
    await wrapper.setData({
      selectedMake: 1,
      selectedModel: 1,
      selectedRange: 1,
      selectedGeneration: 1,
      selectedConfiguration: 1,
      color: 'black',
      manufactureYear: '2020',
      mileage: '50000',
      vin: 'TEST12345678901',
      registrationPlate: 'A123BC'
    })

    await wrapper.find('.vehicle-create__reset').trigger('click')

    expect(wrapper.vm.selectedMake).toBeUndefined()
    expect(wrapper.vm.selectedModel).toBeUndefined()
    expect(wrapper.vm.selectedRange).toBeUndefined()
    expect(wrapper.vm.selectedGeneration).toBeUndefined()
    expect(wrapper.vm.selectedConfiguration).toBeUndefined()
    expect(wrapper.vm.color).toBe('')
    expect(wrapper.vm.manufactureYear).toBe('')
    expect(wrapper.vm.mileage).toBe('')
    expect(wrapper.vm.vin).toBe('')
    expect(wrapper.vm.registrationPlate).toBe('')
  })

  it('кнопка отправки заблокирована если форма не валидна', () => {
    const wrapper = createWrapper()
    expect(
      wrapper.find('button[type="submit"]').attributes('disabled')
    ).toBeDefined()
  })

  it('обрабатывает загрузку фотографии', async () => {
    const wrapper = createWrapper()
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' })
    const input = wrapper.find('input[type="file"]')

    Object.defineProperty(input.element, 'files', {
      value: [file]
    })

    await input.trigger('change')
    expect(wrapper.vm.photoFile).toBe(file)
  })
})
