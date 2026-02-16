"use client";

import React from 'react';
import styles from '../CyberFortress.module.css';
import Link from 'next/link';
import { CyberParticleShield } from './CyberParticleShield';

export function CyberHero() {
    return (
        <section className={styles.hero}>
            <div className={`${styles.container} ${styles.heroGrid}`}>
                <div className={styles.heroContent}>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">Autonomous Security Platform</h1>
                    <p className={`${styles.subtitle} text-lg md:text-xl max-w-2xl`}>
                        CyberFortress detects threats through behavioral correlation, responds with policy driven
                        automation, and maintains tamper proof audit trails.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/products/cyberfortress/demo" className="btn-premium-dark">Request Demo</Link>
                        <Link href="/products/cyberfortress/features" className="px-8 py-3 rounded-full border border-red-500/30 text-red-500 font-semibold hover:bg-red-500/10 transition-all backdrop-blur-sm">Explore Features</Link>
                    </div>
                </div>
                {/* Hero visual is handled by 3D canvas mostly, but we keep the structure if needed for non-3D fallback or positioning */}
                <div className={styles.heroVisual}>
                    <CyberParticleShield />
                </div>
            </div>
        </section>
    );
}
