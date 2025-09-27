import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    role: 'user'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
    
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.address.street.trim()) {
      newErrors['address.street'] = 'Street address is required'
    }

    if (!formData.address.city.trim()) {
      newErrors['address.city'] = 'City is required'
    }

    if (!formData.address.state.trim()) {
      newErrors['address.state'] = 'State is required'
    }

    if (!formData.address.pincode.trim()) {
      newErrors['address.pincode'] = 'Pin code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await signup(formData)
      if (result.success) {
        setShowSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full shadow-2xl mb-6 border border-white/20"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Package className="h-10 w-10 text-white" />
            </motion.div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          >
            Create Account
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-blue-100 text-lg"
          >
            Join Uniship to start tracking packages
          </motion.p>
        </div>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h3>
                <p className="text-gray-600">Welcome to Uniship! Redirecting...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              Join Uniship
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </h2>
            <p className="text-blue-100">Start your shipping journey today</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <motion.div
                      animate={{ 
                        scale: focusedField === 'name' ? 1.1 : 1,
                        color: focusedField === 'name' ? '#60a5fa' : '#9ca3af'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <User className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 ${errors.name ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-300 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <motion.div
                      animate={{ 
                        scale: focusedField === 'email' ? 1.1 : 1,
                        color: focusedField === 'email' ? '#60a5fa' : '#9ca3af'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 ${errors.email ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-300 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <motion.div
                    animate={{ 
                      scale: focusedField === 'phone' ? 1.1 : 1,
                      color: focusedField === 'phone' ? '#60a5fa' : '#9ca3af'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone className="h-5 w-5" />
                  </motion.div>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 ${errors.phone ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <AnimatePresence>
                {errors.phone && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-300 text-sm mt-1"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                Account Type
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('role')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 appearance-none cursor-pointer ${errors.role ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                  required
                >
                  <option value="user" className="bg-gray-800 text-white">User - Send and receive packages</option>
                  <option value="delivery_partner" className="bg-gray-800 text-white">Delivery Partner - Deliver packages</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <motion.div
                    animate={{ 
                      rotate: focusedField === 'role' ? 180 : 0,
                      color: focusedField === 'role' ? '#60a5fa' : '#9ca3af'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-5 w-5 rotate-90" />
                  </motion.div>
                </div>
              </div>
              <AnimatePresence>
                {errors.role && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-300 text-sm mt-1"
                  >
                    {errors.role}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Fields */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <motion.div
                      animate={{ 
                        scale: focusedField === 'password' ? 1.1 : 1,
                        color: focusedField === 'password' ? '#60a5fa' : '#9ca3af'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Lock className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 ${errors.password ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                    placeholder="Create a password"
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                    )}
                  </motion.button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-300 text-sm mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <motion.div
                      animate={{ 
                        scale: focusedField === 'confirmPassword' ? 1.1 : 1,
                        color: focusedField === 'confirmPassword' ? '#60a5fa' : '#9ca3af'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Lock className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 ${errors.confirmPassword ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                    placeholder="Confirm your password"
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
                    )}
                  </motion.button>
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-300 text-sm mt-1"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Address Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="border-t border-white/20 pt-6"
            >
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="text-lg font-semibold text-white mb-6 flex items-center"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                </motion.div>
                Address Information
              </motion.h3>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="md:col-span-2">
                  <label htmlFor="address.street" className="block text-sm font-medium text-white mb-2">
                    Street Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <motion.div
                        animate={{ 
                          scale: focusedField === 'address.street' ? 1.1 : 1,
                          color: focusedField === 'address.street' ? '#60a5fa' : '#9ca3af'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <input
                      type="text"
                      id="address.street"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('address.street')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 ${errors['address.street'] ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                      placeholder="Enter your street address"
                      required
                    />
                  </div>
                  <AnimatePresence>
                    {errors['address.street'] && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-300 text-sm mt-1"
                      >
                        {errors['address.street']}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="address.city" className="block text-sm font-medium text-white mb-2">
                    City
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <motion.div
                        animate={{ 
                          scale: focusedField === 'address.city' ? 1.1 : 1,
                          color: focusedField === 'address.city' ? '#60a5fa' : '#9ca3af'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <input
                      type="text"
                      id="address.city"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('address.city')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 ${errors['address.city'] ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  <AnimatePresence>
                    {errors['address.city'] && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-300 text-sm mt-1"
                      >
                        {errors['address.city']}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="address.state" className="block text-sm font-medium text-white mb-2">
                    State
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <motion.div
                        animate={{ 
                          scale: focusedField === 'address.state' ? 1.1 : 1,
                          color: focusedField === 'address.state' ? '#60a5fa' : '#9ca3af'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <input
                      type="text"
                      id="address.state"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('address.state')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 ${errors['address.state'] ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                      placeholder="Enter your state"
                      required
                    />
                  </div>
                  <AnimatePresence>
                    {errors['address.state'] && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-300 text-sm mt-1"
                      >
                        {errors['address.state']}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="address.pincode" className="block text-sm font-medium text-white mb-2">
                    Pin Code
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <motion.div
                        animate={{ 
                          scale: focusedField === 'address.pincode' ? 1.1 : 1,
                          color: focusedField === 'address.pincode' ? '#60a5fa' : '#9ca3af'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <input
                      type="text"
                      id="address.pincode"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('address.pincode')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 ${errors['address.pincode'] ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                      placeholder="Enter your pin code"
                      required
                    />
                  </div>
                  <AnimatePresence>
                    {errors['address.pincode'] && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-300 text-sm mt-1"
                      >
                        {errors['address.pincode']}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="address.country" className="block text-sm font-medium text-white mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      id="address.country"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('address.country')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 appearance-none cursor-pointer`}
                    >
                      <option value="USA" className="bg-gray-800 text-white">United States</option>
                      <option value="India" className="bg-gray-800 text-white">India</option>
                      <option value="China" className="bg-gray-800 text-white">China</option>
                      <option value="Nepal" className="bg-gray-800 text-white">Nepal</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <motion.div
                        animate={{ 
                          rotate: focusedField === 'address.country' ? 180 : 0,
                          color: focusedField === 'address.country' ? '#60a5fa' : '#9ca3af'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-5 w-5 rotate-90" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="rounded-full h-5 w-5 border-b-2 border-white mr-2"
                  />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Create Account</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              )}
            </motion.button>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 text-center"
          >
            <p className="text-blue-100">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-white hover:text-blue-200 font-medium transition-colors duration-200 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Signup
