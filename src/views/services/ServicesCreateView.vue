<template>
  <div class="vehicle-create">
    <h2 class="vehicle-create__title">Добавление автосервиса</h2>
    <CreateServiceForm @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import CreateServiceForm from '@/components/services/CreateServiceForm.vue'
import { useServicesStore } from '@/store/services.store'
import { useRouter } from 'vue-router'
import { CreateServiceDto } from '@/js/models/services.dto'

const servicesStore = useServicesStore()
const router = useRouter()

const onSubmit = (data: CreateServiceDto) => {
  servicesStore.createService(data)
  router.push('/services')
}
</script>

<style scoped>
.vehicle-create__title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
}

.vehicle-create {
  padding: 0 36px;
  max-height: 80vh;
  overflow-y: auto;
}

.vehicle-create__form {
  margin-top: 20px;
}
</style>
