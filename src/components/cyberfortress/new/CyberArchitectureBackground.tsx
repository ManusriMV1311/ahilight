"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CyberArchitectureBackground() {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const container = canvasRef.current;
        if (!container) return;

        // Scene Setup
        const scene = new THREE.Scene();
        // Dark fog for depth
        scene.fog = new THREE.FogExp2(0x050505, 0.02);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        camera.position.set(0, 0, 30);
        camera.lookAt(0, 0, 0);

        // --- Digital Fortress Wall (Instanced Mesh) ---
        const rows = 30;
        const cols = 50;
        const count = rows * cols;

        const geometry = new THREE.BoxGeometry(0.8, 0.8, 2); // Elongated blocks
        // Dark metallic material with red edges via wireframe clone or shader - keeping simple for now
        const material = new THREE.MeshBasicMaterial({
            color: 0x1a1a1a,
            wireframe: false,
            transparent: true,
            opacity: 0.9
        });

        const mesh = new THREE.InstancedMesh(geometry, material, count);
        scene.add(mesh);

        // Edge/Wireframe for visibility
        const edgesGeo = new THREE.EdgesGeometry(geometry);
        const edgesMat = new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.15 });
        // We can't easily instance edges geometry without a custom solution or adding many individual meshes.
        // Optimization: Use a second InstancedMesh with wireframe material on the same geometry.
        const wireframeMat = new THREE.MeshBasicMaterial({
            color: 0xef4444,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const wireframeMesh = new THREE.InstancedMesh(geometry, wireframeMat, count);
        scene.add(wireframeMesh);


        const dummy = new THREE.Object3D();
        const initialZ = new Float32Array(count);

        // Initialize Grid
        let i = 0;
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                dummy.position.set(
                    (x - cols / 2) * 1.5,
                    (y - rows / 2) * 1.5,
                    0
                );
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
                wireframeMesh.setMatrixAt(i, dummy.matrix);

                initialZ[i] = Math.random() * 2; // Random initial offset
                i++;
            }
        }
        mesh.instanceMatrix.needsUpdate = true;
        wireframeMesh.instanceMatrix.needsUpdate = true;


        // --- Scanning Light Beam ---
        const beamGeo = new THREE.PlaneGeometry(100, 2);
        const beamMat = new THREE.MeshBasicMaterial({
            color: 0xef4444,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.05,
            blending: THREE.AdditiveBlending
        });
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.position.z = 2; // Slightly in front
        scene.add(beam);


        // Interaction
        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let time = 0;
        let animationId: number;

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            time += 0.02;

            // Animate Wall Blocks (Breathing effect)
            let idx = 0;
            for (let x = 0; x < cols; x++) {
                for (let y = 0; y < rows; y++) {
                    const zOffset = Math.sin(x * 0.2 + time) * Math.cos(y * 0.2 + time) * 3;

                    dummy.position.set(
                        (x - cols / 2) * 1.5,
                        (y - rows / 2) * 1.5,
                        zOffset
                    );

                    // Look at mouse cursor (subtle interactive rotation)
                    // dummy.lookAt(mouseX * 10, -mouseY * 10, 20); // Too chaotic for a wall

                    dummy.updateMatrix();
                    mesh.setMatrixAt(idx, dummy.matrix);
                    wireframeMesh.setMatrixAt(idx, dummy.matrix);

                    // Simple color shifting based on depth?
                    // InstancedMesh color handling is per-instance, requires setColorAt
                    // Let's light up "active" blocks
                    if (zOffset > 1.5) {
                        mesh.setColorAt(idx, new THREE.Color(0xef4444));
                    } else {
                        mesh.setColorAt(idx, new THREE.Color(0x1a1a1a));
                    }

                    idx++;
                }
            }
            mesh.instanceMatrix.needsUpdate = true;
            wireframeMesh.instanceMatrix.needsUpdate = true;
            if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;


            // Animate Beam
            beam.position.y = Math.sin(time * 0.5) * 20;
            beam.material.opacity = 0.05 + Math.abs(Math.sin(time * 2)) * 0.05; // Pulse

            // Camera Sway
            camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
            camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (container && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            wireframeMat.dispose();
            beamGeo.dispose();
            beamMat.dispose();
        };

    }, []);

    return (
        <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, background: '#050505' }}></div>
    );
}
