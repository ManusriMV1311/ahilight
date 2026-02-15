"use client";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const ForcefieldShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#ef4444") },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(1, 1) }, // Aspect ratio correction
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
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // Simplex noise function
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        void main() {
            vec2 uv = vUv;
            
            // Mouse interaction ripple
            float dist = distance(uv, uMouse);
            float ripple = sin(dist * 20.0 - uTime * 2.0) * exp(-dist * 3.0);
            
            // Hex/Voronoi-like pattern via noise
            float n = snoise(uv * 10.0 + uTime * 0.1);
            float n2 = snoise(uv * 20.0 - uTime * 0.2);
            
            // Combine for "Forcefield" effect
            float strength = (n + n2 + ripple) * 0.5 + 0.5;
            
            // Edge glow
            float edge = 1.0 - strength;
            edge = pow(edge, 3.0);
            
            // Output color
            vec3 finalColor = uColor * edge + (uColor * 0.2);
            float alpha = edge * 0.6; // Transparency

            gl_FragColor = vec4(finalColor, alpha);
        }
    `,
};

function ForcefieldPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, mouse } = useThree();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // Smooth mouse follow
            materialRef.current.uniforms.uMouse.value.lerp(
                new THREE.Vector2((mouse.x + 1) / 2, (mouse.y + 1) / 2),
                0.1
            );
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                args={[ForcefieldShader]}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

export function Forcefield() {
    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75 }}
                gl={{ alpha: true }}
                dpr={[1, 2]}
            >
                <ForcefieldPlane />
            </Canvas>
        </div>
    );
}
