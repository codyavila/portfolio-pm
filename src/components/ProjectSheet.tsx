'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, CreditCard, Component, CheckCircle2 } from 'lucide-react'

interface Project {
  id: string
  title: string
  company: string
  heroMetric: string
  heroLabel: string
  tags: string[]
  icon: React.ReactNode
  accentColor: string
  gradientFrom: string
  description: string
  contributions: string[]
}

const PROJECTS: Project[] = [
  {
    id: 'email-suite',
    title: 'Email Campaign Suite',
    company: 'BLOX Digital',
    heroMetric: '-15hrs/wk',
    heroLabel: 'Editor time saved',
    tags: ['React', 'NLP', 'AWS Lambda'],
    icon: <Mail className="w-5 h-5" />,
    accentColor: 'var(--accent-cyan)',
    gradientFrom: 'from-accent-cyan/20',
    description: 'Rebuilt the email campaign builder with a guided wizard and natural-language scheduling, making it accessible to non-technical editors.',
    contributions: [
      'Architected multi-step wizard with progressive disclosure to reduce cognitive load for non-technical editors',
      'Built natural-language date parsing to solve scheduling confusion that caused 40% of support tickets',
      'Collaborated with design to reduce setup time from 45min to 8min—directly improving editor retention',
      'Conducted user research with 50+ editors to prioritize features based on actual pain points',
    ],
  },
  {
    id: 'payments',
    title: 'Payments Integration',
    company: 'BLOX Digital',
    heroMetric: '-20%',
    heroLabel: 'Failed transactions',
    tags: ['Stripe API', 'Webhooks', 'PostgreSQL'],
    icon: <CreditCard className="w-5 h-5" />,
    accentColor: 'var(--accent-purple)',
    gradientFrom: 'from-accent-purple/20',
    description: 'Standardized payment processing across multiple providers, implementing resilient error handling and retry logic.',
    contributions: [
      'Designed unified API contracts across Stripe, Braintree, and PayPal to solve integration fragmentation',
      'Architected exponential backoff retry logic to reduce failed transactions—protecting $2M+ in annual revenue',
      'Created standardized error taxonomy to cut debugging time by 60% across support and engineering',
      'Drove phased rollout planning across 2,000+ sites, prioritizing highest-revenue clients first',
    ],
  },
  {
    id: 'design-system',
    title: 'Component Design System',
    company: 'BLOX Digital',
    heroMetric: '+30%',
    heroLabel: 'Faster feature delivery',
    tags: ['React', 'Storybook', 'Figma API'],
    icon: <Component className="w-5 h-5" />,
    accentColor: 'var(--success)',
    gradientFrom: 'from-green-500/20',
    description: 'Built an internal component library that unified UI patterns across 2,000+ sites, enabling faster and more consistent feature development.',
    contributions: [
      'Architected composable component primitives to solve UI inconsistency across 2,000+ client sites',
      'Set up Storybook documentation to reduce onboarding time for new engineers from days to hours',
      'Built zero-runtime theming system (CSS variables + Tailwind) to enable client customization without perf cost',
      'Partnered with design to establish token system and WCAG 2.1 AA accessibility standards',
    ],
  }
]

// Snappy spring
const springSnappy = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...springSnappy, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.1 } }}
      className="group relative overflow-hidden rounded-2xl border border-glass-border hover:border-glass-border-hover transition-colors duration-150"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientFrom} to-transparent`} />
      <div className="absolute inset-0 bg-bg-void/80 backdrop-blur-xl" />
      
      <div className="relative z-10 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-glass-border"
              style={{ backgroundColor: `color-mix(in srgb, ${project.accentColor} 15%, transparent)`, color: project.accentColor }}
            >
              {project.icon}
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{project.company}</span>
              <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
            </div>
          </div>
          
          {/* Metric badge */}
          <div 
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ backgroundColor: `color-mix(in srgb, ${project.accentColor} 10%, transparent)` }}
          >
            <div className="font-mono text-2xl md:text-3xl font-bold" style={{ color: project.accentColor }}>
              {project.heroMetric}
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wider max-w-[100px] leading-tight">
              {project.heroLabel}
            </div>
          </div>
        </div>
        
        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Description + Tags */}
          <div>
            <p className="text-text-secondary leading-relaxed mb-6">{project.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-glass-border text-text-muted border border-glass-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right: Contributions */}
          <div className="p-5 rounded-xl bg-glass-border border border-glass-border">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-4 block">
              What I Built
            </span>
            <ul className="space-y-4">
              {project.contributions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: project.accentColor }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectSheet() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="projects-heading">
      <div className="absolute inset-0 bg-bg-void" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div 
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: 'var(--glow-cyan)', opacity: 0.3 }}
      />
      <div 
        className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: 'var(--accent-purple)', opacity: 0.1 }}
      />

      <div className="relative z-10 container-tight px-4 md:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={springSnappy}
          className="text-center mb-16"
        >
          <span className="mono-label text-accent-purple mb-3 block">Projects</span>
          <h2 id="projects-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            What I&apos;ve Built
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Features and systems I&apos;ve shipped at scale, with the outcomes they drove.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
