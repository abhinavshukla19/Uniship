import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Package,
  Truck,
  Clock,
  CheckCircle,
  Users,
  DollarSign,
  Calendar,
  Download
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

// Note: If using localhost, ensure CORS is enabled server-side or use a dev proxy
const API_URL = "http://localhost:3000"

function Analytics() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState({
    totalShipments: 0,
    deliveredToday: 0,
    inTransit: 0,
    pendingPickup: 0,
    totalRevenue: 0,
    averageDeliveryTime: 0,
    topRoutes: [],
    monthlyTrends: []
  })
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      // This would be a real API call to get analytics data
      // For now, we'll simulate with mock data
      const mockAnalytics = {
        totalShipments: 1250,
        deliveredToday: 45,
        inTransit: 78,
        pendingPickup: 23,
        totalRevenue: 12500.50,
        averageDeliveryTime: 2.5,
        topRoutes: [
          { route: 'NYC → LA', count: 150, revenue: 2250 },
          { route: 'Chicago → Miami', count: 120, revenue: 1800 },
          { route: 'Seattle → Denver', count: 95, revenue: 1425 }
        ],
        monthlyTrends: [
          { month: 'Jan', shipments: 100, revenue: 1000 },
          { month: 'Feb', shipments: 120, revenue: 1200 },
          { month: 'Mar', shipments: 140, revenue: 1400 },
          { month: 'Apr', shipments: 160, revenue: 1600 },
          { month: 'May', shipments: 180, revenue: 1800 },
          { month: 'Jun', shipments: 200, revenue: 2000 }
        ]
      }
      setAnalytics(mockAnalytics)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      title: 'Total Shipments',
      value: analytics.totalShipments.toLocaleString(),
      icon: Package,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Delivered Today',
      value: analytics.deliveredToday,
      icon: CheckCircle,
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'In Transit',
      value: analytics.inTransit,
      icon: Truck,
      change: '-3%',
      changeType: 'negative'
    },
    {
      title: 'Pending Pickup',
      value: analytics.pendingPickup,
      icon: Clock,
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Avg Delivery Time',
      value: `${analytics.averageDeliveryTime} days`,
      icon: TrendingUp,
      change: '-10%',
      changeType: 'positive'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Insights and performance metrics for your shipping operations
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1">
                      {stat.changeType === 'positive' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${
                        stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">
                        vs last period
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Trends
            </CardTitle>
            <CardDescription>
              Shipment volume and revenue over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.monthlyTrends.map((trend, index) => (
                <div key={trend.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{trend.month}</span>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{trend.shipments} shipments</p>
                      <p className="text-xs text-muted-foreground">${trend.revenue}</p>
                    </div>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${(trend.shipments / 200) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Routes
            </CardTitle>
            <CardDescription>
              Most popular shipping routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topRoutes.map((route, index) => (
                <div key={route.route} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{route.route}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{route.count} shipments</p>
                    <p className="text-xs text-muted-foreground">${route.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription>
            Key performance indicators for your shipping operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98.5%</div>
              <p className="text-sm text-muted-foreground">On-time Delivery Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2.3 days</div>
              <p className="text-sm text-muted-foreground">Average Delivery Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics
