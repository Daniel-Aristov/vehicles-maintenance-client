import { ServiceWorker } from '@/types/service.types'

export interface MaintenanceRecord {
  title: string
  maintenance_performer: MaintenancePerformer
  date: string
  vehicle_id: number
  mileage: number
  service_id?: number
  responsible?: ServiceWorker
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
  service_workers: ServiceWorker[]
}

export type MaintenancePerformerDriver = 'owner' | 'unregistered_service'

export type MaintenancePerformer =
  | MaintenancePerformerDriver
  | 'registered_service'
