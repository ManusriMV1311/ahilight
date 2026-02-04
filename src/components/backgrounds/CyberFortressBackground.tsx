"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function HexagonalShield() {
    const groupRef = useRef<THREE.Group>(null);

    // Create hexagonal grid
    const hexagons = useMemo(() => {
        const hexes = [];
        const radius = 0.5;
        const rows = 8;
        const cols = 8;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * radius * 1.5 - (cols * radius * 1.5) / 2;
                const y = row * radius * 1.3 - (rows * radius * 1.3) / 2;
                const z = Math.random() * 0.5;

                hexes.push({
                    position: [x, y, z] as [number, number, number],
                    phase: Math.random() * Math.PI * 2,
                });
            }
        }

        return hexes;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            {hexagons.map((hex, idx) => (
                <mesh key={idx} position={hex.position}>
                    <cylinderGeometry args={[0.4, 0.4, 0.05, 6]} />
                    <meshStandardMaterial
                        color="#7D5FFF"
                        emissive="#5F9FFF"
                        emissiveIntensity={0.5 + Math.sin(hex.phase + idx * 0.1) * 0.3}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            ))}
        </group>
    );
}

export function CyberFortressBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.3} />
                <pointLight position={[0, 0, 5]} intensity={2} color="#7D5FFF" />
                <HexagonalShield />
            </Canvas>
        </div>
    );
}
