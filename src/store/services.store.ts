import { defineStore } from 'pinia'
import { Service } from '@/types/service.types'
import { ServiceService } from '@/js/services/service.service'
import { CreateServiceDto } from '@/js/models/services.dto'

export const useServicesStore = defineStore('services', {
  state: () => ({
    currentService: null as Service | null
  }),
  getters: {
    getCurrentService: (state) => state.currentService
  },
  actions: {
    async createService(createServiceData: CreateServiceDto) {
      try {
        const data = await ServiceService.createService(createServiceData)
        this.currentService = data
      } catch (error) {
        throw new Error('Произошла ошибка при создании автосервиса')
      }
    }
  }
})
