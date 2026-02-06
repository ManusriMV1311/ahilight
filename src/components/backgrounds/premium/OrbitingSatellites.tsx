"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface OrbitingObjectProps {
    orbitRadius: number;
    orbitSpeed: number;
    orbitTilt: number;
    size: number;
    shape: 'box' | 'sphere' | 'torus';
    color: string;
}

function OrbitingObject({
    orbitRadius,
    orbitSpeed,
    orbitTilt,
    size,
    shape,
    color
}: OrbitingObjectProps) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!groupRef.current || !meshRef.current) return;

        // Orbit around center
        const time = state.clock.elapsedTime * orbitSpeed;
        groupRef.current.position.x = Math.cos(time) * orbitRadius;
        groupRef.current.position.z = Math.sin(time) * orbitRadius;
        groupRef.current.position.y = Math.sin(time * 0.5) * (orbitRadius * 0.2);

        // Self-rotation
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    const ShapeComponent = {
        box: Box,
        sphere: Sphere,
        torus: Torus,
    }[shape];

    return (
        <group
            ref={groupRef}
            rotation={[orbitTilt, 0, 0]}
        >
            <ShapeComponent
                ref={meshRef}
                args={shape === 'torus' ? [size, size * 0.3, 16, 32] : [size, 32, 32]}
            >
                <MeshDistortMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    distort={0.2}
                    speed={1}
                    metalness={0.8}
                    roughness={0.2}
                />
            </ShapeComponent>
        </group>
    );
}

function SatelliteSystem() {
    const satellites: OrbitingObjectProps[] = [
        { orbitRadius: 3, orbitSpeed: 0.5, orbitTilt: 0.2, size: 0.4, shape: 'box', color: '#00d4ff' },
        { orbitRadius: 5, orbitSpeed: 0.3, orbitTilt: -0.3, size: 0.5, shape: 'sphere', color: '#6366f1' },
        { orbitRadius: 4, orbitSpeed: 0.4, orbitTilt: 0.1, size: 0.3, shape: 'torus', color: '#8b5cf6' },
        { orbitRadius: 6, orbitSpeed: 0.25, orbitTilt: -0.15, size: 0.35, shape: 'box', color: '#00f5d4' },
        { orbitRadius: 4.5, orbitSpeed: 0.35, orbitTilt: 0.25, size: 0.45, shape: 'sphere', color: '#ec4899' },
    ];

    return (
        <>
            {/* Central core */}
            <Sphere args={[0.8, 32, 32]}>
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#00d4ff"
                    emissiveIntensity={0.8}
                    metalness={0.9}
                    roughness={0.1}
                />
            </Sphere>

            {/* Orbiting satellites */}
            {satellites.map((sat, idx) => (
                <OrbitingObject key={idx} {...sat} />
            ))}

            {/* Orbit rings (visual guides) */}
            {[3, 4, 5, 6].map((radius) => (
                <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
                    <meshBasicMaterial
                        color="#6366f1"
                        transparent
                        opacity={0.1}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </>
    );
}

export function OrbitingSatellites() {
    return (
        <div className="absolute inset-0 -z-10 opacity-35">
            <Canvas
                camera={{ position: [8, 6, 8], fov: 50 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#0a0a1e']} />
                <ambientLight intensity={0.3} />
                <pointLight position={[0, 0, 0]} intensity={2} color="#00d4ff" />
                <SatelliteSystem />
            </Canvas>
        </div>
    );
}
