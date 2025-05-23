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
