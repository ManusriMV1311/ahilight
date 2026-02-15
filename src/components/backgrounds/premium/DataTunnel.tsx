"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function TunnelRing({ zOffset }: { zOffset: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const speed = 10;

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Move towards camera
        meshRef.current.position.z += delta * speed;

        // Loop
        if (meshRef.current.position.z > 5) {
            meshRef.current.position.z -= 40; // Reset far back
        }

        // Rotate slightly
        meshRef.current.rotation.z += delta * 0.2;
    });

    return (
        <mesh ref={meshRef} position={[0, 0, zOffset]} rotation={[0, 0, Math.random() * Math.PI]}>
            <ringGeometry args={[3, 3.5, 6]} /> {/* Hexagon shape-ish (6 segments) */}
            <meshBasicMaterial
                color="#ef4444"
                wireframe
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function TunnelParticles({ count = 200 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const speed = 20;

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 6; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 6; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 20; // z
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 2] += delta * speed;
            if (positions[i * 3 + 2] > 5) {
                positions[i * 3 + 2] -= 40;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#ef4444"
                size={0.05}
                transparent
                opacity={0.8}
            />
        </points>
    );
}

function TunnelSystem() {
    // creating a series of rings
    const rings = Array.from({ length: 20 }).map((_, i) => (
        <TunnelRing key={i} zOffset={-i * 2} />
    ));

    return (
        <group>
            {rings}
            <TunnelParticles />
        </group>
    );
}

export function DataTunnel() {
    return (
        <div className="fixed inset-0 -z-10 opacity-70">
            <Canvas
                camera={{ position: [0, 0, 0], fov: 75 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <TunnelSystem />
                <fog attach="fog" args={['#000000', 0, 20]} />
            </Canvas>
        </div>
    );
}
