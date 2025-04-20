import { removeUserTokens, setUserTokens } from '@/js/helpers/auth.helper'
import axiosInstance from '@/js/plugins/axios'
import { AxiosError } from 'axios'
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from '@/js/models/auth.dto'
import { UserResponse } from '@/js/models/user.dto'

const API_URL = '/auth'

export class AuthService {
  static async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        `${API_URL}/login`,
        data
      )
      console.log(response.data.access_token)
      setUserTokens(response.data.access_token)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          throw new Error('Неверный email или пароль')
        }
      }
      throw new Error('Произошла ошибка при входе')
    }
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        `${API_URL}/register`,
        data
      )
      setUserTokens(response.data.access_token)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 400) {
          throw new Error('Пользователь с таким email уже существует')
        }
      }
      throw new Error('Произошла ошибка при регистрации')
    }
  }

  static async logout() {
    try {
      removeUserTokens()
    } catch (error) {
      console.error('Произошла ошибка при выходе:', error)
    }
  }

  static async refreshToken() {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        `${API_URL}/refresh`
      )
      setUserTokens(response.data.access_token)
      return response.data
    } catch (error) {
      console.error('Произошла ошибка при обновлении токена:', error)
      throw new Error('Произошла ошибка при обновлении токена')
    }
  }

  static async getCurrentUser() {
    try {
      const response = await axiosInstance.get<UserResponse>(`${API_URL}/me`)
      return response.data
    } catch (error) {
      console.error(
        'Произошла ошибка при получении информации о пользователе:',
        error
      )
      throw new Error(
        'Произошла ошибка при получении информации о пользователе'
      )
    }
  }
}
