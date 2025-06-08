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
          <div class="client-card__name">
            <img src="@/assets/images/avatar-default.png" alt="client-avatar" />
            <p class="client-card__name">
              {{ client.last_name }} {{ client.first_name }}
              {{ client.patronymic }}
            </p>
          </div>
          <p class="client-card__email">{{ client.email }}</p>
          <p class="client-card__phone">{{ client.phone }}</p>
          <div
            @click.stop="togglePopMenu(client.id)"
            class="client-card__pop-menu"
          >
            <div>
              <PopMenuIcon />
            </div>
            <PopMenu
              :is-open="activePopMenuId === client.id"
              :items="menuItems"
              @dismiss="handleDismissClient(client.id)"
              @update:is-open="() => (activePopMenuId = null)"
            />
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
import PopMenuIcon from '@/components/icons/PopMenuIcon.vue'
import PopMenu from '@/components/common/PopMenu.vue'

const servicesStore = useServicesStore()

const props = defineProps<{
  serviceId: number
}>()

const clients = computed(() => {
  return servicesStore.serviceClients
})

const isModalOpen = ref(false)
const activePopMenuId = ref<number | null>(null)

const menuItems = [
  {
    id: 'dismiss',
    label: 'Удалить',
    action: 'dismiss',
    type: 'danger' as const
  }
]

const handleInviteClient = (data: { email: string }) => {
  servicesStore.inviteClient({ email: data.email }, props.serviceId)
}

const handleDismissClient = (clientId: number) => {
  servicesStore.dismissClient(clientId, props.serviceId)
  activePopMenuId.value = null
}

const togglePopMenu = (clientId: number) => {
  activePopMenuId.value = activePopMenuId.value === clientId ? null : clientId
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
  margin-bottom: 16px;

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
  position: relative;
  gap: 50px;
  padding: 12px;
  background-color: #22293f;
  border-radius: 12px;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.client-card__name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.clients-list__content {
  max-height: 70vh;
}

.client-card__email,
.client-card__phone {
  font-size: 15px;
  color: #d2d2d2;
}

.client-card__pop-menu {
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
</style>
