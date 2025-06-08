import CreateMaintenanceFormWorker from '@/components/maintenance/CreateMaintenanceFormWorker.vue'
import { describe, expect, it } from '@jest/globals'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

describe('CreateMaintenanceFormWorker', () => {
  const mockWorkers = [
    {
      id: 1,
      first_name: 'Иван',
      last_name: 'Иванов',
      patronymic: 'Иванович'
    },
    {
      id: 2,
      first_name: 'Петр',
      last_name: 'Петров',
      patronymic: 'Петрович'
    }
  ]

  const mockUser = {
    id: 1,
    first_name: 'Иван',
    last_name: 'Иванов',
    patronymic: 'Иванович'
  }

  const createWrapper = (props = {}, initialState = {}) => {
    return mount(CreateMaintenanceFormWorker, {
      props: {
        serviceId: 1,
        vehicleId: 1,
        ...props
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
            initialState: {
              services: {
                serviceWorkers: mockWorkers
              },
              user: {
                user: mockUser
              },
              ...initialState
            }
          })
        ],
        stubs: {
          CustomInput: {
            template:
              '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue', 'label', 'placeholder', 'type'],
            emits: ['update:modelValue']
          },
          CustomTextarea: {
            template:
              '<textarea :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue', 'label', 'placeholder'],
            emits: ['update:modelValue']
          },
          CustomSelect: {
            template:
              '<select :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option></select>',
            props: ['modelValue', 'options', 'placeholder', 'disabled'],
            emits: ['update:modelValue']
          },
          PlusIcon: true,
          DocsIcon: true,
          CloseIcon: true
        }
      }
    })
  }

  it('отображает форму создания записи о ТО', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.create-maintenance-form__title').text()).toBe(
      'Добавление записи технического обслуживания'
    )
    expect(wrapper.findAll('input')).toHaveLength(5)
    expect(wrapper.find('textarea')).toBeTruthy()
    expect(wrapper.findAll('select')).toHaveLength(2)
  })

  it('обновляет значения формы при вводе', async () => {
    const wrapper = createWrapper()
    const inputs = wrapper.findAll('input')
    const textarea = wrapper.find('textarea')
    const selects = wrapper.findAll('select')

    await inputs[0].setValue('Тестовое ТО')
    await textarea.setValue('Описание тестового ТО')
    await inputs[1].setValue('2024-03-20')
    await inputs[2].setValue('50000')
    await inputs[3].setValue('2000')
    await inputs[4].setValue('1000')
    await selects[0].setValue('1')

    expect(wrapper.vm.maintenanceRecord.title).toBe('Тестовое ТО')
    expect(wrapper.vm.maintenanceRecord.description).toBe(
      'Описание тестового ТО'
    )
    expect(wrapper.vm.maintenanceRecord.date).toBe('2024-03-20')
    expect(wrapper.vm.maintenanceRecord.mileage).toBe('50000')
    expect(wrapper.vm.maintenanceRecord.parts_cost).toBe('2000')
    expect(wrapper.vm.maintenanceRecord.labor_cost).toBe('1000')
    expect(wrapper.vm.maintenanceRecord.responsible_id).toBe('1')
  })

  it('отображает общую стоимость', async () => {
    const wrapper = createWrapper()
    const inputs = wrapper.findAll('input')

    await inputs[3].setValue('2000')
    await inputs[4].setValue('1000')

    expect(
      wrapper.find('.create-maintenance-form__total-cost').text()
    ).toContain('3000')
  })

  it('обрабатывает загрузку документов', async () => {
    const wrapper = createWrapper()
    const file = new File([''], 'test.pdf', { type: 'application/pdf' })
    const input = wrapper.find('input[type="file"]')

    Object.defineProperty(input.element, 'files', {
      value: [file]
    })

    await input.trigger('change')
    expect(wrapper.vm.selectedFiles).toHaveLength(1)
    expect(wrapper.vm.selectedFiles[0].name).toBe('test.pdf')
  })

  it('обрабатывает загрузку фотографий', async () => {
    const wrapper = createWrapper()
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' })
    const input = wrapper.find('input[accept="image/*"]')

    Object.defineProperty(input.element, 'files', {
      value: [file]
    })

    await input.trigger('change')
    expect(wrapper.vm.selectedImages).toHaveLength(1)
    expect(wrapper.vm.selectedImages[0].name).toBe('test.jpg')
  })

  it('удаляет выбранные документы', async () => {
    const wrapper = createWrapper()
    const file = new File([''], 'test.pdf', { type: 'application/pdf' })
    await wrapper.setData({ selectedFiles: [file] })

    await wrapper.find('.remove-file').trigger('click')
    expect(wrapper.vm.selectedFiles).toHaveLength(0)
  })

  it('удаляет выбранные фотографии', async () => {
    const wrapper = createWrapper()
    await wrapper.setData({
      selectedImages: [new File([''], 'test.jpg', { type: 'image/jpeg' })],
      imagesPreviews: ['data:image/jpeg;base64,test']
    })

    await wrapper.find('.remove-image').trigger('click')
    expect(wrapper.vm.selectedImages).toHaveLength(0)
    expect(wrapper.vm.imagesPreviews).toHaveLength(0)
  })

  it('добавляет и удаляет дополнительных работников', async () => {
    const wrapper = createWrapper()
    const selects = wrapper.findAll('select')

    await selects[0].setValue('1')
    await selects[1].setValue('2')

    expect(wrapper.vm.selectedWorkers).toHaveLength(1)
    expect(wrapper.vm.selectedWorkers[0].id).toBe(2)

    await wrapper.find('.remove-worker').trigger('click')
    expect(wrapper.vm.selectedWorkers).toHaveLength(0)
  })

  it('сбрасывает форму при отмене', async () => {
    const wrapper = createWrapper()
    await wrapper.setData({
      maintenanceRecord: {
        title: 'Тест',
        description: 'Описание',
        date: '2024-03-20',
        mileage: '50000',
        responsible_id: 1,
        service_workers_ids: '2',
        parts_cost: '2000',
        labor_cost: '1000'
      },
      selectedFiles: [new File([''], 'test.pdf', { type: 'application/pdf' })],
      selectedImages: [new File([''], 'test.jpg', { type: 'image/jpeg' })]
    })

    await wrapper.find('.create-maintenance-form__reset').trigger('click')

    expect(wrapper.vm.maintenanceRecord.title).toBe('')
    expect(wrapper.vm.selectedFiles).toHaveLength(0)
    expect(wrapper.vm.selectedImages).toHaveLength(0)
    expect(wrapper.emitted('update:formVisible')?.[0]).toEqual([false])
  })

  it('отправляет форму с корректными данными', async () => {
    const wrapper = createWrapper()
    const maintenanceStore = wrapper.vm.maintenanceStore

    await wrapper.setData({
      maintenanceRecord: {
        title: 'Тест',
        description: 'Описание',
        date: '2024-03-20',
        mileage: '50000',
        responsible_id: 1,
        service_workers_ids: '2',
        parts_cost: '2000',
        labor_cost: '1000'
      },
      selectedWorkers: [{ id: 2, name: 'Петров Петр Петрович' }]
    })

    await wrapper.find('form').trigger('submit')

    expect(maintenanceStore.createMaintenanceRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Тест',
        description: 'Описание',
        date: '2024-03-20',
        mileage: 50000,
        maintenance_performer: 'registered_service',
        responsible_id: 1,
        service_workers_ids: '2',
        parts_cost: 2000,
        labor_cost: 1000,
        total_cost: 3000,
        vehicle_id: 1,
        service_id: 1
      })
    )
  })

  it('блокирует кнопку отправки если форма не валидна', () => {
    const wrapper = createWrapper()
    expect(
      wrapper.find('button[type="submit"]').attributes('disabled')
    ).toBeDefined()
  })

  it('блокирует выбор дополнительных работников если не выбран ответственный', () => {
    const wrapper = createWrapper()
    const selects = wrapper.findAll('select')
    expect(selects[1].attributes('disabled')).toBeDefined()
  })
})
