<template>
  <form class="create-service-form__form" @submit.prevent="onSubmit">
    <div class="create-service-form__form-wrapper">
      <div class="left-side">
        <div class="input-wrapper">
          <CustomInput
            :icon="TitleIcon"
            type="text"
            placeholder="Коммерческое обозначение"
            v-model="nameService"
          />
          <span class="required">*</span>
        </div>
        <div class="input-wrapper">
          <div class="inn-verify-wrapper">
            <div class="inn-input-container">
              <CustomInput
                :icon="DocsIcon"
                type="text"
                placeholder="ИНН"
                v-model="inn"
              />
            </div>
            <button
              type="button"
              class="verify-btn"
              @click="verifyService"
              :disabled="!isInnValid || loadingVerify"
            >
              <span v-if="loadingVerify">Верификация...</span>
              <span v-else>Верифицировать</span>
            </button>
          </div>
        </div>
        <div v-if="verificationError" class="inn-error">
          {{ verificationError }}
        </div>
        <div class="input-wrapper">
          <CustomInput
            :icon="TitleIcon"
            type="text"
            placeholder="Наименование"
            disabled
            v-model="commercial_name"
          />
          <span class="required">*</span>
        </div>
        <div class="input-wrapper">
          <CustomInput
            :icon="DocsIcon"
            type="text"
            placeholder="ОГРН (ОГРНИП)"
            disabled
            v-model="ogrn"
          />
          <span class="required">*</span>
        </div>
        <div class="input-wrapper">
          <CustomInput
            :icon="AdressIcon"
            type="text"
            placeholder="Адрес сервиса"
            v-model="address"
          />
          <span class="required">*</span>
        </div>
        <CustomTextarea
          v-model="summary"
          class="summary-textarea"
          placeholder="Описание"
          :rows="4"
          :icon="DescriptionIcon"
        />
      </div>
      <div class="right-side">
        <div class="input-wrapper">
          <CustomInput
            :icon="TimeIcon"
            type="text"
            placeholder="Время работы"
            v-model="timetable"
          />
          <span class="required">*</span>
        </div>
        <CustomInput
          :icon="InternetIcon"
          type="text"
          placeholder="Сайт сервиса"
          v-model="website"
        />
      </div>
    </div>
    <p v-if="error" class="form-error">{{ error }}</p>
    <div class="service-create-form__buttons">
      <button type="submit" :disabled="!isFormValid">Зарегистрировать</button>
      <button
        type="button"
        class="service-create-form__reset"
        @click="resetForm"
      >
        Сбросить
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useServicesStore } from '@/store/services.store'
import CustomInput from '@/components/ui/CustomInput.vue'
import AdressIcon from '@/components/icons/AdressIcon.vue'
import InternetIcon from '@/components/icons/InternetIcon.vue'
import TimeIcon from '@/components/icons/TimeIcon.vue'
import TitleIcon from '@/components/icons/TitleIcon.vue'
import DescriptionIcon from '@/components/icons/DescriptionIcon.vue'
import DocsIcon from '@/components/icons/DocsIcon.vue'
import { CreateServiceData } from '@/types/service.types'
import CustomTextarea from '@/components/ui/CustomTextarea.vue'

defineProps<{
  error?: string
}>()

const nameService = ref('')
const commercial_name = ref('')
const inn = ref('')
const ogrn = ref('')
const address = ref('')
const summary = ref('')
const timetable = ref('')
const website = ref('')
const loadingVerify = ref(false)
const verificationError = ref('')

const isInnValid = computed(() => {
  return /^\d{10}$/.test(inn.value)
})

const isFormValid = computed(() => {
  return !!(
    nameService.value &&
    isInnValid.value &&
    address.value &&
    timetable.value &&
    commercial_name.value &&
    ogrn.value
  )
})

const verifyService = async () => {
  try {
    loadingVerify.value = true
    const servicesStore = useServicesStore()
    if (inn.value) {
      const verifyData = await servicesStore.verifyInnOgrn({
        inn: inn.value
      })
      console.log(verifyData)
      commercial_name.value = verifyData.name
      ogrn.value = verifyData.ogrn
    }
  } catch (error) {
    console.log(error)
    verificationError.value =
      'Ошибка верификации номера, проверьте правильность ввода'
  } finally {
    loadingVerify.value = false
  }
}

const emit = defineEmits<{
  (e: 'submit', data: CreateServiceData): void
}>()

const onSubmit = () => {
  emit('submit', {
    name: nameService.value,
    commercial_name: commercial_name.value,
    inn: inn.value,
    ogrn: ogrn.value,
    address: address.value,
    summary: summary.value,
    timetable: timetable.value,
    website: website.value
  })
}

const resetForm = () => {
  nameService.value = ''
  commercial_name.value = ''
  inn.value = ''
  ogrn.value = ''
  address.value = ''
  summary.value = ''
  timetable.value = ''
  website.value = ''
}
</script>

<style scoped>
.create-service-form__form-wrapper {
  display: flex;
  align-items: start;
  gap: 36px;
}

.left-side {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.right-side {
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.service-create-form__buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;

  button {
    min-width: 260px;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

.service-create-form__reset {
  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 0.45);
  }
}

.inn-verify-wrapper {
  display: flex;
  gap: 10px;
}

.verify-btn {
  width: 240px;
  height: 42px;
  white-space: nowrap;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.service-create__info-photo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;

  p {
    max-width: 200px;
  }

  img {
    width: 160px;
    height: 150px;
    margin-top: 10px;
  }
}

.inn-input-container {
  flex: 1;
  position: relative;
}

.inn-error {
  display: block;
  color: #ff4444;
  font-size: 12px;
  position: absolute;
  bottom: -20px;
  left: 0;
}
</style>
