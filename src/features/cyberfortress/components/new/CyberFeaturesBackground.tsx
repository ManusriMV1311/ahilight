"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CyberFeaturesBackground() {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const container = canvasRef.current;
        if (!container) return;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0505, 0.02); // Deep red fog

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        camera.position.set(0, 15, 30);
        camera.lookAt(0, 0, 0);

        // --- 1. Neural Terrain (Particles) ---
        const particleCount = 2000;
        const particlesGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const initialY = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 120; // x
            positions[i * 3 + 1] = 0; // y (will animate)
            positions[i * 3 + 2] = (Math.random() - 0.5) * 120; // z
            initialY[i] = Math.random() * 100; // random offset for wave
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({
            color: 0xef4444, // Red
            size: 0.2,
            transparent: true,
            opacity: 0.6
        });
        const terrain = new THREE.Points(particlesGeo, particlesMat);
        scene.add(terrain);



        // --- 3. Dynamic Synapses (Lines) ---
        // We will draw lines between high-altitude particles dynamically
        const lineMaxPoints = 200; // Limit connections for performance
        const lineGeo = new THREE.BufferGeometry();
        const linePositions = new Float32Array(lineMaxPoints * 6); // 2 points * 3 coords
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xef4444,
            transparent: true,
            opacity: 0.3
        });
        const synapses = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(synapses);


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
            time += 0.01;

            // 1. Animate Terrain
            const pos = particlesGeo.attributes.position.array as Float32Array;
            const highPoints: number[] = []; // Store indices of high points

            for (let i = 0; i < particleCount; i++) {
                // Wave function based on X, Z and Time
                const x = pos[i * 3];
                const z = pos[i * 3 + 2];

                // Complex wave movement
                const y = Math.sin(x * 0.1 + time) * 2 +
                    Math.sin(z * 0.05 + time * 1.5) * 2 +
                    Math.sin((x + z) * 0.02 + time * 0.5) * 3;

                pos[i * 3 + 1] = y;

                // Collect "active" high points for connections
                if (y > 3) { // Threshold
                    highPoints.push(i);
                }
            }
            particlesGeo.attributes.position.needsUpdate = true;

            // 2. Animate Synapses
            // Reset line positions
            const linePos = lineGeo.attributes.position.array as Float32Array;
            let lineIndex = 0;

            // Randomly connect some high points
            // We shuffle or just pick a few to keep it dynamic and not static connections
            for (let i = 0; i < highPoints.length && lineIndex < lineMaxPoints * 6; i += 2) {
                if (i + 1 >= highPoints.length) break;

                const idx1 = highPoints[i];
                // Try to find a neighbor that is close
                let foundNeighbor = false;

                // Simple check for next high point in list (optimization)
                // A real spatial index would be better but overkill here
                const idx2 = highPoints[i + 1];

                const p1x = pos[idx1 * 3], p1y = pos[idx1 * 3 + 1], p1z = pos[idx1 * 3 + 2];
                const p2x = pos[idx2 * 3], p2y = pos[idx2 * 3 + 1], p2z = pos[idx2 * 3 + 2];

                const dist = Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1z - p2z, 2)); // 2D dist approximation

                if (dist < 15) {
                    linePos[lineIndex++] = p1x;
                    linePos[lineIndex++] = p1y;
                    linePos[lineIndex++] = p1z;
                    linePos[lineIndex++] = p2x;
                    linePos[lineIndex++] = p2y;
                    linePos[lineIndex++] = p2z;
                }
            }

            // clear remaining
            for (let k = lineIndex; k < lineMaxPoints * 6; k++) {
                linePos[k] = 0;
            }
            lineGeo.attributes.position.needsUpdate = true;





            // Camera Movement
            camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
            camera.position.y += (-mouseY * 2 + 15 - camera.position.y) * 0.02;
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
            particlesGeo.dispose();
            particlesMat.dispose();
            lineGeo.dispose();
            lineMat.dispose();
        };

    }, []);

    return (
        <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, background: '#0a0505' }}></div>
    );
}
