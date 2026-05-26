import { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import AvatarModel from './AvatarModel'

export default function AvatarCanvas() {
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = {
      x:  ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      y: -((e.clientY - rect.top)  / rect.height) * 2 + 1,
    }
  }

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseRef.current = { x: 0, y: 0 } }}
    >
      <Canvas
        camera={{ position: [0, 0.8, 2.7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        onCreated={({ camera }) => camera.lookAt(0, 0.3, 0)}
      >
        {/* PBR lighting for Avaturn's MeshStandardMaterial */}
        <ambientLight intensity={0.9} />
        {/* Key light — front right, warm */}
        <directionalLight position={[2, 4, 5]} intensity={2.2} color="#fff8f0" />
        {/* Fill light — front left, cool */}
        <directionalLight position={[-3, 1, 3]} intensity={0.8} color="#c8d8ff" />
        {/* Rim / back light */}
        <directionalLight position={[0, 2, -4]} intensity={0.4} color="#aaccff" />

        <Suspense fallback={null}>
          <AvatarModel mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
