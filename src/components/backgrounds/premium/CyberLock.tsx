"use client";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Torus, Html } from '@react-three/drei';

function StatusText() {
    return (
        <group position={[0, 0, 0]}>
            <Html center transform sprite distanceFactor={10} position={[0, 0, 0]}>
                <div className="flex flex-col items-center justify-center pointer-events-none select-none text-center transform -translate-x-1/2 -translate-y-1/2 w-48">
                    <h3 className="text-red-600 font-mono font-bold text-lg tracking-widest animate-pulse whitespace-nowrap">
                        SECURE INSTANCE
                    </h3>
                    <p className="text-red-500 font-mono text-xs opacity-80 mt-1 uppercase tracking-wider">
                        System Locked
                    </p>
                </div>
            </Html>
        </group>
    )
}

function LockRing({ radius, width, thickness, speed, axis = 'z', segments = 64 }: { radius: number; width: number; thickness: number; speed: number; axis?: 'x' | 'y' | 'z'; segments?: number }) {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (mesh.current) {
            if (axis === 'z') mesh.current.rotation.z += delta * speed;
            else if (axis === 'x') mesh.current.rotation.x += delta * speed;
            else if (axis === 'y') mesh.current.rotation.y += delta * speed;
        }
    });

    return (
        <mesh ref={mesh}>
            <torusGeometry args={[radius, width, thickness, segments]} />
            <meshStandardMaterial color="#ef4444" wireframe={true} transparent opacity={0.3} />
        </mesh>
    );
}

function LockTeeth({ radius, count, speed }: { radius: number; count: number; speed: number }) {
    const group = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.z += delta * speed;
        }
    });

    const teeth = useMemo(() => {
        return new Array(count).fill(0).map((_, i) => {
            const angle = (i / count) * Math.PI * 2;
            return (
                <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]} rotation={[0, 0, angle]}>
                    <boxGeometry args={[0.4, 0.2, 0.1]} />
                    <meshBasicMaterial color="#ef4444" transparent opacity={0.6} />
                </mesh>
            );
        });
    }, [count, radius]);

    return <group ref={group}>{teeth}</group>;
}


function CyberLockSystem() {
    const groupRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();

    useFrame(() => {
        if (groupRef.current) {
            // Subtle slight tilt following mouse
            const x = (mouse.x * viewport.width) / 50;
            const y = (mouse.y * viewport.height) / 50;
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            <StatusText />

            {/* Core Sphere */}
            <mesh>
                <sphereGeometry args={[0.95, 32, 32]} />
                <meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.05} />
            </mesh>

            {/* Inner Ring */}
            <LockRing radius={2} width={0.1} thickness={16} speed={0.5} axis="z" segments={64} />
            <LockTeeth radius={2} count={8} speed={0.5} />

            {/* Mid Ring */}
            <LockRing radius={3.5} width={0.2} thickness={16} speed={-0.3} axis="z" segments={6} /> {/* Hex shape */}
            <LockTeeth radius={3.5} count={16} speed={-0.3} />

            {/* Outer Ring */}
            <LockRing radius={5} width={0.05} thickness={16} speed={0.1} axis="z" segments={100} />
            <LockRing radius={5.2} width={0.05} thickness={16} speed={0.1} axis="z" segments={100} />

            {/* Off-axis ring for depth */}
            <group rotation={[0.5, 0.5, 0]}>
                <LockRing radius={6} width={0.02} thickness={16} speed={0.2} axis="x" segments={100} />
            </group>
        </group>
    );
}

export function CyberLock() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 50 }}
                gl={{ alpha: false, antialias: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[5, 10, 10]} intensity={1} color="#ef4444" />
                <pointLight position={[-5, -10, 5]} intensity={0.5} color="#fff" />

                <CyberLockSystem />
            </Canvas>
        </div>
    );
}
