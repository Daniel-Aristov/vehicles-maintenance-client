<template>
  <div class="login-form">
    <p class="login-form__title">Авторизация</p>
    <form @submit.prevent="onSubmit">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Пароль" v-model="password" />
      <p v-if="error" class="form-error">{{ error }}</p>
      <button type="submit" :disabled="!isFormValid">Войти</button>
    </form>
    <router-link to="/register" class="login-form__link"
      >Нет аккаунта? Зарегистрируйтесь</router-link
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
    email: '',
    password: ''
  }),
  computed: {
    isFormValid(): boolean {
      return this.email.length > 0 && this.password.length > 0
    }
  },
  emits: ['submit'],
  methods: {
    onSubmit() {
      this.$emit('submit', {
        email: this.email,
        password: this.password
      })
    }
  }
})
</script>

<style scoped>
.login-form {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 0 0 8px 0 rgba(140, 4, 230, 0.2);
  border-radius: 6px;
}

.login-form__title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.login-form__link {
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

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
