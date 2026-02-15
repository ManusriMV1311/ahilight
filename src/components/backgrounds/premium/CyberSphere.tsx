"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { Sphere } from '@react-three/drei';

function GiantSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const innerRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.1;
            meshRef.current.rotation.z = time * 0.05;
        }
        if (innerRef.current) {
            innerRef.current.rotation.y = -time * 0.2;
            innerRef.current.rotation.x = time * 0.1;
        }
    });

    return (
        <group scale={1.5}>
            {/* Outer Wireframe Sphere */}
            <Sphere ref={meshRef} args={[4, 32, 32]}>
                <meshStandardMaterial
                    color="#ef4444"
                    wireframe
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                />
            </Sphere>

            {/* Inner Glowing Core */}
            <Sphere ref={innerRef} args={[2, 16, 16]}>
                <meshStandardMaterial
                    color="#000000" // Black body
                    emissive="#b91c1c" // Dark red glow
                    emissiveIntensity={0.5}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Sphere>

            {/* Floating Particles around sphere handled by Points if needed, but simple is better here */}
        </group>
    );
}

export function CyberSphere() {
    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ef4444" />
                <GiantSphere />
            </Canvas>
        </div>
    );
}
