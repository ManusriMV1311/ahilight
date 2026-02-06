"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Instances, Instance, Float } from "@react-three/drei";
import { SharedUniverse } from "./common/SharedUniverse";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

function HyperplaneCity() {
    const count = 20; // grid size
    const size = 0.5;
    const gap = 1.0;

    // Animate the instances individually
    const [cityLayout, setCityLayout] = useState<{ x: number, z: number, y: number, color?: string }[]>([]);

    useEffect(() => {
        const layout = [];
        for (let x = 0; x < count; x++) {
            for (let z = 0; z < count; z++) {
                const y = noise2D(x * 0.1, z * 0.1) * 5;
                layout.push({
                    x, z, y,
                    color: Math.random() > 0.9 ? "#00ffff" : undefined
                });
            }
        }
        setCityLayout(layout);
    }, []);

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

                {cityLayout.map((item, i) => (
                    <Instance
                        key={i}
                        position={[
                            (item.x - count / 2) * gap,
                            item.y,
                            (item.z - count / 2) * gap
                        ]}
                        color={item.color}
                    />
                ))}
            </Instances>
        </group>
    );
}

// Easier alternative: A flowing grid of lines and data blocks
function CircuitStream() {
    const [blocks, setBlocks] = useState<{ position: [number, number, number], size: number, color: string }[]>([]);

    useEffect(() => {
        setBlocks(Array.from({ length: 40 }).map(() => ({
            position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] as [number, number, number],
            size: Math.random() * 4 + 1,
            color: Math.random() > 0.5 ? "#00ffff" : "#7D5FFF"
        })));
    }, []);

    return (
        <group rotation={[Math.PI / 6, 0, 0]}>
            <Float speed={2} rotationIntensity={0} floatIntensity={0}>
                {blocks.map((block, i) => (
                    <mesh key={i} position={block.position}>
                        <boxGeometry args={[block.size, 0.1, 0.1]} />
                        <meshBasicMaterial color={block.color} transparent opacity={0.6} />
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
