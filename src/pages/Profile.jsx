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
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || 'USA'
    }
  })
  const [errors, setErrors] = useState({})

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
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || '',
        country: user?.address?.country || 'USA'
      }
    })
    setErrors({})
    setIsEditing(false)
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
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="relative inline-block mb-4">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border border-border"
                />
                <Button 
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-1">{user?.name}</h2>
              <p className="text-muted-foreground mb-2">{user?.email}</p>
              <Badge variant="secondary">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      {isEditing ? (
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={errors.name ? 'border-destructive' : ''}
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <span className="text-foreground">{user?.name}</span>
                        </div>
                      )}
                      {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={errors.email ? 'border-destructive' : ''}
                          placeholder="Enter your email"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <span className="text-foreground">{user?.email}</span>
                        </div>
                      )}
                      {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    {isEditing ? (
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'border-destructive' : ''}
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span className="text-foreground">{user?.phone}</span>
                      </div>
                    )}
                    {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                  </div>

                  {/* Address Information */}
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-foreground mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Address Information
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Street Address</Label>
                        {isEditing ? (
                          <Input
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleChange}
                            className={errors['address.street'] ? 'border-destructive' : ''}
                            placeholder="Enter your street address"
                          />
                        ) : (
                          <div className="p-3 bg-muted rounded-lg">
                            <span className="text-foreground">{user?.address?.street}</span>
                          </div>
                        )}
                        {errors['address.street'] && <p className="text-destructive text-sm">{errors['address.street']}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          {isEditing ? (
                            <Input
                              type="text"
                              name="address.city"
                              value={formData.address.city}
                              onChange={handleChange}
                              className={errors['address.city'] ? 'border-destructive' : ''}
                              placeholder="Enter your city"
                            />
                          ) : (
                            <div className="p-3 bg-muted rounded-lg">
                              <span className="text-foreground">{user?.address?.city}</span>
                            </div>
                          )}
                          {errors['address.city'] && <p className="text-destructive text-sm">{errors['address.city']}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label>State</Label>
                          {isEditing ? (
                            <Input
                              type="text"
                              name="address.state"
                              value={formData.address.state}
                              onChange={handleChange}
                              className={errors['address.state'] ? 'border-destructive' : ''}
                              placeholder="Enter your state"
                            />
                          ) : (
                            <div className="p-3 bg-muted rounded-lg">
                              <span className="text-foreground">{user?.address?.state}</span>
                            </div>
                          )}
                          {errors['address.state'] && <p className="text-destructive text-sm">{errors['address.state']}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label>ZIP Code</Label>
                          {isEditing ? (
                            <Input
                              type="text"
                              name="address.zipCode"
                              value={formData.address.zipCode}
                              onChange={handleChange}
                              className={errors['address.zipCode'] ? 'border-destructive' : ''}
                              placeholder="Enter your ZIP code"
                            />
                          ) : (
                            <div className="p-3 bg-muted rounded-lg">
                              <span className="text-foreground">{user?.address?.zipCode}</span>
                            </div>
                          )}
                          {errors['address.zipCode'] && <p className="text-destructive text-sm">{errors['address.zipCode']}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Settings */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium text-foreground">Change Password</h4>
                        <p className="text-sm text-muted-foreground">Update your account password</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Key className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium text-foreground">Notification Preferences</h4>
                        <p className="text-sm text-muted-foreground">Manage your notification settings</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                    <div className="flex items-center space-x-3">
                      <Trash2 className="h-5 w-5 text-destructive" />
                      <div>
                        <h4 className="font-medium text-destructive">Delete Account</h4>
                        <p className="text-sm text-destructive/80">Permanently delete your account</p>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Role-specific Information */}
          {user?.role === 'courier' && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Courier Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Vehicle</Label>
                      <div className="p-3 bg-muted rounded-lg">
                        <span className="text-foreground">{user?.vehicle || 'Not assigned'}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>License Number</Label>
                      <div className="p-3 bg-muted rounded-lg">
                        <span className="text-foreground">{user?.licenseNumber || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
