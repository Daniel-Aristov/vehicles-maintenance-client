<template>
  <aside class="sidebar">
    <div class="sidebar__profile" @click="goToProfile">
      <img
        class="sidebar__profile-image"
        :src="`http://localhost:8000${userStore.user?.photo_path}`"
        alt="profile"
      />
      <p class="sidebar__profile-name">
        {{ userStore.user?.first_name }} {{ userStore.user?.last_name }}
      </p>
    </div>
    <div class="sidebar__menu">
      <button class="sidebar__menu-item" @click="goToGarage">
        <GarageIcon />
        <span>Гараж</span>
      </button>
      <button class="sidebar__menu-item" @click="goToServices">
        <ServiceIcon />
        <span>Сервисы</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user.store'
import { useRouter } from 'vue-router'
import GarageIcon from '@/components/icons/GarageIcon.vue'
import ServiceIcon from '@/components/icons/ServiceIcon.vue'
import { isAuthenticated } from '@/js/helpers/auth.helper'
import { ref, onMounted } from 'vue'
import { useServicesStore } from '@/store/services.store'

const router = useRouter()
const userStore = useUserStore()
const serviceStore = useServicesStore()

const isLoading = ref(true)

onMounted(async () => {
  try {
    isLoading.value = true
    emit('update:loading', true)
    await userStore.getCurrentUser()
    await serviceStore.getServices()
    await new Promise((resolve) => setTimeout(resolve, 1000))
  } finally {
    isLoading.value = false
    emit('update:loading', false)
  }
})

const emit = defineEmits(['update:loading'])

const goToProfile = async () => {
  try {
    if (!isAuthenticated()) {
      await router.push('/login')
      return
    }
    await router.push('/profile')
  } catch (error) {
    console.error('Ошибка при переходе в профиль:', error)
  }
}

const goToGarage = async () => {
  try {
    await router.push('/vehicles')
  } catch (error) {
    console.error('Ошибка при переходе в гараж:', error)
  }
}

const goToServices = async () => {
  try {
    await router.push('/services')
  } catch (error) {
    console.error('Ошибка при переходе в сервисы:', error)
  }
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  background-color: #090f23;
  flex-shrink: 0;
}

.sidebar__profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 50px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.sidebar__profile:hover {
  opacity: 0.9;
}

.sidebar__profile-image {
  width: 45px;
  height: 45px;
  border-radius: 14px;
  border: 1px solid #930eec;
  object-fit: cover;
}

.sidebar__profile-name {
  font-size: 16px;
  font-weight: 500;
}

.sidebar__menu {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar__menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 235px;
  height: 42px;
  background-color: transparent;
  margin: 0 22px;
  border-radius: 8px;
  text-align: left;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
