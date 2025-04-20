<template>
  <div class="profile-view">
    <div class="profile-view__card">
      <div class="profile-view__card-header">
        <p class="profile-view__title">Профиль пользователя</p>
        <button class="profile-view__card-header-button" @click="logout">
          Выйти
        </button>
      </div>
      <div class="profile-view__card-body">
        <div class="profile-view__card-body-item">
          <p>Имя</p>
          <p>{{ currentUser?.first_name }}</p>
        </div>
        <div class="profile-view__card-body-item">
          <p>Фамилия</p>
          <p>{{ currentUser?.last_name }}</p>
        </div>
        <div class="profile-view__card-body-item">
          <p>Отчество</p>
          <p>{{ currentUser?.patronymic }}</p>
        </div>
        <div class="profile-view__card-body-item">
          <p>Email</p>
          <p>{{ currentUser?.email }}</p>
        </div>
        <div class="profile-view__card-body-item">
          <p>Телефон</p>
          <p>{{ currentUser?.phone }}</p>
        </div>
        <div class="profile-view__card-body-item">
          <p>Дата рождения</p>
          <p>{{ currentUser?.birthday }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/store/user.store'
import { useAuthStore } from '@/store/auth.store'

export default defineComponent({
  components: {},
  data: () => ({}),
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
  width: 500px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 0 0 8px 0 rgba(140, 4, 230, 0.2);
  border-radius: 6px;
}

.profile-view__card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.profile-view__title {
  font-size: 22px;
  text-align: center;
  font-weight: 600;
}

.profile-view__card-header-button {
  max-width: 100px;
}

.profile-view__card-body-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
