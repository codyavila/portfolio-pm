'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUp, Heart } from 'lucide-react'

const TECH_STACK = ['Next.js 15', 'React 19', 'Tailwind'] as const

// Snappy spring
const springSnappy = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <footer ref={ref} className="relative py-10 overflow-hidden" role="contentinfo">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-void" />
      <div 
        className="absolute top-0 left-0 right-0 h-px" 
        style={{ background: 'linear-gradient(90deg, transparent, var(--glass-border) 50%, transparent)' }}
      />

      <div className="relative z-10 container-tight px-4 md:px-8">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={springSnappy}
        >
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <span>© {new Date().getFullYear()} Cody Avila</span>
            <span className="text-text-subtle" aria-hidden="true">•</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-accent-emerald-bright" aria-label="love" /> in Seattle
            </span>
          </div>

          {/* Center: Tech stack */}
          <div className="flex items-center gap-2">
            <span className="mono-label text-text-subtle text-[10px]">Powered by</span>
            <div className="flex items-center gap-1.5">
              {TECH_STACK.map((tech, index) => (
                <motion.span 
                  key={tech}
                  className="px-2 py-1 rounded glass font-mono text-[10px] text-text-muted"
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ ...springSnappy, delay: 0.05 + index * 0.03 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right: Back to top */}
          <motion.a
            href="#top"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg glass text-text-muted hover:text-text-primary transition-colors duration-150"
            aria-label="Back to top of page"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <span className="mono-label text-[10px]">Back to top</span>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </footer>
  )
}
