import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export interface SkillData { name: string; category: string; color: string }

function spherePositions(n: number, r: number): [number, number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const phi   = Math.acos(1 - 2 * (i + 0.5) / n)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    return [r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)]
  })
}

function SceneFog() {
  const { scene } = useThree()
  useMemo(() => { scene.fog = new THREE.Fog('#101319', 5, 12) }, [scene])
  return null
}

interface OrbProps {
  position: [number, number, number]
  color: string
  name: string
  isSelected: boolean
  onToggle: () => void
  onHoverIn: () => void
  onHoverOut: () => void
}

function Orb({ position, color, name, isSelected, onToggle, onHoverIn, onHoverOut }: OrbProps) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const showLabel = hovered || isSelected

  const gradientMap = useMemo(() => {
    const d = new Uint8Array([80, 150, 210, 255])
    const t = new THREE.DataTexture(d, 4, 1, THREE.RedFormat)
    t.needsUpdate = true
    return t
  }, [])

  const mat = useMemo(
    () => new THREE.MeshToonMaterial({ color, gradientMap }),
    [color, gradientMap],
  )

  useFrame((_, dt) => {
    if (!meshRef.current) return
    const target = showLabel ? 1.5 : 1
    const cur    = meshRef.current.scale.x
    meshRef.current.scale.setScalar(cur + (target - cur) * (1 - Math.pow(0.02, dt)))
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={e => {
        e.stopPropagation()
        // hover only on mouse — touch uses tap instead
        if (e.pointerType === 'mouse') { setHovered(true); onHoverIn() }
      }}
      onPointerOut={e => {
        if (e.pointerType === 'mouse') { setHovered(false); onHoverOut() }
      }}
      onClick={e => { e.stopPropagation(); onToggle() }}
    >
      <sphereGeometry args={[0.12, 12, 8]} />
      <primitive object={mat} attach="material" />

      {showLabel && <pointLight intensity={1.5} distance={1.5} color={color} />}

      {showLabel && (
        <Html center distanceFactor={7} zIndexRange={[100, 0]}>
          <div
            style={{
              background: '#1d2025ee',
              border: `1px solid ${color}66`,
              color: '#e1e2ea',
              padding: '3px 10px',
              borderRadius: 4,
              fontSize: 10,
              fontFamily: '"Space Mono", monospace',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: `0 0 8px ${color}35`,
            }}
          >
            {name}
          </div>
        </Html>
      )}
    </mesh>
  )
}

interface SceneProps {
  skills: SkillData[]
  selectedName: string | null
  onSelect: (name: string | null) => void
}

function OrbScene({ skills, selectedName, onSelect }: SceneProps) {
  const groupRef   = useRef<THREE.Group>(null)
  const anyHovered = useRef(false)
  const positions  = useMemo(() => spherePositions(skills.length, 2.5), [skills.length])

  useFrame(() => {
    if (groupRef.current && !anyHovered.current) {
      groupRef.current.rotation.y += 0.004
    }
  })

  return (
    <>
      <SceneFog />
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.05} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]}  intensity={1.0} />
      <directionalLight position={[-3, -2, -4]} intensity={0.22} color="#4488ff" />

      <group ref={groupRef}>
        {skills.map((s, i) => (
          <Orb
            key={s.name}
            position={positions[i]}
            color={s.color}
            name={s.name}
            isSelected={selectedName === s.name}
            onToggle={() => onSelect(selectedName === s.name ? null : s.name)}
            onHoverIn={() => { anyHovered.current = true }}
            onHoverOut={() => { anyHovered.current = false }}
          />
        ))}
      </group>
    </>
  )
}

export default function SkillOrbs3D({ skills }: { skills: SkillData[] }) {
  const [selectedName, setSelectedName] = useState<string | null>(null)

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
      // Tap on empty space clears the selection
      onPointerMissed={() => setSelectedName(null)}
    >
      <OrbScene
        skills={skills}
        selectedName={selectedName}
        onSelect={setSelectedName}
      />
    </Canvas>
  )
}
