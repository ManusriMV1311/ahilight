"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }) {
    const mesh = useRef<THREE.Points>(null);

    // Generate random particle positions
    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Spread broadly
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;
            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        // Move particles upwards
        mesh.current.rotation.y += 0.001;
        mesh.current.position.y += 0.002;

        // Reset if too high loops (simple visual trick, or just let them float indefinitely)
        // For a cleaner infinite scroll effect, we might use a shader, but this is simple enough.
        // Let's just oscillate slightly
        mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.5;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#ffffff"
                sizeAttenuation
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export function ResearchBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020617]">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                {/* Deep blue/navy fog for depth */}
                <color attach="background" args={["#020617"]} />
                <fog attach="fog" args={["#020617", 5, 15]} />

                <Particles count={3000} />
            </Canvas>
        </div>
    );
}
