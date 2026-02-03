"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";

function Core() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // Slow rotation
        meshRef.current.rotation.y = t * 0.1;
        meshRef.current.rotation.z = t * 0.05;

        // "Breathing" scale - subtle expansion and contraction
        const scale = 1 + Math.sin(t * 0.5) * 0.05;
        meshRef.current.scale.set(scale, scale, scale);
    });

    return (
        <group>
            {/* Outer Glass Shell */}
            <mesh ref={meshRef}>
                <dodecahedronGeometry args={[2.5, 0]} />
                <meshPhysicalMaterial
                    roughness={0}
                    transmission={0.9} // Glass-like
                    thickness={2} // Refraction
                    color="#001a2c" // Dark blue tint
                    ior={1.5}
                    reflectivity={0.9}
                    metalness={0.1}
                />
            </mesh>

            {/* Inner "Circuits" / Glowing Core */}
            <mesh scale={[1.5, 1.5, 1.5]}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

export function HomeBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <color attach="background" args={["#000000"]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <Core />
                </Float>

                <Environment preset="city" />
            </Canvas>
            {/* Subtle overlay to ensure text readability if needed */}
            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
}
