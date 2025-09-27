import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Palette, Sparkles, Waves, Sun, TreePine, Moon } from 'lucide-react'

const backgroundThemes = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Vibrant purple and blue gradients',
    icon: Sparkles,
    className: 'background-modern'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep blue ocean waves',
    icon: Waves,
    className: 'background-ocean'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and red tones',
    icon: Sun,
    className: 'background-sunset'
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural green and teal shades',
    icon: TreePine,
    className: 'background-forest'
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Dark cosmic atmosphere',
    icon: Moon,
    className: 'background-space'
  }
]

function BackgroundSelector({ onThemeChange, currentTheme = 'modern' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(currentTheme)

  useEffect(() => {
    setSelectedTheme(currentTheme)
  }, [currentTheme])

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme.id)
    onThemeChange(theme)
    setIsOpen(false)
    
    // Save to localStorage
    localStorage.setItem('backgroundTheme', theme.id)
  }

  const currentThemeData = backgroundThemes.find(theme => theme.id === selectedTheme)

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card p-3 rounded-xl text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette className="h-5 w-5" />
        <span className="hidden sm:block text-sm font-medium">
          {currentThemeData?.name || 'Modern'}
        </span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute top-full right-0 mt-2 w-64 glass-card rounded-xl p-4 z-50"
        >
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-sm mb-3">Choose Background</h3>
            {backgroundThemes.map((theme) => {
              const Icon = theme.icon
              return (
                <motion.button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-300 flex items-center space-x-3 ${
                    selectedTheme === theme.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-2 rounded-lg ${
                    selectedTheme === theme.id
                      ? 'bg-white/20'
                      : 'bg-white/10'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{theme.name}</div>
                    <div className="text-xs opacity-75">{theme.description}</div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default BackgroundSelector

