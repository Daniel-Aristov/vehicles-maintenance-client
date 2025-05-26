<template>
  <div class="maintenance-history">
    <div class="maintenance-history__header">
      <p v-if="!isFormVisible">История технического обслуживания</p>
      <button
        v-if="!isFormVisible"
        class="maintenance-history__button"
        @click="toggleForm"
      >
        <PlusIcon />
        <span>Добавить запись</span>
      </button>
    </div>
    <CreateMaintenanceForm
      v-if="isFormVisible"
      :vehicle-id="vehicleId"
      @update:formVisible="handleFormVisible"
    />
    <div v-if="!isFormVisible">
      <div v-if="maintenanceStore.maintenanceRecords.length">
        <MaintenanceCardHistory
          v-for="maintenanceRecord in maintenanceStore.maintenanceRecords"
          :key="maintenanceRecord.date"
          :maintenance-record="maintenanceRecord"
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
import CreateMaintenanceForm from '@/components/maintenance/CreateMaintenanceForm.vue'
import { useMaintenanceStore } from '@/store/maintenace.store'

const maintenanceStore = useMaintenanceStore()

const emit = defineEmits(['update:formVisible'])
const isFormVisible = ref(false)

const props = defineProps<{
  vehicleId: number
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

.maintenance-history__empty {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #666;
  margin-top: 40px;
}
</style>
