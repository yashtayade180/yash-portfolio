import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export type AvatarPose = 'idle' | 'wave' | 'point' | 'type' | 'thumbsup' | 'excited'

interface Props {
  pose: AvatarPose
  mouseRef: React.RefObject<{ x: number; y: number }>
}

const D = Math.PI / 180

interface PoseAngles {
  rArm: [number, number, number]
  lArm: [number, number, number]
  head: [number, number, number]
}

// Rotations in Euler XYZ order — shoulder pivot, arm hangs in –Y.
// Z rotation: +° swings arm tip toward +X (right), 180° = straight up.
const POSES: Record<AvatarPose, PoseAngles> = {
  idle:     { rArm: [0,      0,  20*D],  lArm: [0,       0, -20*D],  head: [0,      0, 0] },
  wave:     { rArm: [-20*D,  0, 145*D],  lArm: [0,       0, -20*D],  head: [0,  -15*D, 0] },
  point:    { rArm: [-65*D,  0,  75*D],  lArm: [0,       0, -20*D],  head: [0,  -20*D, 0] },
  type:     { rArm: [-50*D,  0, -15*D],  lArm: [-50*D,   0,  15*D],  head: [12*D,   0, 0] },
  thumbsup: { rArm: [-25*D,  0, 115*D],  lArm: [0,       0, -20*D],  head: [0,    8*D, 0] },
  excited:  { rArm: [-15*D,  0, 155*D],  lArm: [-15*D,   0,-155*D],  head: [-10*D,  0, 0] },
}

export default function AvatarCharacter({ pose, mouseRef }: Props) {
  const rootRef    = useRef<THREE.Group>(null)
  const headGrpRef = useRef<THREE.Group>(null)
  const rArmRef    = useRef<THREE.Group>(null)
  const lArmRef    = useRef<THREE.Group>(null)

  const cur = useRef({
    rArm:  [...POSES.idle.rArm]  as [number, number, number],
    lArm:  [...POSES.idle.lArm]  as [number, number, number],
    head:  [...POSES.idle.head]  as [number, number, number],
    rootY: 0,
    rootX: 0,
  })

  // 4-step toon gradient
  const gradientMap = useMemo(() => {
    const data = new Uint8Array([64, 128, 192, 255])
    const tex  = new THREE.DataTexture(data, 4, 1, THREE.RedFormat)
    tex.needsUpdate = true
    return tex
  }, [])

  const mat = useMemo(() => ({
    skin:  new THREE.MeshToonMaterial({ color: '#f5c5a3', gradientMap }),
    shirt: new THREE.MeshToonMaterial({ color: '#00d4ff', gradientMap }),
    pants: new THREE.MeshToonMaterial({ color: '#1e2a3a', gradientMap }),
    hair:  new THREE.MeshToonMaterial({ color: '#1a1008', gradientMap }),
    shoe:  new THREE.MeshToonMaterial({ color: '#0d0d0d', gradientMap }),
    white: new THREE.MeshBasicMaterial({ color: '#ffffff' }),
    pupil: new THREE.MeshBasicMaterial({ color: '#111111' }),
  }), [gradientMap])

  const geo = useMemo(() => ({
    head:  new THREE.SphereGeometry(0.42, 16, 14),
    hair:  new THREE.SphereGeometry(0.435, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.56),
    neck:  new THREE.CylinderGeometry(0.13, 0.15, 0.18, 8),
    body:  new THREE.CylinderGeometry(0.27, 0.31, 0.88, 10),
    armUp: new THREE.CylinderGeometry(0.09, 0.082, 0.36, 8),
    armLo: new THREE.CylinderGeometry(0.082, 0.072, 0.34, 8),
    hand:  new THREE.SphereGeometry(0.105, 8, 6),
    eye:   new THREE.SphereGeometry(0.076, 8, 6),
    pupil: new THREE.SphereGeometry(0.046, 6, 4),
    leg:   new THREE.CylinderGeometry(0.105, 0.095, 0.72, 8),
    shoe:  new THREE.BoxGeometry(0.22, 0.1, 0.3),
  }), [])

  useFrame((_, delta) => {
    const target = POSES[pose]
    // Frame-rate–independent lerp (reaches ~95 % of target in ~1 s at 60 fps)
    const L = 1 - Math.pow(0.05, delta)

    for (let i = 0; i < 3; i++) {
      cur.current.rArm[i] += (target.rArm[i] - cur.current.rArm[i]) * L
      cur.current.lArm[i] += (target.lArm[i] - cur.current.lArm[i]) * L
      cur.current.head[i] += (target.head[i] - cur.current.head[i]) * L
    }

    if (rArmRef.current) {
      rArmRef.current.rotation.set(...cur.current.rArm)
      if (pose === 'wave') {
        rArmRef.current.rotation.z += Math.sin(performance.now() * 0.003) * 0.17
      }
    }
    if (lArmRef.current) lArmRef.current.rotation.set(...cur.current.lArm)
    if (headGrpRef.current) headGrpRef.current.rotation.set(...cur.current.head)

    if (rootRef.current) {
      const mx = mouseRef.current?.x ?? 0
      const my = mouseRef.current?.y ?? 0
      cur.current.rootY += (mx * 0.22 - cur.current.rootY) * 0.08
      cur.current.rootX += (-my * 0.12 - cur.current.rootX) * 0.08
      rootRef.current.rotation.y = cur.current.rootY
      rootRef.current.rotation.x = cur.current.rootX
      rootRef.current.position.y = Math.sin(performance.now() * 0.0012) * 0.05
    }
  })

  return (
    <group ref={rootRef}>
      {/* HEAD */}
      <group ref={headGrpRef} position={[0, 1.38, 0]}>
        <mesh geometry={geo.head} material={mat.skin} />
        <mesh geometry={geo.hair} material={mat.hair} position={[0, 0.05, 0]} />
        {/* Left eye */}
        <group position={[-0.155, 0.06, 0.375]}>
          <mesh geometry={geo.eye}   material={mat.white} />
          <mesh geometry={geo.pupil} material={mat.pupil} position={[0, 0, 0.055]} />
        </group>
        {/* Right eye */}
        <group position={[0.155, 0.06, 0.375]}>
          <mesh geometry={geo.eye}   material={mat.white} />
          <mesh geometry={geo.pupil} material={mat.pupil} position={[0, 0, 0.055]} />
        </group>
      </group>

      {/* NECK */}
      <mesh geometry={geo.neck} material={mat.skin} position={[0, 0.97, 0]} />

      {/* BODY */}
      <mesh geometry={geo.body} material={mat.shirt} position={[0, 0.53, 0]} />

      {/* RIGHT ARM (shirt upper + skin lower + hand) */}
      <group ref={rArmRef} position={[0.41, 0.87, 0]}>
        <mesh geometry={geo.armUp} material={mat.shirt} position={[0, -0.18, 0]} />
        <mesh geometry={geo.armLo} material={mat.skin}  position={[0, -0.53, 0]} />
        <mesh geometry={geo.hand}  material={mat.skin}  position={[0, -0.74, 0]} />
      </group>

      {/* LEFT ARM */}
      <group ref={lArmRef} position={[-0.41, 0.87, 0]}>
        <mesh geometry={geo.armUp} material={mat.shirt} position={[0, -0.18, 0]} />
        <mesh geometry={geo.armLo} material={mat.skin}  position={[0, -0.53, 0]} />
        <mesh geometry={geo.hand}  material={mat.skin}  position={[0, -0.74, 0]} />
      </group>

      {/* RIGHT LEG */}
      <group position={[0.17, 0.09, 0]}>
        <mesh geometry={geo.leg}  material={mat.pants} position={[0, -0.36, 0]}   />
        <mesh geometry={geo.shoe} material={mat.shoe}  position={[0, -0.77, 0.06]} />
      </group>

      {/* LEFT LEG */}
      <group position={[-0.17, 0.09, 0]}>
        <mesh geometry={geo.leg}  material={mat.pants} position={[0, -0.36, 0]}   />
        <mesh geometry={geo.shoe} material={mat.shoe}  position={[0, -0.77, 0.06]} />
      </group>
    </group>
  )
}
