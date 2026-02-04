"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function NetworkNode({ position, connections }: { position: [number, number, number], connections: [number, number, number][] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Pulse animation
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.setScalar(scale);
    });

    return (
        <group position={position}>
            {/* Main node sphere */}
            <Sphere ref={meshRef} args={[0.1, 32, 32]}>
                <meshStandardMaterial
                    color="#7D5FFF"
                    emissive="#5F9FFF"
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </Sphere>

            {/* Connection lines to other nodes */}
            {connections.map((targetPos, idx) => (
                <Line
                    key={idx}
                    points={[position, targetPos]}
                    color="#7D5FFF"
                    lineWidth={1}
                    opacity={0.3}
                    transparent
                />
            ))}
        </group>
    );
}

function NetworkScene() {
    // Generate network of nodes
    const nodes = useMemo(() => {
        const count = 20;
        const nodePositions: [number, number, number][] = [];

        for (let i = 0; i < count; i++) {
            nodePositions.push([
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5,
            ]);
        }

        // Connect nearby nodes
        return nodePositions.map((pos, i) => ({
            position: pos,
            connections: nodePositions
                .filter((otherPos, j) => {
                    if (i === j) return false;
                    const distance = Math.hypot(
                        pos[0] - otherPos[0],
                        pos[1] - otherPos[1],
                        pos[2] - otherPos[2]
                    );
                    return distance < 3; // Connect if within 3 units
                })
        }));
    }, []);

    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#7D5FFF" />

            {nodes.map((node, idx) => (
                <NetworkNode
                    key={idx}
                    position={node.position}
                    connections={node.connections}
                />
            ))}

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
        </>
    );
}

export function HomepageBackground() {
    return (
        <div className="fixed inset-0 z-[-1]">
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none z-10" />
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <NetworkScene />
            </Canvas>
        </div>
    );
}
