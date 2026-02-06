"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import { SharedUniverse } from "./common/SharedUniverse";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

function QuantumField() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 2000;

    // Create initial positions
    const [data, setData] = useState<{ pos: Float32Array, colors: Float32Array } | null>(null);

    useEffect(() => {
        const pos = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Spread across a wide area
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

            // Varied blue/purple/cyan colors
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.5); // Blue to Purple
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        setData({ pos, colors });
    }, []);

    const positions = data || { pos: new Float32Array(count * 3), colors: new Float32Array(count * 3) };

    useFrame((state) => {
        if (!pointsRef.current) return;
        const time = state.clock.getElapsedTime() * 0.2;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];
            const z = positions[i * 3 + 2];

            // Flow field movement using noise
            // We gently push particles based on their position in the noise field
            const noiseVal = noise3D(x * 0.1, y * 0.1, time);

            positions[i * 3] += Math.sin(noiseVal) * 0.02; // Move X
            positions[i * 3 + 1] += Math.cos(noiseVal) * 0.02; // Move Y

            // Reset if out of bounds to create infinite loop impression
            if (positions[i * 3] > 10) positions[i * 3] = -10;
            if (positions[i * 3] < -10) positions[i * 3] = 10;
            if (positions[i * 3 + 1] > 6) positions[i * 3 + 1] = -6;
            if (positions[i * 3 + 1] < -6) positions[i * 3 + 1] = 6;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions.pos, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[positions.colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export function ResearchBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: false }}>
                <SharedUniverse />

                <QuantumField />

                {/* Additional Sparkles for depth */}
                <Sparkles
                    count={500}
                    scale={20}
                    size={2}
                    speed={0.4}
                    opacity={0.5}
                    color="#00ffff"
                />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-[#02020a] via-transparent to-[#02020a]/80" />
        </div>
    );
}
