'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'
type Contrast = 'normal' | 'high'
type ColorblindMode = 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia'

interface ThemeContextType {
  theme: Theme
  contrast: Contrast
  colorblindMode: ColorblindMode
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  setContrast: (contrast: Contrast) => void
  setColorblindMode: (mode: ColorblindMode) => void
  toggleTheme: () => void
  toggleContrast: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_KEY = 'portfolio-theme'
const CONTRAST_KEY = 'portfolio-contrast'
const COLORBLIND_KEY = 'portfolio-colorblind'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getSystemContrast(): Contrast {
  if (typeof window === 'undefined') return 'normal'
  return window.matchMedia('(prefers-contrast: high)').matches ? 'high' : 'normal'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [contrast, setContrastState] = useState<Contrast>('normal')
  const [colorblindMode, setColorblindModeState] = useState<ColorblindMode>('none')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage and system preferences
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    const storedContrast = localStorage.getItem(CONTRAST_KEY) as Contrast | null
    const storedColorblind = localStorage.getItem(COLORBLIND_KEY) as ColorblindMode | null

    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      setThemeState(storedTheme)
    }

    if (storedContrast && ['normal', 'high'].includes(storedContrast)) {
      setContrastState(storedContrast)
    } else {
      setContrastState(getSystemContrast())
    }

    if (storedColorblind && ['none', 'deuteranopia', 'protanopia', 'tritanopia'].includes(storedColorblind)) {
      setColorblindModeState(storedColorblind)
    }

    setMounted(true)
  }, [])

  // Apply theme classes to document
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const resolved = theme === 'system' ? getSystemTheme() : theme

    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    root.classList.remove('high-contrast')
    root.classList.remove('colorblind-deuteranopia', 'colorblind-protanopia', 'colorblind-tritanopia')
    
    // Add current theme class
    root.classList.add(resolved)
    
    // Handle contrast
    if (contrast === 'high') {
      root.classList.add('high-contrast')
    }

    // Handle colorblind mode
    if (colorblindMode !== 'none') {
      root.classList.add(`colorblind-${colorblindMode}`)
    }

    // Update color-scheme for native elements
    root.style.colorScheme = resolved

    setResolvedTheme(resolved)
  }, [theme, contrast, colorblindMode, mounted])

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        setResolvedTheme(getSystemTheme())
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, mounted])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
  }, [])

  const setContrast = useCallback((newContrast: Contrast) => {
    setContrastState(newContrast)
    localStorage.setItem(CONTRAST_KEY, newContrast)
  }, [])

  const setColorblindMode = useCallback((newMode: ColorblindMode) => {
    setColorblindModeState(newMode)
    localStorage.setItem(COLORBLIND_KEY, newMode)
  }, [])

  const toggleTheme = useCallback(() => {
    const themes: Theme[] = ['system', 'light', 'dark']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }, [theme, setTheme])

  const toggleContrast = useCallback(() => {
    setContrast(contrast === 'normal' ? 'high' : 'normal')
  }, [contrast, setContrast])

  // Prevent flash of incorrect theme
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        contrast,
        colorblindMode,
        resolvedTheme,
        setTheme,
        setContrast,
        setColorblindMode,
        toggleTheme,
        toggleContrast,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// Default values for SSR/static generation
const defaultContext: ThemeContextType = {
  theme: 'system',
  contrast: 'normal',
  colorblindMode: 'none',
  resolvedTheme: 'dark',
  setTheme: () => {},
  setContrast: () => {},
  setColorblindMode: () => {},
  toggleTheme: () => {},
  toggleContrast: () => {},
}

export function useTheme() {
  const context = useContext(ThemeContext)
  // Return default context during SSR/static generation
  if (context === undefined) {
    return defaultContext
  }
  return context
}
