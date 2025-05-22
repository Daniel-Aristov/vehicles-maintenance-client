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
        :class="['tab-button', { active: activeTab === 'my' }]"
        @click="activeTab = 'my'"
      >
        Мои сервисы
      </button>
    </div>
    <div class="services-list">
      <ServiceCard
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

const servicesStore = useServicesStore()
const activeTab = ref('all')
const searchQuery = ref('')

const searchText = inject('searchText') as Ref<string>
watch(searchText, (newValue) => {
  searchQuery.value = newValue
})

const displayedServices = computed(() => {
  let services =
    activeTab.value === 'all'
      ? servicesStore.getAllServices
      : servicesStore.getCurrentUserServices

  if (searchQuery.value) {
    services = services.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return services
})

onMounted(async () => {
  await servicesStore.getServices()
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
  max-height: 85vh;
  overflow-y: auto;
}

.tabs {
  display: flex;
  justify-content: start;
  gap: 10px;
  margin-bottom: 36px;
  margin-left: 36px;
}

.tab-button {
  padding: 8px 20px;
  border: none;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  min-width: 220px;
  cursor: pointer;
  color: white;
  background-color: rgba(116, 116, 116, 0.5);
  transition: all 0.3s ease;

  &.active {
    background-color: #132974;
  }
}
</style>
