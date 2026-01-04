'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Mail, Linkedin, Github, ArrowUpRight, Quote,
  MapPin, Phone, Lightbulb, Bot, Scale
} from 'lucide-react'

const CONTACT_LINKS = [
  {
    icon: <Mail className="w-5 h-5" aria-hidden="true" />,
    label: 'Email',
    value: 'cody.r.avila@proton.me',
    href: 'mailto:cody.r.avila@proton.me',
    hoverColor: 'hover:text-accent-cyan hover:border-accent-cyan/30',
  },
  {
    icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
    label: 'LinkedIn',
    value: '/in/codyavila',
    href: 'https://linkedin.com/in/codyavila',
    hoverColor: 'hover:text-accent-blue hover:border-accent-blue/30',
  },
  {
    icon: <Github className="w-5 h-5" aria-hidden="true" />,
    label: 'GitHub',
    value: '@codyavila',
    href: 'https://github.com/codyavila',
    hoverColor: 'hover:text-text-primary hover:border-text-muted/30',
  },
] as const

// Snappy spring
const springSnappy = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="contact-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div 
        className="absolute top-0 left-0 right-0 h-px" 
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent-emerald) 50%, transparent)', opacity: 0.5 }}
      />
      <div 
        className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: 'var(--glow-emerald)' }}
      />
      <div 
        className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: 'var(--glow-cyan)', opacity: 0.5 }}
      />

      <div className="relative z-10 container-tight px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Professional summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={springSnappy}
          >
            {/* Quote mark */}
            <div className="mb-6" aria-hidden="true">
              <Quote className="w-10 h-10 text-accent-emerald/50" />
            </div>

            <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold text-text-primary mb-6 leading-relaxed">
              Senior engineer who&apos;s already doing 60% of a PM&apos;s job—shipping features 
              across platforms serving{' '}
              <span className="font-mono text-accent-emerald-bright">141M+</span> monthly users.
            </h2>

            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              I drive technical execution of product vision, prioritize feature roadmaps based on 
              user feedback and technical feasibility, and architect systems that solve real user problems.
            </p>

            <p className="text-text-muted leading-relaxed mb-8">
              I write technical specs that bridge design and engineering, facilitate sprint
              planning and backlog refinement, and translate stakeholder goals into clear acceptance 
              criteria. Technical credibility with product instincts—ready to make the jump.
            </p>

            {/* Location & availability */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass">
                <MapPin className="w-4 h-4 text-accent-emerald-bright" aria-hidden="true" />
                <span className="text-sm text-text-secondary">Seattle, WA</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass">
                <Phone className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
                <span className="text-sm text-text-secondary">(727) 871-8709</span>
              </div>
            </div>

            {/* Product POV Section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springSnappy, delay: 0.1 }}
              className="relative"
            >
              <div 
                className="absolute -left-3 top-0 bottom-0 w-0.5 rounded-full" 
                style={{ background: 'linear-gradient(to bottom, var(--accent-purple), var(--accent-cyan), transparent)' }}
              />
              <div className="pl-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-accent-amber" aria-hidden="true" />
                  <span className="mono-label text-accent-amber">Product Philosophy</span>
                </div>
                
                <div className="space-y-4">
                  <div className="glass rounded-xl p-4 border border-glass-border hover:border-glass-border-hover transition-colors duration-150">
                    <div className="flex items-start gap-3">
                      <Scale className="w-4 h-4 text-accent-emerald-bright mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-text-primary font-medium mb-1">
                          &ldquo;Technical debt is a product decision, not just a dev issue.&rdquo;
                        </p>
                        <p className="text-xs text-text-muted">
                          Every sprint, I weigh velocity against maintainability—because shipping fast today shouldn&apos;t mean burning the team tomorrow.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass rounded-xl p-4 border border-glass-border hover:border-glass-border-hover transition-colors duration-150">
                    <div className="flex items-start gap-3">
                      <Bot className="w-4 h-4 text-accent-purple mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-text-primary font-medium mb-1">
                          &ldquo;In the AI era, UX is no longer about clicks—it&apos;s about intent-matching.&rdquo;
                        </p>
                        <p className="text-xs text-text-muted">
                          The best products in 2026 anticipate what users want before they ask. I design for agentic workflows, not just user flows.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...springSnappy, delay: 0.05 }}
          >
            <div className="bento-card p-6 md:p-8 border-glow">
              {/* Header */}
              <div className="mb-8">
                <span className="mono-label text-accent-emerald-bright mb-2 block">Let&apos;s Connect</span>
                <h3 className="text-2xl font-bold text-text-primary">Ready for the Next Challenge</h3>
              </div>

              {/* Contact links */}
              <nav className="space-y-3 mb-8" aria-label="Contact links">
                {CONTACT_LINKS.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...springSnappy, delay: 0.1 + index * 0.04 }}
                    whileHover={{ x: 4, transition: { duration: 0.1 } }}
                    className={`group flex items-center justify-between p-4 rounded-xl glass glass-hover ${link.hoverColor}`}
                    aria-label={`${link.label}: ${link.value}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-glass-border flex items-center justify-center transition-colors duration-150 group-hover:bg-glass-border-hover">
                        {link.icon}
                      </div>
                      <div>
                        <span className="mono-label text-text-subtle block text-[10px]">{link.label}</span>
                        <span className="text-text-primary font-medium">{link.value}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-text-subtle group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" aria-hidden="true" />
                  </motion.a>
                ))}
              </nav>

              {/* CTA */}
              <motion.a
                href="mailto:cody.r.avila@proton.me?subject=Let's Connect"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...springSnappy, delay: 0.25 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full py-4 text-base justify-center"
                aria-label="Send email to start a conversation"
              >
                Start a Conversation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
