"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { Torus, Sphere, Octahedron, MeshDistortMaterial } from '@react-three/drei';

function CoreRing({ radius, speed, rotationAxis }: { radius: number, speed: number, rotationAxis: 'x' | 'y' | 'z' }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime * speed;
        if (rotationAxis === 'x') meshRef.current.rotation.x = time;
        if (rotationAxis === 'y') meshRef.current.rotation.y = time;
        if (rotationAxis === 'z') meshRef.current.rotation.z = time;
    });

    return (
        <Torus ref={meshRef} args={[radius, 0.05, 16, 100]}>
            <meshStandardMaterial
                color="#333"
                metalness={0.8}
                roughness={0.2}
                emissive="#991b1b"
                emissiveIntensity={0.2}
            />
        </Torus>
    );
}

function InnerCrystal() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;
        meshRef.current.rotation.x = time * 0.5;
        meshRef.current.rotation.y = time * 0.3;
    });

    return (
        <Octahedron ref={meshRef} args={[1, 0]}>
            <MeshDistortMaterial
                color="#ef4444"
                emissive="#ef4444"
                emissiveIntensity={2}
                distort={0.4}
                speed={2}
                metalness={0.5}
                roughness={0.2}
            />
        </Octahedron>
    );
}

function FloatingParticles() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: 20 }).map((_, i) => {
                const x = (Math.random() - 0.5) * 10;
                const y = (Math.random() - 0.5) * 10;
                const z = (Math.random() - 0.5) * 10;
                return (
                    <mesh key={i} position={[x, y, z]}>
                        <sphereGeometry args={[0.05, 8, 8]} />
                        <meshBasicMaterial color="#ef4444" />
                    </mesh>
                )
            })}
        </group>
    )
}

function QuantumCoreSystem() {
    return (
        <group scale={1.2}>
            {/* Central Crystal */}
            <InnerCrystal />

            {/* Rotating Rings */}
            <CoreRing radius={2} speed={0.4} rotationAxis="x" />
            <CoreRing radius={2.5} speed={0.3} rotationAxis="y" />
            <CoreRing radius={3} speed={0.2} rotationAxis="z" />

            {/* Outer structural ring (static-ish) */}
            <Torus args={[4, 0.02, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
                <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
            </Torus>

            <FloatingParticles />
        </group>
    );
}

export function QuantumCore() {
    return (
        <div className="fixed inset-0 -z-10 opacity-70">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#ef4444" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#b91c1c" />

                <QuantumCoreSystem />
            </Canvas>
        </div>
    );
}
