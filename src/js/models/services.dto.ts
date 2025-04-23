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
}

export class CreateServiceDto {
  name: string
  address: string
  summary: string | null
  timetable: string
  website: string | null
}
