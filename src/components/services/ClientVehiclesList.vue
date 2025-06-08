<template>
  <div class="client-vehicles">
    <div v-if="!vehicles.length" class="client-vehicles__empty">
      <p>У клиента нет автомобилей</p>
    </div>
    <div v-else class="client-vehicles__list">
      <div
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        class="vehicle-card"
        @click="handleVehicleClick(vehicle.id)"
      >
        <div class="vehicle-card__main">
          <div class="vehicle-card__name-wrapper">
            <p class="vehicle-card__name">
              {{ vehicle.make.name }} {{ vehicle.model.name }}
            </p>
            <p class="vehicle-card__year">{{ vehicle.manufacture_year }} г.</p>
          </div>
          <p class="vehicle-card__registration-plate">
            Регистрационный знак: {{ vehicle.registration_plate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vehicle } from '@/types/vehicle.types'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

defineProps<{
  vehicles: Vehicle[]
}>()

const handleVehicleClick = (vehicleId: number) => {
  router.push({
    name: 'service-client-vehicle',
    params: {
      id: route.params.id,
      vehicleId: vehicleId.toString()
    }
  })
}
</script>

<style scoped>
.client-vehicles {
  margin-top: 10px;
  margin-left: 20px;
  padding: 10px;
  background-color: #1a2138;
  border-radius: 8px;
}

.client-vehicles__empty {
  padding: 15px;
  text-align: center;
  color: #858585;
}

.client-vehicles__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vehicle-card {
  padding: 12px;
  background-color: #22293f;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #273255;
  }
}

.vehicle-card__main {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.vehicle-card__name {
  font-weight: 600;
  font-size: 16px;
}

.vehicle-card__year {
  color: #b1b1b1;
  font-size: 16px;
}

.vehicle-card__name-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.vehicle-card__registration-plate {
  color: #ababab;
  font-size: 16px;
}

.vehicle-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #d2d2d2;
}
</style>
