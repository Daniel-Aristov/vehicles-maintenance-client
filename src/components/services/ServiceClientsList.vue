<template>
  <div class="clients-list">
    <div class="clients-list__header">
      <p>Список клиентов</p>
      <button class="clients-list__add-button" @click="isModalOpen = true">
        <PlusIcon />
        <span>Добавить клиента</span>
      </button>
    </div>
    <div class="clients-list__content">
      <div v-if="clients.length === 0" class="clients-list__empty">
        <p>Список клиентов пуст</p>
      </div>
      <div v-else class="clients-list__items">
        <div v-for="client in clients" :key="client.id" class="client-card">
          <img src="@/assets/images/avatar-default.png" alt="client-avatar" />
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
    <InviteClientModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @submit="handleInviteClient"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import InviteClientModal from '@/components/services/InviteClientModal.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import { useServicesStore } from '@/store/services.store'

const servicesStore = useServicesStore()

const props = defineProps<{
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

const isModalOpen = ref(false)

const handleInviteClient = (data: { email: string }) => {
  servicesStore.inviteClient({ email: data.email }, props.serviceId)
}
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

.clients-list__add-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;

  svg {
    width: 14px;
    height: 14px;
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

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
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
