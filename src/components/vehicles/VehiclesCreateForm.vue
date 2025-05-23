<template>
  <form
    class="vehicle-create__form"
    @submit.prevent="$emit('submit', getFormData())"
  >
    <div class="vehicle-create__select-container">
      <CustomSelect
        v-model="selectedMake"
        :options="makeOptions"
        placeholder="Выберите марку"
        class="vehicle-create__select"
        @update:modelValue="$emit('selectMake', $event)"
      />
      <CustomSelect
        v-model="selectedModel"
        :options="modelOptions"
        placeholder="Выберите модель"
        :disabled="!selectedMake"
        class="vehicle-create__select"
        @update:modelValue="$emit('selectModel', $event)"
      />
      <CustomSelect
        v-model="selectedRange"
        :options="rangeOptions"
        placeholder="Выберите модельный ряд"
        :disabled="!selectedModel"
        class="vehicle-create__select"
        @update:modelValue="$emit('selectRange', $event)"
      />
      <CustomSelect
        v-model="selectedGeneration"
        :options="generationOptions"
        placeholder="Выберите поколение"
        :disabled="!selectedRange"
        class="vehicle-create__select"
        @update:modelValue="$emit('selectGeneration', $event)"
      />
      <CustomSelect
        v-model="selectedConfiguration"
        :options="configurationOptions"
        placeholder="Выберите конфигурацию"
        :disabled="!selectedGeneration"
        class="vehicle-create__select"
        @update:modelValue="$emit('selectConfiguration', $event)"
      />
    </div>
    <div class="vehicle-create__info-container">
      <div class="vehicle-create__info-photo" @click="handlePhotoClick">
        <p>Выберите фотографию</p>
        <img src="@/assets/images/choice-image-car.png" alt="upload" />
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          class="vehicle-create__file-input"
          style="display: none"
          ref="fileInput"
        />
      </div>
      <div class="vehicle-create__info-form-container">
        <div class="vehicle-create__info-form">
          <CustomInput
            v-model="vin"
            placeholder="VIN"
            maxlength="17"
            class="vehicle-create__input"
          />
          <CustomInput
            v-model="registrationPlate"
            placeholder="Номер регистрации"
            class="vehicle-create__input"
          />
        </div>
        <div class="vehicle-create__info-form">
          <CustomSelect
            v-model="color"
            :options="colorOptions"
            placeholder="Выберите цвет"
            class="vehicle-create__select"
          />
          <CustomInput
            v-model="manufactureYear"
            placeholder="Год выпуска"
            type="number"
            class="vehicle-create__input"
          />
          <CustomInput
            v-model="mileage"
            placeholder="Пробег"
            type="number"
            class="vehicle-create__input"
          />
        </div>
      </div>
    </div>
    <div class="vehicle-create__buttons">
      <p v-if="error" class="form-error">{{ error }}</p>
      <button type="submit" :disabled="!isFormValid">Создать</button>
      <button type="button" class="vehicle-create__reset" @click="resetForm">
        Сбросить
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import CustomInput from '@/components/ui/CustomInput.vue'
import { CreateVehicleDto } from '@/js/models/vehicle.dto'
import { COLORS } from '@/types/vehicle.types'

defineProps<{
  makeOptions: { value: number; label: string }[]
  modelOptions: { value: number; label: string }[]
  rangeOptions: { value: number; label: string }[]
  generationOptions: { value: number; label: string }[]
  configurationOptions: { value: number; label: string }[]
  error?: string
}>()

defineEmits<{
  (e: 'submit', data: CreateVehicleDto): void
  (e: 'selectMake', id: number): void
  (e: 'selectModel', id: number): void
  (e: 'selectRange', id: number): void
  (e: 'selectGeneration', id: number): void
  (e: 'selectConfiguration', id: number): void
}>()

const selectedMake = ref<number | undefined>(undefined)
const selectedModel = ref<number | undefined>(undefined)
const selectedRange = ref<number | undefined>(undefined)
const selectedGeneration = ref<number | undefined>(undefined)
const selectedConfiguration = ref<number | undefined>(undefined)

const color = ref('')
const manufactureYear = ref('')
const mileage = ref('')
const vin = ref('')
const registrationPlate = ref('')
const photoFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const colorOptions = computed(() => {
  return COLORS.map((color) => ({
    value: color,
    label: color.charAt(0).toUpperCase() + color.slice(1)
  }))
})

const isFormValid = computed(() => {
  return (
    selectedMake.value &&
    selectedModel.value &&
    selectedRange.value &&
    selectedGeneration.value &&
    selectedConfiguration.value &&
    color.value &&
    manufactureYear.value &&
    mileage.value &&
    vin.value &&
    registrationPlate.value
  )
})

const handlePhotoClick = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    photoFile.value = input.files[0]
  }
}

const getFormData = (): CreateVehicleDto => {
  if (
    !selectedMake.value ||
    !selectedModel.value ||
    !selectedRange.value ||
    !selectedGeneration.value ||
    !selectedConfiguration.value
  ) {
    throw new Error('Не все поля заполнены')
  }

  return {
    make_id: selectedMake.value,
    model_id: selectedModel.value,
    range_id: selectedRange.value,
    generation_id: selectedGeneration.value,
    configuration_id: selectedConfiguration.value,
    color: color.value,
    manufacture_year: parseInt(manufactureYear.value),
    mileage: parseInt(mileage.value),
    vin: vin.value,
    registration_plate: registrationPlate.value,
    photo: photoFile.value?.name || null
  }
}

const resetForm = () => {
  selectedMake.value = undefined
  selectedModel.value = undefined
  selectedRange.value = undefined
  selectedGeneration.value = undefined
  selectedConfiguration.value = undefined
  color.value = ''
  manufactureYear.value = ''
  mileage.value = ''
  vin.value = ''
  registrationPlate.value = ''
  photoFile.value = null
}
</script>

<style scoped>
.vehicle-create__form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.vehicle-create__select-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: 2px solid #5a5a5a;
  padding: 20px 0 40px;
}

.vehicle-create__select {
  max-width: 370px;
}

.vehicle-create__info-container {
  display: flex;
  gap: 100px;
  margin-top: 30px;
}

.vehicle-create__info-form-container {
  display: flex;
  gap: 16px;
}

.vehicle-create__info-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.vehicle-create__info-photo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;

  img {
    width: 160px;
    height: 150px;
    margin-top: 10px;
  }
}

.vehicle-create__buttons {
  display: flex;
  gap: 12px;
  margin-top: 30px;

  button {
    min-width: 260px;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

.vehicle-create__reset {
  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 0.45);
  }
}

.form-error {
  color: #ff4444;
  margin: 10px 0;
  text-align: center;
  width: 100%;
}
</style>
