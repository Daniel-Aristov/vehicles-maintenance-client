export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
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
