'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Code2, Layers, Server, Accessibility, GitBranch,
  Target, FileText, Users, Search, Lightbulb
} from 'lucide-react'

const ENGINEER_SKILLS = [
  { icon: <Code2 className="w-4 h-4" aria-hidden="true" />, label: 'React' },
  { icon: <Server className="w-4 h-4" aria-hidden="true" />, label: 'Node.js' },
  { icon: <GitBranch className="w-4 h-4" aria-hidden="true" />, label: 'API Design' },
  { icon: <Layers className="w-4 h-4" aria-hidden="true" />, label: 'System Architecture' },
  { icon: <Accessibility className="w-4 h-4" aria-hidden="true" />, label: 'WCAG' },
] as const

const PM_SKILLS = [
  { icon: <Target className="w-4 h-4" aria-hidden="true" />, label: 'Sprint Planning' },
  { icon: <FileText className="w-4 h-4" aria-hidden="true" />, label: 'Technical Specs' },
  { icon: <Users className="w-4 h-4" aria-hidden="true" />, label: 'UX Collaboration' },
  { icon: <Search className="w-4 h-4" aria-hidden="true" />, label: 'Backlog Refinement' },
  { icon: <Lightbulb className="w-4 h-4" aria-hidden="true" />, label: 'A/B Testing' },
] as const

// Snappy spring
const springSnappy = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

interface SkillPillProps {
  icon: React.ReactNode
  label: string
  delay: number
  color: 'cyan' | 'purple'
}

function SkillPill({ icon, label, delay, color }: SkillPillProps) {
  const colorClasses = color === 'cyan' 
    ? 'text-accent-cyan border-accent-cyan/20 hover:border-accent-cyan/40' 
    : 'text-accent-purple border-accent-purple/20 hover:border-accent-purple/40'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...springSnappy, delay }}
      whileHover={{ scale: 1.03, transition: { duration: 0.1 } }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass border ${colorClasses} transition-colors duration-150`}
    >
      {icon}
      <span className="font-mono text-xs text-text-secondary">{label}</span>
    </motion.div>
  )
}

export function TechnicalBridge() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="bridge-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-secondary" />
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--bg-primary), transparent)' }}
      />

      <div className="relative z-10 container-tight px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={springSnappy}
          className="text-center mb-12"
        >
          <span className="mono-label text-accent-emerald-bright mb-3 block">The Technical Bridge</span>
          <h2 id="bridge-heading" className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Fluent in Both Worlds
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            I translate between engineering complexity and business objectives—ensuring technical 
            decisions drive measurable outcomes.
          </p>
        </motion.div>

        {/* Split view */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0">
          {/* Engineer side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...springSnappy, delay: 0.05 }}
            className="relative"
          >
            <div className="bento-card p-6 md:p-8 lg:rounded-r-none lg:border-r-0 h-full">
              <div 
                className="absolute top-0 left-0 w-0.5 h-full rounded-l-2xl" 
                style={{ background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-cyan) 50%, transparent)' }}
                aria-hidden="true" 
              />
              
              <div className="pl-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                  </div>
                  <span className="mono-label text-accent-cyan">The Engineer</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4">
                  I speak <span className="text-accent-cyan">&ldquo;Dev&rdquo;</span> fluently.
                </h3>
                
                <p className="text-text-secondary mb-6 leading-relaxed text-sm md:text-base">
                  From architecting scalable systems to debugging edge cases at 2AM, 
                  I&apos;ve shipped production code that serves millions. I understand the 
                  technical debt tradeoffs, the build vs. buy decisions, and why that 
                  &ldquo;simple&rdquo; feature isn&apos;t so simple.
                </p>

                <div className="flex flex-wrap gap-2">
                  {ENGINEER_SKILLS.map((skill, index) => (
                    <SkillPill 
                      key={skill.label} 
                      icon={skill.icon}
                      label={skill.label}
                      delay={0.1 + index * 0.03} 
                      color="cyan"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* PM side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...springSnappy, delay: 0.1 }}
            className="relative"
          >
            <div className="bento-card p-6 md:p-8 lg:rounded-l-none h-full">
              <div 
                className="absolute top-0 right-0 w-0.5 h-full rounded-r-2xl" 
                style={{ background: 'linear-gradient(to bottom, var(--accent-purple), var(--accent-purple) 50%, transparent)' }}
                aria-hidden="true" 
              />
              
              <div className="pr-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent-purple" aria-hidden="true" />
                  </div>
                  <span className="mono-label text-accent-purple">The PM</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4">
                  I translate the <span className="text-accent-purple">&ldquo;Why&rdquo;</span>.
                </h3>
                
                <p className="text-text-secondary mb-6 leading-relaxed text-sm md:text-base">
                  Beyond code, I collaborate with cross-functional teams to turn fuzzy
                  requirements into clear acceptance criteria. I write technical specs
                  that bridge design and engineering, facilitate sprint planning, and
                  help translate stakeholder goals into actionable backlogs.
                </p>

                <div className="flex flex-wrap gap-2">
                  {PM_SKILLS.map((skill, index) => (
                    <SkillPill 
                      key={skill.label} 
                      icon={skill.icon}
                      label={skill.label}
                      delay={0.15 + index * 0.03} 
                      color="purple"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bridge connector (visible on lg+) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 z-20" aria-hidden="true">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ ...springSnappy, delay: 0.2 }}
            className="w-14 h-14 rounded-full bg-bg-primary border border-glass-border flex items-center justify-center"
          >
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))' }}
            >
              <span className="font-mono text-sm font-bold text-bg-primary">+</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
