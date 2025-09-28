// Mock data for development - will be replaced with real API calls

export const mockShipments = [
  {
    id: 'SH001',
    trackingNumber: 'UNI123456789',
    status: 'in-transit',
    sender: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0001',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    },
    recipient: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1-555-0002',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      }
    },
    package: {
      weight: 2.5,
      description: 'Electronics',
      type: 'medium-box'
    },
    serviceType: 'express',
    estimatedCost: 19.99,
    currentLocation: {
      city: 'Denver',
      state: 'CO',
      coordinates: [39.7392, -104.9903]
    },
    estimatedDelivery: '2024-01-15T18:00:00Z',
    actualDelivery: null,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
    courier: {
      id: 'C001',
      name: 'Mike Johnson',
      phone: '+1-555-0003'
    },
    trackingHistory: [
      {
        id: 1,
        status: 'created',
        location: 'New York, NY',
        timestamp: '2024-01-10T10:00:00Z',
        description: 'Shipment created and label generated'
      },
      {
        id: 2,
        status: 'picked-up',
        location: 'New York, NY',
        timestamp: '2024-01-10T14:00:00Z',
        description: 'Package picked up from sender'
      },
      {
        id: 3,
        status: 'in-transit',
        location: 'Denver, CO',
        timestamp: '2024-01-12T14:30:00Z',
        description: 'Package in transit to destination'
      }
    ]
  }
]

export const mockAnalytics = {
  totalShipments: 1250,
  deliveredToday: 45,
  inTransit: 78,
  pendingPickup: 23
}

export const mockCouriers = [
  {
    id: 'C001',
    name: 'Mike Johnson',
    email: 'mike@uniship.com',
    phone: '+1-555-0003',
    vehicle: 'Van #V-001',
    licenseNumber: 'CDL-123456',
    currentLocation: {
      city: 'Denver',
      state: 'CO',
      coordinates: [39.7392, -104.9903]
    },
    status: 'online',
    rating: 4.8,
    totalDeliveries: 1250
  }
]

export const statusColors = {
  'created': 'text-gray-500',
  'pending': 'text-gray-500',
  'picked-up': 'text-blue-500',
  'in-transit': 'text-yellow-500',
  'out-for-delivery': 'text-purple-500',
  'delivered': 'text-green-500',
  'exception': 'text-red-500',
  'returned': 'text-orange-500'
}

export const statusLabels = {
  'created': 'Created',
  'pending': 'Pending',
  'picked-up': 'Picked Up',
  'in-transit': 'In Transit',
  'out-for-delivery': 'Out for Delivery',
  'delivered': 'Delivered',
  'exception': 'Exception',
  'returned': 'Returned'
}

export const serviceTypes = [
  { value: 'standard', label: 'Standard Delivery', price: 10.99 },
  { value: 'express', label: 'Express Delivery', price: 19.99 },
  { value: 'overnight', label: 'Overnight Delivery', price: 29.99 },
  { value: 'same-day', label: 'Same Day Delivery', price: 39.99 }
]

export const packageTypes = [
  { value: 'envelope', label: 'Envelope', maxWeight: 0.5 },
  { value: 'small-box', label: 'Small Box', maxWeight: 2.0 },
  { value: 'medium-box', label: 'Medium Box', maxWeight: 10.0 },
  { value: 'large-box', label: 'Large Box', maxWeight: 25.0 },
  { value: 'freight', label: 'Freight', maxWeight: 100.0 }
]

export const mockUsers = [
  {
    id: 1,
    email: 'admin@uniship.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '+1-555-0001',
    address: {
      street: '100 Admin St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    email: 'user@uniship.com',
    name: 'John Doe',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '+1-555-0002',
    address: {
      street: '200 User Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    email: 'courier@uniship.com',
    name: 'Mike Johnson',
    role: 'courier',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    phone: '+1-555-0003',
    address: {
      street: '300 Courier Blvd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    vehicle: 'Van #V-001',
    licenseNumber: 'CDL-123456',
    createdAt: '2024-01-03T00:00:00Z'
  }
]
