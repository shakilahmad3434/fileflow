import api from './api'

export const signup = (credentials) => {
  return api.post('/auth/signup', credentials)
}

export const login = (credentials) => {
  return api.post('/auth/login', credentials)
}