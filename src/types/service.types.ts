export interface Service {
  id: number
  created: string
  updated: string
  manager_id: number
  name: string
  address: string
  summary: string | null
  timetable: string
  website: string | null
}

export interface CreateServiceData {
  name: string
  address: string
  summary: string | null
  timetable: string
  website: string | null
  manager_id: number
}
