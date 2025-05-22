import { CreateServiceDto } from '@/js/models/services.dto'
import { ServiceService } from '@/js/services/service.service'
import { useUserStore } from '@/store/user.store'
import { Service, VerifyInnOgrnData } from '@/types/service.types'
import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => ({
    allServices: [] as Service[]
  }),
  getters: {
    getAllServices: (state) => state.allServices,
    getCurrentUserServices: (state) => {
      const userStore = useUserStore()
      return state.allServices.filter(
        (service) => service.manager_id === userStore.user?.id
      )
    }
  },
  actions: {
    async getServices() {
      try {
        const data = await ServiceService.getServices()
        this.allServices = data
      } catch (error) {
        throw new Error('Произошла ошибка при получении автосервисов')
      }
    },
    async createService(createServiceData: CreateServiceDto) {
      try {
        const data = await ServiceService.createService(createServiceData)
        this.createServiceLocal(data)
      } catch (error) {
        throw new Error('Произошла ошибка при создании автосервиса')
      }
    },
    createServiceLocal(service: Service) {
      this.allServices.push(service)
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
