import axiosInstance from '@/js/plugins/axios'
import {
  CreateServiceDto,
  ServiceResponse,
  VerifyInnOgrnDto,
  VerifyInnOgrnResponse
} from '@/js/models/services.dto'

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
}
