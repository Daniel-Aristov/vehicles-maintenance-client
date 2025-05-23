<template>
  <div class="vehicle-card" :style="cardStyle">
    <p class="vehicle-card__title">
      <span>{{ props.vehicle.make.name }}</span> -
      <span>{{ props.vehicle.model.name }}</span>
    </p>
    <p class="vehicle-card__generation">
      {{ props.vehicle.generation.full_name }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { Vehicle } from '@/types/vehicle.types'
import { computed } from 'vue'

const props = defineProps<{
  vehicle: Vehicle
}>()

const cardStyle = computed(() => ({
  backgroundImage: props.vehicle.generation.photo_url
    ? `url(${props.vehicle.generation.photo_url})`
    : 'none'
}))
</script>

<style scoped>
.vehicle-card {
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 320px;
  height: 150px;
  padding: 16px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0.5) 50%,
      transparent 100%
    );
    z-index: 0;
  }

  p {
    position: relative;
    z-index: 1;
  }
}

.vehicle-card__title {
  font-size: 18px;
  font-weight: 600;
}

.vehicle-card__generation {
  max-width: 240px;
  font-size: 14px;
  font-weight: 600;
  color: #b1b1b1;
}
</style>
