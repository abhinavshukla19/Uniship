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
  HelpCircle,
  Palette
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
    { name: 'Dashboard', href: '/', icon: Home, roles: ['user', 'admin', 'delivery_partner'] },
    { name: 'Create Shipment', href: '/create-shipment', icon: Plus, roles: ['user', 'admin'] },
    { name: 'Track Package', href: '/tracking', icon: Search, roles: ['user', 'admin', 'delivery_partner'] },
    { name: 'My Shipments', href: '/my-shipments', icon: FileText, roles: ['user', 'admin'] },
    { name: 'Shipment Details', href: '/shipment-details', icon: MapPin, roles: ['user', 'admin', 'delivery_partner'] },
    { name: 'Recent Activity', href: '/recent-activity', icon: Clock, roles: ['user', 'admin', 'delivery_partner'] },
    { name: 'Profile', href: '/profile', icon: User, roles: ['user', 'admin', 'delivery_partner'] },
    { name: 'Admin Dashboard', href: '/admin-dashboard', icon: BarChart3, roles: ['admin'] },
    { name: 'Delivery Dashboard', href: '/courier-dashboard', icon: Truck, roles: ['delivery_partner'] },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp, roles: ['admin'] },
    { name: 'Users', href: '/users', icon: Users, roles: ['admin'] },
    { name: 'Help & Support', href: '/help', icon: HelpCircle, roles: ['user', 'admin', 'delivery_partner'] },
    { name: 'Background Themes', href: '/background-demo', icon: Palette, roles: ['user', 'admin', 'delivery_partner'] },
    { name: 'Contact', href: '/contact', icon: Mail, roles: ['user', 'admin', 'delivery_partner'] },
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
    <div className="min-h-screen">
      {/* Main content */}
      <div className="flex flex-col">
        {/* Top bar */}
        <header className="glass-card border-b border-white/20 sticky top-0 z-30">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-white" />
                <span className="text-xl font-bold text-white">Uniship</span>
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
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
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
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User menu */}
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.user_name || user?.name}
                  className="h-8 w-8 rounded-full object-cover border border-white/20"
                />
                <div className="hidden sm:block">
                  <span className="text-sm font-medium text-white">
                    {user?.user_name || user?.name}
                  </span>
                  <p className="text-xs text-white/70 capitalize">
                    {user?.role === 'delivery_partner' ? 'Delivery Partner' : 
                     user?.role === 'admin' ? 'Admin' : 
                     user?.role === 'user' ? 'User' : user?.role}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden sm:flex text-white hover:bg-white/10"
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
              className="md:hidden glass-card border-b border-white/20 shadow-lg"
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
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
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
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Layout
