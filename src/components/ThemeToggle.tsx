'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Sun, Moon, Monitor, Contrast, Settings2, X, Eye, Check } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const springSnappy = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

const COLORBLIND_OPTIONS = [
  { value: 'none' as const, label: 'Default', description: 'Standard colors' },
  { value: 'deuteranopia' as const, label: 'Deuteranopia', description: 'Red-green (common)' },
  { value: 'protanopia' as const, label: 'Protanopia', description: 'Red blindness' },
  { value: 'tritanopia' as const, label: 'Tritanopia', description: 'Blue-yellow' },
]

export function ThemeToggle() {
  const { theme, contrast, colorblindMode, resolvedTheme, setTheme, toggleContrast, setColorblindMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themeOptions = [
    { value: 'system' as const, icon: Monitor, label: 'System' },
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
  ]

  const currentThemeIcon = theme === 'system' 
    ? Monitor 
    : theme === 'light' 
      ? Sun 
      : Moon

  const CurrentIcon = currentThemeIcon

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-xl glass border border-glass-border hover:border-glass-border-hover flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors duration-150"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        aria-label="Theme settings"
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="settings"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Settings2 className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={springSnappy}
            className="absolute top-14 right-0 w-72 p-4 rounded-xl glass border border-glass-border shadow-xl max-h-[80vh] overflow-y-auto scrollbar-thin"
            role="menu"
            aria-label="Theme settings menu"
          >
            {/* Theme Section */}
            <div className="mb-5">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2 px-1">
                Appearance
              </span>
              <div className="flex gap-1.5">
                {themeOptions.map((option) => {
                  const Icon = option.icon
                  const isActive = theme === option.value
                  
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg transition-colors duration-150 ${
                        isActive 
                          ? 'bg-accent-emerald/20 text-accent-emerald-bright border border-accent-emerald/30' 
                          : 'hover:bg-glass-border text-text-muted hover:text-text-primary border border-transparent'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.1 }}
                      role="menuitemradio"
                      aria-checked={isActive}
                      aria-label={`${option.label} theme`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-medium">{option.label}</span>
                    </motion.button>
                  )
                })}
              </div>
              
              {theme === 'system' && (
                <p className="text-[10px] text-text-subtle mt-2 px-1 flex items-center gap-1">
                  <CurrentIcon className="w-3 h-3" />
                  Currently: {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-glass-border mb-5" />

            {/* Accessibility Section */}
            <div className="mb-5">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2 px-1">
                Accessibility
              </span>
              
              {/* High Contrast Toggle */}
              <motion.button
                onClick={toggleContrast}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-150 ${
                  contrast === 'high'
                    ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
                    : 'hover:bg-glass-border text-text-secondary hover:text-text-primary border border-transparent'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.1 }}
                role="menuitemcheckbox"
                aria-checked={contrast === 'high'}
                aria-label="High contrast mode"
              >
                <div className="flex items-center gap-3">
                  <Contrast className="w-4 h-4" />
                  <div className="text-left">
                    <span className="block text-sm font-medium">High Contrast</span>
                    <span className="block text-[10px] text-text-muted">Enhanced visibility</span>
                  </div>
                </div>
                
                <div 
                  className={`w-9 h-5 rounded-full relative transition-colors duration-150 ${
                    contrast === 'high' ? 'bg-accent-cyan' : 'bg-glass-border'
                  }`}
                >
                  <motion.div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-text-primary shadow-sm"
                    animate={{ left: contrast === 'high' ? '18px' : '2px' }}
                    transition={springSnappy}
                  />
                </div>
              </motion.button>
            </div>

            {/* Divider */}
            <div className="h-px bg-glass-border mb-5" />

            {/* Colorblind Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 px-1">
                <Eye className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                  Color Vision
                </span>
              </div>
              
              <div className="space-y-1">
                {COLORBLIND_OPTIONS.map((option) => {
                  const isActive = colorblindMode === option.value
                  
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => setColorblindMode(option.value)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-colors duration-150 ${
                        isActive
                          ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
                          : 'hover:bg-glass-border text-text-secondary hover:text-text-primary border border-transparent'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.1 }}
                      role="menuitemradio"
                      aria-checked={isActive}
                      aria-label={`${option.label} color mode`}
                    >
                      <div className="text-left">
                        <span className="block text-sm font-medium">{option.label}</span>
                        <span className="block text-[10px] text-text-muted">{option.description}</span>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={springSnappy}
                        >
                          <Check className="w-4 h-4" />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
              
              <p className="text-[9px] text-text-subtle mt-3 px-1 leading-relaxed">
                These modes adjust colors to be more distinguishable for different types of color vision deficiency.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
