"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// Flowing data streams component
function DataStreams() {
    const groupRef = useRef<THREE.Group>(null);
    const streamCount = 15;

    const streams = useMemo(() => {
        return Array.from({ length: streamCount }, (_, i) => ({
            x: (Math.random() - 0.5) * 30,
            z: (Math.random() - 0.5) * 20,
            speed: 0.05 + Math.random() * 0.1,
            offset: Math.random() * 100,
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        groupRef.current.children.forEach((child, i) => {
            const stream = streams[i];
            child.position.y = ((time * stream.speed + stream.offset) % 20) - 10;
            child.rotation.y = time * 0.2;
        });
    });

    return (
        <group ref={groupRef}>
            {streams.map((stream, i) => (
                <Text
                    key={i}
                    position={[stream.x, 0, stream.z]}
                    fontSize={0.3}
                    color="#00F2FF"
                    anchorX="center"
                    anchorY="middle"
                    opacity={0.4}
                >
                    {Math.random() > 0.5 ? "01010101" : "AI//SYS"}
                </Text>
            ))}
        </group>
    );
}

// Morphing geometric wireframes
function GeometricStructures() {
    const meshRefs = useRef<THREE.Mesh[]>([]);

    const structures = useMemo(() => [
        { geometry: new THREE.IcosahedronGeometry(2, 0), position: [-8, 2, -5] },
        { geometry: new THREE.OctahedronGeometry(1.5), position: [8, -3, -8] },
        { geometry: new THREE.TetrahedronGeometry(1.8), position: [0, 4, -10] },
        { geometry: new THREE.TorusGeometry(1.5, 0.3, 16, 32), position: [-5, -4, -6] },
    ], []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        meshRefs.current.forEach((mesh, i) => {
            if (!mesh) return;
            mesh.rotation.x = time * 0.3 * (i % 2 === 0 ? 1 : -1);
            mesh.rotation.y = time * 0.2;
            mesh.position.y += Math.sin(time + i) * 0.003;
        });
    });

    return (
        <>
            {structures.map((struct, i) => (
                <mesh
                    key={i}
                    ref={(el) => {
                        if (el) meshRefs.current[i] = el;
                    }}
                    geometry={struct.geometry}
                    position={struct.position as [number, number, number]}
                >
                    <meshBasicMaterial color="#7D5FFF" wireframe opacity={0.3} transparent />
                </mesh>
            ))}
        </>
    );
}

// Pulsing energy pathways
function EnergyPathways() {
    const linesRef = useRef<THREE.Line[]>([]);

    const pathways = useMemo(() => {
        const paths = [];
        for (let i = 0; i < 20; i++) {
            const points = [];
            const startX = (Math.random() - 0.5) * 20;
            const startY = (Math.random() - 0.5) * 10;
            const startZ = (Math.random() - 0.5) * 15;

            for (let j = 0; j < 10; j++) {
                points.push(
                    new THREE.Vector3(
                        startX + Math.sin(j * 0.5) * 2,
                        startY + j * 0.5,
                        startZ + Math.cos(j * 0.5) * 2
                    )
                );
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            paths.push({ geometry, phase: Math.random() * Math.PI * 2 });
        }
        return paths;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        linesRef.current.forEach((line, i) => {
            if (!line) return;
            const material = line.material as THREE.LineBasicMaterial;
            const pathway = pathways[i];
            material.opacity = 0.2 + Math.sin(time * 2 + pathway.phase) * 0.2;
        });
    });

    return (
        <>
            {pathways.map((pathway, i) => (
                <line key={i} geometry={pathway.geometry} ref={(el) => { if (el) linesRef.current[i] = el; }}>
                    <lineBasicMaterial color="#00F2FF" transparent opacity={0.3} />
                </line>
            ))}
        </>
    );
}

// Particle field with connections
function ParticleField() {
    const particlesRef = useRef<THREE.Points>(null);
    const connectionLinesRef = useRef<THREE.LineSegments>(null);
    const particleCount = 200;

    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            velocities.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02,
            });
        }

        return { positions, velocities };
    }, []);

    useFrame(() => {
        if (!particlesRef.current) return;

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const vel = particles.velocities[i];

            positions[i3] += vel.x;
            positions[i3 + 1] += vel.y;
            positions[i3 + 2] += vel.z;

            // Boundary check - wrap around
            if (Math.abs(positions[i3]) > 15) vel.x *= -1;
            if (Math.abs(positions[i3 + 1]) > 10) vel.y *= -1;
            if (Math.abs(positions[i3 + 2]) > 12) vel.z *= -1;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particles.positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.08} color="#7D5FFF" transparent opacity={0.6} sizeAttenuation />
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
                <ambientLight intensity={0.2} />
                <DataStreams />
                <GeometricStructures />
                <EnergyPathways />
                <ParticleField />
            </Canvas>
        </div>
    );
}
