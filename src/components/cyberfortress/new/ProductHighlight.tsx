"use client";

import React, { useEffect, useRef } from 'react';
import styles from '../CyberFortress.module.css';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AutonomousDefenseVisual } from '../visuals/AutonomousDefenseVisual';
import { GlobalThreatMapVisual } from '../visuals/GlobalThreatMapVisual';
import { NeuralCoreVisual } from '../visuals/NeuralCoreVisual';

// Retriggering HMR
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
                    <h2>Mission Control</h2>
                    <p>Complete visibility and control over your entire security posture.</p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">

                    {/* Card 1: Main Dashboard (Span 2 cols, 2 rows on desktop) */}
                    <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-black/80 via-black/50 to-red-950/20 backdrop-blur-2xl transition-all hover:border-red-500/60 hover:shadow-[0_0_60px_rgba(220,38,38,0.25)] h-full">
                        <AutonomousDefenseVisual />
                    </div>

                    {/* Card 2: Global Threat Map */}
                    <div className="relative group overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-black/80 via-black/50 to-red-950/20 backdrop-blur-2xl hover:border-red-500/60 transition-all flex flex-col h-full hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                        <GlobalThreatMapVisual />
                    </div>

                    {/* Card 3: Neural Core (Adjusted grouping if desired or keep as 2nd row bottom right) */}
                    <div className="relative group overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-black/80 via-black/50 to-red-950/20 backdrop-blur-2xl hover:border-red-500/60 transition-all flex flex-col h-full md:col-start-3 md:row-start-2 hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                        <NeuralCoreVisual />
                    </div>
                </div>


            </div>
        </section>
    );
}
