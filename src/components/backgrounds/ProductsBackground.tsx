"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleField() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 2000;

    const particlesGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Spread particles in a large volume
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            // Gradient colors from electric blue to cyan
            const t = Math.random();
            colors[i * 3] = 0.49 + t * 0.2; // R: blend between purple and cyan
            colors[i * 3 + 1] = 0.37 + t * 0.5; // G
            colors[i * 3 + 2] = 1.0; // B: keep high for blue tones
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        return geometry;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.0003;
            particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <points ref={particlesRef} geometry={particlesGeometry}>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function GridPlane({ position, rotation, color }: { position: [number, number, number], rotation: [number, number, number], color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.0002;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={rotation}>
            <planeGeometry args={[20, 20, 20, 20]} />
            <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.15}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#7D5FFF" />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00D4FF" />

            <ParticleField />

            <GridPlane position={[0, -5, -5]} rotation={[Math.PI / 4, 0, 0]} color="#7D5FFF" />
            <GridPlane position={[0, 0, -10]} rotation={[0, 0, 0]} color="#00D4FF" />
            <GridPlane position={[0, 5, -15]} rotation={[-Math.PI / 6, 0, 0]} color="#5F9FFF" />
        </>
    );
}

export function ProductsBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-black via-deep-navy/50 to-black">
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 10, 50]} />
                <Scene />
            </Canvas>
        </div>
    );
}
