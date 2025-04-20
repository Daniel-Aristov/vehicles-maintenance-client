import axiosInstance from '@/js/plugins/axios'
import { ServiceResponse } from '@/js/models/services.dto'

const API_URL = '/services'

export class ServiceService {
  static async getAllServices() {
    const { data } = await axiosInstance.get<ServiceResponse[]>(`${API_URL}`)
    return data
  }

  static async getServiceById(id: number) {
    const { data } = await axiosInstance.get<ServiceResponse>(
      `${API_URL}/${id}`
    )
    return data
  }
}
