<template>
  <div>
    <div class="vehicles-list">
      <VehicleCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
      />
      <div>
        <div
          v-if="!isOwner"
          class="vehicles-list__add-button"
          @click="becomeOwner"
        >
          Стать автовладельцем
        </div>
        <div
          v-if="isOwner"
          class="vehicles-list__add-button"
          @click="$router.push('/vehicles/create')"
        >
          <PlusIcon />
          <span>Добавить автомобиль</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVehicleStore } from '@/store/vehicle.store'
import { useUserStore } from '@/store/user.store'
import VehicleCard from '@/components/vehicles/VehicleCard.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PlusIcon from '@/components/icons/PlusIcon.vue'

const router = useRouter()
const vehicleStore = useVehicleStore()
const userStore = useUserStore()

const vehicles = computed(() => vehicleStore.vehicles)
const isOwner = computed(() => userStore.user?.roles.includes('owner'))

const becomeOwner = async () => {
  try {
    await userStore.assignNewRoleUser({ role: 'owner' })
    router.push('/vehicles/create')
  } catch (error) {
    console.error('Ошибка при получении роли владельца:', error)
  }
}
</script>

<style scoped>
.vehicles-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 0 36px;
  min-height: 70px;
  max-height: 80vh;
  overflow-y: auto;
}

.vehicles-list__add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 320px;
  height: 150px;
  padding: 16px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
