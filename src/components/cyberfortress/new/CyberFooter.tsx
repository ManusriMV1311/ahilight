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
                const linkGroups = footer.querySelectorAll(`.${styles.linkGroup}, .${styles.footerBrand}`);
                gsap.from(linkGroups, { opacity: 0, x: -20, stagger: 0.2, duration: 0.8, ease: "power2.out" });

                if (shutdownMsgRef.current) {
                    gsap.fromTo(shutdownMsgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.5 });
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
                    <p ref={shutdownMsgRef} id="shutdown-msg">&gt; SYSTEM STATUS: <span className={styles.statusSecure}>SECURE_</span></p>
                </div>
                <p>&copy; 2026 CyberFortress. All rights reserved.</p>
            </div>
        </footer>
    );
}
