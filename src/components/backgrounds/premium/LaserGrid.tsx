"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ScanningLaser({ position, speed, range }: { position: [number, number, number], speed: number, range: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Oscillate back and forth
        meshRef.current.position.z = Math.sin(state.clock.elapsedTime * speed) * range;
    });

    return (
        <mesh ref={meshRef} position={position} rotation={[0, 0, 0]}>
            <planeGeometry args={[40, 2]} />
            <meshBasicMaterial
                color="#ef4444"
                transparent
                opacity={0.1}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
            {/* Bright core line */}
            <mesh scale={[1, 0.05, 1]}>
                <planeGeometry args={[40, 2]} />
                <meshBasicMaterial color="#ffaaaa" />
            </mesh>
        </mesh>
    );
}

function GridFloor() {
    return (
        <gridHelper
            args={[60, 60, 0x330000, 0x110000]} // Dark red grid
            position={[0, -1, 0]}
        />
    );
}

function LaserSystem() {
    return (
        <group>
            <GridFloor />
            <ScanningLaser position={[0, -0.5, 0]} speed={0.5} range={15} />
            <ScanningLaser position={[0, -0.5, 5]} speed={0.3} range={10} />
            <ScanningLaser position={[0, -0.5, -5]} speed={0.4} range={12} />
        </group>
    );
}

export function LaserGrid() {
    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <Canvas
                camera={{ position: [0, 5, 15], fov: 60 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.2} />
                <LaserSystem />
                <fog attach="fog" args={['#000000', 5, 30]} />
            </Canvas>
        </div>
    );
}
