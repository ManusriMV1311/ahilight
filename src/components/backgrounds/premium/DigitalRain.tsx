"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function RainStream({ count = 500, color = "#ef4444", speed = 1 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // Generate particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 30;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10 - 5;
            const len = 0.5 + Math.random() * 1.5;
            const speedVar = 0.5 + Math.random() * 1.5;
            temp.push({ x, y, z, len, speedVar });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        const mesh = meshRef.current;
        if (!mesh) return;

        particles.forEach((p, i) => {
            p.y -= delta * speed * p.speedVar * 5;

            if (p.y < -15) {
                p.y = 15;
                p.x = (Math.random() - 0.5) * 30;
            }

            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(0.02, p.len, 0.02); // Thin vertical lines
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.4}
            />
        </instancedMesh>
    );
}

export function DigitalRain() {
    return (
        <div className="fixed inset-0 -z-10 opacity-50">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true }}
                dpr={[1, 2]}
            >
                {/* No lights needed for basic material, keeps it performant and stark */}
                <RainStream count={600} color="#ef4444" speed={1.5} />
                <RainStream count={200} color="#b91c1c" speed={1.0} />
            </Canvas>
        </div>
    );
}
