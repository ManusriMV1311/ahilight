"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { SharedUniverse } from "./common/SharedUniverse";

function GrowingTree() {
    const groupRef = useRef<THREE.Group>(null);

    // Simple recursive branching structure simulated with instances or lines
    // For performance and style, let's use rising vertical lines with nodes

    const lines = useMemo(() => {
        return new Array(50).fill(0).map(() => ({
            position: [(Math.random() - 0.5) * 15, -5, (Math.random() - 0.5) * 5] as [number, number, number],
            height: 5 + Math.random() * 10,
            speed: Math.random() * 0.05 + 0.01,
            color: Math.random() > 0.5 ? '#10b981' : '#3b82f6' // Green/Blue
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        // Subtle swaying
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    });

    return (
        <group ref={groupRef}>
            {lines.map((line, i) => (
                <group key={i} position={line.position}>
                    {/* Stem */}
                    <mesh position={[0, line.height / 2, 0]}>
                        <cylinderGeometry args={[0.02, 0.05, line.height, 4]} />
                        <meshBasicMaterial color={line.color} transparent opacity={0.6} />
                    </mesh>
                    {/* Node on top */}
                    <mesh position={[0, line.height, 0]}>
                        <sphereGeometry args={[0.1, 8, 8]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                    {/* Pulse Ring */}
                    <PulseRing y={line.height} color={line.color} speed={line.speed * 20} />
                </group>
            ))}
        </group>
    );
}

function PulseRing({ y, color, speed }: { y: number, color: string, speed: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!meshRef.current) return;
        const scale = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.5;
        meshRef.current.scale.set(scale, scale, scale);
        meshRef.current.rotation.x += 0.01;
    });
    return (
        <mesh ref={meshRef} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.25, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
    )
}

export function CareersBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <SharedUniverse />
                <GrowingTree />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
    );
}
