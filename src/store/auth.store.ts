import { AuthService } from '@/js/services/auth.service'
import router from '@/router'
import { useUserStore } from '@/store/user.store'
import { LoginData, RegisterData } from '@/types/auth.types'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  actions: {
    async login(data: LoginData) {
      try {
        await AuthService.login(data)
        router.push('/profile')
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error('Произошла ошибка при авторизации')
      }
    },
    async register(data: RegisterData) {
      try {
        await AuthService.register(data)
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error('Произошла ошибка при регистрации')
      }
    },
    async logout() {
      const userStore = useUserStore()
      await AuthService.logout()
      userStore.user = null
      router.push('/login')
    }
  }
})
