'use client'

import { motion, useInView, type Variants, type Transition } from 'framer-motion'
import { useRef, ReactNode, useMemo } from 'react'

// ============================================================================
// SHARED ANIMATION CONFIG - Snappy & Responsive
// ============================================================================

// Fast, responsive spring - minimal overshoot
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
}

// Standard spring for content reveals
export const springDefault: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 28,
}

// Quick duration-based for micro-interactions
export const transitionFast: Transition = {
  duration: 0.15,
  ease: [0.25, 0.1, 0.25, 1],
}

// ============================================================================
// ANIMATED SECTION
// ============================================================================

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
  amount?: number
}

function getVariants(direction: string, delay: number): Variants {
  const distance = 16 // Subtle, not distracting
  
  const transforms: Record<string, { hidden: Record<string, number>; visible: Record<string, number> }> = {
    up: { hidden: { y: distance }, visible: { y: 0 } },
    down: { hidden: { y: -distance }, visible: { y: 0 } },
    left: { hidden: { x: -distance }, visible: { x: 0 } },
    right: { hidden: { x: distance }, visible: { x: 0 } },
    none: { hidden: {}, visible: {} },
  }
  
  const transform = transforms[direction] || transforms.none
  
  return {
    hidden: { 
      opacity: 0, 
      ...transform.hidden,
    },
    visible: {
      opacity: 1,
      ...transform.visible,
      transition: {
        ...springDefault,
        delay,
      },
    },
  }
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
  amount = 0.2,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  
  const variants = useMemo(
    () => getVariants(direction, delay),
    [direction, delay]
  )

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// STAGGER CONTAINER - Fast stagger
// ============================================================================

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.04, // Fast stagger
  once = true,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.15 })

  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  }), [staggerDelay])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// STAGGER ITEM
// ============================================================================

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springDefault,
  },
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

// ============================================================================
// FADE IN - Simple, fast fade
// ============================================================================

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ 
  children, 
  className = '', 
  delay = 0,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...springDefault, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
