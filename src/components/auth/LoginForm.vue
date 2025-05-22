<template>
  <div class="login-form">
    <p class="login-form__title">Авторизация</p>
    <form @submit.prevent="onSubmit">
      <CustomInput
        type="email"
        placeholder="Email"
        v-model="email"
        :icon="MailIcon"
      />
      <div class="login-form__password">
        <CustomInput
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="Пароль"
          v-model="password"
          :icon="PasswordIcon"
        />
        <EyeIcon @click="togglePasswordVisibility" />
      </div>
      <p v-if="error" class="form-error">{{ error }}</p>
      <button class="login-form__button" type="submit" :disabled="!isFormValid">
        Войти
      </button>
    </form>
    <div class="login-form__links">
      <router-link to="/register" class="login-form__link"
        >Нет учетной записи? Зарегистрируйтесь</router-link
      >
      <router-link to="#" class="login-form__link">Забыли пароль?</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CustomInput from '@/components/ui/CustomInput.vue'
import MailIcon from '@/components/icons/MailIcon.vue'
import PasswordIcon from '@/components/icons/PasswordIcon.vue'
import EyeIcon from '@/components/icons/Eye.vue'

export default defineComponent({
  components: {
    CustomInput,
    EyeIcon
  },
  props: {
    error: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {
      MailIcon,
      PasswordIcon
    }
  },
  data: () => ({
    email: '',
    password: '',
    passwordVisible: false
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
        email: this.email.toLowerCase(),
        password: this.password
      })
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible
    }
  }
})
</script>

<style scoped>
.login-form {
  min-width: 480px;
  padding: 36px;
  background-color: #090f23;
  border-radius: 10px;
}

.login-form__title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
}

.login-form__password {
  position: relative;
  margin: 10px 0;

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}

.login-form__links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 26px;
}

.login-form__link {
  display: block;
  font-size: 15px;
  text-align: center;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  cursor: pointer;
  &:hover {
    color: #d0d0d0;
  }
}

.login-form__button {
  width: 100%;
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
