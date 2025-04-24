<template>
  <div class="profile-view">
    <div class="profile-view__card">
      <div class="profile-view__card-header">
        <p class="profile-view__title">Профиль пользователя</p>
        <div class="profile-view__buttons">
          <button
            class="profile-view__card-header-button"
            @click="showModalEditProfile = true"
          >
            Редактировать
          </button>
          <button class="profile-view__card-header-button" @click="logout">
            Выйти
          </button>
        </div>
      </div>
      <div class="profile-view__card-body">
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">Фамилия</p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.last_name || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">Имя</p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.first_name || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">Отчество</p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.patronymic || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">Email</p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.email || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">Телефон</p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.phone || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">Дата рождения</p>
          <p class="profile-view__card-body-item-value">
            {{
              currentUser?.birthday
                ? new Date(currentUser?.birthday).toLocaleDateString()
                : 'Не указано'
            }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">Роли</p>
          <p class="profile-view__card-body-item-value">
            {{ formatRoles(currentUser?.roles) }}
          </p>
        </div>
        <button
          v-if="currentUser?.roles.includes('manager')"
          class="profile-view__card-body-button"
          @click="goToServices"
        >
          Перейти к сервисам
        </button>
      </div>
    </div>
    <EditProfileModal
      v-model="showModalEditProfile"
      :user-data="currentUser"
      @save="saveChanges"
      @close="showModalEditProfile = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/store/user.store'
import { useAuthStore } from '@/store/auth.store'
import EditProfileModal from '@/components/ModalBoxes/EditProfileModal.vue'
import { UpdateUserDto } from '@/js/models/user.dto'

export default defineComponent({
  components: {
    EditProfileModal
  },
  data: () => ({
    showModalEditProfile: false
  }),
  props: {},
  emits: [],
  async mounted() {
    await this.userStore.getCurrentUser()
  },
  computed: {
    ...mapStores(useUserStore, useAuthStore),
    currentUser() {
      return this.userStore.user
    }
  },
  methods: {
    logout() {
      this.authStore.logout()
    },
    async saveChanges(formData: UpdateUserDto) {
      await this.userStore.updateCurrentUser(formData)
    },
    formatRoles(roles?: string[]): string {
      if (!roles?.length) return 'Не указано'
      return roles.join(', ')
    },
    goToServices() {
      this.$router.push('/services')
    }
  }
})
</script>

<style scoped>
.profile-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile-view__card {
  width: 600px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 0 0 8px 0 rgba(140, 4, 230, 0.2);
  border-radius: 6px;
}

.profile-view__card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.profile-view__title {
  font-size: 22px;
  text-align: center;
  font-weight: 600;
}

.profile-view__card-header-button {
  width: 100%;
  padding: 10px 30px;
}

.profile-view__card-body-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.profile-view__card-body-item-label {
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 2px;
}

.profile-view__card-body-item-value {
  font-size: 17px;
  font-weight: 600;
}

.profile-view__buttons {
  display: flex;
  gap: 10px;
}
</style>
