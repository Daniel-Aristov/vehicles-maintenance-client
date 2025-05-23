import { AssignNewRoleUserDto, UpdateUserDto } from '@/js/models/user.dto'
import { UserService } from '@/js/services/user.service'
import { useAuthStore } from '@/store/auth.store'
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
        const authStore = useAuthStore()
        authStore.logout()
        this.user = null
        throw new Error('Не удалось получить текущего пользователя')
      }
    },
    async updateCurrentUser(userUpdateData: UpdateUserDto) {
      const updatedUser = await UserService.updateCurrentUser(userUpdateData)
      this.user = updatedUser
    },
    async assignNewRoleUser(user: AssignNewRoleUserDto) {
      const newRoleUser = await UserService.assignNewRoleUser(user)
      this.user?.roles.push(newRoleUser.role)
    }
  }
})
