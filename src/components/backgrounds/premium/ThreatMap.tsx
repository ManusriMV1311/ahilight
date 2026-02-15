"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function GlobePoints({ count = 3000 }) {
    const pointsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const alertTimers = new Float32Array(count); // Time until next ping

        const baseColor = new THREE.Color("#441111");
        const alertColor = new THREE.Color("#ef4444");

        for (let i = 0; i < count; i++) {
            // Uniform sphere distribution
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const r = 4.5;
            positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
            positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            positions[i * 3 + 2] = r * Math.cos(phi);

            colors[i * 3] = baseColor.r;
            colors[i * 3 + 1] = baseColor.g;
            colors[i * 3 + 2] = baseColor.b;

            sizes[i] = 0.03;
            alertTimers[i] = Math.random() * 100; // Random start time
        }

        return { positions, colors, sizes, alertTimers, baseColor, alertColor };
    }, [count]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
        const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array;

        pointsRef.current.rotation.y += delta * 0.05; // Slow rotation

        for (let i = 0; i < count; i++) {
            particles.alertTimers[i] -= delta * 5; // Countdown

            if (particles.alertTimers[i] <= 0) {
                // Trigger ping!
                particles.alertTimers[i] = 50 + Math.random() * 200; // Reset timer
            }

            // Animation logic: if timer is just reset (high value), fade out
            // Simulating a pulse: 
            // We want a pulse when alertTimer matches a "ping" event.
            // Let's simplify: random pings based on probability per frame? 
            // Actually, let's keep it simple. Random pings.

            if (Math.random() < 0.001) { // 0.1% chance per frame to ping
                colors[i * 3] = particles.alertColor.r;
                colors[i * 3 + 1] = particles.alertColor.g;
                colors[i * 3 + 2] = particles.alertColor.b;
                sizes[i] = 0.1; // Big pop
            } else {
                // Decay back to base
                colors[i * 3] += (particles.baseColor.r - colors[i * 3]) * 0.05;
                colors[i * 3 + 1] += (particles.baseColor.g - colors[i * 3 + 1]) * 0.05;
                colors[i * 3 + 2] += (particles.baseColor.b - colors[i * 3 + 2]) * 0.05;
                sizes[i] += (0.03 - sizes[i]) * 0.05;
            }
        }

        pointsRef.current.geometry.attributes.color.needsUpdate = true;
        pointsRef.current.geometry.attributes.size.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[particles.colors, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[particles.sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                vertexColors
                transparent
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export function ThreatMap() {
    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true }}
                dpr={[1, 2]}
            >
                <GlobePoints />
            </Canvas>
        </div>
    );
}
