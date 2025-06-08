<template>
  <div>
    <div class="tabs">
      <button
        :class="['tab-button', { active: activeTab === 'all' }]"
        @click="activeTab = 'all'"
      >
        Все сервисы
      </button>
      <button
        :class="['tab-button', { active: activeTab === 'manager' }]"
        @click="activeTab = 'manager'"
      >
        Я владелец
      </button>
      <button
        :class="['tab-button', { active: activeTab === 'worker' }]"
        @click="activeTab = 'worker'"
      >
        Я работник
      </button>
      <button
        :class="['tab-button', { active: activeTab === 'client' }]"
        @click="activeTab = 'client'"
      >
        Я клиент
      </button>
    </div>
    <div class="services-list">
      <div v-if="!displayedServices.length" class="no-services">
        <p v-if="activeTab === 'all'">Автосервисы не найдены</p>
        <p v-else-if="activeTab === 'manager'">
          Вы не являетесь владельцем ни одного автосервиса
        </p>
        <p v-else-if="activeTab === 'worker'">
          Вы не работаете ни в одном автосервисе
        </p>
        <p v-else-if="activeTab === 'client'">
          Вы не являетесь клиентом ни одного автосервиса
        </p>
      </div>
      <ServiceCard
        v-else
        v-for="service in displayedServices"
        :key="service.id"
        :service="service"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, watch, computed, onMounted } from 'vue'
import { useServicesStore } from '@/store/services.store'
import ServiceCard from '@/components/services/ServiceCard.vue'
import { Ref } from 'vue'
import { Service } from '@/types/service.types'

const servicesStore = useServicesStore()
const activeTab = ref('all')
const searchQuery = ref('')

const searchText = inject('searchText') as Ref<string>
watch(searchText, (newValue) => {
  searchQuery.value = newValue
})

const displayedServices = computed(() => {
  let services: Service[] = []

  switch (activeTab.value) {
    case 'all':
      services = servicesStore.getAllServices
      break
    case 'manager':
      services = servicesStore.getManagerServices
      break
    case 'worker':
      services = servicesStore.getWorkerServices
      break
    case 'client':
      services = servicesStore.getClientServices
      break
  }

  if (searchQuery.value) {
    services = services.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return services
})

onMounted(async () => {
  await servicesStore.getServices()
  await servicesStore.getServicesWithCurrentManager()
  await servicesStore.getServicesWithCurrentWorker()
  await servicesStore.getServicesWithCurrentClient()
})
</script>

<style scoped>
.services-list {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  max-height: 75vh;
  overflow-y: auto;
}

.tabs {
  display: flex;
  justify-content: start;
  gap: 10px;
  margin-bottom: 36px;
  margin-left: 120px;
}

.tab-button {
  padding: 8px 20px;
  border: none;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  min-width: 150px;
  cursor: pointer;
  color: white;
  background-color: rgba(116, 116, 116, 0.5);
  transition: all 0.3s ease;

  &.active {
    background-color: #132974;
  }
}

.no-services {
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-top: 40px;
}
</style>
