import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Package, 
  Navigation,
  Phone,
  Star,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react'
import { mockShipments, mockCouriers } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

function CourierDashboard() {
  const { user } = useAuth()
  const [courier, setCourier] = useState(null)
  const [assignedShipments, setAssignedShipments] = useState([])
  const [isOnline, setIsOnline] = useState(true)
  const [currentLocation, setCurrentLocation] = useState({
    city: 'Denver',
    state: 'CO',
    coordinates: [39.7392, -104.9903]
  })

  useEffect(() => {
    // Find courier data
    const courierData = mockCouriers.find(c => c.id === user?.user_id || c.id === user?.id)
    if (courierData) {
      setCourier(courierData)
      setCurrentLocation(courierData.currentLocation)
    }

    // Get assigned shipments
    const assigned = mockShipments.filter(shipment => 
      shipment.courier?.id === user?.user_id || shipment.courier?.id === user?.id
    )
    setAssignedShipments(assigned)
  }, [user])

  const getStatusColor = (status) => {
    const colors = {
      'created': 'text-gray-500',
      'picked-up': 'text-blue-500',
      'in-transit': 'text-yellow-500',
      'out-for-delivery': 'text-purple-500',
      'delivered': 'text-green-500',
      'exception': 'text-red-500'
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
      'exception': 'Exception'
    }
    return labels[status] || status
  }

  const updateShipmentStatus = (shipmentId, newStatus) => {
    setAssignedShipments(prev => 
      prev.map(shipment => 
        shipment.id === shipmentId 
          ? { ...shipment, status: newStatus, updatedAt: new Date().toISOString() }
          : shipment
      )
    )
  }

  const getNextAction = (status) => {
    switch (status) {
      case 'created':
        return { action: 'Pick Up', nextStatus: 'picked-up', color: 'bg-blue-500' }
      case 'picked-up':
        return { action: 'Start Delivery', nextStatus: 'out-for-delivery', color: 'bg-purple-500' }
      case 'out-for-delivery':
        return { action: 'Mark Delivered', nextStatus: 'delivered', color: 'bg-green-500' }
      default:
        return null
    }
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

  if (!courier) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-spinner">Loading courier dashboard...</div>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Courier Dashboard</h1>
          <p className="text-gray-600">Manage your deliveries and track your performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-gray-500'
            }`}></div>
            <span className="text-sm font-medium">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`btn ${isOnline ? 'btn-secondary' : 'btn-primary'}`}
          >
            {isOnline ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Go Offline
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Go Online
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">{courier.deliveriesToday}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">{courier.totalDeliveries}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">{courier.rating}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vehicle</p>
              <p className="text-lg font-bold text-gray-900">{courier.vehicle}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Navigation className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Location & Status */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Current Location</p>
                  <p className="font-medium text-gray-900">
                    {currentLocation.city}, {currentLocation.state}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-gray-900">
                    {isOnline ? 'Available for deliveries' : 'Offline'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Assigned Shipments</p>
                  <p className="font-medium text-gray-900">
                    {assignedShipments.filter(s => s.status !== 'delivered').length} pending
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full btn btn-primary">
                <Navigation className="h-4 w-4 mr-2" />
                Update Location
              </button>
              <button className="w-full btn btn-secondary">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Status
              </button>
            </div>
          </div>
        </motion.div>

        {/* Assigned Shipments */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Assigned Shipments</h3>
              <span className="text-sm text-gray-500">
                {assignedShipments.filter(s => s.status !== 'delivered').length} pending
              </span>
            </div>

            <div className="space-y-4">
              {assignedShipments.length > 0 ? (
                assignedShipments
                  .filter(shipment => shipment.status !== 'delivered')
                  .map((shipment) => {
                    const nextAction = getNextAction(shipment.status)
                    return (
                      <div key={shipment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Package className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{shipment.trackingNumber}</h4>
                              <p className="text-sm text-gray-600">{shipment.package.description}</p>
                            </div>
                          </div>
                          <span className={`text-sm font-medium ${getStatusColor(shipment.status)}`}>
                            {getStatusLabel(shipment.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">From</p>
                            <p className="text-sm font-medium text-gray-900">
                              {shipment.sender.address.city}, {shipment.sender.address.state}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">To</p>
                            <p className="text-sm font-medium text-gray-900">
                              {shipment.recipient.address.city}, {shipment.recipient.address.state}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="text-primary-color hover:text-primary-dark text-sm font-medium">
                              <Phone className="h-4 w-4 inline mr-1" />
                              Contact Recipient
                            </button>
                            <button className="text-primary-color hover:text-primary-dark text-sm font-medium">
                              <Navigation className="h-4 w-4 inline mr-1" />
                              Get Directions
                            </button>
                          </div>
                          {nextAction && (
                            <button
                              onClick={() => updateShipmentStatus(shipment.id, nextAction.nextStatus)}
                              className={`btn ${nextAction.color} text-white btn-sm`}
                            >
                              {nextAction.action}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Assigned Shipments</h4>
                  <p className="text-gray-600">You don't have any pending deliveries at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Deliveries */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Deliveries</h3>
        
        <div className="space-y-4">
          {assignedShipments
            .filter(shipment => shipment.status === 'delivered')
            .slice(0, 5)
            .map((shipment) => (
              <div key={shipment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{shipment.trackingNumber}</p>
                    <p className="text-sm text-gray-600">
                      Delivered to {shipment.recipient.address.city}, {shipment.recipient.address.state}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Delivered</p>
                  <p className="text-xs text-gray-500">
                    {shipment.actualDelivery ? 
                      new Date(shipment.actualDelivery).toLocaleDateString() : 
                      'Recently'
                    }
                  </p>
                </div>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
            <Star className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Customer Rating</h3>
          <p className="text-3xl font-bold text-primary-color mb-2">{courier.rating}</p>
          <p className="text-sm text-gray-600">Based on {courier.totalDeliveries} deliveries</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">On-Time Delivery</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">98%</p>
          <p className="text-sm text-gray-600">Last 30 days</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
            <Truck className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Distance Traveled</h3>
          <p className="text-3xl font-bold text-purple-600 mb-2">1,247</p>
          <p className="text-sm text-gray-600">Miles this month</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CourierDashboard
