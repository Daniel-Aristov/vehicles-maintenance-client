import { defineStore } from 'pinia'
import { Service } from '@/types/service.types'
import { ServiceService } from '@/js/services/service.service'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [] as Service[]
  }),
  actions: {
    async getAllServices() {
      try {
        const data = await ServiceService.getAllServices()
        this.services = data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
