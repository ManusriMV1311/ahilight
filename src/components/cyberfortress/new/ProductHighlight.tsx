"use client";

import React, { useEffect, useRef } from 'react';
import styles from '../CyberFortress.module.css';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ProductHighlight() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        if (!section) return;

        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => {
                const solutionCard = section.querySelector(`.${styles.featureCardLarge}`);
                if (solutionCard) {
                    setTimeout(() => {
                        solutionCard.classList.add(styles.stabilized);
                        gsap.from(solutionCard, { scale: 0.95, filter: 'blur(10px)', duration: 1.5, ease: "power4.out" });
                    }, 500);
                }
            }
        });
    }, []);

    return (
        <section ref={sectionRef} className={styles.productHighlight} id="product-highlight">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2>Key Features</h2>
                    <p>Enterprise-grade capabilities designed for production deployment.</p>
                </div>
                <div className={styles.gridLayout}>
                    <div className={`${styles.featureCard} ${styles.featureCardLarge}`}>
                        <div className={styles.solutionGlow}></div>

                        <h2>Immutable Audit & Compliance</h2>
                        <p className={styles.cardDesc}>Compliance and forensics require tamper-proof records. CyberFortress
                            maintains blockchain-backed audit trails for every detection and response action.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="#" className={`${styles.btnPrimary} ${styles.btn}`}>Learn More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
