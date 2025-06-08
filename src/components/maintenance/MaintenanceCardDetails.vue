<template>
  <div class="maintenance-card-details">
    <div class="maintenance-card-details__header">
      <p class="maintenance-card-details__title">
        Информация о техническом обслуживании
      </p>
      <button class="maintenance-card-details__close" @click="$emit('close')">
        <CloseIcon color="#fff" />
      </button>
    </div>
    <div class="maintenance-card-details__content">
      <div class="maintenance-card-details__left-side">
        <div class="maintenance-card-details__field">
          <p class="maintenance-card-details__label">Название</p>
          <p class="maintenance-card-details__value">
            {{ maintenanceRecord.title }}
          </p>
        </div>
        <div
          v-if="maintenanceRecord.description"
          class="maintenance-card-details__field"
        >
          <p class="maintenance-card-details__label">Описание</p>
          <p class="maintenance-card-details__value">
            {{ maintenanceRecord.description || 'Нет описания' }}
          </p>
        </div>
        <div class="maintenance-card-details__field">
          <p class="maintenance-card-details__label">Дата выполнения</p>
          <p class="maintenance-card-details__value">{{ formattedDate }}</p>
        </div>
        <div class="maintenance-card-details__field">
          <p class="maintenance-card-details__label">Пробег</p>
          <p class="maintenance-card-details__value">
            {{ maintenanceRecord.mileage }} км
          </p>
        </div>
        <div
          v-if="maintenanceRecord.photos?.length"
          class="maintenance-card-details__field"
        >
          <p class="maintenance-card-details__label">Фотографии</p>
          <div class="maintenance-card-details__photos">
            <img
              v-for="photo in maintenanceRecord.photos"
              :key="photo.photo_path"
              :src="'http://localhost:8000' + photo.photo_path"
              alt="Фотография"
            />
          </div>
        </div>
      </div>
      <div class="maintenance-card-details__right-side">
        <div class="maintenance-card-details__field">
          <p class="maintenance-card-details__label">Кем выполнена</p>
          <p class="maintenance-card-details__value">
            {{ getMaintenancePerformerLabel }}
          </p>
        </div>
        <div
          v-if="maintenanceRecord.responsible"
          class="maintenance-card-details__field"
        >
          <p class="maintenance-card-details__label">Ответственный за работу</p>
          <p class="maintenance-card-details__value">
            {{ getMaintenanceResponsibleLabel }}
          </p>
        </div>
        <div class="maintenance-card-details__field">
          <p class="maintenance-card-details__label">Стоимость запчастей</p>
          <p class="maintenance-card-details__value">
            {{ maintenanceRecord.parts_cost }} ₽
          </p>
        </div>
        <div class="maintenance-card-details__field">
          <p class="maintenance-card-details__label">Стоимость работ</p>
          <p class="maintenance-card-details__value">
            {{ maintenanceRecord.labor_cost }} ₽
          </p>
        </div>
        <div class="maintenance-card-details__field">
          <p class="maintenance-card-details__label">Итоговая стоимость</p>
          <p
            class="maintenance-card-details__value maintenance-card-details__total"
          >
            {{ maintenanceRecord.total_cost }} ₽
          </p>
        </div>
        <div
          v-if="maintenanceRecord.documents?.length"
          class="maintenance-card-details__field"
        >
          <p class="maintenance-card-details__label">Документы</p>
          <div class="maintenance-card-details__documents">
            <a
              v-for="document in maintenanceRecord.documents"
              :key="document.document_path"
              :href="'http://localhost:8000' + document.document_path"
              target="_blank"
              class="maintenance-card-details__document"
            >
              <DocsIcon />
              <span>{{ document.document_path.split('/').pop() }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MaintenanceRecord } from '@/types/maintenace'
import { computed } from 'vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import DocsIcon from '@/components/icons/DocsIcon.vue'
import { useServicesStore } from '@/store/services.store'

const servicesStore = useServicesStore()

const props = defineProps<{
  maintenanceRecord: MaintenanceRecord
}>()

defineEmits(['close'])

const formattedDate = computed(() => {
  return new Date(props.maintenanceRecord.date).toLocaleDateString('ru-RU')
})

const getMaintenancePerformerLabel = computed(() => {
  switch (props.maintenanceRecord.maintenance_performer) {
    case 'owner':
      return 'Владелец'
    case 'unregistered_service':
      return 'Незарегистрированный сервис'
    case 'registered_service':
      if (props.maintenanceRecord.service_id) {
        return (
          servicesStore.getServiceById(props.maintenanceRecord.service_id)
            ?.name || 'Неизвестно'
        )
      }
      return 'Зарегистрированный сервис'
    default:
      return 'Неизвестно'
  }
})

const getMaintenanceResponsibleLabel = computed(() => {
  if (props.maintenanceRecord.responsible) {
    return (
      props.maintenanceRecord.responsible.last_name +
      ' ' +
      props.maintenanceRecord.responsible.first_name +
      ' ' +
      props.maintenanceRecord.responsible.patronymic
    )
  }
  return 'Работник сервиса'
})
</script>

<style scoped>
.maintenance-card-details {
  background-color: #090f23;
  border-radius: 12px;
  padding: 24px;
}

.maintenance-card-details__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.maintenance-card-details__title {
  font-size: 17px;
  font-weight: 500;
}

.maintenance-card-details__close {
  background: none;
  padding: 8px;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    opacity: 0.8;
  }
}

.maintenance-card-details__content {
  display: flex;
  gap: 25px;
}

.maintenance-card-details__left-side,
.maintenance-card-details__right-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.maintenance-card-details__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.maintenance-card-details__label {
  font-size: 14px;
  color: #666;
}

.maintenance-card-details__value {
  font-size: 15px;
}

.maintenance-card-details__total {
  font-weight: 600;
  font-size: 16px;
}

.maintenance-card-details__documents {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.maintenance-card-details__document {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.maintenance-card-details__photos {
  display: flex;
  gap: 8px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 12px;
  }
}

.maintenance-card-details__document {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  padding: 10px 12px;
  font-size: 15px;
  background: #202020;
  border-radius: 12px;
  cursor: pointer;
  max-width: 440px;

  span {
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    width: 20px;
    height: 20px;
  }
}
</style>
