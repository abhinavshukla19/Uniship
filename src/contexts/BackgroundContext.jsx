import { createContext, useContext, useState, useEffect } from 'react'

const BackgroundContext = createContext()

export function useBackground() {
  const context = useContext(BackgroundContext)
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider')
  }
  return context
}

export function BackgroundProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('modern')
  const [backgroundClass, setBackgroundClass] = useState('background-modern')

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('backgroundTheme')
    if (savedTheme) {
      setCurrentTheme(savedTheme)
      setBackgroundClass(`background-${savedTheme}`)
    }
  }, [])

  const changeTheme = (theme) => {
    setCurrentTheme(theme.id)
    setBackgroundClass(theme.className)
  }

  const value = {
    currentTheme,
    backgroundClass,
    changeTheme
  }

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  )
}

