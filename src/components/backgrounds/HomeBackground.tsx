"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { SharedUniverse } from "./common/SharedUniverse";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const domains = [
    "ML", "AI", "CYBER", "IT",
    "SOFTWARE", "CLOUD", "FINANCE", "AUTOMATION"
];

interface DomainProps {
    text: string;
    targetPosition: [number, number, number];
    delay: number;
    color: string;
}

function KiteDomain({ text, targetPosition, delay, color }: DomainProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Deterministic random based on unique props to avoid hydration mismatch and impurity
    const randomOffset = useMemo(() => {
        return (Math.sin(delay * 123.45) * 43758.5453 % 1) * 100;
    }, [delay]);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;
        // Pop out animation (0 to 1)
        const progress = Math.min(Math.max((time - delay) * 0.4, 0), 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out

        // Drift animation (subtle floating after reaching target)
        // Removed driftX to keep them in a perfect vertical line request by user
        const driftTime = time * 0.2 + randomOffset;
        const driftY = Math.cos(driftTime * 1.3) * 0.2;
        const driftZ = Math.sin(driftTime * 0.7) * 0.1;

        // Final position calculation
        // Start at [0,0,0], move to targetPosition, then add drift
        const currentX = (targetPosition[0] * eased); // No driftX
        const currentY = (targetPosition[1] * eased) + (driftY * eased);
        const currentZ = (targetPosition[2] * eased) + (driftZ * eased);

        groupRef.current.position.set(currentX, currentY, currentZ);

        // Scale up from 0
        groupRef.current.scale.setScalar(eased);

        // Always look at camera (or center)
        groupRef.current.lookAt(0, 0, 8); // Look towards camera aproximately
    });

    return (
        <group ref={groupRef} scale={0}>
            {/* Kite Shape (Rotated Octahedron/Plane) */}
            <group rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                <mesh>
                    <octahedronGeometry args={[0.3, 0]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.5}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>
                {/* Wireframe overlay */}
                <mesh scale={1.05}>
                    <octahedronGeometry args={[0.3, 0]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </group>

            {/* Text Label */}
            <Text
                position={[0, -0.5, 0]}
                font="/fonts/SpaceGrotesk-Bold.ttf"
                fontSize={0.3}
                color="#ffffff"
                anchorX="center"
                anchorY="top"
                outlineWidth={0.02}
                outlineColor={color}
                outlineOpacity={0.2}
            >
                {text}
            </Text>

        </group>
    );
}

function LivingCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materialRef = useRef<any>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;
        }
        if (materialRef.current) {
            materialRef.current.distort = 0.4 + Math.sin(time) * 0.1;
        }
    });

    return (
        <group position={[0, 2.2, 0]}>
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

            <Text
                position={[0.02, -0.02, -0.05]}
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

function PopOutDomains() {
    const domainObjects = useMemo(() => {
        return domains.map((domain, i) => {
            // Distribute to left and right sides
            const isLeft = i % 2 === 0;
            const sideMultiplier = isLeft ? -1 : 1;

            // Randomize position within a "wing" area
            // X: 3.5 to 7 (spread out sidewards)
            // Y: -3 to 3 (spread vertically)
            // Z: -2 to 2 (depth)

            // Adjusted for "Vertical Columns Side-Upside"
            // Deterministic placement: Two vertical columns on edges.

            // 4 items per side (since we have 8 total)
            // itemIndexInCol goes 0, 1, 2, 3
            const itemIndexInCol = Math.floor(i / 2);

            const x = 11.0 * sideMultiplier; // Fixed X at edge



            // Spread vertically in upper section. Start high, go down.
            // Shifted down: 4.0, 2.5, 1.0, -0.5
            const y = 4.0 - (itemIndexInCol * 1.5);

            const z = -8.0; // Fixed deep Z depth for consistency

            return {
                text: domain,
                targetPosition: [x, y, z] as [number, number, number],
                delay: i * 0.15 + 0.5,
                color: isLeft ? "#00d4ff" : "#6366f1"
            };
        });
    }, []);

    return (
        <group>
            {domainObjects.map((props, i) => (
                <KiteDomain key={i} {...props} />
            ))}
        </group>
    );
}

function ScrollVisibilityWrapper({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;

        // Ensure we're in a browser environment
        if (typeof window === 'undefined') return;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const distFromBottom = documentHeight - (scrollY + windowHeight);

        // Threshold to start disappearing (e.g., when footer starts appearing)
        // Adjust this value based on footer height and desired effect
        const threshold = 800;

        let targetScale = 1;
        if (distFromBottom < threshold) {
            // Scale down as we get closer to bottom
            // 0 at bottom, 1 at threshold
            targetScale = distFromBottom / threshold;
        }

        // Clamp targetScale between 0 and 1
        targetScale = Math.max(0, Math.min(1, targetScale));

        // Smoothly interpolate current scale to target scale
        // Using lerp for smooth animation
        groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    return <group ref={groupRef} scale={0}>{children}</group>;
}

export function HomeBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: false }}>
                <SharedUniverse />

                <group>
                    <ScrollVisibilityWrapper>
                        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                            <LivingCore />
                        </Float>

                        <PopOutDomains />
                    </ScrollVisibilityWrapper>
                </group>

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.5}
                        mipmapBlur
                        intensity={1.2}
                        radius={0.6}
                    />
                </EffectComposer>
            </Canvas>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-[#030014]/50" />
        </div>
    );
}
