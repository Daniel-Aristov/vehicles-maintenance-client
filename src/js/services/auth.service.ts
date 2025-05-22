import { removeUserTokens, setUserTokens } from '@/js/helpers/auth.helper'
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from '@/js/models/auth.dto'
import axiosInstance from '@/js/plugins/axios'
import { AxiosError } from 'axios'

const API_URL = '/auth'

export class AuthService {
  static async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        `${API_URL}/login`,
        data
      )

      setUserTokens(response.data.access_token, response.data.refresh_token)

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
      const formData = new FormData()

      // Добавляем обязательные поля
      formData.append('last_name', data.last_name)
      formData.append('first_name', data.first_name)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('role', data.role)

      // Добавляем опциональные поля
      if (data.patronymic) formData.append('patronymic', data.patronymic)
      if (data.birthday) formData.append('birthday', data.birthday)
      if (data.phone) formData.append('phone', data.phone)
      if (data.photo) formData.append('photo', data.photo)

      const response = await axiosInstance.post<AuthResponse>(
        `${API_URL}/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      setUserTokens(response.data.access_token, response.data.refresh_token)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 400) {
          throw new Error('Пользователь с таким email уже существует')
        }
        if (error.response.status === 409) {
          throw new Error('Данные пользователя не уникальны')
        }
      }
      throw new Error('Произошла ошибка при регистрации')
    }
  }

  static async logout() {
    try {
      removeUserTokens()
    } catch (error) {
      throw new Error('Произошла ошибка при выходе')
    }
  }

  static async refreshToken() {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        `${API_URL}/refresh-access-token`
      )

      setUserTokens(response.data.access_token)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          throw new Error('Токен обновления недействителен')
        }
      }
      throw new Error('Произошла ошибка при обновлении токена')
    }
  }
}
