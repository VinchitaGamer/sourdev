import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars, Text } from '@react-three/drei';

function GlowingCore({ isAbsorbing }) {
    const mesh = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Mouse Interaction
        // Smoothly interpolate current rotation to mouse position
        const x = (state.mouse.x * window.innerWidth) / 500;
        const y = (state.mouse.y * window.innerHeight) / 500;

        mesh.current.rotation.x = time * 0.2 + y;
        mesh.current.rotation.y = time * 0.3 + x;

        // Absorb Effect (Rapid scale change if absorbing)
        const scale = isAbsorbing ? 0.1 : 2.5;
        mesh.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={mesh} position={[0, 0, 0]} scale={2.5}>
                <icosahedronGeometry args={[1, 15]} />
                <MeshDistortMaterial
                    color={isAbsorbing ? "#ec4899" : "#a3e635"} // Change color on absorb
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.1}
                    distort={isAbsorbing ? 1.0 : 0.4} // High distortion on absorb
                    speed={isAbsorbing ? 10 : 2}
                    emissive={isAbsorbing ? "#ec4899" : "#a3e635"}
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
