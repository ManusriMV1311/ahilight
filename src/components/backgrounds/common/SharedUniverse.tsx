"use client";

import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function SharedUniverse() {
    const starsRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (starsRef.current) {
            // Subtle slow rotation of the entire universe
            starsRef.current.rotation.y += delta * 0.02;
            starsRef.current.rotation.x += delta * 0.01;
        }
    });

    return (
        <group>
            {/* Deep Atmospheric Fog for seamless blending */}
            <fog attach="fog" args={['#02020a', 10, 50]} />
            <color attach="background" args={['#02020a']} />

            {/* Distant Starfield - High count for density, low fade for depth */}
            <group ref={starsRef}>
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
            </group>

            {/* Consistent Lighting Setup */}
            <ambientLight intensity={0.5} color="#4c1d95" /> {/* Deep Violet Ambient */}
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" /> {/* Cyan Key Light */}
            <pointLight position={[-10, -5, -10]} intensity={0.5} color="#7D5FFF" /> {/* Electric Blue Fill */}
        </group>
    );
}
