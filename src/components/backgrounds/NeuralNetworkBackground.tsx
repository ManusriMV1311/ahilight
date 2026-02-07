"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { Points, PointMaterial, Line } from "@react-three/drei";

function NeuralNetwork() {
    const count = 100; // Number of nodes
    const connectionDistance = 2.5; // Max distance to connect

    // Generate random positions
    const [positions, setPositions] = useState(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20; // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
        }
        return pos;
    });

    // Store velocities
    const velocities = useMemo(() => {
        const vel = [];
        for (let i = 0; i < count; i++) {
            vel.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.01
            });
        }
        return vel;
    }, []);

    const pointsRef = useRef<THREE.Points>(null);
    const linesGeometryRef = useRef<THREE.BufferGeometry>(null);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Update positions based on velocity
        for (let i = 0; i < count; i++) {
            positionsArray[i * 3] += velocities[i].x;
            positionsArray[i * 3 + 1] += velocities[i].y;
            positionsArray[i * 3 + 2] += velocities[i].z;

            // Bounce off bounds
            if (positionsArray[i * 3] > 10 || positionsArray[i * 3] < -10) velocities[i].x *= -1;
            if (positionsArray[i * 3 + 1] > 10 || positionsArray[i * 3 + 1] < -10) velocities[i].y *= -1;
            if (positionsArray[i * 3 + 2] > 5 || positionsArray[i * 3 + 2] < -5) velocities[i].z *= -1;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Calculate connections
        if (linesGeometryRef.current) {
            const linePositions = [];
            // Draw lines between close points
            // Simplified O(N^2) - okay for low count (100)
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dx = positionsArray[i * 3] - positionsArray[j * 3];
                    const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
                    const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < connectionDistance) {
                        linePositions.push(
                            positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2],
                            positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]
                        );
                    }
                }
            }
            linesGeometryRef.current.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(linePositions, 3)
            );
        }
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <PointMaterial
                    transparent
                    color="#00F2FF"
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </points>

            <lineSegments>
                <bufferGeometry ref={linesGeometryRef} />
                <lineBasicMaterial color="#7D5FFF" transparent opacity={0.2} />
            </lineSegments>
        </>
    );
}

export function NeuralNetworkBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-deep-navy">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,10,40,0)_0%,#020B2D_100%)] z-10 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
                <NeuralNetwork />
            </Canvas>
        </div>
    );
}
