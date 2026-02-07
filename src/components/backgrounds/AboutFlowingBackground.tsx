"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function MorphingBlobs() {
    const blob1Ref = useRef<THREE.Mesh>(null);
    const blob2Ref = useRef<THREE.Mesh>(null);
    const blob3Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (blob1Ref.current) {
            blob1Ref.current.position.x = Math.sin(time * 0.3) * 3;
            blob1Ref.current.position.y = Math.cos(time * 0.2) * 2;
            blob1Ref.current.rotation.x = time * 0.1;
            blob1Ref.current.rotation.y = time * 0.15;
        }

        if (blob2Ref.current) {
            blob2Ref.current.position.x = Math.cos(time * 0.25) * 4;
            blob2Ref.current.position.y = Math.sin(time * 0.3) * 2.5;
            blob2Ref.current.rotation.x = time * 0.12;
            blob2Ref.current.rotation.z = time * 0.08;
        }

        if (blob3Ref.current) {
            blob3Ref.current.position.x = Math.sin(time * 0.2) * 2.5;
            blob3Ref.current.position.y = Math.cos(time * 0.35) * 3;
            blob3Ref.current.rotation.y = time * 0.1;
            blob3Ref.current.rotation.z = time * 0.13;
        }
    });

    return (
        <>
            {/* Large purple blob */}
            <mesh ref={blob1Ref} position={[0, 0, -5]} scale={2.5}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#7D5FFF"
                    attach="material"
                    distort={0.6}
                    speed={1.5}
                    roughness={0.4}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Medium cyan blob */}
            <mesh ref={blob2Ref} position={[3, 1, -7]} scale={2}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#00F2FF"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.3}
                    transparent
                    opacity={0.35}
                />
            </mesh>

            {/* Small purple-cyan blend blob */}
            <mesh ref={blob3Ref} position={[-2, -1, -6]} scale={1.8}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#A07FFF"
                    attach="material"
                    distort={0.7}
                    speed={1.8}
                    roughness={0.35}
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </>
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
                camera={{ position: [0, 0, 8], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <MorphingBlobs />
            </Canvas>
        </div>
    );
}
