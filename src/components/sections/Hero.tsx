import { Download, ChevronDown } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { useCountUp } from '../../hooks/useCountUp'
import AvatarCanvas from '../Avatar/AvatarCanvas'

// ── Stat item with count-up ───────────────────────────────────────────
interface StatProps {
  end: number | null
  suffix: string
  label: string
  delay: number
}

function StatItem({ end, suffix, label, delay }: StatProps) {
  const count = useCountUp({ end: end ?? 0, duration: 1800, startOnMount: end !== null })
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <span className="font-mono font-bold text-3xl text-on-surface leading-none">
        {end !== null ? `${count}${suffix}` : suffix}
      </span>
      <span className="font-mono text-xs text-primary tracking-wider mt-1">{label}</span>
    </motion.div>
  )
}

// ── Char-level name animation ─────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
}
const charVariants: Variants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function AnimatedName() {
  const lines = ['Yash', 'Tayade']
  return (
    <motion.h1
      className="font-mono font-bold leading-[1.05] text-on-surface"
      style={{ fontSize: 'clamp(40px, 8vw, 72px)' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line.split('').map((char, i) => (
            <motion.span key={i} variants={charVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}

// ── Circuit board SVG background ──────────────────────────────────────
function CircuitPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.04 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          {/* Horizontal lines with gap at center */}
          <path d="M0 20h14M26 20h14" stroke="#00d4ff" strokeWidth="0.5" fill="none" />
          {/* Vertical lines with gap at center */}
          <path d="M20 0v14M20 26v14" stroke="#00d4ff" strokeWidth="0.5" fill="none" />
          {/* Junction dot */}
          <circle cx="20" cy="20" r="2.5" fill="#00d4ff" />
          {/* Corner dots */}
          <circle cx="0"  cy="0"  r="1.2" fill="#00d4ff" opacity="0.5" />
          <circle cx="40" cy="0"  r="1.2" fill="#00d4ff" opacity="0.5" />
          <circle cx="0"  cy="40" r="1.2" fill="#00d4ff" opacity="0.5" />
          <circle cx="40" cy="40" r="1.2" fill="#00d4ff" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  )
}

// ── Hero section ──────────────────────────────────────────────────────
export default function Hero() {
  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg scanlines flex items-center"
    >
      {/* Circuit board pattern */}
      <CircuitPattern />

      {/* Radial glow from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 w-full max-w-container mx-auto px-6 pt-20 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

        {/* ── LEFT COLUMN (60%) ─────────────────────────────── */}
        <div className="flex-1 flex flex-col items-start">

          {/* Terminal label */}
          <motion.p
            className="font-mono text-xs text-primary tracking-widest uppercase mb-4 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            ▸ FULL STACK ENGINEER&nbsp;•&nbsp;BANGALORE
            <span className="cursor-blink text-primary">_</span>
          </motion.p>

          {/* Animated name */}
          <AnimatedName />

          {/* Subtitle */}
          <motion.p
            className="font-sans text-lg text-muted max-w-md leading-relaxed mt-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            Architecting high-performance digital ecosystems with precision
            engineering and a dash of creative wonder.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <button
              onClick={scrollToProjects}
              className="bg-primary text-bg-low font-mono text-sm font-bold px-6 py-3 rounded-btn
                         hover:shadow-glow-cyan hover:scale-[1.02] transition-all duration-200
                         border-b-2 border-primary/50 active:scale-[0.98]"
            >
              VIEW MY WORK
            </button>
            <a
              href="https://drive.google.com/file/d/1BE2swKGfD6B4rZG8JBJGhx4YwA5cebSe/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-primary text-primary font-mono text-sm px-6 py-3 rounded-btn
                         hover:bg-primary/10 hover:shadow-glow-cyan transition-all duration-200"
            >
              <Download size={16} />
              DOWNLOAD RESUME
            </a>
          </motion.div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-8 mt-12">
            <StatItem end={2}  suffix="+" label="YRS EXP"    delay={1.1} />
            <div className="hidden sm:block w-px h-8 bg-outline/40" />
            <StatItem end={15} suffix="+" label="APIS BUILT" delay={1.2} />
            <div className="hidden sm:block w-px h-8 bg-outline/40" />
            <StatItem end={30} suffix="+" label="PROJECTS"   delay={1.3} />
            <div className="hidden sm:block w-px h-8 bg-outline/40" />
            <StatItem end={null} suffix="∞" label="CURIOSITY" delay={1.4} />
          </div>
        </div>

        {/* ── RIGHT COLUMN (40%) — 3D avatar, desktop only ─── */}
        <div className="hidden lg:block lg:w-[40%]" style={{ height: 580 }}>
          <AvatarCanvas />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <p className="font-mono text-xs text-muted tracking-widest">SCROLL TO EXPLORE</p>
        <ChevronDown size={24} className="text-primary bounce-y" />
      </motion.div>
    </section>
  )
}
