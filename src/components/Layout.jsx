import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, 
  User, 
  LogOut, 
  Menu, 
  Home, 
  Plus, 
  Search, 
  BarChart3,
  Truck,
  Mail,
  Bell,
  FileText,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  HelpCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, roles: ['user', 'admin', 'courier'] },
    { name: 'Create Shipment', href: '/create-shipment', icon: Plus, roles: ['user', 'admin'] },
    { name: 'Track Package', href: '/tracking', icon: Search, roles: ['user', 'admin', 'courier'] },
    { name: 'My Shipments', href: '/my-shipments', icon: FileText, roles: ['user', 'admin'] },
    { name: 'Shipment Details', href: '/shipment-details', icon: MapPin, roles: ['user', 'admin', 'courier'] },
    { name: 'Recent Activity', href: '/recent-activity', icon: Clock, roles: ['user', 'admin', 'courier'] },
    { name: 'Profile', href: '/profile', icon: User, roles: ['user', 'admin', 'courier'] },
    { name: 'Admin Dashboard', href: '/admin-dashboard', icon: BarChart3, roles: ['admin'] },
    { name: 'Courier Dashboard', href: '/courier-dashboard', icon: Truck, roles: ['courier'] },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp, roles: ['admin'] },
    { name: 'Users', href: '/users', icon: Users, roles: ['admin'] },
    { name: 'Help & Support', href: '/help', icon: HelpCircle, roles: ['user', 'admin', 'courier'] },
    { name: 'Contact', href: '/contact', icon: Mail, roles: ['user', 'admin', 'courier'] },
  ]

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role)
  )

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main content */}
      <div className="flex flex-col">
        {/* Top bar */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-30">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">Uniship</span>
              </Link>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                {filteredNavigation.slice(0, 5).map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Mobile Menu */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User menu */}
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full object-cover border border-border"
                />
                <span className="hidden sm:block text-sm font-medium text-foreground">
                  {user?.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden sm:flex"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-b border-border shadow-lg"
            >
              <nav className="px-4 py-4 space-y-2">
                {filteredNavigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Layout
