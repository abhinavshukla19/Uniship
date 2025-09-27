import api from '../lib/api'

export const authService = {
  // Login user
  login: async (email, password) => {
    const response = await api.post('/signin', {
      user_email: email,
      user_password: password
    })
    return response.data
  },

  // Register user
  signup: async (userData) => {
    const response = await api.post('/signup', {
      user_name: userData.name,
      user_email: userData.email,
      user_password: userData.password,
      user_phone: userData.phone,
      user_state: userData.address.state,
      user_city: userData.address.city,
      user_street: userData.address.street,
      user_pincode: userData.address.pincode,
      role: userData.role || 'user'
    })
    return response.data
  },

  // Change password
  changePassword: async (newPassword) => {
    const response = await api.post('/change_password', {
      user_password: newPassword
    })
    return response.data
  },

  // Delete account
  deleteAccount: async (password) => {
    const response = await api.post('/delete-account', {
      user_password: password
    })
    return response.data
  },

  // Get user profile (if you add this endpoint)
  getProfile: async () => {
    const response = await api.get('/profile')
    return response.data
  },

  // Update user profile (if you add this endpoint)
  updateProfile: async (userData) => {
    const response = await api.put('/profile', userData)
    return response.data
  }
}

