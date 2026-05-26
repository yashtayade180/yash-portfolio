import { motion } from 'framer-motion'

export default function HireBadge() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.button
      onClick={scrollToContact}
      className="fixed bottom-6 left-6 z-40 focus:outline-none"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      whileHover={{ scale: 1.04 }}
      aria-label="Available for hire — scroll to contact"
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-card font-mono text-xs"
        style={{
          background: '#1d2025',
          border: '1px solid rgba(0,212,255,0.25)',
          boxShadow: '0 0 18px rgba(0,212,255,0.08)',
        }}
      >
        <span className="text-primary">{'>'}</span>
        <span className="text-muted">available_for_hire:</span>
        <span className="text-[#4ade80] font-bold">true</span>
        <span className="cursor-blink text-primary">_</span>
      </div>
    </motion.button>
  )
}
