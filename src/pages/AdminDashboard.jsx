import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Truck, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Eye,
  Filter,
  Download
} from 'lucide-react'
import { mockShipments, mockAnalytics, mockCouriers, statusColors, statusLabels } from '../data/mockData'

function AdminDashboard() {
  const [shipments, setShipments] = useState(mockShipments)
  const [analytics, setAnalytics] = useState(mockAnalytics)
  const [couriers, setCouriers] = useState(mockCouriers)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  const filteredShipments = shipments.filter(shipment => {
    if (selectedFilter === 'all') return true
    return shipment.status === selectedFilter
  })

  const getStatusCount = (status) => {
    return shipments.filter(s => s.status === status).length
  }

  const getRecentShipments = () => {
    return shipments
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  }

  const getTopDestinations = () => {
    const destinations = {}
    shipments.forEach(shipment => {
      const key = `${shipment.recipient.address.city}, ${shipment.recipient.address.state}`
      destinations[key] = (destinations[key] || 0) + 1
    })
    return Object.entries(destinations)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your shipping operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="form-input form-select"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="btn btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Shipments</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalShipments}</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered Today</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.deliveredToday}</p>
              <p className="text-sm text-green-600">+8% from yesterday</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.inTransit}</p>
              <p className="text-sm text-yellow-600">+3% from yesterday</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Truck className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Couriers</p>
              <p className="text-2xl font-bold text-gray-900">{couriers.filter(c => c.status === 'active').length}</p>
              <p className="text-sm text-blue-600">All systems operational</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipments Overview */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Shipments</h2>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="form-input form-select"
                >
                  <option value="all">All Status</option>
                  <option value="created">Created</option>
                  <option value="picked-up">Picked Up</option>
                  <option value="in-transit">In Transit</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button className="btn btn-secondary btn-sm">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredShipments.slice(0, 8).map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Package className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{shipment.trackingNumber}</p>
                      <p className="text-sm text-gray-600">{shipment.package.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${statusColors[shipment.status]}`}>
                        {statusLabels[shipment.status]}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(shipment.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-primary-color hover:text-primary-dark">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="text-primary-color hover:text-primary-dark font-medium">
                View all shipments
              </button>
            </div>
          </div>
        </motion.div>

        {/* Analytics Sidebar */}
        <div className="space-y-8">
          {/* Status Distribution */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
            <div className="space-y-4">
              {Object.entries(statusLabels).map(([status, label]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: statusColors[status] }}></div>
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{getStatusCount(status)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Destinations */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Destinations</h3>
            <div className="space-y-3">
              {getTopDestinations().map(([destination, count], index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{destination}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Courier Performance */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Courier Performance</h3>
            <div className="space-y-4">
              {couriers.slice(0, 3).map((courier) => (
                <div key={courier.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={courier.avatar}
                      alt={courier.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{courier.name}</p>
                      <p className="text-xs text-gray-500">{courier.deliveriesToday} today</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">{courier.rating}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
          <div className="flex items-center space-x-2">
            <button className="btn btn-secondary btn-sm">Daily</button>
            <button className="btn btn-primary btn-sm">Monthly</button>
          </div>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Revenue chart would be displayed here</p>
            <p className="text-sm text-gray-500">Integration with charting library needed</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Manage Couriers</h3>
          <p className="text-sm text-gray-600 mb-4">Add, edit, or remove courier accounts</p>
          <button className="btn btn-primary">Manage</button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Bulk Operations</h3>
          <p className="text-sm text-gray-600 mb-4">Process multiple shipments at once</p>
          <button className="btn btn-primary">Process</button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Generate Reports</h3>
          <p className="text-sm text-gray-600 mb-4">Create detailed analytics reports</p>
          <button className="btn btn-primary">Generate</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdminDashboard
