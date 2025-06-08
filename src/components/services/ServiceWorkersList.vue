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
          <div class="worker-card__name">
            <img src="@/assets/images/avatar-default.png" alt="worker-avatar" />
            <p>
              {{ worker.last_name }} {{ worker.first_name }}
              {{ worker.patronymic }}
            </p>
          </div>
          <p class="worker-card__email">{{ worker.email }}</p>
          <p class="worker-card__phone">{{ worker.phone }}</p>
          <p class="worker-card__position">{{ worker.position }}</p>
          <div class="worker-card__rating">
            <StarIcon color="#ffc107" />
            <p>{{ worker.rating }}</p>
          </div>
          <div
            v-if="isServiceManager || isServiceClient"
            @click.stop="togglePopMenu(worker.id)"
            class="worker-card__pop-menu"
          >
            <div>
              <PopMenuIcon />
            </div>
            <PopMenu
              :is-open="activePopMenuId === worker.id"
              :items="menuItems"
              @dismiss="() => handlePopMenuAction('dismiss', worker.id)"
              @rate="() => handlePopMenuAction('rate', worker.id)"
              @update:is-open="() => (activePopMenuId = null)"
            />
          </div>
        </div>
      </div>
    </div>
    <InviteWorkerModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @submit="handleInviteWorker"
    />
    <RateWorkerModal
      v-if="isRateModalOpen"
      @close="isRateModalOpen = false"
      @submit="handleSetRating"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import InviteWorkerModal from '@/components/services/InviteWorkerModal.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import { useServicesStore } from '@/store/services.store'
import PopMenuIcon from '@/components/icons/PopMenuIcon.vue'
import PopMenu from '@/components/common/PopMenu.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import RateWorkerModal from '@/components/services/RateWorkerModal.vue'

const servicesStore = useServicesStore()

const props = defineProps<{
  serviceId: number
  isServiceManager: boolean
  isServiceClient: boolean
}>()

const isModalOpen = ref(false)
const isRateModalOpen = ref(false)
const activePopMenuId = ref<number | null>(null)
const selectedWorkerId = ref<number | null>(null)

const workers = computed(() => {
  return servicesStore.serviceWorkers
})

const menuItems = computed(() => {
  const items = []

  if (props.isServiceManager) {
    items.push({
      id: 'dismiss',
      label: 'Уволить',
      action: 'dismiss',
      type: 'danger' as const
    })
  }

  if (props.isServiceClient) {
    items.push({
      id: 'rate',
      label: 'Оценить',
      action: 'rate',
      type: 'default' as const
    })
  }

  return items
})

const handleInviteWorker = (data: { email: string; position: string }) => {
  servicesStore.inviteWorker(data, props.serviceId)
}

const handleDismissWorker = (workerId: number) => {
  servicesStore.dismissWorker(props.serviceId, workerId)
  activePopMenuId.value = null
}

const handleRateWorker = (workerId: number) => {
  selectedWorkerId.value = workerId
  isRateModalOpen.value = true
  activePopMenuId.value = null
}

const handleSetRating = async (rating: number) => {
  if (selectedWorkerId.value) {
    await servicesStore.setWorkerRating(
      props.serviceId,
      selectedWorkerId.value,
      rating
    )
    await servicesStore.getServiceWorkers(props.serviceId)
  }
}

const handlePopMenuAction = (action: string, workerId: number) => {
  switch (action) {
    case 'dismiss':
      handleDismissWorker(workerId)
      break
    case 'rate':
      handleRateWorker(workerId)
      break
  }
}

const togglePopMenu = (workerId: number) => {
  activePopMenuId.value = activePopMenuId.value === workerId ? null : workerId
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
  margin-bottom: 16px;

  p {
    font-size: 18px;
    font-weight: 500;
  }
}

.worker-card {
  display: flex;
  align-items: center;
  position: relative;
  gap: 50px;
  padding: 12px;
  background-color: #22293f;
  border-radius: 12px;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.worker-card__name {
  min-width: 320px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.workers-list__content {
  max-height: 70vh;
}

.worker-card__email,
.worker-card__phone {
  font-size: 15px;
  color: #d2d2d2;
}

.worker-card__phone {
  min-width: 140px;
}

.worker-card__pop-menu {
  position: absolute;
  right: 25px;
  top: 14px;
  cursor: pointer;
  width: 26px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  svg {
    width: 4px;
    height: 16px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
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

.worker-card__position {
  min-width: 150px;
}

.workers-list__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.worker-card__rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
}

.worker-card__email,
.worker-card__phone {
  font-size: 15px;
  color: #d2d2d2;
}
</style>
