
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

function GlowingCore({ isAbsorbing, mouse }) {
    const mesh = useRef();
    const cage = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Mouse Interaction (Global Mouse Ref)
        // Use the ref passed from parent instead of state.mouse
        const mx = mouse.current.x;
        const my = mouse.current.y;

        const x = (mx * window.innerWidth) / 500;
        const y = (my * window.innerHeight) / 500;

        // Core Rotation & Movement with Lerp (Dampening)
        const targetX = (mx * window.innerWidth) / 1000; // Slower movement divisor
        const targetY = (my * window.innerHeight) / 1000;

        // Dampen rotation
        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, time * 0.2 + targetY, 0.05);
        mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, time * 0.3 + targetX, 0.05);

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

function TechRings({ isAbsorbing, mouse }) {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.z = t * 0.05;
        group.current.rotation.x = Math.sin(t * 0.2) * 0.2;

        // Parallax for Rings (Use global mouse) with Lerp
        const mx = mouse.current.x;
        const my = mouse.current.y;

        // Current positions
        const currentX = group.current.position.x;
        const currentY = group.current.position.y;

        // Smoothly interpolate to target (mx * 0.5)
        group.current.position.x = THREE.MathUtils.lerp(currentX, mx * 0.5, 0.05);
        group.current.position.y = THREE.MathUtils.lerp(currentY, my * 0.5, 0.05);

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

function FloatingParticles({ mouse }) {
    const stars = useRef();
    useFrame((state) => {
        // Parallax for Background
        const mx = mouse.current.x;
        const my = mouse.current.y;

        stars.current.rotation.x = THREE.MathUtils.lerp(stars.current.rotation.x, my * 0.05, 0.02); // Very subtle
        stars.current.rotation.y = THREE.MathUtils.lerp(stars.current.rotation.y, mx * 0.05, 0.02);
    });
    return (
        <group ref={stars}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    )
}

const Scene3D = ({ isAbsorbing }) => {
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Normalize mouse position (-1 to 1) manually
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ec4899" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#a3e635" />

                <FloatingParticles mouse={mouse} />
                <TechRings isAbsorbing={isAbsorbing} mouse={mouse} />
                <GlowingCore isAbsorbing={isAbsorbing} mouse={mouse} />
            </Canvas>
        </div>
    );
};

export default Scene3D;
