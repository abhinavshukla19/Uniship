import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, MapPin, Clock, CheckCircle, AlertCircle, Truck } from 'lucide-react'
import { mockShipments, statusColors, statusLabels } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

function Tracking() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredShipments, setFilteredShipments] = useState([])
  const [selectedShipment, setSelectedShipment] = useState(null)
  const { user } = useAuth()

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

    setFilteredShipments(userShipments)
  }, [user])

  useEffect(() => {
    if (searchTerm) {
      const filtered = filteredShipments.filter(shipment =>
        shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.package.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredShipments(filtered)
    } else {
      // Reset to all user shipments when search is cleared
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
      setFilteredShipments(userShipments)
    }
  }, [searchTerm, user])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'in-transit':
        return <Truck className="h-5 w-5 text-yellow-500" />
      case 'out-for-delivery':
        return <Package className="h-5 w-5 text-purple-500" />
      case 'exception':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getProgressPercentage = (status) => {
    const statusOrder = ['created', 'picked-up', 'in-transit', 'out-for-delivery', 'delivered']
    const currentIndex = statusOrder.indexOf(status)
    return ((currentIndex + 1) / statusOrder.length) * 100
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
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Packages</h1>
        <p className="text-gray-600">Monitor the status of your shipments in real-time</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by tracking number, sender, recipient, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10 w-full"
          />
        </div>
      </motion.div>

      {/* Shipments List */}
      <motion.div variants={itemVariants} className="space-y-6">
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => (
            <motion.div
              key={shipment.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Package className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {shipment.trackingNumber}
                      </h3>
                      <p className="text-gray-600">{shipment.package.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(shipment.status)}
                    <span className={`font-medium ${statusColors[shipment.status]}`}>
                      {statusLabels[shipment.status]}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(getProgressPercentage(shipment.status))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-color h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(shipment.status)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">From</p>
                    <p className="text-gray-900">{shipment.sender.name}</p>
                    <p className="text-sm text-gray-600">{shipment.sender.address.city}, {shipment.sender.address.state}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">To</p>
                    <p className="text-gray-900">{shipment.recipient.name}</p>
                    <p className="text-sm text-gray-600">{shipment.recipient.address.city}, {shipment.recipient.address.state}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service</p>
                    <p className="text-gray-900 capitalize">{shipment.service}</p>
                    <p className="text-sm text-gray-600">
                      {shipment.estimatedDelivery ? 
                        `Est. ${new Date(shipment.estimatedDelivery).toLocaleDateString()}` : 
                        'No estimate'
                      }
                    </p>
                  </div>
                </div>

                {/* Current Location */}
                {shipment.currentLocation && (
                  <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Current location:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {shipment.currentLocation.city}, {shipment.currentLocation.state}
                    </span>
                  </div>
                )}

                {/* Tracking History */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Tracking History</h4>
                  <div className="space-y-3">
                    {shipment.trackingHistory.slice(-3).map((event, index) => (
                      <div key={event.id} className="flex items-start space-x-3">
                        <div className={`p-1 rounded-full ${
                          index === 0 ? 'bg-primary-color' : 'bg-gray-300'
                        }`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {statusLabels[event.status]}
                          </p>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {shipment.trackingHistory.length > 3 && (
                    <button
                      onClick={() => setSelectedShipment(shipment)}
                      className="mt-3 text-sm text-primary-color hover:text-primary-dark font-medium"
                    >
                      View full tracking history
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments found</h3>
            <p className="text-gray-600">
              {searchTerm ? 
                'Try adjusting your search terms' : 
                'You don\'t have any shipments yet'
              }
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Detailed Tracking Modal */}
      {selectedShipment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedShipment(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedShipment.trackingNumber}
                </h2>
                <button
                  onClick={() => setSelectedShipment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {selectedShipment.trackingHistory.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      index === 0 ? 'bg-primary-color' : 'bg-gray-300'
                    }`}>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">
                          {statusLabels[event.status]}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                      <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Tracking
