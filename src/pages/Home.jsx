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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <Card className="gradient-warm border-0 text-white shadow-glow">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-white/90 text-lg">
                  {user?.role === 'admin' && 'Manage your shipping operations efficiently'}
                  {user?.role === 'user' && 'Track your packages and create new shipments'}
                  {user?.role === 'courier' && 'View your delivery assignments and update status'}
                </p>
              </div>
              <div className="hidden md:block">
                <Package className="h-24 w-24 text-primary-foreground/60" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(user?.role === 'user' || user?.role === 'admin') && (
          <Link to="/create-shipment">
            <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-900/30 transition-colors">
                    <Plus className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Create Shipment</h3>
                    <p className="text-sm text-muted-foreground">Send a new package</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        <Link to="/tracking">
          <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-lg group-hover:bg-teal-200 dark:group-hover:bg-teal-900/30 transition-colors">
                  <Search className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Track Package</h3>
                  <p className="text-sm text-muted-foreground">Find your shipment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/profile">
          <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg group-hover:bg-amber-200 dark:group-hover:bg-amber-900/30 transition-colors">
                  <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Profile</h3>
                  <p className="text-sm text-muted-foreground">Manage your account</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Shipments</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalShipments}</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivered Today</p>
                <p className="text-2xl font-bold text-foreground">{stats.deliveredToday}</p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold text-foreground">{stats.inTransit}</p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                <Truck className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Pickup</p>
                <p className="text-2xl font-bold text-foreground">{stats.pendingPickup}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Shipments */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Shipments</CardTitle>
              <Link
                to="/tracking"
                className="text-primary hover:text-primary/80 font-medium text-sm"
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
                  key={shipment.id}
                  variants={itemVariants}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-card rounded-lg shadow-sm">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {shipment.trackingNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {shipment.package.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${getStatusColor(shipment.status)}`}>
                        {getStatusLabel(shipment.status)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(shipment.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to={`/shipment/${shipment.id}`}
                      className="text-primary hover:text-primary/80"
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
                  className="inline-flex items-center mt-4 text-primary hover:text-primary/80 font-medium"
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
          <Card>
            <CardHeader>
              <CardTitle>Top Destinations</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-3">
              {mockAnalytics.topDestinations.map((destination, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{destination.city}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{destination.count}</span>
                </div>
              ))}
            </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
              {mockAnalytics.serviceTypes.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-foreground">{service.type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-foreground w-12 text-right">
                      {service.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Home
