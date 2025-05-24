import {
  CreateServiceDto,
  InviteClientDto,
  InviteWorkerDto
} from '@/js/models/services.dto'
import { ServiceService } from '@/js/services/service.service'
import { useUserStore } from '@/store/user.store'
import {
  Service,
  ServiceClient,
  ServiceWorker,
  VerifyInnOgrnData
} from '@/types/service.types'
import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => ({
    allServices: [] as Service[],
    serviceClients: [] as ServiceClient[],
    serviceWorkers: [] as ServiceWorker[]
  }),
  getters: {
    getAllServices: (state) => state.allServices,
    getCurrentUserServices: (state) => {
      const userStore = useUserStore()
      return state.allServices.filter(
        (service) => service.manager_id === userStore.user?.id
      )
    },
    getServiceById: (state) => (id: number) => {
      return state.allServices.find((service) => service.id === id)
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
        const userStore = useUserStore()

        if (!userStore.user) {
          throw new Error('Пользователь не авторизован')
        }

        if (!userStore.user.roles.includes('manager')) {
          await userStore.assignNewRoleUser({ role: 'manager' })
        }

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
    },
    async getServiceWorkers(serviceId: number) {
      try {
        const workers = await ServiceService.getServiceWorkers(serviceId)
        this.serviceWorkers = workers
      } catch (error) {
        throw new Error('Произошла ошибка при получении работников автосервиса')
      }
    },
    async inviteWorker(data: InviteWorkerDto, serviceId: number) {
      try {
        await ServiceService.inviteWorker(data, serviceId)
      } catch (error) {
        throw new Error('Произошла ошибка при отправке письма работнику')
      }
    },
    async getServiceClients(serviceId: number) {
      try {
        const clients = await ServiceService.getServiceClients(serviceId)
        this.serviceClients = clients
      } catch (error) {
        throw new Error('Произошла ошибка при получении клиентов автосервиса')
      }
    },
    async inviteClient(data: InviteClientDto, serviceId: number) {
      try {
        await ServiceService.inviteClient(data, serviceId)
      } catch (error) {
        throw new Error('Произошла ошибка при отправке письма клиенту')
      }
    }
  }
})
