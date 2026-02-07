"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

function DNAStrands() {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate DNA double helix points
    const { positions, colors } = useMemo(() => {
        const count = 4000; // Number of particles
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Create two intertwined helices
            const t = (i / count) * 40; // Length of strand
            const helixRadius = 3;
            const strandOffset = (i % 2 === 0) ? 0 : Math.PI; // Offset for second strand

            // Helix equation
            const x = Math.cos(t * 0.5 + strandOffset) * helixRadius;
            const y = (t - 20) * 0.8; // Vertical spread
            const z = Math.sin(t * 0.5 + strandOffset) * helixRadius;

            // Add some noise/scatter
            const noise = 0.3;
            positions[i * 3] = x + (Math.random() - 0.5) * noise;
            positions[i * 3 + 1] = y + (Math.random() - 0.5) * noise;
            positions[i * 3 + 2] = z + (Math.random() - 0.5) * noise + (Math.random() - 0.5) * 10; // Depth spread

            // Color gradient: Cyan/Blue (Research theme)
            // Mix between cyan (0, 1, 1) and deep purple (0.5, 0, 1)
            const mix = Math.random();
            colors[i * 3] = 0.2 * mix;     // R
            colors[i * 3 + 1] = 0.8 + 0.2 * mix; // G
            colors[i * 3 + 2] = 1.0;       // B
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Slow rotation
        pointsRef.current.rotation.y += 0.001;
        pointsRef.current.rotation.z += 0.0005;

        // Gentle wave motion
        const time = state.clock.getElapsedTime();
        pointsRef.current.position.y = Math.sin(time * 0.2) * 0.5;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                vertexColors
                size={0.08}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function FloatingParticles() {
    const ref = useRef<THREE.Points>(null);
    const count = 1000;

    const [positions] = useState(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return pos;
    });

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x -= 0.0002;
            ref.current.rotation.y -= 0.0002;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#4f46e5"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </points>
    )
}

function Rig() {
    return useFrame((state) => {
        state.camera.position.lerp({ x: state.pointer.x * 2, y: state.pointer.y * 2, z: 15 }, 0.02)
        state.camera.lookAt(0, 0, 0)
    })
}

import { useState } from 'react';

export function ResearchDNABackground() {
    return (
        <div className="fixed inset-0 z-0 bg-deep-navy">
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-transparent to-deep-navy z-10 pointer-events-none opacity-80" />

            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <DNAStrands />
                <FloatingParticles />
                {/* <Rig /> Optional mouse interaction if desired */}
            </Canvas>
        </div>
    );
}
