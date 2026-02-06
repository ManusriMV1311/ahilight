"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface NodeData {
    position: [number, number, number];
    connections: number[];
    phase: number;
    active: boolean;
}

function NetworkNode({
    position,
    connections,
    allNodes,
    phase,
    isActive
}: {
    position: [number, number, number];
    connections: number[];
    allNodes: [number, number, number][];
    phase: number;
    isActive: boolean;
}) {
    const sphereRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!sphereRef.current) return;

        // Pulse animation based on phase
        const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2 + phase) * 0.15;
        sphereRef.current.scale.setScalar(pulseScale);

        // Rotation for subtle life
        sphereRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    });

    return (
        <group position={position}>
            {/* Main node sphere */}
            <Sphere
                ref={sphereRef}
                args={[0.08, 32, 32]}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <meshStandardMaterial
                    color={isActive ? "#00d4ff" : "#4a5568"}
                    emissive={isActive ? "#00d4ff" : "#1a1a2e"}
                    emissiveIntensity={hovered ? 1.2 : 0.8}
                    metalness={0.9}
                    roughness={0.1}
                />
            </Sphere>

            {/* Core glow */}
            <Sphere args={[0.04, 16, 16]}>
                <meshBasicMaterial color="#ffffff" />
            </Sphere>

            {/* Connection lines to other nodes */}
            {connections.map((targetIdx, idx) => {
                const targetPos = allNodes[targetIdx];
                const isConnectionActive = isActive || Math.random() > 0.7;

                return (
                    <Line
                        key={idx}
                        points={[position, targetPos]}
                        color={isConnectionActive ? "#00d4ff" : "#2d3748"}
                        lineWidth={isConnectionActive ? 1.5 : 0.5}
                        transparent
                        opacity={isConnectionActive ? 0.6 : 0.2}
                    />
                );
            })}
        </group>
    );
}

function NeuralLatticeContent({
    nodeCount = 30,
    connectionRadius = 2.5,
    latticeSize = 10,
    activeNodePercentage = 0.3
}: {
    nodeCount?: number;
    connectionRadius?: number;
    latticeSize?: number;
    activeNodePercentage?: number;
}) {
    // Generate network topology
    const networkData = useMemo(() => {
        const nodes: NodeData[] = [];
        const positions: [number, number, number][] = [];

        // Create nodes in 3D space
        for (let i = 0; i < nodeCount; i++) {
            const position: [number, number, number] = [
                (Math.random() - 0.5) * latticeSize,
                (Math.random() - 0.5) * latticeSize,
                (Math.random() - 0.5) * latticeSize,
            ];
            positions.push(position);
        }

        // Connect nearby nodes
        positions.forEach((pos, i) => {
            const connections: number[] = [];

            positions.forEach((otherPos, j) => {
                if (i === j) return;

                const distance = Math.hypot(
                    pos[0] - otherPos[0],
                    pos[1] - otherPos[1],
                    pos[2] - otherPos[2]
                );

                if (distance < connectionRadius) {
                    connections.push(j);
                }
            });

            nodes.push({
                position: pos,
                connections,
                phase: Math.random() * Math.PI * 2,
                active: Math.random() < activeNodePercentage,
            });
        });

        return { nodes, positions };
    }, [nodeCount, connectionRadius, latticeSize, activeNodePercentage]);

    return (
        <>
            {/* Lighting setup */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#6366f1" />

            {/* Network nodes */}
            {networkData.nodes.map((node, idx) => (
                <NetworkNode
                    key={idx}
                    position={node.position}
                    connections={node.connections}
                    allNodes={networkData.positions}
                    phase={node.phase}
                    isActive={node.active}
                />
            ))}

            {/* Camera controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 2.2}
            />
        </>
    );
}

export function NeuralLattice() {
    return (
        <div className="absolute inset-0 -z-10 opacity-40">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 50 }}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                dpr={[1, 2]} // Support high-res displays
            >

                <NeuralLatticeContent />

                {/* Post-processing for glow */}
                <EffectComposer>
                    <Bloom
                        intensity={0.5}
                        luminanceThreshold={0.4}
                        luminanceSmoothing={0.9}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
