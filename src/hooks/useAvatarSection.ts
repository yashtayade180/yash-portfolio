import { useState, useEffect } from 'react'
import type { AvatarPose } from '../components/Avatar/AvatarCharacter'

const SECTION_POSES: Record<string, AvatarPose> = {
  hero:       'wave',
  about:      'point',
  skills:     'idle',
  experience: 'type',
  projects:   'thumbsup',
  contact:    'excited',
}

export function useAvatarSection(): AvatarPose {
  const [pose, setPose] = useState<AvatarPose>('wave')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    Object.keys(SECTION_POSES).forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setPose(SECTION_POSES[id]) },
        { threshold: 0.35 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return pose
}
