"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { SharedUniverse } from "./common/SharedUniverse";
import { OrbitControls, Sphere } from '@react-three/drei';

function Satellite({ radius, speed, angle, color, size }: { radius: number, speed: number, angle: number, color: string, size: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime() * speed;
        // Orbit logic
        meshRef.current.position.x = Math.cos(t + angle) * radius;
        meshRef.current.position.z = Math.sin(t + angle) * radius;
        // Include some bobbing
        meshRef.current.position.y = Math.sin(t * 2 + angle) * 0.5;

        meshRef.current.rotation.y += 0.02;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} roughness={0.1} />
        </mesh>
    );
}

function OrbitPath({ radius, color }: { radius: number, color: string }) {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
            <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
    );
}

function CentralCore() {
    return (
        <group>
            {/* Core Sphere */}
            <Sphere args={[1.5, 32, 32]}>
                <meshStandardMaterial
                    color="#000000"
                    emissive="#3b82f6" // Electric Blue
                    emissiveIntensity={0.5}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Sphere>
            {/* Inner Glow */}
            <Sphere args={[1.2, 32, 32]}>
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.1} />
            </Sphere>
        </group>
    );
}

function SatellitesGroup() {
    // Generate random satellites
    const satellites = useMemo(() => {
        return new Array(8).fill(0).map((_, i) => ({
            radius: 3 + Math.random() * 4,
            speed: 0.2 + Math.random() * 0.3,
            angle: Math.random() * Math.PI * 2,
            color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7', // Cyan or Purple
            size: 0.08 + Math.random() * 0.1
        }));
    }, []);

    return (
        <group rotation={[0.2, 0, 0.1]}>
            <CentralCore />
            {satellites.map((sat, i) => (
                <group key={i}>
                    <OrbitPath radius={sat.radius} color={sat.color} />
                    <Satellite {...sat} />
                </group>
            ))}
        </group>
    );
}

export function CareersBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-deep-navy">
            <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <SharedUniverse />
                <SatellitesGroup />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-transparent to-deep-navy opacity-80" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>
    );
}
