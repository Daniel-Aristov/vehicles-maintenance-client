<template>
  <div class="create-maintenance-form">
    <p class="create-maintenance-form__title">
      Добавление записи технического обслуживания
    </p>
    <form class="create-maintenance-form__form" @submit.prevent="handleSubmit">
      <div class="create-maintenance-form__form-content">
        <div class="create-maintenance-form__left-side">
          <CustomInput
            v-model="maintenanceRecord.title"
            label="Название"
            placeholder="Название"
          />
          <CustomTextarea
            v-model="maintenanceRecord.description"
            label="Описание"
            placeholder="Описание"
          />
          <div class="create-maintenance-form__left-side-inner">
            <div class="create-maintenance-form__left-side-inner-date-mileage">
              <CustomInput
                v-model="maintenanceRecord.date"
                label="Дата выполнения"
                placeholder="Дата выполнения"
                type="date"
              />
              <CustomInput
                v-model="maintenanceRecord.mileage"
                label="Пробег на время выполнения"
                placeholder="Пробег"
                type="number"
              />
            </div>
            <div>
              <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                multiple
                class="hidden-input"
              />
              <button
                type="button"
                class="create-maintenance-form__add-file"
                @click="fileInput?.click()"
              >
                <PlusIcon color="#000" />
                <span>Добавить документ</span>
              </button>
              <div v-if="selectedFiles.length" class="selected-files">
                <div
                  v-for="(file, index) in selectedFiles"
                  :key="index"
                  class="file-item"
                >
                  <DocsIcon color="#fff" />
                  <span>{{ file.name }}</span>
                  <button
                    type="button"
                    @click="removeFile(index)"
                    class="remove-file"
                  >
                    <CloseIcon color="#fff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="create-maintenance-form__buttons">
            <button type="submit" :disabled="!isFormValid">Добавить</button>
            <button
              type="button"
              class="create-maintenance-form__reset"
              @click="returnToHistory"
            >
              Отмена
            </button>
          </div>
        </div>
        <div class="create-maintenance-form__right-side">
          <CustomSelect
            v-model="maintenanceRecord.responsible_id"
            class="create-maintenance-form__select-performer"
            :options="maintenanceResponsibleWorkerOptions"
            placeholder="Ответственный за работу"
          />
          <CustomSelect
            v-model="maintenanceRecord.service_workers_ids"
            class="create-maintenance-form__select-performer"
            :options="maintenanceWorkersOptions"
            placeholder="Дополнительные работники"
            :disabled="!maintenanceRecord.responsible_id"
          />
          <div class="create-maintenance-form-devider"></div>
          <CustomInput
            v-model="maintenanceRecord.parts_cost"
            label="Стоимость запчастей"
            placeholder="Стоимость запчастей"
            type="number"
          />
          <CustomInput
            v-model="maintenanceRecord.labor_cost"
            label="Стоимость работ"
            placeholder="Стоимость работ"
            type="number"
          />
          <p class="create-maintenance-form__total-cost">
            Итого:
            {{
              Number(maintenanceRecord.parts_cost) +
              Number(maintenanceRecord.labor_cost)
            }}
            <span>рублей</span>
          </p>
          <div class="create-maintenance-form__photo-container">
            <p>Выберите фотографии работ, если необходимо</p>
            <input
              type="file"
              ref="imageInput"
              @change="handleImageSelect"
              multiple
              accept="image/*"
              class="hidden-input"
            />
            <div class="create-maintenance-form__photos">
              <img
                class="create-maintenance-form__photo"
                src="@/assets/images/choice-image-car.png"
                alt="choice-photo"
                @click="imageInput?.click()"
              />
              <div v-if="selectedImages.length" class="selected-images">
                <div
                  v-for="(image, index) in imagesPreviews"
                  :key="index"
                  class="image-preview"
                >
                  <img :src="image" alt="preview" />
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="remove-image"
                  >
                    <CloseIcon color="#fff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMaintenanceStore } from '@/store/maintenace.store'
import { useServicesStore } from '@/store/services.store'
import { MaintenancePerformer } from '@/types/maintenace'
import CustomInput from '@/components/ui/CustomInput.vue'
import CustomTextarea from '@/components/ui/CustomTextarea.vue'
import CustomSelect from '@/components/ui/CustomSelect.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import DocsIcon from '@/components/icons/DocsIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const emit = defineEmits(['update:formVisible'])

const props = defineProps<{
  serviceId: number
  vehicleId: number
}>()

const maintenanceRecord = ref({
  title: '',
  description: '',
  date: '',
  mileage: '',
  responsible_id: 0,
  service_workers_ids: '',
  parts_cost: '',
  labor_cost: ''
})

const maintenanceStore = useMaintenanceStore()
const servicesStore = useServicesStore()

const maintenanceResponsibleWorkerOptions = computed(() => {
  return [
    ...servicesStore.serviceWorkers.map((worker) => ({
      value: worker.id,
      label: `${worker.last_name} ${worker.first_name} ${
        worker.patronymic || ''
      }`
    }))
  ]
})

const maintenanceWorkersOptions = computed(() => {
  return [
    ...servicesStore.serviceWorkers
      .filter(
        (worker) => worker.id !== Number(maintenanceRecord.value.responsible_id)
      )
      .map((worker) => ({
        value: worker.id,
        label: `${worker.last_name} ${worker.first_name} ${
          worker.patronymic || ''
        }`
      }))
  ]
})

const selectedFiles = ref<File[]>([])
const selectedImages = ref<File[]>([])
const imagesPreviews = ref<string[]>([])
const imageInput = ref<HTMLInputElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const isFormValid = computed(() => {
  return (
    maintenanceRecord.value.title &&
    Number(maintenanceRecord.value.mileage) > 0 &&
    maintenanceRecord.value.responsible_id &&
    maintenanceRecord.value.date
  )
})

const handleSubmit = async () => {
  const total_cost =
    Number(maintenanceRecord.value.parts_cost) +
    Number(maintenanceRecord.value.labor_cost)

  try {
    await maintenanceStore.createMaintenanceRecord({
      ...maintenanceRecord.value,
      maintenance_performer: 'registered_service' as MaintenancePerformer,
      mileage: Number(maintenanceRecord.value.mileage),
      parts_cost: Number(maintenanceRecord.value.parts_cost),
      labor_cost: Number(maintenanceRecord.value.labor_cost),
      vehicle_id: props.vehicleId,
      service_id: props.serviceId,
      total_cost,
      documents: selectedFiles.value.length ? selectedFiles.value : null,
      photos: selectedImages.value.length ? selectedImages.value : null,
      service_workers_ids: ''
    })
    returnToHistory()
  } catch (error) {
    console.error('Ошибка при создании записи:', error)
  }
}

const returnToHistory = () => {
  maintenanceRecord.value = {
    title: '',
    description: '',
    date: '',
    mileage: '',
    responsible_id: 0,
    parts_cost: '',
    labor_cost: '',
    service_workers_ids: ''
  }
  selectedFiles.value = []
  selectedImages.value = []
  emit('update:formVisible', false)
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    selectedFiles.value = [...selectedFiles.value, ...Array.from(input.files)]
  }
}

const removeFile = (index: number) => {
  selectedFiles.value = selectedFiles.value.filter((_, i) => i !== index)
}

const handleImageSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    selectedImages.value = [...selectedImages.value, ...Array.from(input.files)]
    Array.from(input.files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          imagesPreviews.value.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    })
  }
}

const removeImage = (index: number) => {
  selectedImages.value = selectedImages.value.filter((_, i) => i !== index)
  imagesPreviews.value = imagesPreviews.value.filter((_, i) => i !== index)
}

onMounted(async () => {
  await servicesStore.getServiceWorkers(props.serviceId)
})
</script>

<style scoped>
.create-maintenance-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.create-maintenance-form__form-content {
  display: flex;
  gap: 25px;
}

.create-maintenance-form__left-side,
.create-maintenance-form__right-side {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.create-maintenance-form__right-side {
  flex: 1;
}

.create-maintenance-form__left-side-inner-date-mileage {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.create-maintenance-form__left-side-inner {
  display: flex;
  gap: 25px;
  justify-content: space-between;
}

.create-maintenance-form__title {
  font-size: 17px;
  font-weight: 500;
}

.create-maintenance-form__buttons {
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

.create-maintenance-form__reset {
  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 0.45);
  }
}

.create-maintenance-form__add-file {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.5);
  color: #090f23;
  font-weight: 500;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.55);
  }
}

.hidden-input {
  display: none;
}

.selected-files {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  padding: 10px 12px;
  font-size: 15px;
  background: #090f23;
  border-radius: 12px;
  cursor: pointer;

  span {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.remove-file {
  background: #282828;
  border-radius: 2px;
  padding: 5px 8px;

  svg {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background: #222222;
  }
}

.create-maintenance-form__photo-container {
  margin-top: 10px;

  p {
    max-width: 210px;
    margin-bottom: 16px;
  }

  img {
    width: 120px;
    height: 110px;
    object-fit: contain;
  }
}

.create-maintenance-form__photos {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.selected-images {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.image-preview {
  position: relative;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
}

.remove-image {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 4px;

  svg {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
}

.create-maintenance-form__photo {
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.create-maintenance-form-devider {
  margin: 10px 0;
  width: 100%;
  height: 1px;
  background-color: #979797;
}
</style>
