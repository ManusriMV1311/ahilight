"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Float, MeshTransmissionMaterial, AccumulativeShadows, RandomizedLight, Environment } from '@react-three/drei';
import { SharedUniverse } from "./common/SharedUniverse";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Monolith({ position, delay, color = "#06b6d4" }: { position: [number, number, number], delay: number, color?: string }) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;

        // Very slow, majestic rotation
        meshRef.current.rotation.y = Math.sin(t * 0.2 + delay) * 0.1;
        meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + delay) * 0.2;
    });

    return (
        <group ref={meshRef} position={position}>
            {/* Outer Glass Shell */}
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[1.2, 4, 1.2]} />
                <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={0.5}
                    chromaticAberration={0.1}
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                    iridescence={1}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    roughness={0.1}
                    clearcoat={1}
                    color="#ffffff"
                />
            </mesh>

            {/* Inner Glowing Core */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.6, 3.2, 0.6]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 3 : 1.5}
                    toneMapped={false}
                    wireframe={true}
                />
            </mesh>

            {/* Solid Inner Core for volume */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.4, 3, 0.4]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </group>
    );
}

export function ProductsBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            {/* Simple dark background to keep text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>
    );
}
