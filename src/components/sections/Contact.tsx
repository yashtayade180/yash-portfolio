import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Mail, MapPin, Briefcase, Copy, Check, Code2, Globe } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'

const EMAIL = 'yashtayade180@gmail.com'

// ── Inline brand SVGs (lucide has no brand icons) ─────────────────────
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ── Word-by-word heading animation ────────────────────────────────────
const containerV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const wordV: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function AnimatedHeading() {
  const line1 = "Let's build something"
  const line2 = 'together.'

  return (
    <motion.div
      variants={containerV}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="font-mono font-bold text-on-surface text-center"
      style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
    >
      {/* Line 1 */}
      <div className="overflow-hidden pb-1">
        {line1.split(' ').map((w, i) => (
          <motion.span key={i} variants={wordV} className="inline-block mr-[0.3em]">
            {w}
          </motion.span>
        ))}
      </div>
      {/* Line 2 — primary colour */}
      <div className="overflow-hidden pb-1">
        {line2.split(' ').map((w, i) => (
          <motion.span key={i} variants={wordV} className="inline-block mr-[0.3em] text-primary text-glow">
            {w}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

// ── Contact card ──────────────────────────────────────────────────────
function ContactCard() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-bg-card border border-primary/20 rounded-card p-8 shadow-glow-cyan max-w-lg mx-auto mt-12">

      {/* Email row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Mail size={16} className="text-primary flex-shrink-0" />
          <span className="font-mono text-sm text-on-surface truncate">{EMAIL}</span>
        </div>
        <button
          onClick={handleCopy}
          className={[
            'flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-btn border flex-shrink-0 transition-all duration-200',
            copied
              ? 'border-green-500/60 text-green-400 bg-green-500/10'
              : 'border-outline/40 text-muted hover:border-primary/60 hover:text-primary',
          ].join(' ')}
        >
          {copied ? (
            <><Check size={12} /> COPIED</>
          ) : (
            <><Copy size={12} /> COPY</>
          )}
        </button>
      </div>

      <div className="border-t border-outline/20 my-4" />

      {/* Location row */}
      <div className="flex items-center gap-3 text-muted font-mono text-xs">
        <MapPin size={14} className="text-primary flex-shrink-0" />
        <span>Bangalore, India</span>
        <span className="text-outline">·</span>
        <span>Open to remote / hybrid</span>
      </div>

      {/* Role row */}
      <div className="flex items-center gap-3 text-muted font-mono text-xs mt-3">
        <Briefcase size={14} className="text-primary flex-shrink-0" />
        <span>Currently @ Signzy</span>
        <span className="text-outline">·</span>
        <span className="text-primary/80">Available for opportunities</span>
      </div>
    </div>
  )
}

// ── Social link button ────────────────────────────────────────────────
const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/yashtayade',          icon: <GitHubIcon /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yashtayade',     icon: <LinkedInIcon /> },
  { label: 'LeetCode', href: 'https://leetcode.com/yashtayade',        icon: <Code2 size={22} /> },
  { label: 'Website',  href: '#',                                       icon: <Globe size={22} /> },
]

// ── Contact section ───────────────────────────────────────────────────
export default function Contact() {
  return (
    <section id="contact" className="bg-bg-low">
      <div className="max-w-container mx-auto px-6">

        <SectionLabel text="LET'S CONNECT" />

        {/* Animated heading */}
        <AnimatedHeading />

        {/* Subtext */}
        <motion.p
          className="font-sans text-lg text-muted max-w-xl mx-auto text-center mt-6 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Open to full-time roles, freelance projects, and good conversations
          about distributed systems, microservices, or cricket.
        </motion.p>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ContactCard />
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          {SOCIALS.map(({ label, href, icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-[52px] h-[52px] bg-bg-card border border-outline/30 rounded-card flex items-center justify-center text-muted hover:border-primary/60 hover:text-primary hover:shadow-glow-cyan transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.15 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Big CTA */}
        <motion.div
          className="flex flex-col items-center gap-4 mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <a
            href={`mailto:${EMAIL}`}
            className="font-mono font-bold text-lg bg-primary text-bg-low py-4 px-10 rounded-btn hover:shadow-glow-cyan hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
          >
            SEND ME AN EMAIL →
          </a>
          <a
            href="/resume.pdf"
            download
            className="font-mono text-xs text-muted hover:text-primary underline underline-offset-4 transition-colors duration-200"
          >
            or download my resume
          </a>
        </motion.div>

      </div>
    </section>
  )
}
