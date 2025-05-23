export class MakeResponse {
  id: number
  created_at: string
  updated_at: string
  name: string
}

export class ModelResponse {
  id: number
  created_at: string
  updated_at: string
  name: string
  type: string
  make_id: number
}

export class RangeResponse {
  id: number
  created_at: string
  updated_at: string
  name: string
  model_id: number
}

export class GenerationResponse {
  id: number
  created_at: string
  updated_at: string
  photo_url: string
  full_name: string
  short_name: string
  vehicle_body: string
  range_id: number
}

export class ConfigurationResponse {
  id: number
  created_at: string
  updated_at: string
  engine_capacity: number
  engine_power: number
  engine_type: string
  transmission: string
  drive: string
}

export class VehicleResponse {
  id: number
  created_at: string
  updated_at: string
  owner_id: number
  photo_path: string
  make: MakeResponse
  model: ModelResponse
  range: RangeResponse
  generation: GenerationResponse
  configuration: ConfigurationResponse
  color: string
  manufacture_year: number
  mileage: number
  vin: string
  registration_plate: string
}

export class CreateVehicleDto {
  make_id: number
  model_id: number
  range_id: number
  generation_id: number
  configuration_id: number
  color: string
  manufacture_year: number
  mileage: number
  vin: string
  registration_plate: string
  photo?: string | null
}
