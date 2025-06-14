<template>
  <div class="register-form">
    <p class="register-form__title">Регистрация пользователя</p>
    <form @submit.prevent="onSubmit">
      <div class="input-wrapper">
        <input type="text" placeholder="Фамилия" v-model="lastName" />
        <span class="required">*</span>
      </div>
      <div class="input-wrapper">
        <input type="text" placeholder="Имя" v-model="firstName" />
        <span class="required">*</span>
      </div>
      <input type="text" placeholder="Отчество" v-model="patronymic" />
      <div class="input-wrapper">
        <input type="email" placeholder="Email" v-model="email" />
        <span class="required">*</span>
      </div>
      <div class="input-wrapper">
        <input type="password" placeholder="Пароль" v-model="password" />
        <span class="required">*</span>
      </div>
      <input type="date" placeholder="Дата рождения" v-model="birthday" />
      <input
        type="text"
        placeholder="Номер телефона"
        v-model="phone"
        @input="formatPhoneNumber"
        maxlength="18"
      />
      <p v-if="error" class="form-error">{{ error }}</p>
      <button
        class="register-form__button"
        type="submit"
        :disabled="!isFormValid || loadingSendEmail"
      >
        {{ loadingSendEmail ? 'Отправка...' : 'Зарегистрироваться' }}
      </button>
    </form>
    <router-link to="/login" class="register-form__link"
      >Уже есть учетная запись? Войдите</router-link
    >
  </div>
</template>

<script lang="ts">
import { USER_ROLE_NAMES, UserRole } from '@/types/user.types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  props: {
    error: {
      type: String,
      default: ''
    },
    createUserRole: {
      type: String,
      default: USER_ROLE_NAMES[UserRole.WORKER]
    },
    loadingSendEmail: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    firstName: null as string | null,
    lastName: null as string | null,
    patronymic: null as string | null,
    email: null as string | null,
    password: null as string | null,
    birthday: null as string | null,
    phone: null as string | null
  }),
  computed: {
    isFormValid(): boolean {
      return !!(this.firstName && this.lastName && this.email && this.password)
    }
  },
  emits: ['submit'],
  methods: {
    formatPhoneNumber(event: Event) {
      const input = event.target as HTMLInputElement
      let value = input.value.replace(/\D/g, '')

      if (value.length === 0) {
        this.phone = ''
        return
      }

      if (value[0] === '7' || value[0] === '8') {
        value = value.substring(1)
      }

      let formattedNumber = '+7'
      if (value.length > 0) {
        formattedNumber += ' (' + value.substring(0, 3)
      }
      if (value.length > 3) {
        formattedNumber += ') ' + value.substring(3, 6)
      }
      if (value.length > 6) {
        formattedNumber += '-' + value.substring(6, 8)
      }
      if (value.length > 8) {
        formattedNumber += '-' + value.substring(8, 10)
      }

      this.phone = formattedNumber
    },
    onSubmit() {
      this.$emit('submit', {
        first_name: this.firstName,
        last_name: this.lastName,
        patronymic: this.patronymic,
        email: this.email?.toLowerCase(),
        password: this.password,
        birthday: this.birthday,
        phone: this.phone,
        photo_path: null,
        role: this.createUserRole
      })
    }
  }
})
</script>

<style scoped>
.register-form {
  min-width: 440px;
  padding: 36px;
  background-color: #090f23;
  border-radius: 10px;
}

.register-form__title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 500;
}

.register-form__link {
  display: block;
  font-size: 15px;
  text-align: center;
  color: #ffffff;
  margin-top: 20px;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: #d0d0d0;
  }
}

.form-error {
  color: #ff4444;
  margin: 10px 0;
  text-align: center;
}

.input-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

input {
  margin-bottom: 10px;
}

.required {
  color: red;
  position: absolute;
  right: 14px;
  top: 56%;
  transform: translateY(-50%);
  pointer-events: none;
}

.required-date {
  right: 34px;
}

.register-form__button {
  width: 100%;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.phone-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  background: transparent;
  color: #ffffff;

  &:focus {
    border-color: #8c04e6;
  }
}
</style>
