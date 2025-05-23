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
  photo_path: string
}

export interface UpdateUserDto {
  last_name?: string | null
  first_name?: string | null
  patronymic?: string | null
  birthday?: string | null
  phone?: string | null
  photo_path?: string | null
}

export interface AssignNewRoleUserResponse {
  id: number
  created_at: string
  updated_at: string
  user_id: number
  role: string
}

export interface AssignNewRoleUserDto {
  role: string
}
