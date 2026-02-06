"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Text } from "@react-three/drei";
import { SharedUniverse } from "./common/SharedUniverse";
import { useRef } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function CrystalShield() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.1;
            meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Central Crystal Monolith representing the user's data */}
            <mesh position={[0, 0, 0]}>
                <icosahedronGeometry args={[2, 0]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={2}
                    chromaticAberration={0.5}
                    anisotropy={0.5}
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    iridescence={1}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    transmission={1}
                    roughness={0.1}
                    color="#ffffff"
                    emissive="#7D5FFF"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Floating Shield Fragments */}
            {Array.from({ length: 12 }).map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
                    <mesh position={[
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 4 + 2
                    ]}>
                        <dodecahedronGeometry args={[0.4, 0]} />
                        <MeshTransmissionMaterial
                            samples={4}
                            thickness={1}
                            chromaticAberration={1}
                            transmission={1}
                            roughness={0}
                            color="#00ffff"
                            emissive="#0000ff"
                            emissiveIntensity={4}
                            toneMapped={false}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

export function CyberFortressBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <SharedUniverse />

                <CrystalShield />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={1}
                        mipmapBlur
                        intensity={2}
                        radius={0.8}
                    />
                </EffectComposer>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-[#02020a] via-transparent to-[#02020a]/70" />
        </div>
    );
}
