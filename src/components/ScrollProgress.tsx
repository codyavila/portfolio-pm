'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  // Smooth spring for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{ 
        scaleX,
        background: 'linear-gradient(to right, var(--accent-emerald-bright), var(--accent-cyan), var(--accent-purple))'
      }}
      aria-hidden="true"
    />
  )
}
