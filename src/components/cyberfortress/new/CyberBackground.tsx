"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function CyberBackground() {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

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

        // --- Shield & Core ---
        // Shield Object
        const geometry = new THREE.DodecahedronGeometry(2, 0);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff3333, wireframe: true, transparent: true, opacity: 0.3
        });
        const shield = new THREE.Mesh(geometry, material);
        scene.add(shield);

        // Core glow
        const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xff3333, transparent: true, opacity: 0.1 });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // --- Particles ---
        const particlesCount = window.innerWidth < 768 ? 500 : 1500;
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) positions[i] = (Math.random() - 0.5) * 15;
        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({ color: 0xff3333, size: 0.02, transparent: true, opacity: 0.5 });
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

            if (shield && core) {
                shield.rotation.y += 0.005;
                shield.rotation.x += 0.002;
                core.rotation.y -= 0.008;
                shield.position.x += (mouseX - shield.position.x) * 0.05;
                shield.position.y += (-mouseY - shield.position.y) * 0.05;
            }

            // Global particles animation
            const posArr = particlesGeo.attributes.position.array as Float32Array;
            for (let i = 0; i < particlesCount * 3; i += 3) {
                posArr[i + 2] -= 0.02;
                if (posArr[i + 2] < -5) posArr[i + 2] = 10;
            }
            particlesGeo.attributes.position.needsUpdate = true;

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
            geometry.dispose();
            material.dispose();
            coreGeo.dispose();
            coreMat.dispose();
            particlesGeo.dispose();
            particlesMat.dispose();
        };

    }, []);

    return (
        <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}></div>
    );
}
