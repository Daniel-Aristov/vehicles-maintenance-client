<template>
  <div class="vehicle-create">
    <p class="vehicle-create__title">Добавление автомобиля</p>
    <form class="vehicle-create__form" @submit.prevent="handleSubmit">
      <div class="vehicle-create__select-container">
        <CustomSelect
          v-model="selectedMake"
          :options="makeOptions"
          placeholder="Выберите марку"
          class="vehicle-create__select"
          @update:modelValue="selectMake"
        />
        <CustomSelect
          v-model="selectedModel"
          :options="modelOptions"
          placeholder="Выберите модель"
          :disabled="!selectedMake"
          class="vehicle-create__select"
          @update:modelValue="selectModel"
        />
        <CustomSelect
          v-model="selectedRange"
          :options="rangeOptions"
          placeholder="Выберите модельный ряд"
          :disabled="!selectedModel"
          class="vehicle-create__select"
          @update:modelValue="selectRange"
        />
        <CustomSelect
          v-model="selectedGeneration"
          :options="generationOptions"
          placeholder="Выберите поколение"
          :disabled="!selectedRange"
          class="vehicle-create__select"
          @update:modelValue="selectGeneration"
        />
        <CustomSelect
          v-model="selectedConfiguration"
          :options="configurationOptions"
          placeholder="Выберите конфигурацию"
          :disabled="!selectedGeneration"
          class="vehicle-create__select"
          @update:modelValue="selectConfiguration"
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
        <button type="submit">Создать</button>
        <button type="button" class="vehicle-create__reset" @click="resetForm">
          Сбросить
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useVehicleStore } from '@/store/vehicle.store'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import CustomInput from '@/components/ui/CustomInput.vue'
import { CreateVehicleDto } from '@/js/models/vehicle.dto'
import { COLORS } from '@/types/vehicle.types'
import { useRouter } from 'vue-router'

const router = useRouter()
const vehicleStore = useVehicleStore()

const selectedMake = ref<number | null>(null)
const selectedModel = ref<number | null>(null)
const selectedRange = ref<number | null>(null)
const selectedGeneration = ref<number | null>(null)
const selectedConfiguration = ref<number | null>(null)

const color = ref('')
const manufactureYear = ref('')
const mileage = ref('')
const vin = ref('')
const registrationPlate = ref('')
const photoFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const makeOptions = computed(() => {
  return vehicleStore.makes.map((make) => ({
    value: make.id,
    label: make.name
  }))
})

const modelOptions = computed(() => {
  return vehicleStore.models.map((model) => ({
    value: model.id,
    label: model.name
  }))
})

const rangeOptions = computed(() => {
  return vehicleStore.ranges.map((range) => ({
    value: range.id,
    label: range.name
  }))
})

const generationOptions = computed(() => {
  return vehicleStore.generations.map((generation) => ({
    value: generation.id,
    label: generation.full_name
  }))
})

const configurationOptions = computed(() => {
  return vehicleStore.configurations.map((configuration) => ({
    value: configuration.id,
    label: `${configuration.engine_capacity}л ${configuration.engine_power}л.с. ${configuration.transmission}`
  }))
})

const colorOptions = computed(() => {
  return COLORS.map((color) => ({
    value: color,
    label: color.charAt(0).toUpperCase() + color.slice(1)
  }))
})

const selectMake = async (makeId: number) => {
  selectedMake.value = makeId
  selectedModel.value = null
  selectedRange.value = null
  selectedGeneration.value = null
  selectedConfiguration.value = null
  if (makeId) {
    await vehicleStore.getModels(makeId)
  }
}

const selectModel = async (modelId: number) => {
  selectedModel.value = modelId
  selectedRange.value = null
  selectedGeneration.value = null
  selectedConfiguration.value = null
  if (modelId) {
    await vehicleStore.getRanges(modelId)
  }
}

const selectRange = async (rangeId: number) => {
  selectedRange.value = rangeId
  selectedGeneration.value = null
  selectedConfiguration.value = null
  if (rangeId) {
    await vehicleStore.getGenerations(rangeId)
  }
}

const selectGeneration = async (generationId: number) => {
  selectedGeneration.value = generationId
  selectedConfiguration.value = null
  if (generationId) {
    await vehicleStore.getConfigurations(generationId)
  }
}

const selectConfiguration = (configurationId: number) => {
  selectedConfiguration.value = configurationId
}

const handlePhotoClick = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    photoFile.value = input.files[0]
  }
}

const handleSubmit = async () => {
  if (
    !selectedMake.value ||
    !selectedModel.value ||
    !selectedRange.value ||
    !selectedGeneration.value ||
    !selectedConfiguration.value
  ) {
    return
  }

  const vehicleData: CreateVehicleDto = {
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
    photo: photoFile.value
  }

  await vehicleStore.createVehicle(vehicleData)
  resetForm()
  router.push({ name: 'vehicles' })
}

const resetForm = () => {
  selectedMake.value = null
  selectedModel.value = null
  selectedRange.value = null
  selectedGeneration.value = null
  selectedConfiguration.value = null
  color.value = ''
  manufactureYear.value = ''
  mileage.value = ''
  vin.value = ''
  registrationPlate.value = ''
  photoFile.value = null
}

onMounted(async () => {
  await vehicleStore.getMakes()
})
</script>

<style scoped>
.vehicle-create {
  padding: 0 36px;
}

.vehicle-create__form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.vehicle-create__title {
  font-size: 20px;
  font-weight: 500;
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
  }
}

.vehicle-create__reset {
  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 0.45);
  }
}

.vehicle-create__file {
  margin-top: 8px;
}

.vehicle-create__file-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
}

.vehicle-create__file-input::-webkit-file-upload-button {
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
}
</style>
