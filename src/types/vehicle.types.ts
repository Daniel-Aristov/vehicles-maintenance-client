interface BaseEntity {
  id: number
  created_at: string
  updated_at: string
}

export interface Make extends BaseEntity {
  name: string
}

export interface Model extends BaseEntity {
  name: string
  type: string
  make_id: number
}

export interface Range extends BaseEntity {
  name: string
  model_id: number
}

export interface Generation extends BaseEntity {
  photo_url: string
  full_name: string
  short_name: string
  vehicle_body: string
  range_id: number
}

export interface Configuration extends BaseEntity {
  engine_capacity: number
  engine_power: number
  engine_type: string
  transmission: string
  drive: string
}

export interface Vehicle extends BaseEntity {
  owner_id: number
  photo_path: string
  make: Make
  model: Model
  range: Range
  generation: Generation
  configuration: Configuration
  color: string
  manufacture_year: number
  mileage: number
  vin: string
  registration_plate: string
}

export const COLORS = [
  'белый',
  'бежевый',
  'желтый',
  'золотистый',
  'оранжевый',
  'розовый',
  'красный',
  'бордовый',
  'зеленый',
  'голубой',
  'синий',
  'фиолетовый',
  'серый',
  'серебристый',
  'коричневый',
  'черный'
] as const
