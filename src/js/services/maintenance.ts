import {
  MaintenanceRecordDto,
  MaintenanceRecordResponse
} from '@/js/models/maintenance.dto'
import axiosInstance from '@/js/plugins/axios'

const API_URL = '/maintenance-records'

export class MaintenanceService {
  static async createMaintenanceRecord(data: MaintenanceRecordDto) {
    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'documents' && key !== 'photos') {
          formData.append(key, value as string)
        }
      })

      if (data.documents?.length) {
        data.documents.forEach((file: File) => {
          formData.append('documents', file)
        })
      }

      if (data.photos?.length) {
        data.photos.forEach((image: File) => {
          formData.append('photos', image)
        })
      }

      const response = await axiosInstance.post<MaintenanceRecordResponse>(
        `${API_URL}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      return response.data
    } catch (error) {
      throw new Error(
        'Произошла ошибка при создании записи технического обслуживания'
      )
    }
  }

  static async getMaintenanceRecords(vehicleId: number) {
    try {
      const response = await axiosInstance.get<MaintenanceRecordResponse[]>(
        `${API_URL}/${vehicleId}/maintenance-records`
      )

      return response.data
    } catch (error) {
      throw new Error(
        'Произошла ошибка при получении записей технического обслуживания'
      )
    }
  }

  static async getMaintenancePurchaseOrders(maintenanceOrderId: number) {
    try {
      await axiosInstance.post<void>(
        `${API_URL}/${maintenanceOrderId}/purchase-orders`
      )
    } catch (error) {
      throw new Error('Произошла ошибка при получении накладной')
    }
  }
}
