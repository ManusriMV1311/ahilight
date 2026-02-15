"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { Environment } from '@react-three/drei';

function HexGrid({ countX = 20, countY = 20 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const noise2D = useMemo(() => createNoise2D(), []);

    // Hexagon positioning math
    const radius = 1;
    const width = Math.sqrt(3) * radius;
    const height = 2 * radius;
    const xStep = width;
    const yStep = height * 0.75;

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime * 0.5;

        let i = 0;
        for (let y = 0; y < countY; y++) {
            for (let x = 0; x < countX; x++) {
                const xPos = (x - countX / 2) * xStep + (y % 2 === 0 ? 0 : xStep / 2);
                const yPos = (y - countY / 2) * yStep;

                const noise = noise2D(x * 0.1, y * 0.1 + time);
                const zPos = noise * 2;

                const rotX = noise * 0.2;
                const rotY = noise * 0.2;

                dummy.position.set(xPos, yPos, zPos);
                dummy.rotation.set(rotX, rotY, 0);
                dummy.rotation.z = Math.PI / 6;
                dummy.scale.set(0.95, 0.95, 0.5);

                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i++, dummy.matrix);
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, countX * countY]}>
            <cylinderGeometry args={[1, 1, 1, 6]} />
            <meshStandardMaterial
                color="#551111" // Lighter base color
                emissive="#aa0000" // Strong red glow
                emissiveIntensity={1.5} // High intensity
                metalness={1}
                roughness={0.2}
                envMapIntensity={3} // Strong reflections
            />
        </instancedMesh>
    );
}

function Lighting() {
    return (
        <group>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={3} color="#ef4444" />
            <pointLight position={[-10, -10, 10]} intensity={2} color="#ffffff" />
            <spotLight position={[0, 0, 20]} angle={0.5} penumbra={1} intensity={10} color="#ff0000" />
        </group>
    )
}

export function HexArmor() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas
                camera={{ position: [0, 0, 25], fov: 45 }}
                gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <Environment preset="city" />
                <Lighting />
                <HexGrid countX={30} countY={20} />
                <fog attach="fog" args={['#000000', 15, 60]} />
            </Canvas>
        </div>
    );
}
