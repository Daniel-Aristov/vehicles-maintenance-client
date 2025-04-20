<template>
  <div class="register-form">
    <p class="register-form__title">Регистрация</p>
    <form @submit.prevent="onSubmit">
      <div class="input-wrapper">
        <input type="text" placeholder="Имя" v-model="firstName" />
        <span class="required">*</span>
      </div>
      <div class="input-wrapper">
        <input type="text" placeholder="Фамилия" v-model="lastName" />
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
      <div class="input-wrapper">
        <input type="date" placeholder="Дата рождения" v-model="birthday" />
        <span class="required required-date">*</span>
      </div>
      <div class="input-wrapper">
        <input type="tel" placeholder="Телефон" v-model="phone" />
        <span class="required">*</span>
      </div>
      <p v-if="error" class="form-error">{{ error }}</p>
      <button type="submit" :disabled="!isFormValid">Зарегистрироваться</button>
    </form>
    <router-link to="/login" class="register-form__link"
      >Уже есть аккаунт? Войдите</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    error: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    password: '',
    birthday: '',
    phone: ''
  }),
  computed: {
    isFormValid(): boolean {
      return !!(
        this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.birthday &&
        this.phone
      )
    }
  },
  emits: ['submit'],
  methods: {
    onSubmit() {
      this.$emit('submit', {
        first_name: this.firstName,
        last_name: this.lastName,
        patronymic: this.patronymic,
        email: this.email,
        password: this.password,
        birthday: this.birthday,
        phone: this.phone,
        role_id: 1
      })
    }
  }
})
</script>

<style scoped>
.register-form {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 0 0 8px 0 rgba(140, 4, 230, 0.2);
  border-radius: 6px;
}

.register-form__title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: 600;
}

.register-form__link {
  display: block;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  color: #ffffff;
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

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
