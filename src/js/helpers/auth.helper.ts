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

    if (Cookies.get('refresh_token')) Cookies.remove('refresh_token')
    Cookies.set('refresh_token', currentTokens.refreshToken)
  }
  return currentTokens
}

export function removeUserTokens() {
  currentTokens = {
    accessToken: '',
    refreshToken: ''
  }

  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')

  Cookies.remove('access_token')
  Cookies.remove('refresh_token')

  delete axiosInstance.defaults.headers.common['Authorization']
}

export function setUserTokens(accessToken: string, refreshToken?: string) {
  if (!accessToken) {
    return removeUserTokens()
  }

  const currentRefreshToken = getUserTokens().refreshToken

  currentTokens = {
    accessToken: accessToken,
    refreshToken: refreshToken || currentRefreshToken
  }

  localStorage.setItem('access_token', currentTokens.accessToken)
  localStorage.setItem('refresh_token', currentTokens.refreshToken)

  if (Cookies.get('access_token')) Cookies.remove('access_token')
  Cookies.set('access_token', currentTokens.accessToken)

  if (Cookies.get('refresh_token')) Cookies.remove('refresh_token')
  Cookies.set('refresh_token', currentTokens.refreshToken)

  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${currentTokens.accessToken}`
}

export function isAuthenticated(): boolean {
  const accessToken = getUserTokens().accessToken
  return accessToken !== ''
}
