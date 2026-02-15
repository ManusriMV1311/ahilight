"use client";

import React, { useEffect, useRef } from 'react';
import styles from '../CyberFortress.module.css';
import gsap from 'gsap';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function CyberFooter() {
    const footerRef = useRef<HTMLElement>(null);
    const shutdownMsgRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const footer = footerRef.current;
        if (!footer) return;

        ScrollTrigger.create({
            trigger: footer,
            start: "top 90%",
            onEnter: () => {
                // Removed link animation to ensure visibility
                if (shutdownMsgRef.current) {
                    gsap.fromTo(shutdownMsgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.5 });
                }
            }
        });
    }, []);

    return (
        <footer ref={footerRef} className={styles.footer}>
            <div className={`${styles.container} ${styles.footerGrid}`}>
                <div className={styles.footerBrand}>
                    <div className={styles.logo}>
                        <span className={styles.redIcon}>▲</span>
                        <span className="logo-text">CyberFortress</span>
                    </div>
                    <p>Autonomous security at machine speed.</p>
                </div>
                <div className={styles.footerLinks}>
                    <div className={styles.linkGroup}>
                        <h4>Platform</h4>
                        <Link href="/products/cyberfortress">Overview</Link>
                        <Link href="/products/cyberfortress/features">Features</Link>
                        <Link href="/products/cyberfortress/architecture">Architecture</Link>
                    </div>
                    <div className={styles.linkGroup}>
                        <h4>Solutions</h4>
                        <Link href="/products/cyberfortress/use-cases">Use Cases</Link>
                        <Link href="/products/cyberfortress/architecture">Deployment</Link>
                    </div>
                    <div className={styles.linkGroup}>
                        <h4>Resources</h4>
                        <Link href="/products/cyberfortress/security">Security</Link>
                        <Link href="/products/cyberfortress/demo">Demo</Link>
                    </div>
                </div>
            </div>
            <div className={`${styles.container} ${styles.footerBottom}`}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <p ref={shutdownMsgRef} id="shutdown-msg">&gt; SYSTEM STATUS: <span className={styles.statusSecure}>SECURE</span></p>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/products/cyberfortress/demo" className="btn-premium-dark text-xs px-6 py-2">
                        Request Demo
                    </Link>
                    <p>&copy; 2026 CyberFortress. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
