// Mock data for Uniship application

export const mockShipments = [
  {
    id: 'SH001',
    trackingNumber: 'UNI123456789',
    sender: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0123',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    },
    recipient: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-0456',
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
      dimensions: {
        length: 30,
        width: 20,
        height: 15
      },
      description: 'Electronics - Laptop',
      value: 1200,
      fragile: true
    },
    service: 'Express',
    status: 'in-transit',
    currentLocation: {
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      coordinates: [39.7392, -104.9903]
    },
    estimatedDelivery: '2024-01-15T18:00:00Z',
    actualDelivery: null,
    createdAt: '2024-01-10T10:30:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
    courier: {
      id: 3,
      name: 'Mike Johnson',
      phone: '+1-555-0789',
      vehicle: 'Van #V-001'
    },
    trackingHistory: [
      {
        id: 1,
        status: 'created',
        location: 'New York, NY',
        timestamp: '2024-01-10T10:30:00Z',
        description: 'Shipment created and label generated'
      },
      {
        id: 2,
        status: 'picked-up',
        location: 'New York, NY',
        timestamp: '2024-01-10T14:15:00Z',
        description: 'Package picked up from sender'
      },
      {
        id: 3,
        status: 'in-transit',
        location: 'Chicago, IL',
        timestamp: '2024-01-11T09:30:00Z',
        description: 'Package arrived at sorting facility'
      },
      {
        id: 4,
        status: 'in-transit',
        location: 'Denver, CO',
        timestamp: '2024-01-12T14:20:00Z',
        description: 'Package in transit to destination'
      }
    ]
  },
  {
    id: 'SH002',
    trackingNumber: 'UNI987654321',
    sender: {
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1-555-0234',
      address: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      }
    },
    recipient: {
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      phone: '+1-555-0567',
      address: {
        street: '321 Elm St',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        country: 'USA'
      }
    },
    package: {
      weight: 1.2,
      dimensions: {
        length: 25,
        width: 18,
        height: 12
      },
      description: 'Documents - Legal Papers',
      value: 50,
      fragile: false
    },
    service: 'Standard',
    status: 'delivered',
    currentLocation: {
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      coordinates: [25.7617, -80.1918]
    },
    estimatedDelivery: '2024-01-08T17:00:00Z',
    actualDelivery: '2024-01-08T16:45:00Z',
    createdAt: '2024-01-05T08:15:00Z',
    updatedAt: '2024-01-08T16:45:00Z',
    courier: {
      id: 3,
      name: 'Mike Johnson',
      phone: '+1-555-0789',
      vehicle: 'Van #V-001'
    },
    trackingHistory: [
      {
        id: 1,
        status: 'created',
        location: 'Chicago, IL',
        timestamp: '2024-01-05T08:15:00Z',
        description: 'Shipment created and label generated'
      },
      {
        id: 2,
        status: 'picked-up',
        location: 'Chicago, IL',
        timestamp: '2024-01-05T12:30:00Z',
        description: 'Package picked up from sender'
      },
      {
        id: 3,
        status: 'in-transit',
        location: 'Atlanta, GA',
        timestamp: '2024-01-06T10:15:00Z',
        description: 'Package arrived at sorting facility'
      },
      {
        id: 4,
        status: 'out-for-delivery',
        location: 'Miami, FL',
        timestamp: '2024-01-08T08:00:00Z',
        description: 'Package out for delivery'
      },
      {
        id: 5,
        status: 'delivered',
        location: 'Miami, FL',
        timestamp: '2024-01-08T16:45:00Z',
        description: 'Package delivered successfully'
      }
    ]
  },
  {
    id: 'SH003',
    trackingNumber: 'UNI456789123',
    sender: {
      name: 'Lisa Brown',
      email: 'lisa.brown@email.com',
      phone: '+1-555-0345',
      address: {
        street: '555 Maple Dr',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA'
      }
    },
    recipient: {
      name: 'David Miller',
      email: 'david.miller@email.com',
      phone: '+1-555-0678',
      address: {
        street: '888 Cedar Ln',
        city: 'Portland',
        state: 'OR',
        zipCode: '97201',
        country: 'USA'
      }
    },
    package: {
      weight: 5.8,
      dimensions: {
        length: 40,
        width: 30,
        height: 25
      },
      description: 'Furniture - Office Chair',
      value: 350,
      fragile: false
    },
    service: 'Standard',
    status: 'picked-up',
    currentLocation: {
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      coordinates: [47.6062, -122.3321]
    },
    estimatedDelivery: '2024-01-16T17:00:00Z',
    actualDelivery: null,
    createdAt: '2024-01-13T09:00:00Z',
    updatedAt: '2024-01-13T15:30:00Z',
    courier: {
      id: 3,
      name: 'Mike Johnson',
      phone: '+1-555-0789',
      vehicle: 'Van #V-001'
    },
    trackingHistory: [
      {
        id: 1,
        status: 'created',
        location: 'Seattle, WA',
        timestamp: '2024-01-13T09:00:00Z',
        description: 'Shipment created and label generated'
      },
      {
        id: 2,
        status: 'picked-up',
        location: 'Seattle, WA',
        timestamp: '2024-01-13T15:30:00Z',
        description: 'Package picked up from sender'
      }
    ]
  }
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

export const mockCouriers = [
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'courier@uniship.com',
    phone: '+1-555-0003',
    vehicle: 'Van #V-001',
    licenseNumber: 'CDL-123456',
    status: 'active',
    currentLocation: {
      city: 'Denver',
      state: 'CO',
      coordinates: [39.7392, -104.9903]
    },
    deliveriesToday: 12,
    totalDeliveries: 1247,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@uniship.com',
    phone: '+1-555-0004',
    vehicle: 'Truck #T-002',
    licenseNumber: 'CDL-789012',
    status: 'active',
    currentLocation: {
      city: 'Miami',
      state: 'FL',
      coordinates: [25.7617, -80.1918]
    },
    deliveriesToday: 8,
    totalDeliveries: 892,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Tom Anderson',
    email: 'tom.anderson@uniship.com',
    phone: '+1-555-0005',
    vehicle: 'Van #V-003',
    licenseNumber: 'CDL-345678',
    status: 'offline',
    currentLocation: {
      city: 'Seattle',
      state: 'WA',
      coordinates: [47.6062, -122.3321]
    },
    deliveriesToday: 0,
    totalDeliveries: 654,
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
]

export const mockAnalytics = {
  totalShipments: 1247,
  deliveredToday: 45,
  inTransit: 23,
  pendingPickup: 8,
  revenue: {
    today: 12500,
    thisMonth: 187500,
    lastMonth: 165000
  },
  topDestinations: [
    { city: 'Los Angeles', count: 156 },
    { city: 'New York', count: 142 },
    { city: 'Chicago', count: 128 },
    { city: 'Miami', count: 98 },
    { city: 'Seattle', count: 87 }
  ],
  serviceTypes: [
    { type: 'Express', count: 456, percentage: 36.6 },
    { type: 'Standard', count: 623, percentage: 50.0 },
    { type: 'Economy', count: 168, percentage: 13.4 }
  ]
}

export const statusColors = {
  'created': '#6b7280',
  'picked-up': '#3b82f6',
  'in-transit': '#f59e0b',
  'out-for-delivery': '#8b5cf6',
  'delivered': '#10b981',
  'exception': '#ef4444',
  'returned': '#f97316'
}

export const statusLabels = {
  'created': 'Created',
  'picked-up': 'Picked Up',
  'in-transit': 'In Transit',
  'out-for-delivery': 'Out for Delivery',
  'delivered': 'Delivered',
  'exception': 'Exception',
  'returned': 'Returned'
}

export const serviceTypes = [
  { value: 'express', label: 'Express (1-2 days)', price: 25.99 },
  { value: 'standard', label: 'Standard (3-5 days)', price: 15.99 },
  { value: 'economy', label: 'Economy (5-7 days)', price: 9.99 }
]

export const packageTypes = [
  { value: 'documents', label: 'Documents' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'other', label: 'Other' }
]
