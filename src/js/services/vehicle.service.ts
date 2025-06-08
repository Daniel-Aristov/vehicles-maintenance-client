import {
  ConfigurationResponse,
  CreateVehicleDto,
  GenerationResponse,
  MakeResponse,
  ModelResponse,
  RangeResponse,
  VehicleResponse
} from '@/js/models/vehicle.dto'
import axiosInstance from '@/js/plugins/axios'
import { AxiosError } from 'axios'
import { MaintenanceRecordResponse } from '@/js/models/maintenance.dto'

const API_URL = '/vehicles'

export class VehicleService {
  static async getVehiclesByOwnerId(ownerId: number) {
    try {
      const response = await axiosInstance.get<VehicleResponse[]>(
        `${API_URL}?owner_id=${ownerId}`
      )
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          throw new Error('Недействительный токен доступа')
        }
        if (error.response?.status === 403) {
          throw new Error('Email пользователя не подтвержден')
        }
      }
      throw new Error('Произошла ошибка при получении автомобилей пользователя')
    }
  }

  static async createVehicle(vehicle: CreateVehicleDto) {
    try {
      const formData = new FormData()

      Object.entries(vehicle).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString())
        }
      })

      const response = await axiosInstance.post<VehicleResponse>(
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
      throw new Error('Произошла ошибка при создании автомобиля')
    }
  }

  static async deleteVehicle(vehicleId: number) {
    try {
      await axiosInstance.delete(`${API_URL}/${vehicleId}`)
    } catch (error) {
      throw new Error('Произошла ошибка при удалении автомобиля')
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

  static async getMakes() {
    try {
      const response = await axiosInstance.get<MakeResponse[]>(`/makes`)
      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при получении марок автомобилей')
    }
  }

  static async getModels(
    makeId: number,
    modelType: 'passenger' | 'truck' | null = null
  ) {
    try {
      const url = new URL('/models', axiosInstance.defaults.baseURL)

      url.searchParams.append('make-id', makeId.toString())

      if (modelType) {
        url.searchParams.append('type', modelType)
      }

      const response = await axiosInstance.get<ModelResponse[]>(
        url.pathname + url.search
      )

      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при получении моделей автомобилей')
    }
  }

  static async getRanges(modelId: number) {
    try {
      const url = new URL('/ranges', axiosInstance.defaults.baseURL)

      url.searchParams.append('model-id', modelId.toString())

      const response = await axiosInstance.get<RangeResponse[]>(
        url.pathname + url.search
      )

      return response.data
    } catch (error) {
      throw new Error(
        'Произошла ошибка при получении модельного ряда автомобилей'
      )
    }
  }

  static async getGenerations(rangeId: number) {
    try {
      const url = new URL('/generations', axiosInstance.defaults.baseURL)

      url.searchParams.append('range-id', rangeId.toString())

      const response = await axiosInstance.get<GenerationResponse[]>(
        url.pathname + url.search
      )

      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при получении поколений автомобиля')
    }
  }

  static async getConfigurations(generationId: number) {
    try {
      const url = new URL('/configurations', axiosInstance.defaults.baseURL)

      url.searchParams.append('generation-id', generationId.toString())

      const response = await axiosInstance.get<ConfigurationResponse[]>(
        url.pathname + url.search
      )

      return response.data
    } catch (error) {
      throw new Error('Произошла ошибка при получении конфигураций автомобиля')
    }
  }

  static async changeOwner(vehicleId: number, email: string) {
    try {
      await axiosInstance.post(`${API_URL}/${vehicleId}/init-transfer`, {
        email
      })
    } catch (error) {
      throw new Error('Не удалось отправить письмо на почту нового владельца')
    }
  }
}
