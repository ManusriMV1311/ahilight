"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LiquidLandscape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const { clock } = state;
        const t = clock.getElapsedTime();

        // Update geometry vertices for wave effect
        // Note: Mutating geometry in useFrame can be expensive. 
        // Ideally, use a shader material. For simplicity/performance without custom shaders, 
        // we can rotate a displacement map or use simple movement.

        // Let's just rotate gently and let the material properties do the work
        // Or we use a simple sine wave on the mesh rotation/position
        meshRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 0.1) * 0.05;
        meshRef.current.position.y = -2 + Math.sin(t * 0.2) * 0.1;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[20, 20, 64, 64]} />
            <meshStandardMaterial
                color="#000"
                metalness={0.9}
                roughness={0.1}
                wireframe={false}
            />
        </mesh>
    );
}

// Custom Grid Landscape
function GridLandscape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        // Move the grid towards camera or create a flow
        // meshRef.current.position.z = (t * 0.5) % 2; 

        // Let's create a rolling wave effect via vertices if possible, 
        // but for now, we'll settle for a nice retro-grid style or liquid metal look
        // The user asked for "Liquid metal surface". 

        // We can simulate liquid by oscillating existing vertices if we access the geometry.
        // For performance in this simple setup, we'll rely on the reflective material and lights.

        // Add minimal rotation
        meshRef.current.rotation.z = t * 0.05;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, -5]}>
            <planeGeometry args={[50, 50, 50, 50]} />
            <meshStandardMaterial
                color="#333"
                wireframe
                emissive="#000000"
                opacity={0.3}
                transparent
            />
        </mesh>
    )

}


export function VisionBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-neutral-950">
            <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
                <fog attach="fog" args={["#0a0a0a", 5, 20]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#4f46e5" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#cyan" />

                {/* Liquid Metal Reflector */}
                <GridLandscape />
                <LiquidLandscape />

            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        </div>
    );
}
