"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface Particle {
    finalPosition: THREE.Vector3;
    currentPosition: THREE.Vector3;
    velocity: THREE.Vector3;
    color: THREE.Color;
    size: number;
}

function FusionExplosion() {
    // Multiple blobs coming from all edges
    const blobRefs = useRef<(THREE.Mesh | null)[]>([]);
    const particlesRef = useRef<THREE.Points>(null);

    const particleCount = 300;
    const animationDuration = 5;

    // Initial blob positions from all sides of screen
    const blobStartPositions = useMemo(() => [
        { x: -15, y: 8, z: -5 },   // Top left
        { x: 15, y: 8, z: -5 },    // Top right
        { x: -15, y: -8, z: -5 },  // Bottom left
        { x: 15, y: -8, z: -5 },   // Bottom right
        { x: 0, y: 12, z: -5 },    // Top center
        { x: 0, y: -12, z: -5 },   // Bottom center
    ], []);

    const blobColors = ["#7D5FFF", "#00F2FF", "#A07FFF", "#5FDFFF", "#9D7FFF", "#4FEFFF"];

    const particles = useMemo<Particle[]>(() => {
        return Array.from({ length: particleCount }, () => {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 8 + Math.random() * 8;

            return {
                finalPosition: new THREE.Vector3(
                    Math.sin(phi) * Math.cos(theta) * radius,
                    Math.sin(phi) * Math.sin(theta) * radius,
                    (Math.random() - 0.5) * 10 - 5
                ),
                currentPosition: new THREE.Vector3(0, 0, 0),
                velocity: new THREE.Vector3(0, 0, 0),
                color: new THREE.Color().lerpColors(
                    new THREE.Color("#7D5FFF"),
                    new THREE.Color("#00F2FF"),
                    Math.random()
                ),
                size: Math.random() * 0.12 + 0.04,
            };
        });
    }, []);

    // Initialize particle geometry attributes
    useEffect(() => {
        if (particlesRef.current) {
            const geometry = particlesRef.current.geometry;
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
            geometry.setAttribute('size', new THREE.Float32BufferAttribute(particleSizes, 1));
        }
    }, [particlePositions, particleColors, particleSizes]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const cycle = time % animationDuration;
        const phase = cycle / animationDuration;

        // Phase 1 (0-0.3): Blobs rush in from all sides
        if (phase < 0.3) {
            const approachProgress = phase / 0.3;
            const easeIn = 1 - Math.pow(1 - approachProgress, 3); // Ease in cubic

            blobRefs.current.forEach((blob, i) => {
                if (!blob) return;
                const start = blobStartPositions[i];

                blob.visible = true;
                blob.position.x = THREE.MathUtils.lerp(start.x, 0, easeIn);
                blob.position.y = THREE.MathUtils.lerp(start.y, 0, easeIn);
                blob.position.z = -5;
                blob.scale.setScalar(1.5 + Math.sin(time * 5) * 0.2);
            });

            if (particlesRef.current) {
                particlesRef.current.visible = false;
            }
        }
        // Phase 2 (0.3-0.38): Fusion moment - blobs merge and pulse
        else if (phase < 0.38) {
            const fusionProgress = (phase - 0.3) / 0.08;
            const pulse = Math.sin(fusionProgress * Math.PI * 8) * 0.5;

            blobRefs.current.forEach((blob) => {
                if (!blob) return;
                blob.position.set(0, 0, -5);
                blob.scale.setScalar(2 + pulse);
            });

            if (particlesRef.current) {
                particlesRef.current.visible = false;
            }
        }
        // Phase 3 (0.38-0.45): EXPLOSION - hide blobs, blast particles
        else if (phase < 0.45) {
            blobRefs.current.forEach((blob) => {
                if (blob) blob.visible = false;
            });

            if (particlesRef.current) {
                particlesRef.current.visible = true;
                const explosionProgress = (phase - 0.38) / 0.07;
                const blastEase = explosionProgress < 0.5
                    ? 4 * explosionProgress * explosionProgress * explosionProgress
                    : 1 - Math.pow(-2 * explosionProgress + 2, 3) / 2;

                const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
                const sizes = particlesRef.current.geometry.attributes.size?.array as Float32Array;

                particles.forEach((particle, i) => {
                    const i3 = i * 3;
                    const explosionRadius = blastEase * 25;

                    const direction = particle.finalPosition.clone().normalize();
                    particle.currentPosition.copy(direction.multiplyScalar(explosionRadius));

                    positions[i3] = particle.currentPosition.x;
                    positions[i3 + 1] = particle.currentPosition.y;
                    positions[i3 + 2] = particle.currentPosition.z - 5;

                    if (sizes) {
                        sizes[i] = particle.size * (1 + blastEase * 3);
                    }
                });

                particlesRef.current.geometry.attributes.position.needsUpdate = true;
                if (sizes) particlesRef.current.geometry.attributes.size.needsUpdate = true;
            }
        }
        // Phase 4 (0.45-0.65): Particles settle into final positions
        else if (phase < 0.65) {
            blobRefs.current.forEach((blob) => {
                if (blob) blob.visible = false;
            });

            if (particlesRef.current) {
                particlesRef.current.visible = true;
                const settleProgress = (phase - 0.45) / 0.2;
                const settleEase = 1 - Math.pow(1 - settleProgress, 4);

                const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
                const sizes = particlesRef.current.geometry.attributes.size?.array as Float32Array;

                particles.forEach((particle, i) => {
                    const i3 = i * 3;

                    // Smoothly move from current blast position to final position
                    const lerpedPos = new THREE.Vector3().lerpVectors(
                        particle.currentPosition,
                        particle.finalPosition,
                        settleEase
                    );

                    positions[i3] = lerpedPos.x;
                    positions[i3 + 1] = lerpedPos.y;
                    positions[i3 + 2] = lerpedPos.z - 5;

                    if (sizes) {
                        sizes[i] = particle.size;
                    }
                });

                particlesRef.current.geometry.attributes.position.needsUpdate = true;
                if (sizes) particlesRef.current.geometry.attributes.size.needsUpdate = true;
            }
        }
        // Phase 5 (0.65-1): Smooth floating motion in final positions
        else {
            blobRefs.current.forEach((blob) => {
                if (blob) blob.visible = false;
            });

            if (particlesRef.current) {
                particlesRef.current.visible = true;
                const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

                particles.forEach((particle, i) => {
                    const i3 = i * 3;

                    // Gentle wave motion
                    const waveX = Math.sin(time * 0.5 + i * 0.1) * 0.05;
                    const waveY = Math.cos(time * 0.4 + i * 0.15) * 0.05;

                    positions[i3] = particle.finalPosition.x + waveX;
                    positions[i3 + 1] = particle.finalPosition.y + waveY;
                    positions[i3 + 2] = particle.finalPosition.z - 5;
                });

                particlesRef.current.geometry.attributes.position.needsUpdate = true;
            }
        }

        // Reset for next cycle
        if (phase >= 0.98) {
            particles.forEach((particle) => {
                particle.currentPosition.set(0, 0, 0);
            });
        }
    });

    const particlePositions = useMemo(() =>
        new Float32Array(particleCount * 3).fill(0),
        []);

    const particleColors = useMemo(() =>
        new Float32Array(particles.flatMap(p => [p.color.r, p.color.g, p.color.b])),
        [particles]);

    const particleSizes = useMemo(() =>
        new Float32Array(particles.map(p => p.size)),
        [particles]);

    return (
        <>
            {/* Multiple blobs from all sides */}
            {blobStartPositions.map((_, i) => (
                <mesh
                    key={i}
                    ref={(el) => { blobRefs.current[i] = el; }}
                    position={[0, 0, -5]}
                    scale={1.5}
                >
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color={blobColors[i]}
                        attach="material"
                        distort={0.5}
                        speed={2}
                        roughness={0.3}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}

            {/* Explosion Particles */}
            <points ref={particlesRef}>
                <bufferGeometry />
                <pointsMaterial
                    size={0.1}
                    vertexColors
                    transparent
                    opacity={0.9}
                    sizeAttenuation
                />
            </points>
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
                camera={{ position: [0, 0, 12], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#7D5FFF" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00F2FF" />
                <FusionExplosion />
            </Canvas>
        </div>
    );
}
