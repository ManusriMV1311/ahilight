"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Instances, Instance, Float } from "@react-three/drei";
import { SharedUniverse } from "./common/SharedUniverse";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

function HyperplaneCity() {
    const count = 20; // grid size
    const size = 0.5;
    const gap = 1.0;

    // Animate the instances individually
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Here we would ideally animate instances in a shader or by updating the matrix
        // But for simplicity with 'Instances', we can just float the container or use a simpler effect
        if (meshRef.current) {
            meshRef.current.position.z = (time * 2) % (gap * count);
        }
    });

    return (
        <group rotation={[Math.PI / 4, Math.PI / 4, 0]} position={[0, -10, 0]}>
            {/* We create a grid of tall pillars */}
            <Instances range={1000}>
                <boxGeometry args={[size, 10, size]} />
                <meshStandardMaterial
                    color="#1e1b4b"
                    emissive="#4338ca"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                />

                {Array.from({ length: count }).map((_, x) => (
                    Array.from({ length: count }).map((_, z) => {
                        const y = noise2D(x * 0.1, z * 0.1) * 5;
                        return (
                            <Instance
                                key={`${x}-${z}`}
                                position={[
                                    (x - count / 2) * gap,
                                    y,
                                    (z - count / 2) * gap
                                ]}
                                color={Math.random() > 0.9 ? "#00ffff" : undefined}
                            />
                        )
                    })
                ))}
            </Instances>
        </group>
    );
}

// Easier alternative: A flowing grid of lines and data blocks
function CircuitStream() {
    return (
        <group rotation={[Math.PI / 6, 0, 0]}>
            <Float speed={2} rotationIntensity={0} floatIntensity={0}>
                {Array.from({ length: 40 }).map((_, i) => (
                    <mesh key={i} position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}>
                        <boxGeometry args={[Math.random() * 4 + 1, 0.1, 0.1]} />
                        <meshBasicMaterial color={Math.random() > 0.5 ? "#00ffff" : "#7D5FFF"} transparent opacity={0.6} />
                    </mesh>
                ))}
            </Float>
        </group>
    )
}


export function TechnologyBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ antialias: false }}>
                <SharedUniverse />
                <fog attach="fog" args={['#02020a', 5, 30]} />

                <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
                    <HyperplaneCity />
                </Float>

                <CircuitStream />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-[#02020a] via-transparent to-[#02020a]/80" />
        </div>
    );
}
