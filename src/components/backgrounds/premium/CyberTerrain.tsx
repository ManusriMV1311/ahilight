"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

function TerrainPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const geometryRef = useRef<THREE.PlaneGeometry>(null);
    const noise2D = useMemo(() => createNoise2D(), []);

    // Original positions for displacement
    const originalPositions = useMemo(() => {
        // We'll generate this once we have access to the geometry, 
        // but cleaner to just do procedural displacement in shader or useFrame on vertices
        return null;
    }, []);

    useFrame((state) => {
        if (!meshRef.current || !geometryRef.current) return;

        const time = state.clock.elapsedTime * 0.5;
        const { position } = geometryRef.current.attributes;

        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i); // This is actually Z in world space if rotated

            // "Scroll" the terrain by offsetting noise with time
            const noiseVal = noise2D(x * 0.1, y * 0.1 - time);

            // Apply height (Z-axis local, which will be Y-axis world after rotation)
            // Make a "valley" in the center (x near 0)
            const valleyFactor = Math.abs(x) < 5 ? Math.abs(x) / 5 : 1;

            const height = noiseVal * 3 * valleyFactor;

            position.setZ(i, height);
        }

        position.needsUpdate = true;
        geometryRef.current.computeVertexNormals();
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry ref={geometryRef} args={[40, 40, 64, 64]} />
            <meshStandardMaterial
                color="#000000"
                emissive="#991b1b"
                emissiveIntensity={0.5}
                wireframe
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function FloatingGrid() {
    return (
        <gridHelper
            args={[60, 60, 0xff0000, 0x220000]}
            position={[0, 2, 0]}
        />
    )
}

export function CyberTerrain() {
    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <Canvas
                camera={{ position: [0, 2, 10], fov: 60 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.1} />
                <pointLight position={[0, 10, 0]} intensity={1} color="#ef4444" />

                <TerrainPlane />

                {/* Fog for the "Endless" look */}
                <fog attach="fog" args={['#000000', 5, 25]} />
            </Canvas>
        </div>
    );
}
