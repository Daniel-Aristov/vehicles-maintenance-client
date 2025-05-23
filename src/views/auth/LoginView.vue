<template>
  <div class="login-view">
    <div class="login-car-image">
      <img src="@/assets/images/login-car.png" alt="car" />
    </div>
    <LoginForm @submit="handleLogin" :error="error" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth.store'
import LoginForm from '@/components/auth/LoginForm.vue'
import type { LoginData } from '@/types/auth.types'

const error = ref('')

const handleLogin = async (data: LoginData) => {
  try {
    const authStore = useAuthStore()
    await authStore.login(data)
    error.value = ''
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Произошла ошибка'
  }
}
</script>

<style scoped>
.login-view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-image: url('@/assets/images/smoke.png');
  background-size: cover;
  background-position: center;
}

.login-car-image {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transform: translateX(-50px);

  img {
    width: 800px;
    height: auto;
    object-fit: cover;
  }
}
</style>
