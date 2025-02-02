<template>
  <div>
    <p class="text-xl font-bold mb-4">Сервисы:</p>
    <div
      v-if="services.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="service in services"
        :key="service.id"
        class="p-4 border rounded-lg shadow"
      >
        <h3 class="font-semibold">{{ service.name }}</h3>
        <p class="text-gray-600">{{ service.summary }}</p>
      </div>
    </div>
    <p v-else>Загрузка сервисов...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useServicesStore } from '@/store/services'
import { Service } from '@/types/service.types'

export default defineComponent({
  name: 'App',
  data() {
    return {
      store: useServicesStore(),
      services: [] as Service[]
    }
  },
  created() {
    this.loadServices()
  },
  methods: {
    async loadServices() {
      await this.store.getAllServices()
      this.services = this.store.services
    }
  }
})
</script>
