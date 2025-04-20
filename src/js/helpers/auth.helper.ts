import axiosInstance from '@/js/plugins/axios'
import Cookies from 'js-cookie'

type userTokens = {
  accessToken: string
  refreshToken: string
}

let currentTokens: userTokens | null = null

export function getUserTokens(): userTokens {
  if (!currentTokens) {
    currentTokens = {
      accessToken: localStorage.getItem('access_token') || '',
      refreshToken: localStorage.getItem('refresh_token') || ''
    }

    if (Cookies.get('access_token')) Cookies.remove('access_token')
    Cookies.set('access_token', currentTokens.accessToken)
  }
  return currentTokens
}

export function removeUserTokens() {
  currentTokens = {
    accessToken: '',
    refreshToken: ''
  }

  localStorage.removeItem('access_token')
  Cookies.remove('access_token')

  delete axiosInstance.defaults.headers.common['Authorization']
}

export function setUserTokens(userToken: string) {
  if (!userToken) {
    return removeUserTokens()
  }

  currentTokens = {
    accessToken: userToken,
    refreshToken: ''
  }

  localStorage.setItem('access_token', currentTokens.accessToken)
  localStorage.setItem('refresh_token', currentTokens.refreshToken)

  if (Cookies.get('access_token')) Cookies.remove('access_token')
  Cookies.set('access_token', currentTokens.accessToken)

  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${currentTokens.accessToken}`
}

export function isAuthenticated(): boolean {
  const accessToken = getUserTokens().accessToken
  return accessToken !== ''
}
