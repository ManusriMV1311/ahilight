"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Plane, PerspectiveCamera } from '@react-three/drei';

function MovingGrid() {
    const gridRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (materialRef.current) {
            // Move grid forward by animating texture offset or shader uniform
            // Simple approach: Shift the UVs or position
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
        }
    });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: new THREE.Color("#00f2ff") }, // Electric Blue/Cyan
            uFadeDistance: { value: 40.0 }
        }),
        []
    );

    const vertexShader = `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
            vUv = uv;
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uFadeDistance;
        varying vec2 vUv;
        varying vec3 vPos;

        void main() {
            // Infinite grid logic
            // Scale UVs for grid density
            vec2 gridUV = vUv * 60.0; 
            
            // Move grid
            gridUV.y += uTime * 4.0;

            // Grid lines
            float thickness = 0.05;
            float x = fract(gridUV.x);
            float y = fract(gridUV.y);
            
            float line = step(1.0 - thickness, x) + step(1.0 - thickness, y);
            line = clamp(line, 0.0, 1.0);

            // Fade out into distance (fog)
            float dist = distance(vPos.xy, vec2(0.0)); // Simple radial distance check? 
            // Better: use z-depth or distance from camera logic in JS, but here vPos is local plane
            // Since plane is huge, let's just use vUv distance from center
            
            float opacity = line * (1.0 - smoothstep(0.0, 0.8, distance(vUv, vec2(0.5))));

            gl_FragColor = vec4(uColor, opacity * 0.5);
        }
    `;

    return (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            {/* Huge plane for the grid floor */}
            <mesh>
                <planeGeometry args={[100, 100, 1, 1]} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent
                    side={THREE.DoubleSide}
                    uniforms={uniforms}
                />
            </mesh>
        </group>
    );
}

function StarField() {
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < 300; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 50;
            p.push(x, y, z);
        }
        return new Float32Array(p);
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#ffffff"
                transparent
                opacity={0.6}
                sizeAttenuation={true}
            />
        </points>
    )
}

export function DigitalGridBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-deep-navy pointer-events-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={60} />
                <ambientLight intensity={0.2} />

                <MovingGrid />

                {/* Fog for depth */}
                <fog attach="fog" args={['#0a0118', 5, 30]} />
            </Canvas>
            {/* Gradient Overlay to blend with page content */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-deep-navy/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-deep-navy via-transparent to-transparent" />
        </div>
    );
}
