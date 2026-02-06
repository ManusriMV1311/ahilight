"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

function MorphingGridContent({
    gridSize = 50,
    gridResolution = 100,
    waveAmplitude = 1.5,
    waveSpeed = 0.5
}: {
    gridSize?: number;
    gridResolution?: number;
    waveAmplitude?: number;
    waveSpeed?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const noise3D = useMemo(() => createNoise3D(), []);

    // Create plane geometry
    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(
            gridSize,
            gridSize,
            gridResolution,
            gridResolution
        );
    }, [gridSize, gridResolution]);

    // Animation
    useFrame((state) => {
        if (!meshRef.current) return;

        const positions = meshRef.current.geometry.attributes.position;
        const time = state.clock.elapsedTime * waveSpeed;

        // Deform each vertex based on simplex noise
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);

            // Multi-octave noise for complex waves
            const noise1 = noise3D(x * 0.1, y * 0.1, time * 0.5);
            const noise2 = noise3D(x * 0.2, y * 0.2, time * 0.3);
            const noise3 = noise3D(x * 0.05, y * 0.05, time * 0.7);

            const z = (noise1 + noise2 * 0.5 + noise3 * 0.25) * waveAmplitude;

            positions.setZ(i, z);
        }

        positions.needsUpdate = true;
        meshRef.current.geometry.computeVertexNormals();
    });

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            rotation={[-Math.PI / 3, 0, 0]}
            position={[0, -3, 0]}
        >
            <meshStandardMaterial
                color="#6366f1"
                emissive="#00d4ff"
                emissiveIntensity={0.2}
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    );
}

export function MorphingGrid() {
    return (
        <div className="absolute inset-0 -z-10 opacity-40">
            <Canvas
                camera={{ position: [0, 5, 10], fov: 60 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#0a0a1e']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 10, 0]} intensity={1} color="#00d4ff" />
                <MorphingGridContent />
            </Canvas>
        </div>
    );
}
