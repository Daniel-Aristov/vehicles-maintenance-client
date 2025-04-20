export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  last_name: string
  first_name: string
  patronymic: string
  birthday: string
  phone: string
  email: string
  password: string
  role_id: number
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  token_type: string
}
