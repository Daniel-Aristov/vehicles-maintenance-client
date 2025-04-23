export interface User {
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

export enum UserRole {
  OWNER,
  WORKER,
  MANAGER,
  ADMIN
}

export const USER_ROLE_NAMES: Record<UserRole, string> = {
  [UserRole.OWNER]: 'owner',
  [UserRole.WORKER]: 'worker',
  [UserRole.MANAGER]: 'manager',
  [UserRole.ADMIN]: 'admin'
}
