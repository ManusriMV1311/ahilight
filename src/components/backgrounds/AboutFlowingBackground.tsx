"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function LightBeams() {
    const beamsRef = useRef<THREE.Group>(null);
    const beamCount = 12;

    useFrame((state) => {
        if (!beamsRef.current) return;
        const time = state.clock.getElapsedTime();

        beamsRef.current.children.forEach((beam, i) => {
            // Rotate beams slowly
            beam.rotation.z = time * 0.1 + (i * Math.PI) / 6;

            // Gentle position shift
            beam.position.x = Math.sin(time * 0.3 + i) * 2;
            beam.position.y = Math.cos(time * 0.2 + i) * 1.5;
        });
    });

    const createBeam = (index: number, totalBeams: number) => {
        const angle = (index / totalBeams) * Math.PI * 2;
        const radius = 8;
        const startX = Math.cos(angle) * radius;
        const startY = Math.sin(angle) * radius;

        // Create gradient geometry for light beam
        const geometry = new THREE.CylinderGeometry(0.05, 0.8, 20, 32, 1, true);

        // Create gradient material from purple to cyan
        const material = new THREE.ShaderMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            uniforms: {
                time: { value: 0 },
                colorStart: { value: new THREE.Color("#7D5FFF") },
                colorEnd: { value: new THREE.Color("#00F2FF") },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 colorStart;
                uniform vec3 colorEnd;
                varying vec2 vUv;
                
                void main() {
                    vec3 color = mix(colorStart, colorEnd, vUv.y);
                    float alpha = (1.0 - vUv.y) * 0.4;
                    gl_FragColor = vec4(color, alpha);
                }
            `,
        });

        return { geometry, material, startX, startY, angle };
    };

    const beams = Array.from({ length: beamCount }, (_, i) => createBeam(i, beamCount));

    return (
        <group ref={beamsRef}>
            {beams.map((beam, i) => (
                <mesh
                    key={i}
                    geometry={beam.geometry}
                    material={beam.material}
                    position={[beam.startX, beam.startY, -5]}
                    rotation={[Math.PI / 2, 0, beam.angle]}
                />
            ))}
        </group>
    );
}

function Particles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 500;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

        // Random color between purple and cyan
        const t = Math.random();
        const color = new THREE.Color().lerpColors(
            new THREE.Color("#7D5FFF"),
            new THREE.Color("#00F2FF"),
            t
        );
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    useFrame((state) => {
        if (!particlesRef.current) return;
        const time = state.clock.getElapsedTime();

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Gentle drift
            positions[i3 + 1] += Math.sin(time + i) * 0.001;

            // Wrap around
            if (positions[i3 + 1] > 15) positions[i3 + 1] = -15;
            if (positions[i3 + 1] < -15) positions[i3 + 1] = 15;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.08} vertexColors transparent opacity={0.6} sizeAttenuation />
        </points>
    );
}

export function AboutFlowingBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <LightBeams />
                <Particles />
            </Canvas>
        </div>
    );
}
