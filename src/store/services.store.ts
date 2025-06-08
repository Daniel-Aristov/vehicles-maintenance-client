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
    servicesWithCurrentManager: [] as Service[],
    servicesWithCurrentClient: [] as Service[],
    servicesWithCurrentWorker: [] as Service[],
    serviceClients: [] as ServiceClient[],
    serviceWorkers: [] as ServiceWorker[]
  }),
  getters: {
    getServiceById: (state) => (id: number) => {
      return state.allServices.find((service) => service.id === id)
    },
    getAllServices: (state) => state.allServices,
    getManagerServices: (state) => state.servicesWithCurrentManager,
    getWorkerServices: (state) => state.servicesWithCurrentWorker,
    getClientServices: (state) => state.servicesWithCurrentClient,
    getServiceNamesByRole: (state) => (role: string) => {
      switch (role) {
        case 'manager':
          return state.servicesWithCurrentManager.map((service) => service.name)
        case 'worker':
          return state.servicesWithCurrentWorker.map((service) => service.name)
        default:
          return []
      }
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
    async getServicesWithCurrentManager() {
      const userStore = useUserStore()
      if (!userStore.user?.id) {
        throw new Error('Пользователь не авторизован')
      }
      this.servicesWithCurrentManager = this.allServices.filter(
        (service) => service.manager_id === userStore.user?.id
      )
    },
    async getServicesWithCurrentClient() {
      const userStore = useUserStore()
      if (!userStore.user?.id) {
        throw new Error('Пользователь не авторизован')
      }
      try {
        const services = await ServiceService.getServicesByCurrentClient(
          userStore.user?.id
        )
        this.servicesWithCurrentClient = services
      } catch (error) {
        throw new Error('Произошла ошибка при получении автосервисов')
      }
    },
    async getServicesWithCurrentWorker() {
      const userStore = useUserStore()
      if (!userStore.user?.id) {
        throw new Error('Пользователь не авторизован')
      }
      try {
        const services = await ServiceService.getServicesByCurrentWorker(
          userStore.user.id
        )
        this.servicesWithCurrentWorker = services
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
    async dismissWorker(serviceId: number, workerId: number) {
      try {
        await ServiceService.dismissWorker(serviceId, workerId)
        this.serviceWorkers = this.serviceWorkers.filter(
          (worker) => worker.id !== workerId
        )
      } catch (error) {
        throw new Error('Произошла ошибка при увольнении работника')
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
    },
    async dismissClient(clientId: number, serviceId: number) {
      try {
        await ServiceService.dismissClient(serviceId, clientId)
        this.serviceClients = this.serviceClients.filter(
          (client) => client.id !== clientId
        )
      } catch (error) {
        throw new Error('Произошла ошибка при исключении клиента')
      }
    }
  }
})
