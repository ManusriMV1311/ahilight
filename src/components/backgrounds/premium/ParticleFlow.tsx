"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

function FlowField({ count = 2000, color = "#ef4444" }) {
    const pointsRef = useRef<THREE.Points>(null);
    const noise3D = useMemo(() => createNoise3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            const speed = 0.2 + Math.random() * 0.5;
            temp.push({ x, y, z, originalX: x, originalY: y, originalZ: z, speed });
        }
        return temp;
    }, [count]);

    const positions = useMemo(() => new Float32Array(count * 3), [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.elapsedTime * 0.2;

        particles.forEach((p, i) => {
            // Noise-based movement
            const noiseX = noise3D(p.x * 0.1, p.y * 0.1, time);
            const noiseY = noise3D(p.x * 0.1, p.y * 0.1, time + 100);

            p.x += Math.cos(noiseX) * 0.05 * p.speed;
            p.y += Math.sin(noiseY) * 0.05 * p.speed;

            // Reset bounds (wrap around)
            if (p.x > 10) p.x = -10;
            if (p.x < -10) p.x = 10;
            if (p.y > 5) p.y = -5;
            if (p.y < -5) p.y = 5;

            positions[i * 3] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = p.z;
        });

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color={color}
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

export function ParticleFlow() {
    return (
        <div className="fixed inset-0 -z-10 opacity-50">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <FlowField count={3000} color="#ef4444" />
            </Canvas>
        </div>
    );
}
