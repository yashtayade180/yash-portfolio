import { useEffect, useRef, useState } from 'react'

interface Options {
  end: number
  duration?: number
  startOnMount?: boolean
}

export function useCountUp({ end, duration = 1500, startOnMount = true }: Options) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(0)

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

  useEffect(() => {
    if (!startOnMount || end === 0) return
    const startTime = performance.now()

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setCount(Math.round(easeOut(progress) * end))
      if (progress < 1) frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [end, duration, startOnMount])

  return count
}
