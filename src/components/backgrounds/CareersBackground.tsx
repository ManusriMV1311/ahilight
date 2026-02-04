"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function OrbitingRings() {
    const groupRef = useRef<THREE.Group>(null);

    const rings = useMemo(() => {
        return [
            { radius: 2, rotation: [Math.PI / 2, 0, 0], speed: 0.3 },
            { radius: 2.5, rotation: [0, Math.PI / 3, 0], speed: -0.2 },
            { radius: 3, rotation: [Math.PI / 4, Math.PI / 4, 0], speed: 0.25 },
        ];
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Only animate the ring meshes (first 3 children), not the center sphere
            groupRef.current.children.slice(0, 3).forEach((child, idx) => {
                child.rotation.y += rings[idx].speed * 0.01;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {rings.map((ring, idx) => (
                <mesh key={idx} rotation={ring.rotation as [number, number, number]}>
                    <torusGeometry args={[ring.radius, 0.05, 16, 100]} />
                    <meshStandardMaterial
                        color="#7D5FFF"
                        emissive="#5F9FFF"
                        emissiveIntensity={0.5}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            ))}
            {/* Center sphere */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#00D4FF"
                    emissive="#00D4FF"
                    emissiveIntensity={0.6}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
}

export function CareersBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#7D5FFF" />
                <pointLight position={[-10, -10, -10]} intensity={0.6} color="#00D4FF" />
                <OrbitingRings />
            </Canvas>
        </div>
    );
}
