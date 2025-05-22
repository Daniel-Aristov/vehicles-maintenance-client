<template>
  <div class="auth-view">
    <ChoiceRegisterEntity
      v-if="!selectedEntity && !registrationSuccess"
      @selectedEntity="handleSelectedEntity"
    />
    <div v-if="selectedEntity" class="auth-view__form">
      <RegisterAccountForm
        :create-user-role="createUserRoleName"
        @submit="handleRegister"
        :loading="loadingSendEmail"
        :error="error"
      />
      <div class="register-car-image">
        <img src="@/assets/images/register-car.png" alt="car" />
      </div>
    </div>
    <RegistrationEmailConfirm v-if="registrationSuccess" :email="userEmail" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth.store'
import RegisterAccountForm from '@/components/auth/RegisterAccountForm.vue'
import ChoiceRegisterEntity from '@/components/auth/ChoiceRegisterEntity.vue'
import RegistrationEmailConfirm from '@/components/auth/RegistrationEmailConfirm.vue'
import { RegisterData } from '@/types/auth.types'
import { USER_ROLE_NAMES, UserRole } from '@/types/user.types'

const authStore = useAuthStore()

const error = ref('')
const selectedEntity = ref<'account' | 'service' | 'worker' | null>(null)
const registrationSuccess = ref(false)
const userEmail = ref('')
const loadingSendEmail = ref(false)

const createUserRoleName = computed(() => {
  switch (selectedEntity.value) {
    case 'service':
      return USER_ROLE_NAMES[UserRole.MANAGER]
    case 'worker':
      return USER_ROLE_NAMES[UserRole.WORKER]
    default:
      return USER_ROLE_NAMES[UserRole.OWNER]
  }
})

const handleSelectedEntity = (entity: 'account' | 'service' | 'worker') => {
  selectedEntity.value = entity
  error.value = ''
}

const handleRegister = async (data: RegisterData) => {
  try {
    loadingSendEmail.value = true
    await authStore.register(data)
    error.value = ''
    userEmail.value = data.email
    selectedEntity.value = null
    registrationSuccess.value = true
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Произошла ошибка'
  } finally {
    loadingSendEmail.value = false
  }
}
</script>

<style scoped>
.auth-view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-image: url('@/assets/images/smoke.png');
  background-size: cover;
  background-position: center;
}

.auth-view__form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.register-car-image {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transform: translateX(50px);

  img {
    width: 800px;
    height: auto;
    object-fit: cover;
  }
}
</style>
