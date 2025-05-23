<template>
  <div class="service-detail">
    <div class="tabs" v-if="isServiceManager">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <div v-show="activeTab === 'info'" class="service-detail__content-wrapper">
      <div class="service-detail__header">
        <img
          class="service-detail__header-image"
          src="@/assets/images/service-default.jpg"
          alt="service"
        />
        <div>
          <h1 class="service-detail__title">{{ service?.name }}</h1>
          <div class="service-detail__info">
            <div class="service-detail__info-item">
              <AdressIcon />
              <p>{{ service?.address }}</p>
            </div>
            <div class="service-detail__info-item">
              <InternetIcon />
              <a
                :href="`https://${service?.website}`"
                target="_blank"
                rel="noopener noreferrer"
                >{{ service?.website }}</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="service-detail__content">
        <p class="service-detail__description">
          {{ service?.summary }}
        </p>
        <div class="service-detail__timetable">
          <TimeIcon />
          <p>{{ service?.timetable }}</p>
        </div>
        <div class="service-detail__additional">
          <div class="service-detail__additional-item">
            <p class="label">Коммерческое название:</p>
            <p>{{ service?.commercial_name }}</p>
          </div>
          <div class="service-detail__additional-item">
            <p class="label">ИНН:</p>
            <p>{{ service?.inn }}</p>
          </div>
          <div class="service-detail__additional-item">
            <p class="label">ОГРН:</p>
            <p>{{ service?.ogrn }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="activeTab === 'workers'"
      class="service-detail__content-wrapper"
    >
      <ServiceWorkersList :service-id="Number(route.params.id)" />
    </div>

    <div
      v-show="activeTab === 'clients'"
      class="service-detail__content-wrapper"
    >
      <ServiceClientsList :service-id="Number(route.params.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useServicesStore } from '@/store/services.store'
import { useUserStore } from '@/store/user.store'
import TimeIcon from '@/components/icons/TimeIcon.vue'
import AdressIcon from '@/components/icons/AdressIcon.vue'
import InternetIcon from '@/components/icons/InternetIcon.vue'
import ServiceWorkersList from '@/components/services/ServiceWorkersList.vue'
import ServiceClientsList from '@/components/services/ServiceClientsList.vue'

const route = useRoute()
const servicesStore = useServicesStore()
const userStore = useUserStore()

const activeTab = ref('info')

const tabs = [
  { id: 'info', name: 'Информация о сервисе' },
  { id: 'workers', name: 'Работники' },
  { id: 'clients', name: 'Клиенты' }
]

const service = computed(() => {
  const id = Number(route.params.id)
  return servicesStore.getServiceById(id)
})

const isServiceManager = computed(() => {
  return service.value?.manager_id === userStore.user?.id
})
</script>

<style scoped>
.service-detail {
  max-width: 1190px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  justify-content: start;
  gap: 10px;
  margin-bottom: 26px;
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

.service-detail__content-wrapper {
  background-color: #090f23;
  border-radius: 12px;
  padding: 26px;
}

.service-detail__header {
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 50px;
  margin-bottom: 16px;
}

.service-detail__header-image {
  width: auto;
  max-height: 160px;
  border-radius: 6px;
  object-fit: cover;
}

.service-detail__title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.service-detail__info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.service-detail__info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.service-detail__description {
  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  p {
    font-size: 15px;
    line-height: 1.6;
    color: #c2c2c2;
  }
}

.service-detail__timetable {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  margin-top: 30px;
}

.service-detail__additional {
  margin-top: 30px;
}

.service-detail__additional-item {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 2px;
  font-size: 15px;

  .label {
    font-weight: 600;
  }
}
</style>
