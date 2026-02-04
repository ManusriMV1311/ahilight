"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingCubes() {
    const groupRef = useRef<THREE.Group>(null);

    const cubes = useMemo(() => {
        const cubeData = [];
        for (let i = 0; i < 15; i++) {
            cubeData.push({
                position: [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 5,
                ] as [number, number, number],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
                scale: 0.3 + Math.random() * 0.5,
            });
        }
        return cubeData;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {cubes.map((cube, idx) => (
                <mesh key={idx} position={cube.position} rotation={cube.rotation} scale={cube.scale}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="#7D5FFF"
                        emissive="#5F9FFF"
                        emissiveIntensity={0.3}
                        metalness={0.8}
                        roughness={0.2}
                        wireframe
                    />
                </mesh>
            ))}
        </group>
    );
}

export function TechnologyBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#7D5FFF" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />
                <FloatingCubes />
            </Canvas>
        </div>
    );
}
