"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Stars, Cloud } from '@react-three/drei';
import { SharedUniverse } from "./common/SharedUniverse";

function Rays() {
    const groupRef = useRef<THREE.Group>(null);

    const rays = useMemo(() => {
        return new Array(20).fill(0).map(() => ({
            scale: [0.1 + Math.random() * 0.5, 0.1, 10 + Math.random() * 20] as [number, number, number],
            position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, -10] as [number, number, number],
            speed: Math.random() * 0.2
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        // Move towards camera
        groupRef.current.position.z += 0.05;
        if (groupRef.current.position.z > 20) groupRef.current.position.z = 0;
    });

    return (
        <group ref={groupRef}>
            {rays.map((ray, i) => (
                <mesh key={i} position={ray.position} scale={ray.scale}>
                    <boxGeometry />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
}

function Sun() {
    return (
        <mesh position={[0, 0, -50]}>
            <sphereGeometry args={[10, 32, 32]} />
            <meshBasicMaterial color="#fbbf24" /> {/* Amber sun */}
            <pointLight intensity={2} distance={100} color="#fbbf24" />
        </mesh>
    )
}

export function VisionBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <SharedUniverse />
                <Sun />
                <Rays />
                <Cloud opacity={0.5} speed={0.4} segments={20} bounds={[10, 1.5, 1]} position={[0, -5, -10]} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
    );
}
