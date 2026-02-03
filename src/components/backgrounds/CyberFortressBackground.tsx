"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function DigitalDome() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        // Rotate the dome
        meshRef.current.rotation.y = t * 0.05;
    });

    return (
        <Sphere ref={meshRef} args={[3, 64, 64]}>
            {/* Wireframe effect */}
            <meshBasicMaterial
                color="#22d3ee" // Cyan
                wireframe
                transparent
                opacity={0.15}
            />
        </Sphere>
    );
}

function InnerCore() {
    return (
        <Sphere args={[2.8, 32, 32]}>
            <MeshDistortMaterial
                color="#0f172a"
                attach="material"
                distort={0.3} // Amount of distortion
                speed={2} // Speed of distortion
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    )
}

export function CyberFortressBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-slate-950">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#4f46e5" />

                <group>
                    <DigitalDome />
                    <InnerCore />
                </group>

                {/* Floating particles/info bits could be added here */}
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        </div>
    );
}
