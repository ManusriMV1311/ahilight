"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Trail, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { SharedUniverse } from "./common/SharedUniverse";
import { useRef } from "react";
import * as THREE from "three";

function LivingCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;
        }
        if (materialRef.current) {
            // Animate distortion speed and scale for "breathing" effect
            materialRef.current.distort = 0.4 + Math.sin(time) * 0.1;
        }
    });

    return (
        <group position={[0, 1.5, 0]}>
            {/* The rotating liquid core */}
            <mesh ref={meshRef} scale={1.8}>
                <icosahedronGeometry args={[1, 6]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0}
                    distort={0.4}
                    transparent={true}
                    opacity={0.1}
                />
            </mesh>

            {/* 3D Depth Layer (Shadow/Extrusion Fake) */}
            <Text
                position={[0.02, -0.02, -0.05]} // Slight offset for "depth"
                fontSize={0.5}
                anchorX="center"
                anchorY="middle"
                characters="AhiLight"
                letterSpacing={0.05}
                font="/fonts/SpaceGrotesk-Bold.ttf"
                fontWeight={700}
                fillOpacity={0.5}
            >
                AhiLight
                <meshStandardMaterial
                    color="#000000"
                    emissive="#000000"
                    roughness={1}
                />
            </Text>

            {/* Main Text */}
            <Text
                position={[0, 0, 0]}
                fontSize={0.5}
                anchorX="center"
                anchorY="middle"
                characters="AhiLight"
                letterSpacing={0.05}
                font="/fonts/SpaceGrotesk-Bold.ttf"
                fontWeight={700}
            >
                AhiLight
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#00ffff"
                    emissiveIntensity={2.0}
                    roughness={0}
                    metalness={0.1}
                    toneMapped={false}
                />
            </Text>
        </group>
    );
}

function OrbitingShards() {
    const domains = [
        { label: "AI", color: "#22d3ee" },      // Cyan-400
        { label: "VISION", color: "#c084fc" },  // Purple-400
        { label: "DATA", color: "#60a5fa" },    // Blue-400
        { label: "COMPUTE", color: "#2dd4bf" }, // Teal-400
        { label: "CYBER", color: "#e879f9" }    // Fuchsia-400
    ];

    return (
        <group>
            {domains.map((domain, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
                    <group rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                        <Trail
                            width={1}
                            length={4} // Shorter trail for text
                            color={new THREE.Color(domain.color)}
                            attenuation={(width) => width}
                        >
                            <group position={[3 + Math.random() * 2, 0, 0]}>
                                {/* Domain Label */}
                                <Text
                                    fontSize={0.25}
                                    font="/fonts/SpaceGrotesk-Bold.ttf"
                                    characters={domain.label}
                                    anchorX="center"
                                    anchorY="middle"
                                    color={domain.color}
                                >
                                    {domain.label}
                                </Text>
                                {/* Small marker icon */}
                                <mesh position={[0, 0.2, 0]}>
                                    <octahedronGeometry args={[0.05]} />
                                    <meshBasicMaterial color={domain.color} />
                                </mesh>
                            </group>
                        </Trail>
                    </group>
                </Float>
            ))}
        </group>
    )
}


export function HomeBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: false }}>
                <SharedUniverse />

                <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <LivingCore />
                </Float>

                <OrbitingShards />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.5}
                        mipmapBlur
                        intensity={1.2}
                        radius={0.6}
                    />
                </EffectComposer>
            </Canvas>

            {/* Vignette & Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-[#030014]/50" />
        </div>
    );
}
