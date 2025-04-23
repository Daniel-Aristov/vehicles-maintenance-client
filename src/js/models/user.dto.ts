export interface UserResponse {
  id: number
  created_at: string
  updated_at: string
  last_name: string
  first_name: string
  patronymic: string
  birthday: string
  phone: string
  email: string
  roles: string[]
}

export interface UpdateUserDto {
  last_name?: string | null
  first_name?: string | null
  patronymic?: string | null
  birthday?: string | null
  phone?: string | null
}
