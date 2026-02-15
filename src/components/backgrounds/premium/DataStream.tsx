"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function DataStreamContent({
    particleCount = 5000,
    flowSpeed = 0.5,
    clusterIntensity = 0.3
}: {
    particleCount?: number;
    flowSpeed?: number;
    clusterIntensity?: number;
}) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate particle positions and metadata
    const particleData = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const speeds = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Position in cylinder (not full sphere - creates flow)
            const radius = Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;

            positions[i3] = Math.cos(theta) * radius;
            positions[i3 + 1] = (Math.random() - 0.5) * 15; // Vertical spread
            positions[i3 + 2] = Math.sin(theta) * radius;

            // Color gradient (white to cyan based on Y position)
            const heightFactor = (positions[i3 + 1] + 7.5) / 15; // Normalize to 0-1
            const color = new THREE.Color();
            color.lerpColors(
                new THREE.Color('#ffffff'),
                new THREE.Color('#ef4444'), // Red
                heightFactor
            );

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random speed variation
            speeds[i] = 0.5 + Math.random() * 0.5;
        }

        return { positions, colors, speeds };
    }, [particleCount]);

    // Animation loop
    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const speed = particleData.speeds[i];

            // Move particles upward
            positions[i3 + 1] += delta * flowSpeed * speed;

            // Clustering effect (particles attract to certain Y levels)
            const clusterY = Math.sin(state.clock.elapsedTime + i * 0.1) * 3;
            const distToCluster = clusterY - positions[i3 + 1];
            positions[i3 + 1] += distToCluster * clusterIntensity * delta;

            // Reset particles that go too high
            if (positions[i3 + 1] > 8) {
                positions[i3 + 1] = -8;
            }

            // Subtle horizontal drift
            positions[i3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * delta * 0.1;
            positions[i3 + 2] += Math.cos(state.clock.elapsedTime * 0.5 + i) * delta * 0.1;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points
            ref={pointsRef}
            positions={particleData.positions}
            colors={particleData.colors}
        >
            <PointMaterial
                transparent
                size={0.03}
                sizeAttenuation
                depthWrite={false}
                vertexColors
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export function DataStream() {
    return (
        <div className="absolute inset-0 -z-10 opacity-30">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                {/* <color attach="background" args={['#000000']} /> REMOVED */}
                <DataStreamContent
                    particleCount={5000}
                    flowSpeed={0.5}
                    clusterIntensity={0.3}
                />
            </Canvas>
        </div>
    );
}
