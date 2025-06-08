import RateWorkerModal from '@/components/services/RateWorkerModal.vue'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'

describe('RateWorkerModal', () => {
  const createWrapper = () => {
    return mount(RateWorkerModal, {
      global: {
        stubs: {
          CloseIcon: true,
          StarIcon: true
        }
      }
    })
  }

  it('отображает модальное окно с заголовком', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.modal-title').text()).toBe('Оценка работника')
    expect(wrapper.findAll('.star')).toHaveLength(5)
  })

  it('кнопка сохранения заблокирована если рейтинг не выбран', () => {
    const wrapper = createWrapper()
    expect(
      wrapper.find('.modal-buttons__button-save').attributes('disabled')
    ).toBeDefined()
  })

  it('выбирает рейтинг при клике на звезду', async () => {
    const wrapper = createWrapper()
    const stars = wrapper.findAll('.star')

    await stars[2].trigger('click') // Выбираем 3 звезды
    expect(wrapper.vm.selectedRating).toBe(3)
    expect(
      wrapper.find('.modal-buttons__button-save').attributes('disabled')
    ).toBeUndefined()
  })

  it('обновляет hover рейтинг при наведении на звезды', async () => {
    const wrapper = createWrapper()
    const stars = wrapper.findAll('.star')

    await stars[3].trigger('mouseenter') // Наводим на 4-ю звезду
    expect(wrapper.vm.hoverRating).toBe(4)

    await stars[3].trigger('mouseleave')
    expect(wrapper.vm.hoverRating).toBe(0)
  })

  it('эмитит событие close при закрытии', async () => {
    const wrapper = createWrapper()
    await wrapper.find('.modal-close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('эмитит событие submit с выбранным рейтингом', async () => {
    const wrapper = createWrapper()
    const stars = wrapper.findAll('.star')

    await stars[4].trigger('click') // Выбираем 5 звезд
    await wrapper.find('.modal-buttons__button-save').trigger('click')

    expect(wrapper.emitted('submit')?.[0]).toEqual([5])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('сбрасывает рейтинг при закрытии', async () => {
    const wrapper = createWrapper()
    const stars = wrapper.findAll('.star')

    await stars[4].trigger('click') // Выбираем 5 звезд
    expect(wrapper.vm.selectedRating).toBe(5)

    await wrapper.find('.modal-close').trigger('click')
    expect(wrapper.vm.selectedRating).toBe(0)
  })
})
