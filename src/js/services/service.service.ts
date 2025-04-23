import axiosInstance from '@/js/plugins/axios'
import { CreateServiceDto, ServiceResponse } from '@/js/models/services.dto'

const API_URL = '/services'

export class ServiceService {
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
}
