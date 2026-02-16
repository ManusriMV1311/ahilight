"use client";

import React from 'react';
import styles from '../CyberFortress.module.css';
import { Shield, Zap, Lock, Globe, FileCheck, Users } from 'lucide-react';

export function CyberFeatures() {
    return (
        <section className={styles.problemStatement}>
            <div className={styles.container}>
                <h2 className={styles.sectionHeader + " !mb-12"}>
                    <span className="text-3xl font-bold text-white">Why leading teams choose CyberFortress</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className={styles.bentoCard}>
                        <div className="p-3 bg-red-600/20 rounded-full w-fit mb-4 text-red-500 border border-red-500/30">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Real time Response</h3>
                        <p className="text-neutral-400 text-sm">
                            Automated containment actions execute in milliseconds, stopping threats before they spread.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className={styles.bentoCard}>
                        <div className="p-3 bg-red-600/20 rounded-full w-fit mb-4 text-red-500 border border-red-500/30">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Global Intelligence</h3>
                        <p className="text-neutral-400 text-sm">
                            Threat signals are correlated across our global network to immunize all customers instantly.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className={styles.bentoCard}>
                        <div className="p-3 bg-red-600/20 rounded-full w-fit mb-4 text-red-500 border border-red-500/30">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Zero Trust Core</h3>
                        <p className="text-neutral-400 text-sm">
                            Every interaction is verified. Identities and devices are continuously validated against behavioral baselines.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className={styles.bentoCard}>
                        <div className="p-3 bg-red-600/20 rounded-full w-fit mb-4 text-red-500 border border-red-500/30">
                            <FileCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Automated Compliance</h3>
                        <p className="text-neutral-400 text-sm">
                            Map distinct security controls to regulatory frameworks like SOC 2, HIPAA, and ISO 27001 automatically.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className={styles.bentoCard}>
                        <div className="p-3 bg-red-600/20 rounded-full w-fit mb-4 text-red-500 border border-red-500/30">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ransomware Rollback</h3>
                        <p className="text-neutral-400 text-sm">
                            Proprietary shadow copy technology allows 1 click restoration of encrypted files to their pre attack state.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className={styles.bentoCard}>
                        <div className="p-3 bg-red-600/20 rounded-full w-fit mb-4 text-red-500 border border-red-500/30">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Identity Defense</h3>
                        <p className="text-neutral-400 text-sm">
                            Detect and block credential theft, lateral movement, and privilege escalation attempts in real time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
