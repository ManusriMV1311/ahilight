"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Vector3, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Line } from "three";
import { useFrame } from "@react-three/fiber";

interface Node {
    position: Vector3;
    velocity: Vector3;
    connections: number[];
}

function KnowledgeNetwork() {
    const nodeCount = 80;
    const maxConnections = 3;
    const connectionDistance = 3;

    const nodes = useMemo(() => {
        const tempNodes: Node[] = [];
        for (let i = 0; i < nodeCount; i++) {
            tempNodes.push({
                position: new Vector3(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10
                ),
                velocity: new Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                connections: []
            });
        }

        // Create connections between nearby nodes
        tempNodes.forEach((node, i) => {
            tempNodes.forEach((otherNode, j) => {
                if (i !== j && node.connections.length < maxConnections) {
                    const distance = node.position.distanceTo(otherNode.position);
                    if (distance < connectionDistance) {
                        node.connections.push(j);
                    }
                }
            });
        });

        return tempNodes;
    }, []);

    const pointsRef = useRef<any>(null);

    useEffect(() => {
        if (pointsRef.current) {
            const positions = new Float32Array(nodes.flatMap(n => [n.position.x, n.position.y, n.position.z]));
            pointsRef.current.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        }
    }, [nodes]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Animate nodes with subtle floating
        nodes.forEach((node, i) => {
            node.position.x += Math.sin(time * 0.5 + i) * 0.001;
            node.position.y += Math.cos(time * 0.3 + i) * 0.001;

            // Update point positions
            if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
                const positions = pointsRef.current.geometry.attributes.position.array;
                positions[i * 3] = node.position.x;
                positions[i * 3 + 1] = node.position.y;
                positions[i * 3 + 2] = node.position.z;
                pointsRef.current.geometry.attributes.position.needsUpdate = true;
            }
        });
    });

    return (
        <group>
            {/* Render Nodes */}
            <points ref={pointsRef}>
                <bufferGeometry />
                <pointsMaterial
                    size={0.15}
                    color="#7D5FFF"
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>

            {/* Render Connections */}
            {nodes.map((node, i) =>
                node.connections.map((connectedIndex, j) => {
                    const geometry = new BufferGeometry();
                    const positions = new Float32Array([
                        node.position.x, node.position.y, node.position.z,
                        nodes[connectedIndex].position.x,
                        nodes[connectedIndex].position.y,
                        nodes[connectedIndex].position.z
                    ]);
                    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

                    const material = new LineBasicMaterial({
                        color: "#00F2FF",
                        transparent: true,
                        opacity: 0.2
                    });

                    return (
                        <primitive
                            key={`${i}-${j}`}
                            object={new Line(geometry, material)}
                        />
                    );
                })
            )}
        </group>
    );
}

export function AboutNetworkBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <KnowledgeNetwork />
            </Canvas>
        </div>
    );
}
