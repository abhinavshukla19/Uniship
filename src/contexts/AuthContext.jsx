import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check for stored user data and token on app load
    const storedUser = localStorage.getItem('uniship_user')
    const storedToken = localStorage.getItem('uniship_token')
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('uniship_user')
        localStorage.removeItem('uniship_token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      
      // Call backend API using auth service
      const response = await authService.login(email, password)

      // Store token
      setToken(response.token)
      localStorage.setItem('uniship_token', response.token)

      // Get user data from token or make another API call
      // For now, we'll create user data based on the email
      let userData = null
      if (email === 'admin@uniship.com') {
        userData = {
          user_id: '1',
          user_name: 'Admin User',
          user_email: 'admin@uniship.com',
          role: 'admin',
          user_phone: '+1 (555) 123-4567',
          user_state: 'NY',
          user_city: 'New York',
          user_street: '123 Admin Street',
          user_pincode: '10001',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      } else if (email === 'courier@uniship.com') {
        userData = {
          user_id: '2',
          user_name: 'John Courier',
          user_email: 'courier@uniship.com',
          role: 'delivery_partner',
          user_phone: '+1 (555) 234-5678',
          user_state: 'CA',
          user_city: 'Los Angeles',
          user_street: '456 Delivery Lane',
          user_pincode: '90210',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        }
      } else {
        userData = {
          user_id: '3',
          user_name: 'Jane User',
          user_email: 'user@uniship.com',
          role: 'user',
          user_phone: '+1 (555) 345-6789',
          user_state: 'IL',
          user_city: 'Chicago',
          user_street: '789 User Avenue',
          user_pincode: '60601',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        }
      }

      setUser(userData)
      localStorage.setItem('uniship_user', JSON.stringify(userData))
      toast.success(`Welcome back, ${userData.user_name}!`)
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    try {
      setLoading(true)
      
      // Call backend API using auth service
      const response = await authService.signup(userData)

      toast.success('Account created successfully!')
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Signup failed. Please try again.'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('uniship_user')
    localStorage.removeItem('uniship_token')
    toast.success('Logged out successfully')
  }

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('uniship_user', JSON.stringify(updatedUser))
    toast.success('Profile updated successfully!')
  }

  const changePassword = async (newPassword) => {
    try {
      setLoading(true)
      await authService.changePassword(newPassword)
      toast.success('Password changed successfully!')
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Password change failed.'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const deleteAccount = async (password) => {
    try {
      setLoading(true)
      await authService.deleteAccount(password)
      logout()
      toast.success('Account deleted successfully!')
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Account deletion failed.'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    deleteAccount
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
