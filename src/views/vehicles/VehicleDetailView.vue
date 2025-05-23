<template>
  <div class="vehicle-detail">
    <div class="vehicle-detail__header-container">
      <div class="vehicle-detail__header">
        <img
          :src="vehicle?.generation.photo_url"
          alt="vehicle"
          class="vehicle-detail__header-image"
        />
        <div class="vehicle-detail__header-info">
          <div class="vehicle-detail__header-text-container">
            <p class="vehicle-detail__header-text">
              <span>Марка: </span>
              {{ vehicle?.make.name }}
            </p>
            <p class="vehicle-detail__header-text">
              <span>Модель: </span>
              {{ vehicle?.model.name }}
            </p>
          </div>
          <p class="vehicle-detail__header-text">
            <span>Модельный ряд: </span>
            {{ vehicle?.range.name }}
          </p>
          <p class="vehicle-detail__header-text">
            <span>VIN: </span>
            {{ vehicle?.vin }}
          </p>
          <p class="vehicle-detail__header-text">
            <span>Регистрационный номер: </span>
            {{ vehicle?.registration_plate }}
          </p>
        </div>
      </div>
      <div class="vehicle-detail__header-card-info-container">
        <div class="vehicle-detail__header-card-info">
          <p class="vehicle-detail__header-card-info-title">Поколение</p>
          <div class="vehicle-detail__header-card-info-text-container">
            <p>Полное название: {{ vehicle?.generation.full_name }}</p>
            <p>Короткое название: {{ vehicle?.generation.short_name }}</p>
            <p>Кузов: {{ vehicle?.generation.vehicle_body }}</p>
          </div>
        </div>
        <div class="vehicle-detail__header-card-info">
          <p class="vehicle-detail__header-card-info-title">Конфигурация</p>
          <div class="vehicle-detail__header-card-info-text-container">
            <p>Мощность двигателя: {{ vehicle?.configuration.engine_power }}</p>
            <p>Объем двигателя: {{ vehicle?.configuration.engine_capacity }}</p>
            <p>Тип двигателя: {{ vehicle?.configuration.engine_type }}</p>
            <p>Коробка передач: {{ vehicle?.configuration.transmission }}</p>
            <p>Привод: {{ vehicle?.configuration.drive }}</p>
          </div>
        </div>
        <div class="vehicle-detail__header-card-info">
          <p class="vehicle-detail__header-card-info-title">Прочие параметры</p>
          <div class="vehicle-detail__header-card-info-text-container">
            <p>Год производства: {{ vehicle?.manufacture_year }}</p>
            <p>Цвет: {{ vehicle?.color }}</p>
            <p>Пробег: {{ vehicle?.mileage }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="vehicle-detail__history">
      <div class="vehicle-detail__history-header">
        <p>История технического обслуживания</p>
        <button class="vehicle-detail__history-button">
          <PlusIcon />
          <span>Добавить запись</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVehicleStore } from '@/store/vehicle.store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PlusIcon from '@/components/icons/PlusIcon.vue'

const route = useRoute()
const vehicleStore = useVehicleStore()

const vehicle = computed(() => {
  const id = Number(route.params.id)
  return vehicleStore.getVehicleById(id)
})
</script>

<style scoped>
.vehicle-detail {
  max-width: 1190px;
  margin: 0 auto;
}

.vehicle-detail__header-container {
  border-bottom: 2px solid #5a5a5a;
  padding-bottom: 30px;
}

.vehicle-detail__header {
  display: flex;
  gap: 50px;

  img {
    width: 250px;
    height: 140px;
    object-fit: cover;
    border-radius: 12px;
  }
}

.vehicle-detail__header-info {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.vehicle-detail__header-text-container {
  display: flex;
  gap: 30px;
}

.vehicle-detail__header-card-info-container {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.vehicle-detail__header-card-info {
  background-color: #090f23;
  border-radius: 12px;
  padding: 18px 24px;
  width: 360px;
  height: 175px;
}

.vehicle-detail__header-card-info-text-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  font-size: 15px;
}

.vehicle-detail__header-card-info-title {
  font-size: 16px;
  font-weight: 600;
}

.vehicle-detail__header-text {
  font-size: 17px;

  span {
    font-weight: 600;
  }
}

.vehicle-detail__history {
  padding-top: 20px;
}

.vehicle-detail__history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vehicle-detail__history-button {
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
</style>
