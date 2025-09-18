import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Package, 
  User, 
  MapPin, 
  Weight, 
  DollarSign, 
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { serviceTypes, packageTypes } from '../data/mockData'
import toast from 'react-hot-toast'

function CreateShipment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Sender Information
    sender: {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      }
    },
    // Recipient Information
    recipient: {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      }
    },
    // Package Information
    package: {
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      },
      description: '',
      type: 'other',
      value: '',
      fragile: false
    },
    // Service Information
    service: 'standard',
    specialInstructions: ''
  })
  const [errors, setErrors] = useState({})
  const { user } = useAuth()
  const navigate = useNavigate()

  const steps = [
    { number: 1, title: 'Sender Info', icon: User },
    { number: 2, title: 'Recipient Info', icon: User },
    { number: 3, title: 'Package Details', icon: Package },
    { number: 4, title: 'Service & Review', icon: CheckCircle }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const path = name.split('.')
    
    if (path.length === 1) {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      })
    } else if (path.length === 2) {
      setFormData({
        ...formData,
        [path[0]]: {
          ...formData[path[0]],
          [path[1]]: type === 'checkbox' ? checked : value
        }
      })
    } else if (path.length === 3) {
      setFormData({
        ...formData,
        [path[0]]: {
          ...formData[path[0]],
          [path[1]]: {
            ...formData[path[0]][path[1]],
            [path[2]]: type === 'checkbox' ? checked : value
          }
        }
      })
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.sender.name.trim()) newErrors['sender.name'] = 'Name is required'
      if (!formData.sender.email.trim()) newErrors['sender.email'] = 'Email is required'
      if (!formData.sender.phone.trim()) newErrors['sender.phone'] = 'Phone is required'
      if (!formData.sender.address.street.trim()) newErrors['sender.address.street'] = 'Street address is required'
      if (!formData.sender.address.city.trim()) newErrors['sender.address.city'] = 'City is required'
      if (!formData.sender.address.state.trim()) newErrors['sender.address.state'] = 'State is required'
      if (!formData.sender.address.zipCode.trim()) newErrors['sender.address.zipCode'] = 'ZIP code is required'
    } else if (step === 2) {
      if (!formData.recipient.name.trim()) newErrors['recipient.name'] = 'Name is required'
      if (!formData.recipient.email.trim()) newErrors['recipient.email'] = 'Email is required'
      if (!formData.recipient.phone.trim()) newErrors['recipient.phone'] = 'Phone is required'
      if (!formData.recipient.address.street.trim()) newErrors['recipient.address.street'] = 'Street address is required'
      if (!formData.recipient.address.city.trim()) newErrors['recipient.address.city'] = 'City is required'
      if (!formData.recipient.address.state.trim()) newErrors['recipient.address.state'] = 'State is required'
      if (!formData.recipient.address.zipCode.trim()) newErrors['recipient.address.zipCode'] = 'ZIP code is required'
    } else if (step === 3) {
      if (!formData.package.weight.trim()) newErrors['package.weight'] = 'Weight is required'
      if (!formData.package.dimensions.length.trim()) newErrors['package.dimensions.length'] = 'Length is required'
      if (!formData.package.dimensions.width.trim()) newErrors['package.dimensions.width'] = 'Width is required'
      if (!formData.package.dimensions.height.trim()) newErrors['package.dimensions.height'] = 'Height is required'
      if (!formData.package.description.trim()) newErrors['package.description'] = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const calculateShippingCost = () => {
    const baseCost = serviceTypes.find(s => s.value === formData.service)?.price || 15.99
    const weight = parseFloat(formData.package.weight) || 0
    const weightCost = weight * 2 // $2 per kg
    return baseCost + weightCost
  }

  const generateTrackingNumber = () => {
    return 'UNI' + Math.random().toString(36).substr(2, 9).toUpperCase()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      const newShipment = {
        id: 'SH' + Date.now(),
        trackingNumber: generateTrackingNumber(),
        ...formData,
        status: 'created',
        currentLocation: {
          city: formData.sender.address.city,
          state: formData.sender.address.state,
          country: formData.sender.address.country,
          coordinates: [0, 0] // Would be geocoded in real app
        },
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        actualDelivery: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        courier: null,
        trackingHistory: [
          {
            id: 1,
            status: 'created',
            location: `${formData.sender.address.city}, ${formData.sender.address.state}`,
            timestamp: new Date().toISOString(),
            description: 'Shipment created and label generated'
          }
        ]
      }

      toast.success('Shipment created successfully!')
      navigate(`/shipment/${newShipment.id}`)
    } catch (error) {
      toast.error('Failed to create shipment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sender Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="sender.name"
                  value={formData.sender.name}
                  onChange={handleChange}
                  className={`form-input ${errors['sender.name'] ? 'border-red-500' : ''}`}
                  placeholder="Enter sender's full name"
                />
                {errors['sender.name'] && <p className="text-red-500 text-sm mt-1">{errors['sender.name']}</p>}
              </div>

              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="sender.email"
                  value={formData.sender.email}
                  onChange={handleChange}
                  className={`form-input ${errors['sender.email'] ? 'border-red-500' : ''}`}
                  placeholder="Enter sender's email"
                />
                {errors['sender.email'] && <p className="text-red-500 text-sm mt-1">{errors['sender.email']}</p>}
              </div>

              <div>
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="sender.phone"
                  value={formData.sender.phone}
                  onChange={handleChange}
                  className={`form-input ${errors['sender.phone'] ? 'border-red-500' : ''}`}
                  placeholder="Enter sender's phone"
                />
                {errors['sender.phone'] && <p className="text-red-500 text-sm mt-1">{errors['sender.phone']}</p>}
              </div>
            </div>

            <div>
              <label className="form-label">Street Address</label>
              <input
                type="text"
                name="sender.address.street"
                value={formData.sender.address.street}
                onChange={handleChange}
                className={`form-input ${errors['sender.address.street'] ? 'border-red-500' : ''}`}
                placeholder="Enter street address"
              />
              {errors['sender.address.street'] && <p className="text-red-500 text-sm mt-1">{errors['sender.address.street']}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="sender.address.city"
                  value={formData.sender.address.city}
                  onChange={handleChange}
                  className={`form-input ${errors['sender.address.city'] ? 'border-red-500' : ''}`}
                  placeholder="Enter city"
                />
                {errors['sender.address.city'] && <p className="text-red-500 text-sm mt-1">{errors['sender.address.city']}</p>}
              </div>

              <div>
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="sender.address.state"
                  value={formData.sender.address.state}
                  onChange={handleChange}
                  className={`form-input ${errors['sender.address.state'] ? 'border-red-500' : ''}`}
                  placeholder="Enter state"
                />
                {errors['sender.address.state'] && <p className="text-red-500 text-sm mt-1">{errors['sender.address.state']}</p>}
              </div>

              <div>
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  name="sender.address.zipCode"
                  value={formData.sender.address.zipCode}
                  onChange={handleChange}
                  className={`form-input ${errors['sender.address.zipCode'] ? 'border-red-500' : ''}`}
                  placeholder="Enter ZIP code"
                />
                {errors['sender.address.zipCode'] && <p className="text-red-500 text-sm mt-1">{errors['sender.address.zipCode']}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="recipient.name"
                  value={formData.recipient.name}
                  onChange={handleChange}
                  className={`form-input ${errors['recipient.name'] ? 'border-red-500' : ''}`}
                  placeholder="Enter recipient's full name"
                />
                {errors['recipient.name'] && <p className="text-red-500 text-sm mt-1">{errors['recipient.name']}</p>}
              </div>

              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="recipient.email"
                  value={formData.recipient.email}
                  onChange={handleChange}
                  className={`form-input ${errors['recipient.email'] ? 'border-red-500' : ''}`}
                  placeholder="Enter recipient's email"
                />
                {errors['recipient.email'] && <p className="text-red-500 text-sm mt-1">{errors['recipient.email']}</p>}
              </div>

              <div>
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="recipient.phone"
                  value={formData.recipient.phone}
                  onChange={handleChange}
                  className={`form-input ${errors['recipient.phone'] ? 'border-red-500' : ''}`}
                  placeholder="Enter recipient's phone"
                />
                {errors['recipient.phone'] && <p className="text-red-500 text-sm mt-1">{errors['recipient.phone']}</p>}
              </div>
            </div>

            <div>
              <label className="form-label">Street Address</label>
              <input
                type="text"
                name="recipient.address.street"
                value={formData.recipient.address.street}
                onChange={handleChange}
                className={`form-input ${errors['recipient.address.street'] ? 'border-red-500' : ''}`}
                placeholder="Enter street address"
              />
              {errors['recipient.address.street'] && <p className="text-red-500 text-sm mt-1">{errors['recipient.address.street']}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="recipient.address.city"
                  value={formData.recipient.address.city}
                  onChange={handleChange}
                  className={`form-input ${errors['recipient.address.city'] ? 'border-red-500' : ''}`}
                  placeholder="Enter city"
                />
                {errors['recipient.address.city'] && <p className="text-red-500 text-sm mt-1">{errors['recipient.address.city']}</p>}
              </div>

              <div>
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="recipient.address.state"
                  value={formData.recipient.address.state}
                  onChange={handleChange}
                  className={`form-input ${errors['recipient.address.state'] ? 'border-red-500' : ''}`}
                  placeholder="Enter state"
                />
                {errors['recipient.address.state'] && <p className="text-red-500 text-sm mt-1">{errors['recipient.address.state']}</p>}
              </div>

              <div>
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  name="recipient.address.zipCode"
                  value={formData.recipient.address.zipCode}
                  onChange={handleChange}
                  className={`form-input ${errors['recipient.address.zipCode'] ? 'border-red-500' : ''}`}
                  placeholder="Enter ZIP code"
                />
                {errors['recipient.address.zipCode'] && <p className="text-red-500 text-sm mt-1">{errors['recipient.address.zipCode']}</p>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  name="package.weight"
                  value={formData.package.weight}
                  onChange={handleChange}
                  className={`form-input ${errors['package.weight'] ? 'border-red-500' : ''}`}
                  placeholder="Enter package weight"
                />
                {errors['package.weight'] && <p className="text-red-500 text-sm mt-1">{errors['package.weight']}</p>}
              </div>

              <div>
                <label className="form-label">Package Type</label>
                <select
                  name="package.type"
                  value={formData.package.type}
                  onChange={handleChange}
                  className="form-input form-select"
                >
                  {packageTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Dimensions (cm)</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    name="package.dimensions.length"
                    value={formData.package.dimensions.length}
                    onChange={handleChange}
                    className={`form-input ${errors['package.dimensions.length'] ? 'border-red-500' : ''}`}
                    placeholder="Length"
                  />
                  {errors['package.dimensions.length'] && <p className="text-red-500 text-sm mt-1">{errors['package.dimensions.length']}</p>}
                </div>
                <div>
                  <input
                    type="number"
                    name="package.dimensions.width"
                    value={formData.package.dimensions.width}
                    onChange={handleChange}
                    className={`form-input ${errors['package.dimensions.width'] ? 'border-red-500' : ''}`}
                    placeholder="Width"
                  />
                  {errors['package.dimensions.width'] && <p className="text-red-500 text-sm mt-1">{errors['package.dimensions.width']}</p>}
                </div>
                <div>
                  <input
                    type="number"
                    name="package.dimensions.height"
                    value={formData.package.dimensions.height}
                    onChange={handleChange}
                    className={`form-input ${errors['package.dimensions.height'] ? 'border-red-500' : ''}`}
                    placeholder="Height"
                  />
                  {errors['package.dimensions.height'] && <p className="text-red-500 text-sm mt-1">{errors['package.dimensions.height']}</p>}
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea
                name="package.description"
                value={formData.package.description}
                onChange={handleChange}
                className={`form-input form-textarea ${errors['package.description'] ? 'border-red-500' : ''}`}
                placeholder="Describe the contents of your package"
                rows={3}
              />
              {errors['package.description'] && <p className="text-red-500 text-sm mt-1">{errors['package.description']}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Declared Value ($)</label>
                <input
                  type="number"
                  step="0.01"
                  name="package.value"
                  value={formData.package.value}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter package value"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="fragile"
                  name="package.fragile"
                  checked={formData.package.fragile}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-color focus:ring-primary-color border-gray-300 rounded"
                />
                <label htmlFor="fragile" className="text-sm font-medium text-gray-700">
                  Fragile item
                </label>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Selection & Review</h3>
            
            <div>
              <label className="form-label">Shipping Service</label>
              <div className="space-y-3">
                {serviceTypes.map(service => (
                  <label key={service.value} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="service"
                      value={service.value}
                      checked={formData.service === service.value}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-color focus:ring-primary-color border-gray-300"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{service.label}</span>
                        <span className="font-semibold text-primary-color">${service.price}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Special Instructions (Optional)</label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Any special handling instructions..."
                rows={3}
              />
            </div>

            {/* Cost Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Cost Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base shipping cost:</span>
                  <span className="font-medium">${serviceTypes.find(s => s.value === formData.service)?.price || 15.99}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight surcharge:</span>
                  <span className="font-medium">${((parseFloat(formData.package.weight) || 0) * 2).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-primary-color">${calculateShippingCost().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Shipment</h1>
          <p className="text-gray-600">Fill in the details to create your shipment</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-primary-color bg-primary-color text-white' :
                    isCompleted ? 'border-green-500 bg-green-500 text-white' :
                    'border-gray-300 bg-white text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-primary-color' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="btn btn-secondary"
          >
            Previous
          </button>

          <div className="flex items-center space-x-4">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  'Create Shipment'
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CreateShipment
