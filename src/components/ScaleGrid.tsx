'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Users, Eye, CreditCard, Activity } from 'lucide-react'

const STATS = [
  {
    value: '141M+',
    numericValue: 141,
    suffix: 'M+',
    label: 'Monthly Users',
    sublabel: 'Driving ad revenue & engagement',
    icon: <Users className="w-5 h-5" aria-hidden="true" />,
    isLive: true,
    gradientFrom: 'var(--accent-emerald)',
    gradientTo: 'var(--accent-emerald-bright)',
  },
  {
    value: '6.8B',
    numericValue: 6.8,
    suffix: 'B',
    label: 'Annual Pageviews',
    sublabel: 'Monetizable inventory at scale',
    icon: <Eye className="w-5 h-5" aria-hidden="true" />,
    isLive: false,
    gradientFrom: 'var(--accent-cyan-muted)',
    gradientTo: 'var(--accent-cyan)',
  },
  {
    value: '2M+',
    numericValue: 2,
    suffix: 'M+',
    label: 'Paid Subscribers',
    sublabel: 'Recurring revenue protected',
    icon: <CreditCard className="w-5 h-5" aria-hidden="true" />,
    isLive: true,
    gradientFrom: 'var(--accent-purple)',
    gradientTo: 'var(--accent-purple)',
  },
] as const

// Snappy spring
const springSnappy = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

interface AnimatedCounterProps {
  value: number
  suffix: string
  duration?: number
}

function AnimatedCounter({ value, suffix, duration = 1200 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      
      if (value < 10) {
        setCount(parseFloat((eased * value).toFixed(1)))
      } else {
        setCount(Math.floor(eased * value))
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration])

  const displayValue = value < 10 ? count.toFixed(1) : count.toLocaleString()

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      <span className="text-accent-emerald-bright">{suffix}</span>
    </span>
  )
}

interface StatCardProps {
  stat: typeof STATS[number]
  index: number
}

function StatCard({ stat, index }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...springSnappy, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="group relative"
    >
      <div className="dashboard-card p-6 md:p-8 h-full border-glow">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white/90"
            style={{ 
              background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})` 
            }}
          >
            {stat.icon}
          </div>
          
          {/* Live indicator */}
          {stat.isLive && (
            <div className="flex items-center gap-2" aria-label="Live data">
              <span className="relative flex h-2 w-2">
                <motion.span 
                  className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald-bright"
                  animate={{ scale: [1, 1.8, 1.8], opacity: [0.6, 0, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald-bright" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent-emerald-bright">Live</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-4">
          <span className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
            <AnimatedCounter value={stat.numericValue} suffix={stat.suffix} />
          </span>
        </div>

        {/* Labels */}
        <h3 className="text-lg font-semibold text-text-primary mb-1">{stat.label}</h3>
        <p className="font-mono text-xs uppercase tracking-widest text-text-subtle">{stat.sublabel}</p>

        {/* Mini chart decoration */}
        <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-150" aria-hidden="true">
          <Activity className="w-16 h-16 text-text-subtle" />
        </div>
      </div>
    </motion.div>
  )
}

export function ScaleGrid() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="scale-grid" className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="scale-grid-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div 
        className="absolute top-0 left-0 right-0 h-px" 
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent-emerald) 50%, transparent)' }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-px" 
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent-cyan) 50%, transparent)', opacity: 0.5 }}
      />

      <div className="relative z-10 container-wide px-4 md:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={springSnappy}
          className="text-center mb-12"
        >
          <span className="mono-label text-accent-emerald-bright mb-3 block">Platform Scale</span>
          <h2 id="scale-grid-heading" className="text-3xl md:text-4xl font-bold text-text-primary">
            Live Dashboard
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

