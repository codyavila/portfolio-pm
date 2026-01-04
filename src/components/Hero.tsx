'use client'

import { motion, type Variants } from 'framer-motion'
import { FileText, MapPin, Sparkles } from 'lucide-react'

// Snappy spring - content appears fast
const springSnappy = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSnappy,
  },
}

export function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-bg-void" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      
      {/* Gradient orbs */}
      <div 
        className="absolute top-1/3 -left-1/4 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: 'var(--glow-emerald)' }}
      />
      <div 
        className="absolute bottom-1/3 -right-1/4 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: 'var(--glow-cyan)' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-50"
        style={{ backgroundColor: 'var(--accent-purple)', opacity: 0.1 }}
      />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      
      {/* Content */}
      <motion.div
        className="relative z-10 container-tight px-4 md:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-glow">
            <span className="relative flex h-2 w-2">
              <motion.span 
                className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald-bright"
                animate={{ scale: [1, 1.8, 1.8], opacity: [0.7, 0, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald-bright" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-emerald-bright">
              Open to Opportunities
            </span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl font-mono text-text-muted mb-4 tracking-wide"
        >
          Cody Avila
        </motion.p>

        {/* Main headline */}
        <motion.h1 
          id="hero-heading"
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="block text-text-primary">
            Senior Engineer{' '}
            <span className="text-accent-emerald-bright">&amp;</span>{' '}
            Product Strategist
          </span>
          <span className="block text-gradient-emerald mt-2">I Bridge Code to Customer Impact.</span>
        </motion.h1>

        {/* Location badge */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <MapPin className="w-4 h-4 text-text-subtle" aria-hidden="true" />
          <span className="font-mono text-sm text-text-subtle">Seattle, WA</span>
        </motion.div>

        {/* Subtext */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I&apos;ve shipped production features to{' '}
          <span className="font-mono text-text-primary font-semibold">141M+</span>{' '}
          monthly users—and along the way, realized I care more about the{' '}
          <em className="text-text-primary">user&apos;s &ldquo;why&rdquo;</em> than just the code&apos;s &ldquo;how.&rdquo;{' '}
          Now I drive technical execution of product vision, facilitate alignment between 
          engineering and stakeholders, and turn fuzzy requirements into shipped solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.a
            href="#projects"
            className="btn-primary group flex items-center gap-3 px-8 py-4 text-base"
            aria-label="View projects section"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            <span>View Projects</span>
          </motion.a>
          
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary group flex items-center gap-3 px-8 py-4 text-base"
            aria-label="Download resume as PDF (opens in new tab)"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <FileText className="w-5 h-5" aria-hidden="true" />
            <span>Download Resume</span>
            <span className="font-mono text-xs text-text-muted">(PDF)</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-text-subtle"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-current to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
