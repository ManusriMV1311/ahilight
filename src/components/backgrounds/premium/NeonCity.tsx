"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function WireframeBuildings({ count = 100 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const speed = 8;

    const buildings = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 60;
            if (Math.abs(x) < 4) continue; // Wider street

            const z = (Math.random() - 0.5) * 100 - 50;
            const h = 2 + Math.random() * 8;
            const w = 1 + Math.random() * 2;
            const d = 1 + Math.random() * 2;
            temp.push({ x, z, h, w, d });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        buildings.forEach((b, i) => {
            b.z += delta * speed;
            if (b.z > 20) {
                b.z -= 100; // Loop far back
                b.x = (Math.random() - 0.5) * 60;
                if (Math.abs(b.x) < 4) b.x += 6;
            }

            dummy.position.set(b.x, b.h / 2 - 8, b.z); // Lower floor
            dummy.scale.set(b.w, b.h, b.d);
            dummy.updateMatrix();
            meshRef.current?.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
                color="#ef4444"
                wireframe
                transparent
                opacity={0.3}
            />
        </instancedMesh>
    );
}

function GridFloor() {
    return (
        <gridHelper
            args={[100, 50, 0xff0000, 0x330000]}
            position={[0, -8, 0]}
        />
    )
}

export function NeonCity() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas
                camera={{ position: [0, 0, 0], fov: 75 }}
                gl={{ alpha: false, antialias: true }} // standard canvas
                dpr={[1, 2]}
            >
                <fog attach="fog" args={['#000000', 10, 60]} />
                <WireframeBuildings count={150} />
                <GridFloor />
            </Canvas>
        </div>
    );
}
