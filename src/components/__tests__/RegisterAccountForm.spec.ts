import RegisterAccountForm from '@/components/auth/RegisterAccountForm.vue'
import { USER_ROLE_NAMES, UserRole } from '@/types/user.types'
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/login', name: 'login', component: {} }]
})

describe('RegisterAccountForm', () => {
  const createWrapper = (props = {}) => {
    return mount(RegisterAccountForm, {
      global: {
        plugins: [router]
      },
      props: {
        createUserRole: USER_ROLE_NAMES[UserRole.WORKER],
        loadingSendEmail: false,
        ...props
      }
    })
  }

  it('отображает форму регистрации', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.register-form__title').text()).toBe(
      'Регистрация пользователя'
    )
    expect(wrapper.findAll('input')).toHaveLength(7)
  })

  it('отображает ошибку если она передана', () => {
    const error = 'Тестовая ошибка'
    const wrapper = createWrapper({ error })
    expect(wrapper.find('.form-error').text()).toBe(error)
  })

  it('кнопка отправки формы заблокирована если обязательные поля пустые', () => {
    const wrapper = createWrapper()
    expect(
      wrapper.find('.register-form__button').attributes('disabled')
    ).toBeDefined()
  })

  it('форматирует номер телефона', async () => {
    const wrapper = createWrapper()
    const phoneInput = wrapper.find('input[placeholder="Номер телефона"]')

    await phoneInput.setValue('89991234567')
    expect(wrapper.vm.phone).toBe('+7 (999) 123-45-67')

    await phoneInput.setValue('79991234567')
    expect(wrapper.vm.phone).toBe('+7 (999) 123-45-67')
  })

  it('эмитит событие submit с данными формы', async () => {
    const wrapper = createWrapper()
    const testData = {
      firstName: 'Иван',
      lastName: 'Иванов',
      patronymic: 'Иванович',
      email: 'test@test.com',
      password: 'password123',
      birthday: '2000-01-01',
      phone: '+7 (999) 123-45-67'
    }

    await wrapper.setData(testData)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')?.[0][0]).toEqual({
      first_name: testData.firstName,
      last_name: testData.lastName,
      patronymic: testData.patronymic,
      email: testData.email,
      password: testData.password,
      birthday: testData.birthday,
      phone: testData.phone,
      photo_path: null,
      role: USER_ROLE_NAMES[UserRole.WORKER]
    })
  })

  it('отображает состояние загрузки', () => {
    const wrapper = createWrapper({ loadingSendEmail: true })
    expect(wrapper.find('.register-form__button').text()).toBe('Отправка...')
    expect(
      wrapper.find('.register-form__button').attributes('disabled')
    ).toBeDefined()
  })

  it('отображает ссылку на страницу логина', () => {
    const wrapper = createWrapper()
    const loginLink = wrapper.find('.register-form__link')
    expect(loginLink.text()).toBe('Уже есть учетная запись? Войдите')
    expect(loginLink.attributes('to')).toBe('/login')
  })
})
