import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  Edit3,
  Shield,
  Bell,
  Key,
  Trash2
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'

function Profile() {
  const { user, updateProfile, changePassword, deleteAccount } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.user_name || user?.name || '',
    email: user?.user_email || user?.email || '',
    phone: user?.user_phone || user?.phone || '',
    address: {
      street: user?.user_street || user?.address?.street || '',
      city: user?.user_city || user?.address?.city || '',
      state: user?.user_state || user?.address?.state || '',
      zipCode: user?.user_pincode || user?.address?.zipCode || '',
      country: user?.address?.country || 'USA'
    }
  })
  const [errors, setErrors] = useState({})
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [deletePassword, setDeletePassword] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    const path = name.split('.')
    
    if (path.length === 1) {
      setFormData({
        ...formData,
        [name]: value
      })
    } else if (path.length === 2) {
      setFormData({
        ...formData,
        [path[0]]: {
          ...formData[path[0]],
          [path[1]]: value
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

    if (!formData.address.zipCode.trim()) {
      newErrors['address.zipCode'] = 'ZIP code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      updateProfile(formData)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.user_name || user?.name || '',
      email: user?.user_email || user?.email || '',
      phone: user?.user_phone || user?.phone || '',
      address: {
        street: user?.user_street || user?.address?.street || '',
        city: user?.user_city || user?.address?.city || '',
        state: user?.user_state || user?.address?.state || '',
        zipCode: user?.user_pincode || user?.address?.zipCode || '',
        country: user?.address?.country || 'USA'
      }
    })
    setErrors({})
    setIsEditing(false)
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    
    const result = await changePassword(passwordData.newPassword)
    if (result.success) {
      setShowPasswordModal(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    }
  }

  const handleAccountDeletion = async () => {
    const result = await deleteAccount(deletePassword)
    if (result.success) {
      setShowDeleteModal(false)
      setDeletePassword('')
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-orange-600/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          >
            Profile Settings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-blue-100 text-lg"
          >
            Manage your account information and preferences
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20 text-white text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border border-white/30"
                />
                <motion.button 
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-500/80 hover:bg-blue-500 text-white flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="h-4 w-4" />
                </motion.button>
              </div>
              <h2 className="text-xl font-semibold text-white mb-1">{user?.user_name || user?.name}</h2>
              <p className="text-blue-200 mb-2">{user?.user_email || user?.email}</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-sm font-medium">
                {user?.role === 'delivery_partner' ? 'Delivery Partner' : 
                 user?.role === 'admin' ? 'Admin' : 
                 user?.role === 'user' ? 'User' : user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                  {!isEditing ? (
                    <motion.button
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg border border-blue-400/30 transition-colors flex items-center"
                      onClick={() => setIsEditing(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </motion.button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <motion.button
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-colors"
                        onClick={handleCancel}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center"
                        onClick={handleSave}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </motion.button>
                    </div>
                  )}
                </div>
                <div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-blue-200">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${errors.name ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg border border-white/20">
                            <User className="h-5 w-5 text-blue-300" />
                            <span className="text-white">{user?.user_name || user?.name}</span>
                          </div>
                        )}
                        {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-blue-200">Email Address</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                            placeholder="Enter your email"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg border border-white/20">
                            <Mail className="h-5 w-5 text-blue-300" />
                            <span className="text-white">{user?.user_email || user?.email}</span>
                          </div>
                        )}
                        {errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-200">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${errors.phone ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg border border-white/20">
                          <Phone className="h-5 w-5 text-blue-300" />
                          <span className="text-white">{user?.user_phone || user?.phone}</span>
                        </div>
                      )}
                      {errors.phone && <p className="text-red-300 text-sm">{errors.phone}</p>}
                    </div>

                    {/* Address Information */}
                    <div className="border-t border-white/20 pt-6">
                      <h4 className="font-medium text-white mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-blue-300" />
                        Address Information
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-blue-200">Street Address</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address.street"
                              value={formData.address.street}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${errors['address.street'] ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                              placeholder="Enter your street address"
                            />
                          ) : (
                            <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                              <span className="text-white">{user?.user_street || user?.address?.street}</span>
                            </div>
                          )}
                          {errors['address.street'] && <p className="text-red-300 text-sm">{errors['address.street']}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-blue-200">City</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${errors['address.city'] ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                                placeholder="Enter your city"
                              />
                            ) : (
                              <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                                <span className="text-white">{user?.user_city || user?.address?.city}</span>
                              </div>
                            )}
                            {errors['address.city'] && <p className="text-red-300 text-sm">{errors['address.city']}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-blue-200">State</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${errors['address.state'] ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                                placeholder="Enter your state"
                              />
                            ) : (
                              <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                                <span className="text-white">{user?.user_state || user?.address?.state}</span>
                              </div>
                            )}
                            {errors['address.state'] && <p className="text-red-300 text-sm">{errors['address.state']}</p>}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-blue-200">ZIP Code</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="address.zipCode"
                                value={formData.address.zipCode}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${errors['address.zipCode'] ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                                placeholder="Enter your ZIP code"
                              />
                            ) : (
                              <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                                <span className="text-white">{user?.user_pincode || user?.address?.zipCode}</span>
                              </div>
                            )}
                            {errors['address.zipCode'] && <p className="text-red-300 text-sm">{errors['address.zipCode']}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Account Settings */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-white">
                <h3 className="text-2xl font-bold text-white mb-6">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-white/20 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-blue-300" />
                      <div>
                        <h4 className="font-medium text-white">Change Password</h4>
                        <p className="text-sm text-blue-200">Update your account password</p>
                      </div>
                    </div>
                    <motion.button 
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg border border-blue-400/30 transition-colors flex items-center"
                      onClick={() => setShowPasswordModal(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Change
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-white/20 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-blue-300" />
                      <div>
                        <h4 className="font-medium text-white">Notification Preferences</h4>
                        <p className="text-sm text-blue-200">Manage your notification settings</p>
                      </div>
                    </div>
                    <motion.button 
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-colors flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Settings
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-400/30 rounded-lg bg-red-500/10">
                    <div className="flex items-center space-x-3">
                      <Trash2 className="h-5 w-5 text-red-400" />
                      <div>
                        <h4 className="font-medium text-red-400">Delete Account</h4>
                        <p className="text-sm text-red-300">Permanently delete your account</p>
                      </div>
                    </div>
                    <motion.button 
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center"
                      onClick={() => setShowDeleteModal(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Role-specific Information */}
            {user?.role === 'delivery_partner' && (
              <motion.div variants={itemVariants}>
                <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-white">
                  <h3 className="text-2xl font-bold text-white mb-6">Delivery Partner Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-200">Vehicle</label>
                      <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                        <span className="text-white">{user?.vehicle || 'Not assigned'}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-200">License Number</label>
                      <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                        <span className="text-white">{user?.licenseNumber || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-md mx-4 border border-white/20 text-white">
              <h3 className="text-lg font-semibold mb-4 text-white">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <motion.button 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-colors"
                  onClick={() => setShowPasswordModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  onClick={handlePasswordChange}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Change Password
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* Account Deletion Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-md mx-4 border border-white/20 text-white">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Delete Account</h3>
              <p className="text-sm text-blue-200 mb-4">
                This action cannot be undone. Please enter your password to confirm account deletion.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">Password</label>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <motion.button 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-colors"
                  onClick={() => setShowDeleteModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button 
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  onClick={handleAccountDeletion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete Account
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Profile
