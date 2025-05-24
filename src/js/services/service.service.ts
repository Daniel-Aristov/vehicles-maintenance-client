import {
  CreateServiceDto,
  InviteClientDto,
  InviteWorkerDto,
  ServiceClientResponse,
  ServiceResponse,
  ServiceWorkerResponse,
  VerifyInnOgrnDto,
  VerifyInnOgrnResponse
} from '@/js/models/services.dto'
import axiosInstance from '@/js/plugins/axios'

const API_URL = '/services'

export class ServiceService {
  static async getServiceById(serviceId: number) {
    try {
      const response = await axiosInstance.get<ServiceResponse>(
        `${API_URL}/${serviceId}`
      )
      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при получении автосервиса')
    }
  }

  static async getServices() {
    try {
      const response = await axiosInstance.get<ServiceResponse[]>(`${API_URL}`)
      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при получении автосервисов')
    }
  }

  static async getServicesByCurrentManager() {
    try {
      const response = await axiosInstance.get<ServiceResponse[]>(
        `${API_URL}/me`
      )
      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при получении автосервисов')
    }
  }

  static async createService(CreateServiceData: CreateServiceDto) {
    try {
      const response = await axiosInstance.post<ServiceResponse>(
        `${API_URL}`,
        CreateServiceData
      )
      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при создании автосервиса')
    }
  }

  static async verifyInnOgrn(data: VerifyInnOgrnDto) {
    try {
      const response = await axiosInstance.post<VerifyInnOgrnResponse>(
        `scrapers/egrul-egrip`,
        data
      )
      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при проверке ИНН и ОГРН')
    }
  }

  static async getServiceWorkers(serviceId: number) {
    try {
      const response = await axiosInstance.get<ServiceWorkerResponse[]>(
        `${API_URL}/${serviceId}/workers`
      )
      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при получении работников автосервиса')
    }
  }

  static async getServiceClients(serviceId: number) {
    try {
      const response = await axiosInstance.get<ServiceClientResponse[]>(
        `${API_URL}/${serviceId}/clients`
      )
      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при получении клиентов автосервиса')
    }
  }

  static async inviteClient(data: InviteClientDto, serviceId: number) {
    try {
      await axiosInstance.post<void>(
        `${API_URL}/${serviceId}/clients/invite`,
        data
      )
    } catch (error) {
      throw new Error('Произошла ошибка при отправке письма клиенту')
    }
  }

  static async inviteWorker(data: InviteWorkerDto, serviceId: number) {
    try {
      await axiosInstance.post<void>(
        `${API_URL}/${serviceId}/workers/invite`,
        data
      )
    } catch (error) {
      throw new Error('Произошла ошибка при отправке письма работнику')
    }
  }
}
