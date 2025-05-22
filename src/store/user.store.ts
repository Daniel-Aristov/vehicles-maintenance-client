import { UpdateUserDto } from '@/js/models/user.dto'
import { UserService } from '@/js/services/user.service'
import router from '@/router'
import { User } from '@/types/user.types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    async getCurrentUser() {
      try {
        const user = await UserService.getCurrentUser()
        this.user = user
      } catch (error) {
        this.user = null
        router.push('/login')
        throw error instanceof Error ? error : new Error('Неизвестная ошибка')
      }
    },
    async updateCurrentUser(userUpdateData: UpdateUserDto) {
      const updatedUser = await UserService.updateCurrentUser(userUpdateData)
      this.user = updatedUser
    }
  }
})
