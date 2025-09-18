import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck, 
  User, 
  Phone, 
  Mail,
  Calendar,
  Weight,
  Ruler,
  DollarSign,
  AlertTriangle,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react'
import { mockShipments, statusColors, statusLabels } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

function ShipmentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [shipment, setShipment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find shipment by ID
    const foundShipment = mockShipments.find(s => s.id === id)
    if (foundShipment) {
      setShipment(foundShipment)
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-spinner">Loading shipment details...</div>
      </div>
    )
  }

  if (!shipment) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Shipment Not Found</h3>
        <p className="text-gray-600 mb-4">The shipment you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/tracking')}
          className="btn btn-primary"
        >
          Back to Tracking
        </button>
      </div>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'in-transit':
        return <Truck className="h-6 w-6 text-yellow-500" />
      case 'out-for-delivery':
        return <Package className="h-6 w-6 text-purple-500" />
      case 'exception':
        return <AlertTriangle className="h-6 w-6 text-red-500" />
      default:
        return <Clock className="h-6 w-6 text-gray-500" />
    }
  }

  const getProgressPercentage = (status) => {
    const statusOrder = ['created', 'picked-up', 'in-transit', 'out-for-delivery', 'delivered']
    const currentIndex = statusOrder.indexOf(status)
    return ((currentIndex + 1) / statusOrder.length) * 100
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`
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
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/tracking')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{shipment.trackingNumber}</h1>
            <p className="text-gray-600">Shipment Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn btn-secondary btn-sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          <button className="btn btn-secondary btn-sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </motion.div>

      {/* Status Overview */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {getStatusIcon(shipment.status)}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {statusLabels[shipment.status]}
              </h2>
              <p className="text-gray-600">
                {shipment.currentLocation && 
                  `Currently in ${shipment.currentLocation.city}, ${shipment.currentLocation.state}`
                }
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Progress</p>
            <p className="text-2xl font-bold text-primary-color">
              {Math.round(getProgressPercentage(shipment.status))}%
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-primary-color h-3 rounded-full transition-all duration-500"
            style={{ width: `${getProgressPercentage(shipment.status)}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Created</p>
            <p className="font-medium">{formatDate(shipment.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-500">Estimated Delivery</p>
            <p className="font-medium">
              {shipment.estimatedDelivery ? formatDate(shipment.estimatedDelivery) : 'TBD'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Service</p>
            <p className="font-medium capitalize">{shipment.service}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tracking History */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking History</h3>
            <div className="space-y-6">
              {shipment.trackingHistory.map((event, index) => (
                <div key={event.id} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    index === 0 ? 'bg-primary-color' : 'bg-gray-300'
                  }`}>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">
                        {statusLabels[event.status]}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(event.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">{event.description}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Package Information */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Package Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Weight className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{shipment.package.weight} kg</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Ruler className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Dimensions</p>
                    <p className="font-medium">
                      {shipment.package.dimensions.length} × {shipment.package.dimensions.width} × {shipment.package.dimensions.height} cm
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{shipment.package.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Declared Value</p>
                    <p className="font-medium">${shipment.package.value}</p>
                  </div>
                </div>
              </div>
            </div>
            {shipment.package.fragile && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Fragile Item</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  This package contains fragile items and requires special handling.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Sender Information */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sender</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{shipment.sender.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{shipment.sender.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{shipment.sender.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-600">{formatAddress(shipment.sender.address)}</span>
              </div>
            </div>
          </motion.div>

          {/* Recipient Information */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{shipment.recipient.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{shipment.recipient.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{shipment.recipient.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-600">{formatAddress(shipment.recipient.address)}</span>
              </div>
            </div>
          </motion.div>

          {/* Courier Information */}
          {shipment.courier && (
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Courier</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{shipment.courier.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{shipment.courier.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{shipment.courier.vehicle}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn btn-outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </button>
              <button className="w-full btn btn-outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Delivery
              </button>
              <button className="w-full btn btn-outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Issue
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ShipmentDetails
