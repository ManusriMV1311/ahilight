"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

function FlowingParticles() {
    const particlesRef = useRef<any>(null);
    const particleCount = 3000;

    // Generate random positions in a sphere
    const positions = random.inSphere(new Float32Array(particleCount * 3), { radius: 15 });

    useFrame((state) => {
        if (!particlesRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = particlesRef.current.geometry.attributes.position.array;

        // Animate particles flowing from left to right
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Move particles to the right
            positions[i3] += 0.01;

            // Add wave motion
            positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.002;

            // Reset particles that move too far right
            if (positions[i3] > 15) {
                positions[i3] = -15;
                positions[i3 + 1] = (Math.random() - 0.5) * 10;
                positions[i3 + 2] = (Math.random() - 0.5) * 10;
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;

        // Rotate the whole particle system slowly
        particlesRef.current.rotation.y = time * 0.05;
    });

    return (
        <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00F2FF"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
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
                <FlowingParticles />
            </Canvas>
        </div>
    );
}
