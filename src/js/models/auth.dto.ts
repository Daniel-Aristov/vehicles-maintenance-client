export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  last_name: string
  first_name: string
  patronymic?: string | null
  birthday?: string | null
  phone?: string | null
  email: string
  password: string
  role: string
  photo?: File | null
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  token_type: string
}
