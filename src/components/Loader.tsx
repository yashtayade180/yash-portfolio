import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  '$ initializing yash.dev...',
  '$ loading portfolio modules...',
]

function TypewriterLine({ text, startDelay, onDone }: { text: string; startDelay: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const t = setTimeout(() => {
      const id = setInterval(() => {
        setDisplayed(text.slice(0, ++i))
        if (i >= text.length) {
          clearInterval(id)
          onDone?.()
        }
      }, 38)
      return () => clearInterval(id)
    }, startDelay)
    return () => clearTimeout(t)
  }, [text, startDelay, onDone])

  return (
    <p className="font-mono text-sm text-muted">
      {displayed}
      {displayed.length < text.length && <span className="cursor-blink text-primary">_</span>}
    </p>
  )
}

export default function Loader({ onDone }: { onDone: () => void }) {
  const [line2Active, setLine2Active]   = useState(false)
  const [showReady,   setShowReady]     = useState(false)
  const [progress,    setProgress]      = useState(0)
  const [exiting,     setExiting]       = useState(false)

  // Progress bar fills after both lines typed
  useEffect(() => {
    if (!showReady) return
    const start  = performance.now()
    const dur    = 500
    const id = requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / dur, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(tick)
      else setTimeout(() => setExiting(true), 200)
    })
    return () => cancelAnimationFrame(id)
  }, [showReady])

  // Once exit animation triggers, notify parent
  useEffect(() => {
    if (exiting) {
      const t = setTimeout(onDone, 650)
      return () => clearTimeout(t)
    }
  }, [exiting, onDone])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] bg-bg-low flex flex-col items-center justify-center gap-6"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Monogram */}
          <motion.div
            className="w-12 h-12 bg-primary text-bg-low font-mono font-bold text-xl flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            YT
          </motion.div>

          {/* Typewriter lines */}
          <div className="space-y-1 text-left w-64">
            <TypewriterLine
              text={LINES[0]}
              startDelay={400}
              onDone={() => setLine2Active(true)}
            />
            {line2Active && (
              <TypewriterLine
                text={LINES[1]}
                startDelay={80}
                onDone={() => setShowReady(true)}
              />
            )}
            {showReady && (
              <motion.p
                className="font-mono text-sm text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                ✓ ready
              </motion.p>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-64 h-[2px] bg-bg-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary origin-left transition-none"
              style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
