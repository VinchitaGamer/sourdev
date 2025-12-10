import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars, Text } from '@react-three/drei';

function GlowingCore() {
    const mesh = useRef();

    useFrame((state) => {
        mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={mesh} position={[0, 0, 0]} scale={2.5}>
                <icosahedronGeometry args={[1, 15]} /> {/* High detail for smoothness */}
                <MeshDistortMaterial
                    color="#a3e635" // Lime/Neon Green
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.1}
                    distort={0.4}
                    speed={2}
                    emissive="#a3e635"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
}

function FloatingParticles() {
    return (
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    )
}

const Scene3D = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ec4899" /> {/* Pink Ambient */}
                <pointLight position={[-10, -10, -10]} intensity={1} color="#a3e635" /> {/* Green Ambient */}
                <FloatingParticles />
                <GlowingCore />
            </Canvas>
        </div>
    );
};

export default Scene3D;
