<template>
  <div class="maintenance-history">
    <div class="maintenance-history__header">
      <p v-if="!isFormVisible && !selectedRecord">
        История технического обслуживания
      </p>
      <button
        v-if="!isFormVisible && !selectedRecord"
        class="maintenance-history__button"
        @click="toggleForm"
      >
        <PlusIcon />
        <span>Добавить запись</span>
      </button>
    </div>
    <CreateMaintenanceFormWorker
      v-if="isFormVisible && isServiceContext"
      :service-id="Number(route.params.id)"
      :vehicle-id="vehicleId"
      @update:formVisible="handleFormVisible"
    />
    <CreateMaintenanceFormDriver
      v-if="isFormVisible && !isServiceContext"
      :vehicle-id="vehicleId"
      @update:formVisible="handleFormVisible"
    />
    <MaintenanceCardDetails
      v-if="selectedRecord"
      :maintenance-record="selectedRecord"
      @close="handleCloseDetails"
    />
    <div v-if="!isFormVisible && !selectedRecord">
      <div
        v-if="maintenanceStore.maintenanceRecords.length"
        class="maintenance-history__cards"
      >
        <MaintenanceCardHistory
          v-for="maintenanceRecord in maintenanceStore.maintenanceRecords"
          :key="maintenanceRecord.date"
          :maintenance-record="maintenanceRecord"
          @click="handleCardClick"
        />
      </div>
      <div v-else class="maintenance-history__empty">
        <p>Записей технического обслуживания нет!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import MaintenanceCardHistory from '@/components/maintenance/MaintenanceCardHistory.vue'
import CreateMaintenanceFormDriver from '@/components/maintenance/CreateMaintenanceFormDriver.vue'
import CreateMaintenanceFormWorker from '@/components/maintenance/CreateMaintenanceFormWorker.vue'
import MaintenanceCardDetails from '@/components/maintenance/MaintenanceCardDetails.vue'
import { useMaintenanceStore } from '@/store/maintenace.store'
import { MaintenanceRecord } from '@/types/maintenace'
import { useRoute } from 'vue-router'

const maintenanceStore = useMaintenanceStore()
const route = useRoute()

const emit = defineEmits(['update:formVisible', 'update:selectedRecord'])
const isFormVisible = ref(false)
const selectedRecord = ref<MaintenanceRecord | null>(null)

const props = defineProps<{
  vehicleId: number
  isServiceContext: boolean
}>()

onMounted(async () => {
  await maintenanceStore.getMaintenanceRecords(props.vehicleId)
})

const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value
  emit('update:formVisible', isFormVisible.value)
}

const handleFormVisible = (value: boolean) => {
  isFormVisible.value = value
  emit('update:formVisible', value)
}

const handleCardClick = (record: MaintenanceRecord) => {
  selectedRecord.value = record
  emit('update:selectedRecord', record)
}

const handleCloseDetails = () => {
  selectedRecord.value = null
  emit('update:selectedRecord', null)
}
</script>

<style scoped>
.maintenance-history {
  padding-top: 20px;
}

.maintenance-history__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.maintenance-history__button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 15px;
  min-width: 220px;

  svg {
    width: 16px;
    height: 16px;
  }
}

.maintenance-history__cards {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.maintenance-history__empty {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #666;
  margin-top: 40px;
}
</style>
