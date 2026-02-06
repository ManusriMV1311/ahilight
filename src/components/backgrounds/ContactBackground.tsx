"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Float, Html, Stars } from '@react-three/drei';
import { SharedUniverse } from "./common/SharedUniverse";

function Globe() {
    return (
        <mesh>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial
                color="#000000"
                emissive="#1e3a8a"
                emissiveIntensity={0.5}
                wireframe
            />
        </mesh>
    );
}

function Satellites({ count = 10 }: { count?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    const satellites = useMemo(() => {
        return new Array(count).fill(0).map((_, i) => ({
            radius: 3 + Math.random() * 2,
            speed: 0.2 + Math.random() * 0.5,
            offset: Math.random() * Math.PI * 2,
            orbitAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
        }));
    }, [count]);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime;
        groupRef.current.rotation.y = t * 0.1;
    });

    return (
        <group ref={groupRef}>
            {satellites.map((sat, i) => (
                <Satellite key={i} {...sat} />
            ))}
        </group>
    )
}

function Satellite({ radius, speed, offset, orbitAxis }: any) {
    const ref = useRef<THREE.Mesh>(null);
    const vec = new THREE.Vector3();
    const axis = orbitAxis;

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime;
        const angle = t * speed + offset;

        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        vec.set(x, 0, z);
        vec.applyAxisAngle(new THREE.Vector3(1, 0, 0), axis.x * Math.PI); // Random tilt
        vec.applyAxisAngle(new THREE.Vector3(0, 0, 1), axis.z * Math.PI);

        ref.current.position.copy(vec);
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#00ffff" />
        </mesh>
    );
}

export function ContactBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <SharedUniverse />

                <Globe />
                <Satellites count={15} />

            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/80" />
        </div>
    );
}
