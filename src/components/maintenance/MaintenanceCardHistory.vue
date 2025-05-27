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
        <CarServiceIcon class="maintenance-card-history__icon" />
        <span>Запись о неизвестном сервисе</span>
      </p>
      <div
        v-else-if="
          maintenanceRecord.maintenance_performer === 'registered_service'
        "
      >
        <p>
          <ServiceIcon class="maintenance-card-history__icon" />
          Сервис: Сервис №4
        </p>
        <p>
          <AdressIcon class="maintenance-card-history__icon" />
          Адрес: Ярославская область, г. Ярославль, ул. Нефтяников, 17А
        </p>
      </div>
      <div v-else>
        <p>
          <ServiceIcon class="maintenance-card-history__icon" />
          Сервис: Сервис №4
        </p>
        <p>
          <AdressIcon class="maintenance-card-history__icon" />
          Адрес: Ярославская область, г. Ярославль, ул. Нефтяников, 17А
        </p>
        <button
          class="maintenance-card-history__download-btn"
          @click.stop="getMaintenancePurchaseOrders"
        >
          <DocsIcon class="maintenance-card-history__icon" />
          <span>Скачать заказ-наряд</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MaintenanceRecord } from '@/types/maintenace'
import { computed } from 'vue'
import PersonIcon from '@/components/icons/PersonIcon.vue'
import CarServiceIcon from '@/components/icons/CarServiceIcon.vue'
import DateIcon from '@/components/icons/DateIcon.vue'
import ServiceIcon from '@/components/icons/ServiceIcon.vue'
import AdressIcon from '@/components/icons/AdressIcon.vue'
import DocsIcon from '@/components/icons/DocsIcon.vue'
import purchaseOrderPdf from '@/assets/Purchase-order.pdf'

const props = defineProps<{
  maintenanceRecord: MaintenanceRecord
}>()

defineEmits(['click'])

const formattedDate = computed(() => {
  return new Date(props.maintenanceRecord.date).toLocaleDateString('ru-RU')
})

const getMaintenancePurchaseOrders = () => {
  const link = document.createElement('a')
  link.href = purchaseOrderPdf
  link.download = 'Purchase-order.pdf'
  link.target = '_blank'
  link.click()
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
</style>
