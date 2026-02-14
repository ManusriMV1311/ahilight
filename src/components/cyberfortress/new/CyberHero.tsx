"use client";

import React, { useEffect, useRef } from 'react';
import styles from '../CyberFortress.module.css';
import * as THREE from 'three';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function CyberHero() {
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

        // ScrollTrigger
        gsap.to(camera.position, {
            z: 2,
            scrollTrigger: {
                trigger: `.${styles.hero}`,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(shield.scale, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            scrollTrigger: {
                trigger: `.${styles.hero}`,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

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
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            // Dispose geometries and materials if necessary
            geometry.dispose();
            material.dispose();
            coreGeo.dispose();
            coreMat.dispose();
            particlesGeo.dispose();
            particlesMat.dispose();
        };

    }, []);

    return (
        <section className={styles.hero}>
            <div ref={canvasRef} className={styles.heroCanvas}></div>
            <div className={`${styles.container} ${styles.heroGrid}`}>
                <div className={styles.heroContent}>
                    <h1>Autonomous Security Platform</h1>
                    <p className={styles.subtitle}>
                        CyberFortress detects threats through behavioral correlation, responds with policy-driven
                        automation, and maintains tamper-proof audit trails.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/products/cyberfortress/demo" className={`${styles.btnPrimary} ${styles.btn}`}>Request Demo</Link>
                        <Link href="/products/cyberfortress/features" className={`${styles.btnOutline} ${styles.btn}`}>Explore Features</Link>
                    </div>
                </div>
                {/* Hero visual is handled by 3D canvas mostly, but we keep the structure if needed for non-3D fallback or positioning */}
                <div className={styles.heroVisual}>
                    {/* 3D Scene is in background */}
                </div>
            </div>
        </section>
    );
}
