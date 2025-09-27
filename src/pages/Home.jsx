import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  Plus, 
  Search, 
  TrendingUp,
  Users,
  MapPin,
  Star
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { mockShipments, mockAnalytics } from '../data/mockData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

function Home() {
  const { user } = useAuth()
  const [recentShipments, setRecentShipments] = useState([])
  const [stats, setStats] = useState({
    totalShipments: 0,
    deliveredToday: 0,
    inTransit: 0,
    pendingPickup: 0
  })

  useEffect(() => {
    // Filter shipments based on user role
    let userShipments = mockShipments
    if (user?.role === 'user') {
      userShipments = mockShipments.filter(shipment => 
        shipment.sender.email === user.email || shipment.recipient.email === user.email
      )
    } else if (user?.role === 'courier') {
      userShipments = mockShipments.filter(shipment => 
        shipment.courier?.id === user.id
      )
    }

    setRecentShipments(userShipments.slice(0, 5))
    
    // Calculate stats based on user role
    if (user?.role === 'admin') {
      setStats({
        totalShipments: mockAnalytics.totalShipments,
        deliveredToday: mockAnalytics.deliveredToday,
        inTransit: mockAnalytics.inTransit,
        pendingPickup: mockAnalytics.pendingPickup
      })
    } else {
      const userStats = {
        totalShipments: userShipments.length,
        deliveredToday: userShipments.filter(s => s.status === 'delivered' && 
          new Date(s.actualDelivery).toDateString() === new Date().toDateString()).length,
        inTransit: userShipments.filter(s => s.status === 'in-transit').length,
        pendingPickup: userShipments.filter(s => s.status === 'created' || s.status === 'picked-up').length
      }
      setStats(userStats)
    }
  }, [user])

  const getStatusColor = (status) => {
    const colors = {
      'created': 'text-gray-500',
      'picked-up': 'text-blue-500',
      'in-transit': 'text-yellow-500',
      'out-for-delivery': 'text-purple-500',
      'delivered': 'text-green-500',
      'exception': 'text-red-500',
      'returned': 'text-orange-500'
    }
    return colors[status] || 'text-gray-500'
  }

  const getStatusLabel = (status) => {
    const labels = {
      'created': 'Created',
      'picked-up': 'Picked Up',
      'in-transit': 'In Transit',
      'out-for-delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'exception': 'Exception',
      'returned': 'Returned'
    }
    return labels[status] || status
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-orange-600/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 relative z-10 max-w-7xl mx-auto"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-white">
            <div className="flex items-center justify-between">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                >
                  Welcome back, {(user?.user_name || user?.name)?.split(' ')[0]}!
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-blue-100 text-lg"
                >
                  {user?.role === 'admin' && 'Manage your shipping operations efficiently'}
                  {user?.role === 'user' && 'Track your packages and create new shipments'}
                  {user?.role === 'delivery_partner' && 'View your delivery assignments and update status'}
                </motion.p>
              </div>
              <div className="hidden md:block">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Package className="h-24 w-24 text-white/60" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(user?.role === 'user' || user?.role === 'admin') && (
            <Link to="/create-shipment">
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-white group hover:bg-white/20 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors"
                    whileHover={{ rotate: 5 }}
                  >
                    <Plus className="h-6 w-6 text-orange-400" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white">Create Shipment</h3>
                    <p className="text-sm text-blue-200">Send a new package</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          <Link to="/tracking">
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-white group hover:bg-white/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="p-3 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  <Search className="h-6 w-6 text-teal-400" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">Track Package</h3>
                  <p className="text-sm text-blue-200">Find your shipment</p>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link to="/profile">
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-white group hover:bg-white/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="p-3 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  <Users className="h-6 w-6 text-amber-400" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">Profile</h3>
                  <p className="text-sm text-blue-200">Manage your account</p>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-white"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-200">Total Shipments</p>
                <p className="text-2xl font-bold text-white">{stats.totalShipments}</p>
              </div>
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <Package className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-white"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-200">Delivered Today</p>
                <p className="text-2xl font-bold text-white">{stats.deliveredToday}</p>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-white"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-200">In Transit</p>
                <p className="text-2xl font-bold text-white">{stats.inTransit}</p>
              </div>
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <Truck className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-white"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-200">Pending Pickup</p>
                <p className="text-2xl font-bold text-white">{stats.pendingPickup}</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Shipments */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Shipments</h2>
              <Link
                to="/tracking"
                className="text-blue-300 hover:text-white font-medium text-sm transition-colors"
              >
                View all
              </Link>
            </div>
            {recentShipments.length > 0 ? (
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <motion.div
                    key={shipment.id}
                    variants={itemVariants}
                    className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {shipment.trackingNumber}
                        </p>
                        <p className="text-sm text-blue-200">
                          {shipment.package.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getStatusColor(shipment.status)}`}>
                          {getStatusLabel(shipment.status)}
                        </p>
                        <p className="text-xs text-blue-200">
                          {new Date(shipment.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Link
                        to={`/shipment/${shipment.id}`}
                        className="text-blue-300 hover:text-white transition-colors"
                      >
                        <TrendingUp className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-white/60 mx-auto mb-4" />
                <p className="text-blue-200">No recent shipments found</p>
                {(user?.role === 'user' || user?.role === 'admin') && (
                  <Link
                    to="/create-shipment"
                    className="inline-flex items-center mt-4 text-white hover:text-blue-200 font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first shipment
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Role-specific content */}
        {user?.role === 'admin' && (
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-white">
              <h3 className="text-xl font-bold text-white mb-6">Top Destinations</h3>
              <div className="space-y-3">
                {mockAnalytics.topDestinations.map((destination, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-blue-300" />
                      <span className="text-white">{destination.city}</span>
                    </div>
                    <span className="text-sm font-medium text-blue-200">{destination.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-white">
              <h3 className="text-xl font-bold text-white mb-6">Service Types</h3>
              <div className="space-y-3">
                {mockAnalytics.serviceTypes.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-white">{service.type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{ width: `${service.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-blue-200 w-12 text-right">
                        {service.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Home
