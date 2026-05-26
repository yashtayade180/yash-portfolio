import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const scrolled  = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress  = docHeight > 0 ? scrolled / docHeight : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }

    // Run once on mount so bar starts at correct position
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left will-change-transform"
      style={{
        background: 'linear-gradient(to right, #00d4ff, #ffb95a)',
        transform: 'scaleX(0)',
      }}
    />
  )
}
