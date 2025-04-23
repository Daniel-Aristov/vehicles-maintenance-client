import { defineStore } from 'pinia'
import { UserService } from '@/js/services/user.service'
import { User } from '@/types/user.types'
import { UpdateUserDto } from '@/js/models/user.dto'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    async getCurrentUser() {
      const user = await UserService.getCurrentUser()
      this.user = user
    },
    async updateCurrentUser(userUpdateData: UpdateUserDto) {
      const updatedUser = await UserService.updateCurrentUser(userUpdateData)
      this.user = updatedUser
    }
  }
})
