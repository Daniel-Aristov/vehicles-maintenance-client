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
