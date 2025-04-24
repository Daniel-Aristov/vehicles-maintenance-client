<template>
  <div class="auth-view">
    <ChoiceRegisterEntity
      v-if="!selectedEntity"
      @selectedEntity="handleSelectedEntity"
    />
    <RegisterAccountForm
      v-if="
        selectedEntity === 'account' ||
        (selectedEntity === 'service' && !managerId)
      "
      :create-user-role="createUserRoleName"
      @submit="handleRegister"
      :error="error"
    />
    <RegisterServiceForm
      v-if="selectedEntity === 'service' && managerId"
      @submit="handleRegisterService"
      :error="error"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/store/auth.store'
import { useServicesStore } from '@/store/services.store'
import { useUserStore } from '@/store/user.store'
import RegisterAccountForm from '@/components/auth/RegisterAccountForm.vue'
import RegisterServiceForm from '@/components/auth/RegisterServiceForm.vue'
import ChoiceRegisterEntity from '@/components/auth/ChoiceRegisterEntity.vue'
import { RegisterData } from '@/types/auth.types'
import { USER_ROLE_NAMES, UserRole } from '@/types/user.types'
import { CreateServiceData } from '@/types/service.types'

export default defineComponent({
  components: {
    RegisterAccountForm,
    RegisterServiceForm,
    ChoiceRegisterEntity
  },
  data: () => ({
    error: '',
    selectedEntity: null as 'account' | 'service' | null,
    createUserRole: UserRole.OWNER,
    managerId: null as number | null
  }),
  mounted() {
    this.error = ''
  },
  computed: {
    ...mapStores(useAuthStore, useServicesStore, useUserStore),
    createUserRoleName() {
      return this.selectedEntity === 'service'
        ? USER_ROLE_NAMES[UserRole.MANAGER]
        : USER_ROLE_NAMES[UserRole.OWNER]
    }
  },
  methods: {
    handleSelectedEntity(entity: 'account' | 'service') {
      this.selectedEntity = entity
      this.managerId = null
      this.error = ''
    },
    async handleRegister(data: RegisterData) {
      try {
        await this.authStore.register(data)
        this.error = ''
        await this.userStore.getCurrentUser()

        if (this.selectedEntity === 'service') {
          this.managerId = this.userStore.user?.id ?? null
        } else {
          this.$router.push('/profile')
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Произошла ошибка'
      }
    },
    async handleRegisterService(data: CreateServiceData) {
      try {
        if (!this.managerId) {
          throw new Error('ID менеджера не найден')
        }

        await this.servicesStore.createService({
          ...data,
          manager_id: this.managerId
        })
        this.error = ''
        this.$router.push('/profile')
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
}
</style>
