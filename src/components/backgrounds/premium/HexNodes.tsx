"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Cylinder } from '@react-three/drei';

function HexCell({ position, phase }: { position: [number, number, number], phase: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Breathing effect based on time and individual phase
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + phase) * 0.1;
        meshRef.current.scale.y = scale;

        // Subtle color shift logic would go here if we weren't strictly red
    });

    return (
        <group position={position}>
            <Cylinder
                ref={meshRef}
                args={[0.95, 0.95, 0.2, 6]} // Hexagon shape (cylinder with 6 segments)
                rotation={[Math.PI / 2, 0, 0]} // Face the camera
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <meshStandardMaterial
                    color={"#000000"}
                    emissive={hovered ? "#ef4444" : "#450a0a"} // Red glow on hover, dark red otherwise
                    emissiveIntensity={hovered ? 2 : 0.5}
                    wireframe={!hovered} // Solid on hover, wireframe normally
                    metalness={0.8}
                    roughness={0.2}
                />
            </Cylinder>
            {/* Inner glow core */}
            <Cylinder
                args={[0.8, 0.8, 0.1, 6]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <meshBasicMaterial
                    color="#ef4444"
                    transparent
                    opacity={0.1}
                />
            </Cylinder>
        </group>
    );
}

function HexGrid({ width = 10, height = 6 }) {
    const hexes = useMemo(() => {
        const temp = [];
        for (let x = -width; x <= width; x++) {
            for (let y = -height; y <= height; y++) {
                // Hexagonal coordinate offset
                const xPos = x * 1.8 + (y % 2) * 0.9;
                const yPos = y * 1.6;
                const phase = Math.random() * Math.PI * 2;

                // Only create if within a circular radius to avoid square edges
                if (Math.sqrt(xPos * xPos + yPos * yPos) < 14) {
                    temp.push({ position: [xPos, yPos, 0] as [number, number, number], phase });
                }
            }
        }
        return temp;
    }, [width, height]);

    return (
        <group rotation={[0, 0, Math.PI / 6]}> {/* Rotate grid slightly for dynamic angle */}
            {hexes.map((hex, i) => (
                <HexCell key={i} position={hex.position} phase={hex.phase} />
            ))}
        </group>
    );
}

function HexNodesContent() {
    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ef4444" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#b91c1c" />

            <group position={[0, 0, -5]}>
                <HexGrid />
            </group>
        </>
    );
}

export function HexNodes() {
    return (
        <div className="fixed inset-0 -z-10 opacity-40">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                {/* Fixed background to allow transparency from parent */}
                <HexNodesContent />
            </Canvas>
        </div>
    );
}
