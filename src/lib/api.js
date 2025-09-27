import axios from 'axios'

// Configure axios base URL
const API_BASE_URL = 'http://localhost:3000'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('uniship_token')
    if (token) {
      config.headers.token = token // Backend expects 'token' header
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('uniship_token')
      localStorage.removeItem('uniship_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

