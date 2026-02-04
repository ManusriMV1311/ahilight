"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function WaveGrid() {
    const meshRef = useRef<THREE.Mesh>(null);
    const gridSize = 30;

    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(10, 10, gridSize, gridSize);
        return geo;
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            const positions = meshRef.current.geometry.attributes.position;
            const time = state.clock.elapsedTime;

            for (let i = 0; i < positions.count; i++) {
                const x = positions.getX(i);
                const y = positions.getY(i);

                // Create wave effect
                const wave = Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 0.3;
                positions.setZ(i, wave);
            }

            positions.needsUpdate = true;
            meshRef.current.geometry.computeVertexNormals();
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
            <meshStandardMaterial
                color="#7D5FFF"
                emissive="#5F9FFF"
                emissiveIntensity={0.4}
                wireframe
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function FloatingParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 100;

    const particlesGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={particlesRef} geometry={particlesGeometry}>
            <pointsMaterial
                size={0.08}
                color="#00D4FF"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

export function ContactBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
            <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1.2} color="#7D5FFF" />
                <pointLight position={[-5, -5, -5]} intensity={0.8} color="#00D4FF" />
                <WaveGrid />
                <FloatingParticles />
            </Canvas>
        </div>
    );
}
