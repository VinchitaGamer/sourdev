import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars, Text } from '@react-three/drei';

function GlowingCore({ isAbsorbing }) {
    const mesh = useRef();
    const cage = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Mouse Interaction (Parallax for Core)
        const x = (state.mouse.x * window.innerWidth) / 500;
        const y = (state.mouse.y * window.innerHeight) / 500;

        // Core Rotation & Movement
        mesh.current.rotation.x = time * 0.2 + y;
        mesh.current.rotation.y = time * 0.3 + x;

        // Cage Rotation (Opposite direction)
        cage.current.rotation.x = time * 0.1 - y;
        cage.current.rotation.y = time * 0.1 - x;

        // Absorb Effect
        const scale = isAbsorbing ? 0.1 : 2.5;
        mesh.current.scale.lerp({ x: scale, y: scale, z: scale }, 0.1);
        cage.current.scale.lerp({ x: scale * 1.5, y: scale * 1.5, z: scale * 1.5 }, 0.1);
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                {/* Inner Blob */}
                <mesh ref={mesh} position={[0, 0, 0]} scale={2.5}>
                    <icosahedronGeometry args={[1, 15]} />
                    <MeshDistortMaterial
                        color={isAbsorbing ? "#ec4899" : "#a3e635"}
                        envMapIntensity={1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        metalness={0.4}
                        distort={isAbsorbing ? 1.0 : 0.6} // More distortion
                        speed={isAbsorbing ? 10 : 3}
                        emissive={isAbsorbing ? "#ec4899" : "#a3e635"}
                        emissiveIntensity={0.6}
                    />
                </mesh>

                {/* Outer Wireframe Cage */}
                <mesh ref={cage} position={[0, 0, 0]} scale={3.5}>
                    <icosahedronGeometry args={[1, 2]} />
                    <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
                </mesh>
            </Float>
        </group>
    );
}

function TechRings({ isAbsorbing }) {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.z = t * 0.05;
        group.current.rotation.x = Math.sin(t * 0.2) * 0.2;

        // Parallax for Rings (Slightly different from core)
        group.current.position.x = state.mouse.x * 0.5;
        group.current.position.y = state.mouse.y * 0.5;

        if (isAbsorbing) {
            group.current.scale.lerp({ x: 0, y: 0, z: 0 }, 0.1);
        } else {
            group.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1);
        }
    });

    return (
        <group ref={group}>
            {/* Ring 1 */}
            <mesh rotation={[1.5, 0, 0]}>
                <torusGeometry args={[4.5, 0.02, 16, 100]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} opacity={0.2} transparent />
            </mesh>
            {/* Ring 2 */}
            <mesh rotation={[2, 0.5, 0]}>
                <torusGeometry args={[5.5, 0.02, 16, 100]} />
                <meshStandardMaterial color="#a3e635" emissive="#a3e635" emissiveIntensity={0.5} opacity={0.1} transparent />
            </mesh>
        </group>
    )
}

function FloatingParticles() {
    const stars = useRef();
    useFrame((state) => {
        // Parallax for Background (Opposite direction = depth)
        stars.current.rotation.x = state.mouse.y * 0.05;
        stars.current.rotation.y = state.mouse.x * 0.05;
    });
    return (
        <group ref={stars}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    )
}

const Scene3D = ({ isAbsorbing }) => {
    return (
        <div className="absolute inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ec4899" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#a3e635" />

                <FloatingParticles />
                <TechRings isAbsorbing={isAbsorbing} />
                <GlowingCore isAbsorbing={isAbsorbing} />
            </Canvas>
        </div>
    );
};

export default Scene3D;
