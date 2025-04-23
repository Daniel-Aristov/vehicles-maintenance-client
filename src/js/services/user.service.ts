import axiosInstance from '@/js/plugins/axios'
import { UpdateUserDto, UserResponse } from '@/js/models/user.dto'

const API_URL = '/users'

export class UserService {
  static async getCurrentUser() {
    try {
      const response = await axiosInstance.get<UserResponse>(`${API_URL}/me`)
      return response.data
    } catch (error) {
      throw new Error(
        'Произошла ошибка при получении информации о пользователе'
      )
    }
  }

  static async updateCurrentUser(user: UpdateUserDto) {
    try {
      const response = await axiosInstance.patch<UserResponse>(
        `${API_URL}/me`,
        user
      )
      return response.data
    } catch (error) {
      throw new Error(
        'Произошла ошибка при обновлении информации о пользователе'
      )
    }
  }
}
