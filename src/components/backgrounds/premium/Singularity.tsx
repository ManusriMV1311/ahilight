"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Sphere } from '@react-three/drei';

function AccretionDisk({ count = 4000 }) {
    const pointsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const angles = new Float32Array(count);
        const radii = new Float32Array(count);
        const speeds = new Float32Array(count);

        const colorInside = new THREE.Color("#ff0000");
        const colorOutside = new THREE.Color("#450a0a");

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 2.5 + Math.random() * 5; // Distance from hole

            angles[i] = angle;
            radii[i] = radius;
            speeds[i] = (1 / radius) * 2; // Kepler-ish: faster near center

            // Position
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 0.2 * (radius - 2); // Thin disk, slightly thicker edges

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Color gradient based on radius
            const t = (radius - 2.5) / 5;
            const color = new THREE.Color().lerpColors(colorInside, colorOutside, t);

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.random() * 0.05;
        }

        return { positions, colors, sizes, angles, radii, speeds };
    }, [count]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Update angle
            particles.angles[i] += particles.speeds[i] * delta * 0.5;

            const angle = particles.angles[i];
            const radius = particles.radii[i];

            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            positions[i * 3] = x;
            positions[i * 3 + 2] = z;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function EventHorizon() {
    return (
        <Sphere args={[2, 64, 64]}>
            <meshBasicMaterial color="#000000" />
            <mesh scale={[1.05, 1.05, 1.05]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshBasicMaterial color="#ff0000" transparent opacity={0.1} side={THREE.BackSide} />
            </mesh>
        </Sphere>
    );
}

export function Singularity() {
    return (
        <div className="fixed inset-0 -z-10 opacity-70">
            <Canvas
                camera={{ position: [0, 4, 10], fov: 45 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.1} />
                <group rotation={[0.4, 0, 0.2]}> {/* Tilt the system */}
                    <EventHorizon />
                    <AccretionDisk />
                </group>

                {/* Subtle fog to blend distant particles */}
                <fog attach="fog" args={['#000000', 8, 20]} />
            </Canvas>
        </div>
    );
}
