import { getUserTokens, isAuthenticated } from '@/js/helpers/auth.helper'
import axiosInstance from '@/js/plugins/axios'

axiosInstance.interceptors.request.use(
  (config) => {
    if (isAuthenticated()) {
      const tokens = getUserTokens()
      if (config.headers) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
