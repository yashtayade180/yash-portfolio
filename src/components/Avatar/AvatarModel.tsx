import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  mouseRef: React.RefObject<{ x: number; y: number }>
}

// Slight leftward base rotation so the avatar faces the viewer (not the wall)
const BASE_Y = -0.12

export default function AvatarModel({ mouseRef }: Props) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/model.glb')
  const { actions } = useAnimations(animations, groupRef)

  const rot = useRef({ y: BASE_Y, x: 0 })

  useEffect(() => {
    const action = actions['avaturn_animation']
    if (action) {
      action.reset().fadeIn(0.4).play()
      action.setLoop(THREE.LoopRepeat, Infinity)
    }
  }, [actions])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const mx = mouseRef.current?.x ?? 0
    const my = mouseRef.current?.y ?? 0

    const LERP = 1 - Math.pow(0.08, delta)
    // Gentle parallax on top of the base rotation, reduced amplitude
    rot.current.y += (BASE_Y + mx * 0.15 - rot.current.y) * LERP
    rot.current.x += (-my * 0.08 - rot.current.x) * LERP

    groupRef.current.rotation.y = THREE.MathUtils.clamp(rot.current.y, BASE_Y - 0.25, BASE_Y + 0.25)
    groupRef.current.rotation.x = THREE.MathUtils.clamp(rot.current.x, -0.12, 0.12)
  })

  return (
    <group ref={groupRef} position={[0, -0.65, 0]} scale={1.15}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/model.glb')
