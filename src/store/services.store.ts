import { defineStore } from 'pinia'
import { Service, VerifyInnOgrnData } from '@/types/service.types'
import { ServiceService } from '@/js/services/service.service'
import { CreateServiceDto } from '@/js/models/services.dto'

export const useServicesStore = defineStore('services', {
  state: () => ({
    currentServicesByManager: [] as Service[],
    allServices: [] as Service[]
  }),
  getters: {
    getCurrentServicesByManager: (state) => state.currentServicesByManager,
    getAllServices: (state) => state.allServices
  },
  actions: {
    async createService(createServiceData: CreateServiceDto) {
      try {
        const data = await ServiceService.createService(createServiceData)
        this.createServiceLocal(data)
      } catch (error) {
        throw new Error('Произошла ошибка при создании автосервиса')
      }
    },
    createServiceLocal(service: Service) {
      this.currentServicesByManager.push(service)
    },
    async getServices() {
      try {
        const data = await ServiceService.getServices()
        this.allServices = data
      } catch (error) {
        throw new Error('Произошла ошибка при получении автосервисов')
      }
    },
    async getServicesByCurrentManager() {
      try {
        const data = await ServiceService.getServicesByCurrentManager()
        this.currentServicesByManager = data
      } catch (error) {
        throw new Error('Произошла ошибка при получении автосервисов')
      }
    },
    async verifyInnOgrn(data: VerifyInnOgrnData) {
      try {
        const verifyData = await ServiceService.verifyInnOgrn(data)
        return verifyData
      } catch (error) {
        throw new Error('Произошла ошибка при проверке ИНН и ОГРН')
      }
    }
  }
})
