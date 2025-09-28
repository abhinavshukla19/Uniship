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
      'created': 'text-muted-foreground',
      'picked-up': 'text-info',
      'in-transit': 'text-warning',
      'out-for-delivery': 'text-primary',
      'delivered': 'text-success',
      'exception': 'text-destructive',
      'returned': 'text-warning'
    }
    return colors[status] || 'text-muted-foreground'
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
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/3 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-info/3 rounded-full blur-3xl"
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
          <Card className="shadow-lg border-0 bg-gradient-to-r from-primary/3 to-info/3">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold mb-3 text-foreground"
                  >
                    Welcome back, {(user?.user_name || user?.name)?.split(' ')[0]}!
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground text-lg"
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
                    className="w-24 h-24 bg-primary/8 rounded-full flex items-center justify-center"
                  >
                    <Package className="h-12 w-12 text-primary" />
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(user?.role === 'user' || user?.role === 'admin') && (
            <Link to="/create-shipment">
              <motion.div 
                className="bg-card rounded-xl shadow-md p-6 border border-border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="p-3 bg-primary/8 rounded-lg group-hover:bg-primary/15 transition-colors"
                    whileHover={{ rotate: 5 }}
                  >
                    <Plus className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Create Shipment</h3>
                    <p className="text-sm text-muted-foreground">Send a new package</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          <Link to="/tracking">
            <motion.div 
              className="bg-card rounded-xl shadow-md p-6 border border-border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                    className="p-3 bg-info/8 rounded-lg group-hover:bg-info/15 transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  <Search className="h-6 w-6 text-info" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Track Package</h3>
                  <p className="text-sm text-muted-foreground">Find your shipment</p>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link to="/profile">
            <motion.div 
              className="bg-card rounded-xl shadow-md p-6 border border-border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                    className="p-3 bg-warning/8 rounded-lg group-hover:bg-warning/15 transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  <Users className="h-6 w-6 text-warning" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Profile</h3>
                  <p className="text-sm text-muted-foreground">Manage your account</p>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-card rounded-xl shadow-md p-6 border border-border"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Shipments</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.totalShipments}</p>
              </div>
              <div className="p-3 bg-primary/8 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card rounded-xl shadow-md p-6 border border-border"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivered Today</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.deliveredToday}</p>
              </div>
              <div className="p-3 bg-success/8 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card rounded-xl shadow-md p-6 border border-border"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.inTransit}</p>
              </div>
              <div className="p-3 bg-warning/8 rounded-lg">
                <Truck className="h-6 w-6 text-warning" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card rounded-xl shadow-md p-6 border border-border"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Pickup</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.pendingPickup}</p>
              </div>
              <div className="p-3 bg-info/8 rounded-lg">
                <Clock className="h-6 w-6 text-info" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Shipments */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Recent Shipments</CardTitle>
                <Link
                  to="/tracking"
                  className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                >
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent>
            {recentShipments.length > 0 ? (
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <motion.div
                    key={shipment.shipment_id}
                    variants={itemVariants}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted/80 transition-all duration-300 border border-border"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/8 rounded-lg">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">
                          {shipment.tracking_number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {shipment.package_description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getStatusColor(shipment.status)}`}>
                          {getStatusLabel(shipment.status)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(shipment.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Link
                        to={`/shipment/${shipment.shipment_id}`}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <TrendingUp className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No recent shipments found</p>
                {(user?.role === 'user' || user?.role === 'admin') && (
                  <Link
                    to="/create-shipment"
                    className="inline-flex items-center mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first shipment
                  </Link>
                )}
              </div>
            )}
            </CardContent>
          </Card>
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
