"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ConstellationDots() {
    const groupRef = useRef<THREE.Group>(null);

    const dots = useMemo(() => {
        const dotData = [];
        for (let i = 0; i < 50; i++) {
            dotData.push({
                position: [
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 8,
                ] as [number, number, number],
                scale: 0.1 + Math.random() * 0.15,
            });
        }
        return dotData;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {dots.map((dot, idx) => (
                <mesh key={idx} position={dot.position} scale={dot.scale}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial
                        color="#7D5FFF"
                        emissive="#5F9FFF"
                        emissiveIntensity={0.6}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            ))}
        </group>
    );
}

export function AboutBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.3} />
                <pointLight position={[8, 8, 8]} intensity={1} color="#7D5FFF" />
                <pointLight position={[-8, -8, -8]} intensity={0.6} color="#00D4FF" />
                <ConstellationDots />
            </Canvas>
        </div>
    );
}
