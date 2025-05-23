<template>
  <div class="clients-list">
    <div class="clients-list__header">
      <p>Список клиентов</p>
    </div>
    <div class="clients-list__content">
      <div v-if="clients.length === 0" class="clients-list__empty">
        <p>Список клиентов пуст</p>
      </div>
      <div v-else class="clients-list__items">
        <div v-for="client in clients" :key="client.id" class="client-card">
          <img
            src="@/assets/images/avatar-default.png"
            alt="client"
            class="client-card__avatar"
          />
          <div class="client-card__info">
            <p class="client-card__name">
              {{ client.last_name }} {{ client.first_name }}
              {{ client.patronymic }}
            </p>
            <p class="client-card__email">{{ client.email }}</p>
            <p class="client-card__phone">{{ client.phone }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineProps<{
  serviceId: number
}>()

const clients = computed(() => {
  return [
    {
      id: 1,
      photo_path: '/images/worker1.jpg',
      last_name: 'Иванов',
      first_name: 'Иван',
      patronymic: 'Иванович',
      email: 'ivanov@example.com',
      phone: '+79991234567'
    }
  ]
})
</script>

<style scoped>
.clients-list {
  width: 100%;
}

.clients-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  p {
    font-size: 18px;
    font-weight: 500;
  }
}

.clients-list__empty {
  text-align: center;
  padding: 40px;
  color: #858585;
}

.clients-list__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.client-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  background-color: #132974;
  border-radius: 8px;
}

.client-card__avatar {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
}

.client-card__info {
  flex: 1;
}

.client-card__name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.client-card__email,
.client-card__phone {
  font-size: 14px;
  color: #858585;
}

.client-card__vehicles {
  padding: 6px 16px;
  background-color: rgba(116, 116, 116, 0.3);
  border-radius: 4px;
}

.client-card__vehicles-count {
  font-size: 14px;
  color: #858585;
}
</style>
