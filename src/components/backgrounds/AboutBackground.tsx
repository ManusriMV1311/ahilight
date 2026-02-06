"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Line } from "@react-three/drei";
import { SharedUniverse } from "./common/SharedUniverse";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function ConstellationNetwork() {
    const count = 40;
    const radius = 10;

    // Generate nodes
    const [nodes, setNodes] = useState<{ position: THREE.Vector3, phase: number }[]>([]);

    useEffect(() => {
        const newNodes = new Array(count).fill(0).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * radius * 2,
                (Math.random() - 0.5) * radius * 1.5,
                (Math.random() - 0.5) * radius * 1.5
            ),
            phase: Math.random() * Math.PI * 2
        }));
        setNodes(newNodes);
    }, []);

    // Generate connections
    const connections = useMemo(() => {
        const lines: THREE.Vector3[][] = [];
        nodes.forEach((node, i) => {
            nodes.forEach((other, j) => {
                if (i < j) {
                    const dist = node.position.distanceTo(other.position);
                    if (dist < 4) {
                        lines.push([node.position, other.position]);
                    }
                }
            });
        });
        return lines;
    }, [nodes]);

    return (
        <group>
            {/* Nodes */}
            {nodes.map((node, i) => (
                <NodePoint key={i} position={node.position} phase={node.phase} />
            ))}

            {/* Connections */}
            {connections.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color="#818cf8" // Indigo-400
                    lineWidth={0.5}
                    transparent
                    opacity={0.2}
                />
            ))}
        </group>
    );
}

function NodePoint({ position, phase }: { position: THREE.Vector3, phase: number }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime;
            const scale = 1 + Math.sin(t * 2 + phase) * 0.3;
            ref.current.scale.setScalar(scale);
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
        </mesh>
    );
}

export function AboutBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-[#02020a]">
            {/* Dark background base */}
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: false }}>
                <SharedUniverse />

                <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.2}>
                    <ConstellationNetwork />
                </Float>

                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} intensity={0.5} radius={0.5} />
                </EffectComposer>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-[#02020a] via-transparent to-[#02020a]/60" />
        </div>
    );
}
