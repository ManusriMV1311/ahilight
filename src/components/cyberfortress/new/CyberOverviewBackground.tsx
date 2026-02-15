"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CyberOverviewBackground() {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const container = canvasRef.current;
        if (!container) return;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.innerHTML = ''; // Clear previous
        container.appendChild(renderer.domElement);

        camera.position.z = 5;

        // --- Particles ---
        // Increased count slightly for better coverage without the shield
        const particlesCount = window.innerWidth < 768 ? 800 : 2000;
        const positions = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 25; // Wider spread
            positions[i + 1] = (Math.random() - 0.5) * 25;
            positions[i + 2] = (Math.random() - 0.5) * 15;
        }

        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMat = new THREE.PointsMaterial({
            color: 0xff3333,
            size: 0.03,
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particles);

        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Global particles animation - Flowing effect
            const posArr = particlesGeo.attributes.position.array as Float32Array;
            for (let i = 0; i < particlesCount * 3; i += 3) {
                // Gentle flow downwards and slightly rotating
                posArr[i + 1] -= 0.005; // Y axis down
                posArr[i + 2] += Math.sin(Date.now() * 0.001 + posArr[i]) * 0.002; // Breathing Z

                // Reset specific particles if they go too low
                if (posArr[i + 1] < -10) {
                    posArr[i + 1] = 10;
                    posArr[i] = (Math.random() - 0.5) * 25;
                    posArr[i + 2] = (Math.random() - 0.5) * 15;
                }
            }
            particlesGeo.attributes.position.needsUpdate = true;

            // Subtle camera movement based on mouse
            camera.position.x += (mouseX - camera.position.x) * 0.02;
            camera.position.y += (-mouseY - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        // Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (container && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            particlesGeo.dispose();
            particlesMat.dispose();
        };

    }, []);

    return (
        <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}></div>
    );
}
