import { createContext, useContext, useState, useEffect } from 'react'
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

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('uniship_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('uniship_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      
      // Mock authentication - in real app, this would be an API call
      const mockUsers = [
        {
          id: 1,
          email: 'admin@uniship.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 2,
          email: 'user@uniship.com',
          password: 'user123',
          name: 'John Doe',
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 3,
          email: 'courier@uniship.com',
          password: 'courier123',
          name: 'Mike Johnson',
          role: 'courier',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
        }
      ]

      const foundUser = mockUsers.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        const userData = { ...foundUser }
        delete userData.password // Don't store password
        setUser(userData)
        localStorage.setItem('uniship_user', JSON.stringify(userData))
        toast.success(`Welcome back, ${userData.name}!`)
        return { success: true }
      } else {
        toast.error('Invalid email or password')
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    try {
      setLoading(true)
      
      // Mock signup - in real app, this would be an API call
      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'user', // Default role for new users
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUser(newUser)
      localStorage.setItem('uniship_user', JSON.stringify(newUser))
      toast.success('Account created successfully!')
      return { success: true }
    } catch (error) {
      toast.error('Signup failed. Please try again.')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('uniship_user')
    toast.success('Logged out successfully')
  }

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('uniship_user', JSON.stringify(updatedUser))
    toast.success('Profile updated successfully!')
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
