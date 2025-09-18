import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateShipment from './pages/CreateShipment'
import Tracking from './pages/Tracking'
import ShipmentDetails from './pages/ShipmentDetails'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import CourierDashboard from './pages/CourierDashboard'
import Contact from './pages/Contact'

// Dynamic Page Title Component
function PageTitle() {
  const location = useLocation()
  const { user } = useAuth()
  
  useEffect(() => {
    const getPageTitle = () => {
      const baseTitle = 'Uniship - Package Tracking System'
      
      switch (location.pathname) {
        case '/':
          return user?.role === 'admin' 
            ? 'Dashboard - Admin | Uniship'
            : user?.role === 'courier'
            ? 'Dashboard - Courier | Uniship'
            : 'Dashboard | Uniship'
        case '/login':
          return 'Login | Uniship'
        case '/signup':
          return 'Sign Up | Uniship'
        case '/create-shipment':
          return 'Create Shipment | Uniship'
        case '/tracking':
          return 'Track Package | Uniship'
        case '/profile':
          return 'Profile | Uniship'
        case '/admin-dashboard':
          return 'Admin Dashboard | Uniship'
        case '/courier-dashboard':
          return 'Courier Dashboard | Uniship'
        case '/contact':
          return 'Contact | Uniship'
        default:
          if (location.pathname.startsWith('/shipment/')) {
            return 'Shipment Details | Uniship'
          }
          return baseTitle
      }
    }
    
    document.title = getPageTitle()
  }, [location.pathname, user?.role])
  
  return null
}

// Protected Route Component
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="loading-spinner">Loading...</div>
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }
  
  return children
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <PageTitle />
          <div className="min-h-screen bg-background text-foreground">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/create-shipment" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <Layout>
                  <CreateShipment />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/tracking" element={
              <ProtectedRoute>
                <Layout>
                  <Tracking />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/shipment/:id" element={
              <ProtectedRoute>
                <Layout>
                  <ShipmentDetails />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/courier" element={
              <ProtectedRoute allowedRoles={['courier']}>
                <Layout>
                  <CourierDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/contact" element={
              <ProtectedRoute>
                <Layout>
                  <Contact />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App