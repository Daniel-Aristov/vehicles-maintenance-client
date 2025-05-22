<template>
  <div class="profile-view">
    <div class="header">
      <div class="header__breadcrumbs">
        <PersonIcon />
        <p class="header__breadcrumbs-item-text">Мой профиль</p>
      </div>
      <div class="header__buttons">
        <button class="header__button" @click="showModalEditProfile = true">
          Редактировать профиль
        </button>
        <button class="header__button" @click="logout">
          Выйти из аккаунта
        </button>
      </div>
    </div>
    <div class="profile-content">
      <div class="profile-content__avatar">
        <img
          :src="`http://localhost:8000${currentUser?.photo_path}`"
          alt="profile"
        />
        <div class="profile-content__avatar-change" @click="triggerFileInput">
          Изменить
        </div>
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          class="hidden-input"
          @change="handleFileUpload"
        />
      </div>
      <div class="profile-view__card-body">
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">
            <PersonIcon color="#858585" />
            <span>Фамилия</span>
          </p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.last_name || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">
            <PersonIcon color="#858585" />
            <span>Имя</span>
          </p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.first_name || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">
            <PersonIcon color="#858585" />
            <span>Отчество</span>
          </p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.patronymic || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">
            <MailIcon color="#858585" />
            <span>Email</span>
          </p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.email || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">
            <PhoneIcon color="#858585" />
            <span>Телефон</span>
          </p>
          <p class="profile-view__card-body-item-value">
            {{ currentUser?.phone || 'Не указано' }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">
            <DateIcon color="#858585" />
            <span>Дата рождения</span>
          </p>
          <p class="profile-view__card-body-item-value">
            {{
              currentUser?.birthday
                ? new Date(currentUser?.birthday).toLocaleDateString()
                : 'Не указано'
            }}
          </p>
        </div>
        <div class="profile-view__card-body-item">
          <p class="profile-view__card-body-item-label">
            <PasswordIcon color="#858585" />
            <span>Роли</span>
          </p>
          <p class="profile-view__card-body-item-value">
            {{ formatRoles(currentUser?.roles) }}
          </p>
        </div>
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
import PersonIcon from '@/components/icons/PersonIcon.vue'
import MailIcon from '@/components/icons/MailIcon.vue'
import DateIcon from '@/components/icons/DateIcon.vue'
import PhoneIcon from '@/components/icons/PhoneIcon.vue'
import PasswordIcon from '@/components/icons/PasswordIcon.vue'

export default defineComponent({
  components: {
    EditProfileModal,
    PersonIcon,
    MailIcon,
    DateIcon,
    PhoneIcon,
    PasswordIcon
  },
  data: () => ({
    showModalEditProfile: false,
    isUploading: false
  }),
  props: {},
  emits: [],
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
    },
    triggerFileInput() {
      ;(this.$refs.fileInput as HTMLInputElement).click()
    },
    async handleFileUpload(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append('photo', file)

      try {
        this.isUploading = true
      } catch (error) {
        console.error('Ошибка при загрузке фото:', error)
      } finally {
        this.isUploading = false
        ;(event.target as HTMLInputElement).value = ''
      }
    }
  }
})
</script>

<style scoped>
.profile-view {
  position: relative;
  height: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 36px;
}

.header__breadcrumbs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__breadcrumbs-item-text {
  font-size: 16px;
  font-weight: 500;
}

.header__buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__button {
  font-size: 15px;
  height: 36px;
  font-weight: 500;
  padding: 10px 40px;
}

.profile-content {
  display: flex;
  align-items: start;
  justify-content: flex-start;
  margin-top: 60px;
  margin-left: 260px;
}

.profile-content__avatar {
  margin-right: 50px;

  img {
    width: 120px;
    height: 120px;
    border-radius: 14px;
    border: 1px solid #930eec;
    object-fit: cover;
  }
}

.profile-content__avatar-change {
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  margin-top: 14px;
  transition: opacity 0.2s;
}

.profile-content__avatar-change:hover {
  opacity: 0.8;
}

.profile-view__card-body {
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding-left: 70px;
  border-left: 1px solid #9a9a9a;
}

.profile-view__card-body-item {
  display: flex;
  flex-direction: column;
}

.profile-view__card-body-item-label {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #858585;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.profile-view__card-body-item-value {
  font-size: 16px;
  font-weight: 600;
}

.profile-view__buttons {
  display: flex;
  gap: 10px;
}

.hidden-input {
  display: none;
}
</style>
