import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't render on touch devices
    if ('ontouchstart' in window) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.14)
      ringY = lerp(ringY, mouseY, 0.14)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(tick)
    }

    const onEnterInteractive = () => {
      if (!dotRef.current || !ringRef.current) return
      dotRef.current.style.transform  += ' scale(0)'
      dotRef.current.style.opacity    = '0'
      ringRef.current.style.transform += ' scale(1.8)'
      ringRef.current.style.borderColor = '#ffb95a'
      ringRef.current.style.opacity   = '0.6'
    }

    const onLeaveInteractive = () => {
      if (!dotRef.current || !ringRef.current) return
      dotRef.current.style.opacity    = '1'
      ringRef.current.style.borderColor = '#00d4ff'
      ringRef.current.style.opacity   = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    // Attach to all interactive elements
    const attach = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    }

    attach()
    // Re-attach whenever DOM changes (for dynamically added elements)
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  // Don't render on touch devices
  if ('ontouchstart' in window) return null

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#00d4ff',
          transition: 'opacity 0.2s, transform 0.05s',
        }}
      />
      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid #00d4ff',
          transition: 'border-color 0.2s, opacity 0.2s, transform 0.2s',
        }}
      />
    </>
  )
}
