"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function DataSpheres() {
    const groupRef = useRef<THREE.Group>(null);

    const spheres = useMemo(() => {
        const sphereData = [];
        for (let i = 0; i < 20; i++) {
            sphereData.push({
                position: [
                    (Math.random() - 0.5) * 12,
                    (Math.random() - 0.5) * 12,
                    (Math.random() - 0.5) * 6,
                ] as [number, number, number],
                scale: 0.2 + Math.random() * 0.3,
                speed: 0.5 + Math.random() * 0.5,
            });
        }
        return sphereData;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {spheres.map((sphere, idx) => (
                <mesh key={idx} position={sphere.position} scale={sphere.scale}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshStandardMaterial
                        color="#7D5FFF"
                        emissive="#5F9FFF"
                        emissiveIntensity={0.4}
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

export function ResearchBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="#7D5FFF" />
                <pointLight position={[-5, -5, -5]} intensity={0.8} color="#00D4FF" />
                <DataSpheres />
            </Canvas>
        </div>
    );
}
