import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Points, PointMaterial, Line, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function Particles({ count = 1200, radius = 2.6 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(radius * Math.cbrt(Math.random()))
      pos.set([v.x, v.y, v.z], i * 3)
    }
    return pos
  }, [count, radius])
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.05 })
  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial transparent color="#b6ff00" size={0.01} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  )
}

function Connections({ segments = 160, radius = 2.6 }) {
  const ref = useRef()
  const lines = useMemo(() => {
    const arr = []
    for (let i = 0; i < segments; i++) {
      const a1 = Math.random() * Math.PI * 2
      const a2 = Math.random() * Math.PI * 2
      const v1 = new THREE.Vector3().setFromSphericalCoords(radius, Math.random() * Math.PI, a1)
      const v2 = new THREE.Vector3().setFromSphericalCoords(radius, Math.random() * Math.PI, a2)
      arr.push([v1, v2])
    }
    return arr
  }, [segments, radius])
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y -= d * 0.02 })
  return (
    <group ref={ref}>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color="#d0ff30" lineWidth={0.75} transparent opacity={0.12} />
      ))}
    </group>
  )
}

function Scene() {
  const group = useRef()
  const { pointer } = useThree()
  useFrame(() => {
    if (!group.current) return
    const targetX = pointer.x * 0.6
    const targetY = -pointer.y * 0.4
    group.current.rotation.y += (targetX - group.current.rotation.y) * 0.05
    group.current.rotation.x += (targetY - group.current.rotation.x) * 0.05
  })
  return (
    <group ref={group}>
      <Float speed={1} rotationIntensity={0.25} floatIntensity={0.25}>
        <Particles />
        <Connections />
      </Float>
      <Sparkles count={120} scale={7} size={1} color="#b6ff00" speed={0.4} />
    </group>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true }} style={{ position: 'absolute', inset: 0 }}>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color={'#d0ff30'} />
      <Scene />
    </Canvas>
  )
}
