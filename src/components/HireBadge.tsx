import { motion } from 'framer-motion'

const RADIUS  = 44
const TEXT    = 'AVAILABLE FOR HIRE · YASH TAYADE · '

export default function HireBadge() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.button
      onClick={scrollToContact}
      className="fixed bottom-8 left-8 z-40 w-[88px] h-[88px] flex items-center justify-center focus:outline-none"
      whileHover={{ scale: 1.1 }}
      animate={{ scale: [1, 1.04, 1] }}
      transition={{
        scale: { duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0 },
      }}
      aria-label="Available for hire — scroll to contact"
    >
      {/* Rotating SVG ring with text path */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ animation: 'spin 10s linear infinite' }}
      >
        <defs>
          <path
            id="hire-circle"
            d={`M 50,50 m -${RADIUS},0 a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>
        {/* Amber background circle */}
        <circle cx="50" cy="50" r="49" fill="#ffb95a" />
        {/* Rotating text */}
        <text
          fontFamily="'Space Mono', monospace"
          fontSize="9"
          fill="#1a0a00"
          fontWeight="700"
          letterSpacing="1"
        >
          <textPath href="#hire-circle">{TEXT}</textPath>
        </text>
      </svg>

      {/* Inner emoji */}
      <span className="relative z-10 text-2xl select-none" style={{ lineHeight: 1 }}>
        👋
      </span>
    </motion.button>
  )
}
