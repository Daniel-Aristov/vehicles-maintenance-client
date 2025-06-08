<template>
  <div
    class="maintenance-card-history"
    @click="$emit('click', maintenanceRecord)"
  >
    <div class="maintenance-card-history__header">
      <p class="maintenance-card-history__title">
        {{ maintenanceRecord.title }}
      </p>
      <p class="maintenance-card-history__date">
        <DateIcon class="maintenance-card-history__icon" />
        <span>Дата: {{ formattedDate }}</span>
      </p>
    </div>
    <div class="maintenance-card-history__content">
      <p v-if="maintenanceRecord.maintenance_performer === 'owner'">
        <PersonIcon class="maintenance-card-history__icon" />
        <span>Запись о личном техническом обслуживании</span>
      </p>
      <p
        v-else-if="
          maintenanceRecord.maintenance_performer === 'unregistered_service'
        "
      >
        <ServiceIcon class="maintenance-card-history__icon" />
        <span>Запись об обслуживании в незарегистрированном сервисе</span>
      </p>
      <div
        v-else-if="
          maintenanceRecord.maintenance_performer === 'registered_service'
        "
        class="maintenance-card-history__service"
      >
        <p>
          <ServiceIcon class="maintenance-card-history__icon" />
          <span>Сервис: </span> {{ serviceName }}
        </p>
        <p>
          <AdressIcon class="maintenance-card-history__icon" />
          <span>Адрес: </span> {{ serviceAddress }}
        </p>
      </div>
    </div>
    <button
      v-if="showGenerateButton"
      class="maintenance-card-details__generate-button"
      @click="handleGeneratePurchaseOrder"
    >
      Сгенерировать накладную
    </button>
  </div>
</template>

<script setup lang="ts">
import { MaintenanceRecord } from '@/types/maintenace'
import { computed } from 'vue'
import PersonIcon from '@/components/icons/PersonIcon.vue'
import DateIcon from '@/components/icons/DateIcon.vue'
import ServiceIcon from '@/components/icons/ServiceIcon.vue'
import AdressIcon from '@/components/icons/AdressIcon.vue'
import { useServicesStore } from '@/store/services.store'
import { useMaintenanceStore } from '@/store/maintenace.store'
import { useRoute } from 'vue-router'

const serviceStore = useServicesStore()
const maintenanceStore = useMaintenanceStore()
const route = useRoute()

const props = defineProps<{
  maintenanceRecord: MaintenanceRecord
}>()

defineEmits(['click'])

const formattedDate = computed(() => {
  return new Date(props.maintenanceRecord.date).toLocaleDateString('ru-RU')
})

const service = computed(() => {
  if (!props.maintenanceRecord.service_id) return null
  return serviceStore.getServiceById(props.maintenanceRecord.service_id)
})

const serviceName = computed(() => {
  return service?.value?.name
})

const serviceAddress = computed(() => {
  return service?.value?.address
})

const showGenerateButton = computed(() => {
  return (
    props.maintenanceRecord.maintenance_performer === 'registered_service' &&
    props.maintenanceRecord.service_id === Number(route.params.id)
  )
})

const handleGeneratePurchaseOrder = async (event: Event) => {
  event.stopPropagation()
  await maintenanceStore.getMaintenancePurchaseOrders(
    props.maintenanceRecord.id
  )
}
</script>

<style scoped>
.maintenance-card-history {
  width: 96%;
  background-color: #090f23;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

.maintenance-card-history__title {
  font-size: 18px;
  font-weight: 600;
}

.maintenance-card-history__date {
  display: flex;
  align-items: center;
  gap: 10px;
}

.maintenance-card-history__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.maintenance-card-history__content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  margin-top: 8px;

  p {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.maintenance-card-history__icon {
  width: 16px;
  height: 16px;
}

.maintenance-card-history__download-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px 12px;
  background: #1a2544;
  border-radius: 8px;
  font-size: 14px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.maintenance-card-history__service {
  font-weight: 500;
}

.maintenance-card-details__generate-button {
  background: none;
  margin-top: 12px;
  max-width: 280px;
  padding: 8px 16px;
  border: 1px solid #fff;
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}
</style>
