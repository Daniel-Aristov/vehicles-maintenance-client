import { ServiceWorkerResponse } from '@/js/models/services.dto'
import { MaintenancePerformer } from '@/types/maintenace'

export interface MaintenanceRecordResponse {
  title: string
  maintenance_performer: MaintenancePerformer
  date: string
  vehicle_id: number
  mileage: number
  service_id: number
  responsible: ServiceWorkerResponse
  description: string
  parts_cost: number
  labor_cost: number
  total_cost: number
  photos: {
    photo_path: string
  }[]
  documents: {
    document_path: string
  }[]
  service_workers: ServiceWorkerResponse[]
}

export interface MaintenanceRecordDto {
  title: string
  maintenance_performer: MaintenancePerformer
  date: string
  vehicle_id: number
  mileage: number
  service_id: number | null
  responsible_id: number | null
  description: string | null
  parts_cost: number | null
  labor_cost: number | null
  total_cost: number | null
  photos: File[] | null
  documents: File[] | null
  service_workers_ids: string
}
