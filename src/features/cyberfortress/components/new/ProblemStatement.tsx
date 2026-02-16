"use client";

import React, { useEffect } from 'react';
import styles from '../CyberFortress.module.css';
import { Radar, ShieldCheck, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ProblemStatement() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: `.${styles.problemStatement}`,
            start: "top 80%",
            onEnter: () => {
                // Animation removed to ensure visibility
            }
        });
    }, []);

    return (
        <section className={styles.problemStatement} id="problem-section">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2>Unified Platform for Autonomous Security</h2>
                    <p>CyberFortress combines autonomous detection, policy driven response, adversarial deception, and
                        immutable audit in a single platform. Built for enterprise deployments with real SLAs, proper
                        security, and actual support.</p>
                </div>
                <div className={styles.problemGrid}>
                    <div className={`${styles.problemCard} group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 hover:border-red-500/30 transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]`} id="card-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className={`${styles.cardIcon} mb-4 text-red-500`}>
                            <Radar size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Autonomous Detection</h3>
                        <p className="text-slate-400 text-sm relative z-10">Traditional tools alert on signatures or rules. CyberFortress correlates behaviors across
                            domains to identify attack chains before they complete.</p>
                    </div>
                    <div className={`${styles.problemCard} group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 hover:border-red-500/30 transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]`} id="card-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className={`${styles.cardIcon} mb-4 text-red-500`}>
                            <ShieldCheck size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Policy Driven Response</h3>
                        <p className="text-slate-400 text-sm relative z-10">Automation without guardrails is dangerous. CyberFortress executes predefined response
                            playbooks with rollback capabilities and human override.</p>
                    </div>
                    <div className={`${styles.problemCard} group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 hover:border-red-500/30 transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]`} id="card-3">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className={`${styles.cardIcon} mb-4 text-red-500`}>
                            <EyeOff size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Adversarial Deception</h3>
                        <p className="text-slate-400 text-sm relative z-10">Passive defense is insufficient. CyberFortress actively deceives attackers with adaptive
                            honeypots that waste adversary time and gather intelligence.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
