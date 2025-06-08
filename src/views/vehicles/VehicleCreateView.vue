<template>
  <div class="vehicle-create">
    <p class="vehicle-create__title">Добавление автомобиля</p>
    <VehiclesCreateForm
      :make-options="makeOptions"
      :model-options="modelOptions"
      :range-options="rangeOptions"
      :generation-options="generationOptions"
      :configuration-options="configurationOptions"
      :error="errorCreateVehicle"
      @select-make="selectMake"
      @select-model="selectModel"
      @select-range="selectRange"
      @select-generation="selectGeneration"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useVehicleStore } from '@/store/vehicle.store'
import { useRouter } from 'vue-router'
import VehiclesCreateForm from '@/components/vehicles/VehiclesCreateForm.vue'
import { CreateVehicleDto } from '@/js/models/vehicle.dto'

const router = useRouter()
const vehicleStore = useVehicleStore()
const errorCreateVehicle = ref<string>('')

const makeOptions = computed(() => {
  return vehicleStore.makes.map((make) => ({
    value: make.id,
    label: make.name
  }))
})

const modelOptions = computed(() => {
  return vehicleStore.models.map((model) => ({
    value: model.id,
    label: model.name
  }))
})

const rangeOptions = computed(() => {
  return vehicleStore.ranges.map((range) => ({
    value: range.id,
    label: range.name
  }))
})

const generationOptions = computed(() => {
  return vehicleStore.generations.map((generation) => ({
    value: generation.id,
    label: generation.full_name
  }))
})

const configurationOptions = computed(() => {
  return vehicleStore.configurations.map((configuration) => ({
    value: configuration.id,
    label: `${configuration.engine_power} л.с., ${configuration.engine_type}, ${configuration.engine_capacity} л., ${configuration.transmission}, ${configuration.drive}`
  }))
})

const selectMake = async (makeId: number) => {
  await vehicleStore.getModels(makeId)
}

const selectModel = async (modelId: number) => {
  await vehicleStore.getRanges(modelId)
}

const selectRange = async (rangeId: number) => {
  await vehicleStore.getGenerations(rangeId)
}

const selectGeneration = async (generationId: number) => {
  await vehicleStore.getConfigurations(generationId)
}

const handleSubmit = async (vehicleData: CreateVehicleDto) => {
  try {
    await vehicleStore.createVehicle(vehicleData)
    router.push({ name: 'vehicles' })
  } catch (error) {
    errorCreateVehicle.value = error as string
  }
}

onMounted(async () => {
  await vehicleStore.getMakes()
})
</script>

<style scoped>
.vehicle-create {
  padding: 0 36px;
}

.vehicle-create__title {
  font-size: 20px;
  font-weight: 500;
}
</style>
