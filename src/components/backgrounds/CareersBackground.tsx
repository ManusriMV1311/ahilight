"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, PerspectiveCamera, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function MovingGrid() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Move grid backwards to create forward movement effect
            meshRef.current.position.z = (state.clock.elapsedTime * 2) % 2;
        }
    });

    return (
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <Plane ref={meshRef} args={[40, 40, 40, 40]}>
                <meshBasicMaterial
                    color="#00d4aa"
                    wireframe
                    transparent
                    opacity={0.6}
                />
            </Plane>
            {/* Second grid for seamless looping illusion if needed, but plane covers view */}
        </group>
    );
}

export function CareersBackground() {
    // Removed opacity-50 to fix "too white/bright" issue.
    // Added separate background color to ensure dark theme.
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={60} />
                <color attach="background" args={['#050510']} />

                {/* Denser, brighter stars */}
                <Stars radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={2} />

                <MovingGrid />
                <ambientLight intensity={1.5} />
            </Canvas>
        </div>
    );
}
