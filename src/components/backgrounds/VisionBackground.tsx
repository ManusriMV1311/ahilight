"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function SpiralPath() {
    const groupRef = useRef<THREE.Group>(null);

    const spiralPoints = useMemo(() => {
        const points = [];
        for (let i = 0; i < 100; i++) {
            const angle = (i / 100) * Math.PI * 4;
            const radius = 2 + (i / 100) * 2;
            points.push(
                new THREE.Vector3(
                    Math.cos(angle) * radius,
                    (i / 100) * 4 - 2,
                    Math.sin(angle) * radius
                )
            );
        }
        return points;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {spiralPoints.map((point, idx) => (
                <mesh key={idx} position={point}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshStandardMaterial
                        color="#7D5FFF"
                        emissive="#5F9FFF"
                        emissiveIntensity={0.5 + (idx / spiralPoints.length) * 0.5}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
            ))}
        </group>
    );
}

export function VisionBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#7D5FFF" />
                <pointLight position={[-5, -5, -5]} intensity={0.7} color="#00D4FF" />
                <SpiralPath />
            </Canvas>
        </div>
    );
}
