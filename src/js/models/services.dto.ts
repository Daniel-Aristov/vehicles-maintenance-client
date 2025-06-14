export class ServiceResponse {
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

export class CreateServiceDto {
  name: string
  commercial_name: string
  inn: string
  ogrn: string
  address: string
  summary: string | null
  timetable: string
  website: string | null
}

export class ServiceWorkerResponse {
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

export class UpdateServiceDto {
  commercial_name?: string | null
  address?: string | null
  summary?: string | null
  timetable?: string | null
  website?: string | null
}

export class ServiceClientResponse {
  id: number
  last_name: string
  first_name: string
  patronymic: string
  photo_path: string
  phone: string
  email: string
}

export class VerifyInnOgrnResponse {
  name: string
  ogrn: string
  is_working: boolean
}

export class VerifyInnOgrnDto {
  inn: string
}

export class InviteWorkerDto {
  email: string
  position: string
}

export class InviteClientDto {
  email: string
}
