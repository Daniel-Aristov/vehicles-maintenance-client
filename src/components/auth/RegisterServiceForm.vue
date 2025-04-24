<template>
  <div class="register-form">
    <p class="register-form__title">Создание автосервиса</p>
    <form @submit.prevent="onSubmit">
      <div class="input-wrapper">
        <input
          type="text"
          placeholder="Название сервиса"
          v-model="nameService"
        />
        <span class="required">*</span>
      </div>
      <div class="input-wrapper">
        <input type="text" placeholder="Адрес сервиса" v-model="address" />
        <span class="required">*</span>
      </div>
      <input type="text" placeholder="Описание сервиса" v-model="summary" />
      <div class="input-wrapper">
        <input type="email" placeholder="Время работы" v-model="timetable" />
        <span class="required">*</span>
      </div>
      <input type="password" placeholder="Сайт сервиса" v-model="website" />
      <p v-if="error" class="form-error">{{ error }}</p>
      <button type="submit" :disabled="!isFormValid">Создать автосервис</button>
    </form>
    <router-link to="/login" class="register-form__link"
      >Уже есть автосервис? Войдите</router-link
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
    nameService: null as string | null,
    address: null as string | null,
    summary: null as string | null,
    timetable: null as string | null,
    website: null as string | null
  }),
  computed: {
    isFormValid(): boolean {
      return !!(this.nameService && this.address && this.timetable)
    }
  },
  emits: ['submit'],
  methods: {
    onSubmit() {
      this.$emit('submit', {
        name: this.nameService,
        address: this.address,
        summary: this.summary,
        timetable: this.timetable,
        website: this.website
      })
    }
  }
})
</script>

<style scoped>
.register-form {
  width: 400px;
  margin: 0 auto;
  padding: 40px;
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
