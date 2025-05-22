<template>
  <div class="register-form">
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
        <div class="inn-verify-wrapper">
          <input type="text" placeholder="ИНН" v-model="inn" />
          <button
            type="button"
            class="verify-btn"
            @click="verifyService"
            :disabled="!inn || loadingVerify"
          >
            <span v-if="loadingVerify">Верификация...</span>
            <span v-else>Верифицировать</span>
          </button>
        </div>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          placeholder="Коммерческое название (автоматически)"
          disabled
          v-model="commercial_name"
        />
        <span class="required">*</span>
      </div>
      <div class="input-wrapper">
        <input
          type="text"
          placeholder="ОГРН (автоматически)"
          disabled
          v-model="ogrn"
        />
        <span class="required">*</span>
      </div>
      <div class="input-wrapper">
        <input type="text" placeholder="Адрес сервиса" v-model="address" />
        <span class="required">*</span>
      </div>
      <input type="text" placeholder="Описание сервиса" v-model="summary" />
      <div class="input-wrapper">
        <input type="text" placeholder="Время работы" v-model="timetable" />
        <span class="required">*</span>
      </div>
      <input type="password" placeholder="Сайт сервиса" v-model="website" />
      <p v-if="error" class="form-error">{{ error }}</p>
      <button type="submit" :disabled="!isFormValid">Создать автосервис</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useServicesStore } from '@/store/services.store'

export default defineComponent({
  props: {
    error: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    nameService: null as string | null,
    commercial_name: null as string | null,
    inn: null as string | null,
    ogrn: null as string | null,
    address: null as string | null,
    summary: null as string | null,
    timetable: null as string | null,
    website: null as string | null,
    loadingVerify: false as boolean
  }),
  computed: {
    isFormValid(): boolean {
      return !!(
        this.nameService &&
        this.inn &&
        this.address &&
        this.timetable &&
        this.commercial_name &&
        this.ogrn
      )
    }
  },
  emits: ['submit'],
  methods: {
    async verifyService() {
      try {
        this.loadingVerify = true
        const servicesStore = useServicesStore()
        if (this.inn) {
          const verifyData = await servicesStore.verifyInnOgrn({
            inn: this.inn
          })
          this.commercial_name = verifyData.name
          this.ogrn = verifyData.ogrn
        }
      } catch (error) {
        console.error('Ошибка верификации:', error)
      } finally {
        this.loadingVerify = false
      }
    },
    onSubmit() {
      this.$emit('submit', {
        name: this.nameService,
        commercial_name: this.commercial_name,
        inn: this.inn,
        ogrn: this.ogrn,
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
  width: 700px;
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

button {
  width: 100%;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.inn-verify-wrapper {
  display: flex;
  gap: 10px;
}

.verify-btn {
  width: 240px;
  height: 47px;
  white-space: nowrap;
}
</style>
