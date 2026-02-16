"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSystem = () => {
    const count = 2000;
    const mesh = useRef<THREE.Points>(null);
    const { viewport, mouse } = useThree();

    const particles = useMemo(() => {
        const temp = [];
        const targetPositions = [];
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Initial random positions (scattered)
            const r = 4 + Math.random() * 4;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            temp.push(x, y, z);
            scales[i] = Math.random();

            // Target positions (Shield + C)
            let tx, ty, tz;
            const seed = Math.random();

            if (seed < 0.7) {
                // Shield Outline & Body
                // Shield shape roughly: top flat, sides vertical, bottom curved to point
                // x: -1.5 to 1.5, y: -2 to 1.5
                const shieldR = 2.5;
                const shieldAngle = Math.random() * Math.PI * 2; // Full coverage? No, shape.

                // Parametric Shield
                // Simple approach: rejection sampling for a shield shape
                // x in [-2, 2], y in [-2.5, 2]
                // Top: y=1.5
                // Bottom curve: y = 1.5 - 0.5*x^2 (approx)
                let sx, sy;
                let valid = false;
                while (!valid) {
                    sx = (Math.random() - 0.5) * 4;
                    sy = (Math.random() - 0.5) * 5;

                    // Shield Logic:
                    // Top bound: y < 1.8
                    // Bottom bound: y > -2.5 + ax^2
                    // Side bound: |x| < 1.8
                    // "C" hole logic: separate step
                    const bottomCurve = -2.5 + 0.8 * (sx * sx);
                    const isInsideShield = sy < 1.8 && sy > bottomCurve && Math.abs(sx) < 2.0;

                    if (isInsideShield) {
                        // Create 'C' hole
                        // C is roughly a circle arc from 45 to 315 deg
                        const d = Math.sqrt(sx * sx + sy * sy);
                        const angle = Math.atan2(sy, sx); // -PI to PI
                        // C inner/outer radius
                        const isInsideC = d > 0.8 && d < 1.2 && (Math.abs(angle) > 0.5 || sx < 0);

                        if (!isInsideC) { // Fill shield EXCEPT C
                            valid = true;
                        } else {
                            // If it IS inside C, we might want to emphasize the C with different color or just lack of particles?
                            // User wants "Dot must form shield and letter c inside". 
                            // So points should be ON the Shield and ON the C? Or Shield with C negative space?
                            // "Shield symbol and letter c inside" -> usually means C is drawn.

                            // Let's draw the Shield Outline and the C Outline/Body.
                        }
                    }
                }

                // Let's try explicit shape generation for cleaner look
            }
        }
        return { initial: new Float32Array(temp), target: new Float32Array(temp) }; // Placeholder
    }, []);

    // Re-calculating specific shapes
    const { positions, colorData } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colorData = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            let x, y, z;
            // Target Shape Generation
            const isShield = Math.random() > 0.25; // 75% Shield, 25% C

            if (isShield) {
                // Shield Border/Fill
                // Parametric approximation of a shield
                // t goes 0 to 1
                // Top line: (-1.5, 1.5) to (1.5, 1.5)
                // Side/Bottom curves

                let valid = false;
                while (!valid) {
                    const sx = (Math.random() - 0.5) * 5;
                    const sy = (Math.random() - 0.5) * 6;

                    // Simple distinct shield equation
                    // x^4 + (y/1.5)^4 approx box, let's use intersection of curves
                    // vertical sides at x=+-1.8 from y=1.5 down to y=0
                    // point at (0, -2.5)
                    // ellipse connecting (1.8, 0) to (0, -2.5)

                    const absX = Math.abs(sx);

                    let inside = false;
                    if (sy > 0 && sy < 1.8 && absX < 1.8) inside = true; // Top block
                    else if (sy <= 0 && sy > -2.5) {
                        // Ellipse quadrant: (x/1.8)^2 + (y/2.5)^2 = 1
                        if ((absX / 1.8) ** 2 + (sy / 2.5) ** 2 < 1) inside = true;
                    }

                    // Exclude center for C
                    const d = Math.sqrt(sx * sx + sy * sy);
                    if (d < 1.4) inside = false; // Clear out middle

                    if (inside) {
                        x = sx;
                        y = sy;
                        z = (Math.random() - 0.5) * 0.5; // Slight thickness
                        valid = true;
                    }
                }
            } else {
                // The 'C' character
                // Arc
                const theta = Math.random() * Math.PI * 1.5 + Math.PI * 0.75; // 135deg to 405deg
                const rad = 0.8 + Math.random() * 0.3;
                x = Math.cos(theta) * rad;
                y = Math.sin(theta) * rad; // Center C at 0,0
                z = (Math.random() - 0.5) * 0.2;
            }

            positions[i * 3] = (Math.random() - 0.5) * 15; // Start random far
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            // Store target in geometric user data or separate array? 
            // We'll use a physics-based approach in useFrame or simple lerp
        }
        return { positions, colorData };
    }, []);

    // We need to store target positions.
    // Let's use a simpler approach: Standard BufferGeometry with attributes, animate "current" to "target"

    // Actually, let's just use the `points` ref and animate `position` attribute directly.
    const targets = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            let x = 0, y = 0, z = 0;
            const isShield = Math.random() > 0.3;

            if (isShield) {
                // Shield
                let valid = false;
                while (!valid) {
                    const sx = (Math.random() - 0.5) * 4;
                    const sy = (Math.random() - 0.5) * 5;

                    // Shield Shape
                    const absX = Math.abs(sx);
                    let inside = false;
                    // Top box
                    if (sy >= 0 && sy < 1.5 && absX < 1.6) inside = true;
                    // Bottom curve
                    else if (sy < 0 && sy > -2.2) {
                        if ((absX / 1.6) ** 2 + (sy / 2.2) ** 2 < 1) inside = true;
                    }

                    // Hollow out center
                    if (inside) {
                        // C hole
                        const d = Math.sqrt(sx * sx + sy * sy);
                        if (d < 1.0) inside = false;
                    }

                    if (inside) {
                        x = sx;
                        y = sy;
                        z = (Math.random() - 0.5) * 0.2;
                        valid = true;
                    }
                }
            } else {
                // Main C
                const theta = (Math.random() * 1.6 * Math.PI) + 0.8; // Angle range
                const r = 0.6 + Math.random() * 0.2;
                // Shift C slightly if needed, but 0,0 is fine inside shield
                x = Math.cos(theta) * r;
                y = Math.sin(theta) * r;
                z = (Math.random() - 0.5) * 0.2;
            }
            arr[i * 3] = x;
            arr[i * 3 + 1] = y;
            arr[i * 3 + 2] = z;
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();
        const positions = mesh.current.geometry.attributes.position.array as Float32Array;

        // Mouse interaction
        const mx = (state.mouse.x * viewport.width) / 2;
        const my = (state.mouse.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const tx = targets[i3];
            const ty = targets[i3 + 1];
            const tz = targets[i3 + 2];

            // Noise / Float
            const noiseX = Math.sin(time + i) * 0.05;
            const noiseY = Math.cos(time + i * 0.5) * 0.05;

            // Lerp to target
            // We want them to form the shape.
            positions[i3] += (tx - positions[i3]) * 0.05;
            positions[i3 + 1] += (ty - positions[i3 + 1]) * 0.05;
            positions[i3 + 2] += (tz - positions[i3 + 2]) * 0.05;

            // Add subtle floating interaction
            // If mouse is close, disperse slightly?
            const dx = positions[i3] - mx * 2; // scale mouse influence
            const dy = positions[i3 + 1] - my * 2;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 2) {
                const force = (2 - dist) * 0.1;
                positions[i3] += dx * force;
                positions[i3 + 1] += dy * force;
            }
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.initial}
                    itemSize={3}
                    args={[particles.initial, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#ef4444"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export function CyberParticleShield() {
    return (
        <div className="w-full h-[500px] relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ParticleSystem />
                </Float>
            </Canvas>
        </div>
    );
}
