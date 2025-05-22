<template>
  <div class="workers-list">
    <div class="workers-list__header">
      <p>Список работников</p>
      <button class="workers-list__add-button" @click="isModalOpen = true">
        <PlusIcon />
        <span>Добавить работника</span>
      </button>
    </div>
    <div class="workers-list__content">
      <div v-if="workers.length === 0" class="workers-list__empty">
        <p>Список работников пуст</p>
      </div>
      <div v-else class="workers-list__items">
        <div v-for="worker in workers" :key="worker.id" class="worker-card">
          <img
            src="@/assets/images/avatar-default.png"
            alt="worker"
            class="worker-card__avatar"
          />
          <div class="worker-card__info">
            <p class="worker-card__name">
              {{ worker.last_name }} {{ worker.first_name }}
              {{ worker.patronymic }}
            </p>
            <p class="worker-card__email">{{ worker.email }}</p>
            <p class="worker-card__phone">{{ worker.phone }}</p>
          </div>
          <button class="worker-card__remove">Удалить</button>
        </div>
      </div>
    </div>
    <InviteWorkerModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @submit="handleInviteWorker"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import InviteWorkerModal from '@/components/services/InviteWorkerModal.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import { useServicesStore } from '@/store/services.store'

const servicesStore = useServicesStore()

const props = defineProps<{
  serviceId: number
}>()

const isModalOpen = ref(false)

const workers = computed(() => {
  return [
    {
      id: 1,
      photo_path: null,
      last_name: 'Иванов',
      first_name: 'Иван',
      patronymic: 'Иванович',
      email: 'ivanov@example.com',
      phone: '+79991234567'
    }
  ]
})

const handleInviteWorker = (data: { email: string; position: string }) => {
  servicesStore.inviteWorker(data, props.serviceId)
}
</script>

<style scoped>
.workers-list {
  width: 100%;
}

.workers-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  p {
    font-size: 18px;
    font-weight: 500;
  }
}

.workers-list__add-button {
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

.workers-list__empty {
  text-align: center;
  padding: 40px;
  color: #858585;
}

.workers-list__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.worker-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  background-color: #132974;
  border-radius: 8px;
}

.worker-card__avatar {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
}

.worker-card__info {
  flex: 1;
}

.worker-card__name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.worker-card__email,
.worker-card__phone {
  font-size: 14px;
  color: #858585;
}

.worker-card__remove {
  padding: 6px 16px;
  font-size: 14px;
  background-color: #ff4444;

  &:hover {
    background-color: #ff2222;
  }
}
</style>
