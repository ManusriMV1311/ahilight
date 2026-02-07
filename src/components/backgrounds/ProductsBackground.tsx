"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

// AhiLight text component
function AhiLightText({ opacity, scale }: { opacity: number, scale: number }) {
    const textRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!textRef.current || !glowRef.current) return;
        const t = state.clock.elapsedTime;

        // Gentle pulsing
        const pulse = Math.sin(t * 1.5) * 0.05 + 1;
        textRef.current.scale.setScalar(scale * pulse);
        glowRef.current.scale.setScalar(scale * pulse * 1.2);

        // Control opacity
        const textMat = textRef.current.material as THREE.MeshStandardMaterial;
        const glowMat = glowRef.current.material as THREE.MeshStandardMaterial;
        textMat.opacity = opacity;
        glowMat.opacity = opacity * 0.3;
    });

    return (
        <group>
            {/* Glow background */}
            <Text
                ref={glowRef}
                font="/fonts/Inter-Bold.ttf"
                fontSize={1.5}
                letterSpacing={0.1}
                position={[0, 0, -0.1]}
            >
                AhiLight
                <meshStandardMaterial
                    color="#7D5FFF"
                    emissive="#7D5FFF"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.3}
                    toneMapped={false}
                />
            </Text>

            {/* Main text */}
            <Text
                ref={textRef}
                font="/fonts/Inter-Bold.ttf"
                fontSize={1.5}
                letterSpacing={0.1}
            >
                AhiLight
                <meshStandardMaterial
                    color="#00F2FF"
                    emissive="#00F2FF"
                    emissiveIntensity={3}
                    transparent
                    opacity={1}
                    toneMapped={false}
                />
            </Text>

            {/* Point light from text */}
            <pointLight intensity={opacity * 5} distance={20} color="#00F2FF" />
        </group>
    );
}

export function ProductsBackground({ show }: { show: boolean }) {
    const [mounted, setMounted] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [scale, setScale] = useState(0.5);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (show) {
            // Fade in and grow
            let currentOpacity = 0;
            let currentScale = 0.5;
            const fadeInInterval = setInterval(() => {
                currentOpacity = Math.min(1, currentOpacity + 0.05);
                currentScale = Math.min(1, currentScale + 0.025);
                setOpacity(currentOpacity);
                setScale(currentScale);

                if (currentOpacity >= 1) {
                    clearInterval(fadeInInterval);
                }
            }, 16);

            return () => clearInterval(fadeInInterval);
        } else {
            // Fade out
            const fadeOutInterval = setInterval(() => {
                setOpacity(prev => Math.max(0, prev - 0.03));
                setScale(prev => Math.min(1.3, prev + 0.03)); // Expand while fading

                if (opacity <= 0) {
                    clearInterval(fadeOutInterval);
                }
            }, 16);

            return () => clearInterval(fadeOutInterval);
        }
    }, [show]);

    if (!mounted) return (
        <div className="fixed inset-0 z-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>
    );

    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                <color attach="background" args={['#0a0118']} />

                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#7D5FFF" />

                {/* AhiLight text */}
                <AhiLightText opacity={opacity} scale={scale} />

                {/* Fog */}
                <fog attach="fog" args={['#0a0118', 5, 20]} />
            </Canvas>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />
        </div>
    );
}
