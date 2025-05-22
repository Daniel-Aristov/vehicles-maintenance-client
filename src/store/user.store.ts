import { UpdateUserDto } from '@/js/models/user.dto'
import { UserService } from '@/js/services/user.service'
import { User } from '@/types/user.types'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/store/auth.store'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    async getCurrentUser() {
      const authStore = useAuthStore()
      try {
        const user = await UserService.getCurrentUser()
        this.user = user
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Неизвестная ошибка'
        authStore.logout()
        throw new Error(message)
      }
    },
    async updateCurrentUser(userUpdateData: UpdateUserDto) {
      const updatedUser = await UserService.updateCurrentUser(userUpdateData)
      this.user = updatedUser
    }
  }
})
