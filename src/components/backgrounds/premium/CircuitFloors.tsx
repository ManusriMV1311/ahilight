"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Box } from '@react-three/drei';

function CircuitPlate({ position, scale, speed }: { position: [number, number, number], scale: [number, number, number], speed: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        // Slow drift upwards
        meshRef.current.position.y += delta * speed;

        // Reset if too high
        if (meshRef.current.position.y > 10) {
            meshRef.current.position.y = -10;
        }
    });

    return (
        <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
            <meshStandardMaterial
                color="#111"
                metalness={0.8}
                roughness={0.2}
                emissive="#220a0a"
                emissiveIntensity={0.5}
            />
            {/* Add a detail line/glow on the edge */}
            <mesh position={[0, 0.51, 0]} scale={[0.9, 0.01, 0.9]}>
                <boxGeometry />
                <meshBasicMaterial color="#450a0a" />
            </mesh>
        </Box>
    );
}

function CircuitSystem({ count = 15 }) {
    const plates = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const width = 2 + Math.random() * 4;
            const depth = 2 + Math.random() * 4;
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10 - 5; // Push back a bit
            const speed = 0.2 + Math.random() * 0.3;
            temp.push({ position: [x, y, z] as [number, number, number], scale: [width, 0.2, depth] as [number, number, number], speed });
        }
        return temp;
    }, [count]);

    return (
        <group rotation={[0.2, 0, 0]}> {/* Tilt the whole system slightly */}
            {plates.map((plate, i) => (
                <CircuitPlate key={i} {...plate} />
            ))}
        </group>
    );
}

export function CircuitFloors() {
    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[0, 10, 5]} intensity={1} color="#ef4444" />
                <fog attach="fog" args={['#000000', 5, 25]} />

                <CircuitSystem />
            </Canvas>
        </div>
    );
}
