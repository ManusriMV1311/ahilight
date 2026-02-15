"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { CatmullRomCurve3 } from 'three';

function OpticalCable({ curve, speed, offset }: { curve: THREE.CatmullRomCurve3, speed: number, offset: number }) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed + offset;
        }
    });

    const shaderArgs = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color("#ef4444") },
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            uniform vec3 uColor;
            varying vec2 vUv;
            void main() {
                // Moving pulse along the tube length (u-coordinate)
                float pulse = sin(vUv.x * 20.0 - uTime * 5.0);
                pulse = pow(clamp(pulse, 0.0, 1.0), 10.0); // Sharpen pulse
                
                vec3 finalColor = uColor * (0.1 + pulse * 2.0); // Base dim glow + bright pulse
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `,
    }), []);

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
            <shaderMaterial
                ref={materialRef}
                args={[shaderArgs]}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function FiberBundle({ count = 15 }) {
    const cables = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            // Generate random curvy path
            const points = [];
            for (let j = 0; j < 5; j++) {
                points.push(
                    new THREE.Vector3(
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10 + (j * 2), // Move upwards generally
                        (Math.random() - 0.5) * 5
                    )
                );
            }
            const curve = new CatmullRomCurve3(points);
            const speed = 0.5 + Math.random() * 0.5;
            const offset = Math.random() * 10;
            temp.push({ curve, speed, offset });
        }
        return temp;
    }, [count]);

    return (
        <group>
            {cables.map((cable, i) => (
                <OpticalCable key={i} {...cable} />
            ))}
        </group>
    );
}

export function FiberOptics() {
    return (
        <div className="fixed inset-0 -z-10 opacity-50">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                gl={{ alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.2} />
                <FiberBundle count={20} />
            </Canvas>
        </div>
    );
}
