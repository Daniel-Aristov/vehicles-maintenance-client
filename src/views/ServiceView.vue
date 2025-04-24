<template>
  <div class="service-view">
    <div
      class="service-view__card"
      v-for="service in currentServicesByManager"
      :key="service.id"
    >
      <div class="service-view__card-header">
        <p class="service-view__title">{{ service.name }}</p>
        <div class="service-view__buttons">
          <button class="service-view__card-header-button" @click="goToProfile">
            Профиль
          </button>
        </div>
      </div>
      <div class="service-view__card-body">
        <div class="service-view__card-body-item">
          <p class="service-view__card-body-item-label">Адрес</p>
          <p class="service-view__card-body-item-value">
            {{ service.address }}
          </p>
        </div>
        <div class="service-view__card-body-item">
          <p class="service-view__card-body-item-label">Описание</p>
          <p class="service-view__card-body-item-value">
            {{ service.summary || 'Не указано' }}
          </p>
        </div>
        <div class="service-view__card-body-item">
          <p class="service-view__card-body-item-label">График работы</p>
          <p class="service-view__card-body-item-value">
            {{ service.timetable }}
          </p>
        </div>
        <div class="service-view__card-body-item">
          <p class="service-view__card-body-item-label">Веб-сайт</p>
          <p class="service-view__card-body-item-value">
            {{ service.website || 'Не указано' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useServicesStore } from '@/store/services.store'

export default defineComponent({
  components: {},
  data: () => ({}),
  props: {},
  emits: [],
  mounted() {
    this.loadServicesByCurrentManager()
  },
  computed: {
    ...mapStores(useServicesStore),
    currentServicesByManager() {
      return this.servicesStore.currentServicesByManager
    }
  },
  methods: {
    async loadServicesByCurrentManager() {
      await this.servicesStore.getServicesByCurrentManager()
    },
    goToProfile() {
      this.$router.push('/profile')
    }
  }
})
</script>

<style scoped>
.service-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.service-view__card {
  width: 600px;
  padding: 30px;
  box-shadow: 0 0 8px 0 rgba(140, 4, 230, 0.2);
  border-radius: 6px;
}

.service-view__card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.service-view__title {
  font-size: 22px;
  text-align: center;
  font-weight: 600;
}

.service-view__card-header-button {
  width: 100%;
  padding: 10px 30px;
}

.service-view__card-body-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.service-view__card-body-item-label {
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 2px;
}

.service-view__card-body-item-value {
  font-size: 17px;
  font-weight: 600;
}

.service-view__buttons {
  display: flex;
  gap: 10px;
}
</style>
