import api from './api'

export const signup = (credentials) => {
  return api.post('/auth/signup', credentials)
}

export const login = (credentials) => {
  return api.post('/auth/login', credentials)
}

export const forgotPassword = (credentials) => {
  return api.post('/auth/forgot-password', credentials)
}

export const resetPassword = (credentials, token) => {
  return api.post(`/auth/reset-password/${token}`, credentials)
}