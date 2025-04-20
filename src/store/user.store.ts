import { defineStore } from 'pinia'
import { AuthService } from '@/js/services/auth.service'
import { User } from '@/types/user.types'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    async getCurrentUser() {
      const user = await AuthService.getCurrentUser()
      this.user = user
    }
  }
})
