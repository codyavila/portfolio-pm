'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Code2, Target, Layers, GitBranch, Gauge, Server,
  Users, TrendingUp, FileText, Search, BarChart3
} from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

type ViewMode = 'strategy' | 'technical'

interface SkillCard {
  icon: React.ReactNode
  title: string
  description: string
}

const STRATEGY_SKILLS: SkillCard[] = [
  { icon: <Target className="w-5 h-5" />, title: 'Sprint Planning', description: 'Facilitate sprint planning sessions, weighing velocity against technical constraints and debt' },
  { icon: <Layers className="w-5 h-5" />, title: 'Backlog Refinement', description: 'Prioritize feature roadmaps based on user feedback, technical feasibility, and business impact' },
  { icon: <Search className="w-5 h-5" />, title: 'User Research', description: 'Conducted field research with 50+ editors to map failure points and inform feature scope' },
  { icon: <Users className="w-5 h-5" />, title: 'Stakeholder Alignment', description: 'Facilitate technical alignment between engineering and business stakeholders on AC and scope' },
  { icon: <FileText className="w-5 h-5" />, title: 'Technical Specifications', description: 'Write specs engineers want to read—clear acceptance criteria, edge cases, and constraints' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'A/B Testing', description: 'Design experiments that drove 30% improvement in key conversion flows—and knew when to kill tests' },
]

const TECHNICAL_SKILLS: SkillCard[] = [
  { icon: <Layers className="w-5 h-5" />, title: 'AI-Ready Architecture', description: 'Modular, event-driven systems designed for agentic workflow integration' },
  { icon: <GitBranch className="w-5 h-5" />, title: 'API Design', description: 'RESTful + GraphQL contract standardization supporting LLM-ready endpoints' },
  { icon: <Gauge className="w-5 h-5" />, title: 'Performance', description: 'P95 latency optimization: 200ms → 45ms through caching and query tuning' },
  { icon: <Server className="w-5 h-5" />, title: 'Scalable Infrastructure', description: 'AWS/GCP orchestration with auto-scaling for traffic spikes up to 10x baseline' },
  { icon: <Code2 className="w-5 h-5" />, title: 'Full-Stack', description: 'React, Node.js, TypeScript—shipping production code that protects revenue' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Revenue Observability', description: 'Real-time dashboards tracking ARR, churn, and cost metrics in Datadog/Looker' },
]

// Snappy spring
const springSnappy = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

export function PMBridgeToggle() {
  const [mode, setMode] = useState<ViewMode>('strategy')
  const skills = mode === 'strategy' ? STRATEGY_SKILLS : TECHNICAL_SKILLS

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="pm-bridge-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: 'var(--glow-emerald)' }}
      />
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: 'var(--glow-cyan)', opacity: 0.5 }}
      />

      <div className="relative z-10 container-tight px-4 md:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="mono-label text-accent-emerald-bright mb-4 block">The PM Bridge</span>
          <h2 id="pm-bridge-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            I Speak Both Languages
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Toggle between perspectives to see how I bridge the gap between 
            product execution and technical implementation.
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full glass border border-glass-border">
            <button
              onClick={() => setMode('strategy')}
              className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-colors duration-150 ${
                mode === 'strategy' ? 'text-bg-primary' : 'text-text-muted hover:text-text-primary'
              }`}
              aria-pressed={mode === 'strategy'}
              aria-label="View Strategy skills"
            >
              {mode === 'strategy' && (
                <motion.div
                  layoutId="toggle-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(to right, var(--accent-emerald-bright), var(--accent-cyan))' }}
                  transition={springSnappy}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Strategy
              </span>
            </button>
            
            <button
              onClick={() => setMode('technical')}
              className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-colors duration-150 ${
                mode === 'technical' ? 'text-bg-primary' : 'text-text-muted hover:text-text-primary'
              }`}
              aria-pressed={mode === 'technical'}
              aria-label="View Technical skills"
            >
              {mode === 'technical' && (
                <motion.div
                  layoutId="toggle-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(to right, var(--accent-emerald-bright), var(--accent-cyan))' }}
                  transition={springSnappy}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Technical
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={mode}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springSnappy, delay: index * 0.03 }}
                whileHover={{ y: -4, transition: { duration: 0.1 } }}
              >
                <div className="group bento-card p-6 h-full border-glow">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                    mode === 'strategy' ? 'bg-accent-emerald/20 text-accent-emerald-bright' : 'bg-accent-cyan-muted/20 text-accent-cyan'
                  }`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{skill.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom context */}
        <AnimatedSection delay={0.1} className="text-center mt-12">
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            {mode === 'strategy' 
              ? 'These are the product execution skills I bring from working alongside PMs and stakeholders.'
              : 'These are the technical deep-dives I bring from building production systems.'}
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
