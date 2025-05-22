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
        :error="error"
      />
      <div class="register-car-image">
        <img src="@/assets/images/register-car.png" alt="car" />
      </div>
    </div>
    <RegistrationEmailConfirm v-if="registrationSuccess" :email="userEmail" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/store/auth.store'
import { useUserStore } from '@/store/user.store'
import RegisterAccountForm from '@/components/auth/RegisterAccountForm.vue'
import ChoiceRegisterEntity from '@/components/auth/ChoiceRegisterEntity.vue'
import RegistrationEmailConfirm from '@/components/auth/RegistrationEmailConfirm.vue'
import { RegisterData } from '@/types/auth.types'
import { USER_ROLE_NAMES, UserRole } from '@/types/user.types'

export default defineComponent({
  components: {
    RegisterAccountForm,
    ChoiceRegisterEntity,
    RegistrationEmailConfirm
  },
  data: () => ({
    error: '',
    selectedEntity: null as 'account' | 'service' | 'worker' | null,
    createUserRole: UserRole.OWNER,
    registrationSuccess: false,
    userEmail: ''
  }),
  mounted() {
    this.error = ''
  },
  computed: {
    ...mapStores(useAuthStore, useUserStore),
    createUserRoleName() {
      switch (this.selectedEntity) {
        case 'service':
          return USER_ROLE_NAMES[UserRole.MANAGER]
        case 'worker':
          return USER_ROLE_NAMES[UserRole.WORKER]
        default:
          return USER_ROLE_NAMES[UserRole.OWNER]
      }
    }
  },
  methods: {
    handleSelectedEntity(entity: 'account' | 'service' | 'worker') {
      this.selectedEntity = entity
      this.error = ''
    },
    async handleRegister(data: RegisterData) {
      try {
        await this.authStore.register(data)
        this.error = ''
        this.userEmail = data.email
        this.selectedEntity = null
        this.registrationSuccess = true
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Произошла ошибка'
      }
    }
  }
})
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
