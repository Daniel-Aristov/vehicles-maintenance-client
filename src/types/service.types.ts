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
  commercial_name: string
  inn: string
  ogrn: string
}

export interface ServiceWorker {
  id: number
  last_name: string
  first_name: string
  patronymic: string
  photo_path: string
  phone: string
  email: string
  position: string
  rating: number
}

export interface ServiceClient {
  id: number
  last_name: string
  first_name: string
  patronymic: string
  photo_path: string
  phone: string
  email: string
}

export interface CreateServiceData {
  name: string
  commercial_name: string
  inn: string
  ogrn: string
  address: string
  summary: string | null
  timetable: string
  website: string | null
}

export interface VerifyInnOgrnData {
  inn: string
}
