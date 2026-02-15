"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function TrafficStream({ count = 100, color = "#ef4444", speed = 1, yOffset = 0 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    // Generate random positions for traffic lanes
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const lane = Math.floor(Math.random() * 10) - 5; // 10 lanes centered at 0
            const z = (Math.random() - 0.5) * 40; // Spread along depth
            const speedVar = 0.5 + Math.random() * 0.5; // Random speed variation
            const length = 0.5 + Math.random() * 1.5; // Random packet length
            temp.push({ lane, z, speedVar, length });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        particles.forEach((particle, i) => {
            // Move particle forward
            particle.z += delta * speed * particle.speedVar * 10;

            // Reset loop
            if (particle.z > 20) {
                particle.z = -20;
            }

            dummy.position.set(particle.lane * 2, yOffset, particle.z);
            dummy.scale.set(0.1, 0.1, particle.length);
            dummy.updateMatrix();
            meshRef.current?.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                transparent
                opacity={0.8}
            />
        </instancedMesh>
    );
}

function GridFloor() {
    return (
        <gridHelper
            args={[50, 20, 0x333333, 0x111111]}
            position={[0, -1, 0]}
        />
    );
}

function CyberTrafficContent() {
    return (
        <>
            <ambientLight intensity={0.1} />
            <fog attach="fog" args={['#000000', 5, 30]} />

            {/* Main Highway */}
            <TrafficStream count={150} color="#ef4444" speed={1.5} yOffset={0} />

            {/* Upper Lane (Reflective Traffic) */}
            <TrafficStream count={50} color="#b91c1c" speed={1.2} yOffset={4} />

            {/* Lower Lane */}
            <TrafficStream count={50} color="#991b1b" speed={0.8} yOffset={-4} />

            {/* Background Grid Lines to give depth */}
            <GridFloor />
        </>
    );
}

export function CyberTraffic() {
    return (
        <div className="fixed inset-0 -z-10 opacity-70">
            <Canvas
                camera={{ position: [0, 2, 12], fov: 60 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                {/* Fixed background to allow transparency from parent */}
                {/* <color attach="background" args={['#000000']} /> REMOVED for transparency */}
                <CyberTrafficContent />
            </Canvas>
        </div>
    );
}
