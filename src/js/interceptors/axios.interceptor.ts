import {
  getUserTokens,
  isAuthenticated,
  removeUserTokens
} from '@/js/helpers/auth.helper'
import axiosInstance from '@/js/plugins/axios'
import { AuthService } from '@/js/services/auth.service'
import router from '@/router'

interface QueueItem {
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}

let isRefreshing = false
let failedQueue: QueueItem[] = []

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })
  failedQueue = []
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (isAuthenticated()) {
      const tokens = getUserTokens()
      if (config.headers) {
        if (config.url?.includes('refresh-access-token')) {
          config.headers.Authorization = `Bearer ${tokens.refreshToken}`
        } else {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401) {
      // Если это ответ от refresh-token endpoint
      if (originalRequest.url?.includes('refresh-access-token')) {
        removeUserTokens()
        router.push('/login')
        return Promise.reject(error)
      }

      // Обычная обработка 401 для других endpoints
      if (!originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(() => axiosInstance(originalRequest))
            .catch((err) => Promise.reject(err))
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          await AuthService.refreshToken()
          processQueue()
          return axiosInstance(originalRequest)
        } catch (refreshError: unknown) {
          processQueue(
            refreshError instanceof Error
              ? refreshError
              : new Error('Refresh token error')
          )
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
