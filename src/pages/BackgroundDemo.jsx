import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBackground } from '../contexts/BackgroundContext'
import BackgroundSelector from '../components/BackgroundSelector'
import { Sparkles, Waves, Sun, TreePine, Moon, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const backgroundThemes = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Vibrant purple and blue gradients with dynamic animations',
    icon: Sparkles,
    className: 'background-modern',
    features: ['Animated gradients', 'Floating elements', 'Geometric patterns']
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep blue ocean waves with flowing animations',
    icon: Waves,
    className: 'background-ocean',
    features: ['Wave animations', 'Ocean depth', 'Fluid motion']
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and red tones with glowing effects',
    icon: Sun,
    className: 'background-sunset',
    features: ['Warm gradients', 'Glowing effects', 'Sunset vibes']
  },
  {
    id: 'forest',
    description: 'Natural green and teal shades with organic movement',
    icon: TreePine,
    className: 'background-forest',
    features: ['Natural colors', 'Organic motion', 'Forest atmosphere']
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Dark cosmic atmosphere with floating elements',
    icon: Moon,
    className: 'background-space',
    features: ['Cosmic depth', 'Floating stars', 'Space ambiance']
  }
]

function BackgroundDemo() {
  const { changeTheme, currentTheme } = useBackground()
  const [previewTheme, setPreviewTheme] = useState(null)

  const handlePreview = (theme) => {
    setPreviewTheme(theme)
    changeTheme(theme)
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
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="floating-elements">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>
      
      {/* Geometric Pattern Overlay */}
      <div className="geometric-pattern"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="glass-card p-3 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Background Themes</h1>
              <p className="text-white/80">Choose your perfect background for the Uniship experience</p>
            </div>
          </div>
          <BackgroundSelector onThemeChange={changeTheme} currentTheme={currentTheme} />
        </motion.div>

        {/* Theme Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {backgroundThemes.map((theme) => {
            const Icon = theme.icon
            return (
              <motion.div
                key={theme.id}
                className="glass-card rounded-2xl p-6 text-white group hover:bg-white/20 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePreview(theme)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{theme.name}</h3>
                    <p className="text-sm text-white/70">{theme.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white/90">Features:</h4>
                  <ul className="space-y-1">
                    {theme.features.map((feature, index) => (
                      <li key={index} className="text-xs text-white/70 flex items-center">
                        <div className="w-1 h-1 bg-white/50 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {currentTheme === theme.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-2 bg-white/20 rounded-lg text-center"
                  >
                    <span className="text-sm font-medium text-white">Currently Active</span>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Preview Section */}
        {previewTheme && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-8 text-white"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Preview: {previewTheme.name}</h2>
            <p className="text-white/80 mb-6">{previewTheme.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
                <ul className="space-y-2">
                  {previewTheme.features.map((feature, index) => (
                    <li key={index} className="text-white/80 flex items-center">
                      <div className="w-2 h-2 bg-white/60 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Usage</h3>
                <p className="text-white/80 text-sm">
                  This background theme will be applied across all pages of the application. 
                  The theme is automatically saved and will persist across sessions.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold text-white mb-3">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-white mb-2">Choose Theme</h4>
              <p className="text-sm text-white/70">Click on any theme card to preview it instantly</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-white mb-2">Live Preview</h4>
              <p className="text-sm text-white/70">See the background change in real-time</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-medium text-white mb-2">Auto Save</h4>
              <p className="text-sm text-white/70">Your choice is automatically saved</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default BackgroundDemo

