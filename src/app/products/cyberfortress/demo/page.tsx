'use client';

import styles from '@/components/cyberfortress/CyberFortress.module.css';
import { Mail, Shield, Building, User, FileText, Terminal, Activity, Lock, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';


// Counter Component for "Live Stats"
const LiveCounter = ({ label, value, prefix = "", suffix = "" }: { label: string, value: number, prefix?: string, suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        const stepValue = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += stepValue;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, interval);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="flex flex-col p-4 bg-white/5 border border-white/10 rounded-lg">
            <span className="text-xs text-neutral-500 font-mono uppercase mb-1">{label}</span>
            <span className="text-2xl font-bold font-mono text-red-500">
                {prefix}{count.toLocaleString()}{suffix}
            </span>
        </div>
    );
};

export default function CyberDemoPage() {
    return (
        <div className="min-h-screen text-white selection:bg-red-500/30 font-sans relative overflow-hidden">
            {/* 3D Background Removed */}
            {/* Background Grid - REMOVED */}

            <div className="relative z-10 pt-24 min-h-screen flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-stretch">

                    {/* LEFT COLUMN: System Monitor (The Hook) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:flex flex-col justify-center space-y-8 pr-12 border-r border-white/5"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-mono uppercase tracking-widest mb-6">
                                <Terminal className="w-3 h-3" />
                                System Status: Online
                            </div>
                            <h1 className="text-5xl font-bold font-heading mb-6 leading-tight">
                                Secure your <br />
                                Infrastructure <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                                    Autonomously.
                                </span>
                            </h1>
                            <p className="text-xl text-neutral-400 max-w-md">
                                Experience the platform that stops threats at machine speed.
                                Request access to the CyberFortress command center.
                            </p>
                        </div>

                        {/* Live Stat Grid */}
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                            <LiveCounter label="Threats Blocked (24h)" value={14205} />
                            <LiveCounter label="Active Sensors" value={850} />
                            <LiveCounter label="Mean Response Time" value={12} suffix="ms" />
                            <LiveCounter label="Uptime" value={99} suffix="%" />
                        </div>

                        {/* Feature List */}
                        <div className="space-y-4 pt-8 border-t border-white/10 w-full max-w-md">
                            <h3 className="text-sm font-mono text-neutral-500 uppercase">System Capabilities</h3>
                            {[
                                { icon: Cpu, text: "AI-Driven Correlation Engine" },
                                { icon: Globe, text: "Global Threat Intelligence" },
                                { icon: Lock, text: "Zero Trust Architecture" },
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-neutral-300">
                                    <div className="p-1.5 rounded bg-red-500/10 text-red-500">
                                        <feature.icon className="w-4 h-4" />
                                    </div>
                                    <span>{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: The Form (Secure Access) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full max-w-lg mx-auto lg:mx-0"
                    >
                        <div className="p-0 md:p-4 relative overflow-hidden group">
                            {/* Scanline Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,0,0,0.05)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none animate-scanline opacity-20" />
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-red-500" />
                                    Request Access
                                </h2>
                                <p className="text-neutral-500 text-sm mt-2">
                                    Enter your credentials to schedule a secure environment demo.
                                </p>
                            </div>

                            <form className="space-y-5 relative z-10">
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label htmlFor="name" className="text-xs font-mono text-red-400 uppercase">Identity</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded p-2.5 pl-10 text-sm text-white focus:border-red-500 focus:bg-red-500/5 focus:outline-none transition-all placeholder:text-neutral-600"
                                                    placeholder="NAME_ID"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label htmlFor="role" className="text-xs font-mono text-red-400 uppercase">Clearance</label>
                                            <div className="relative">
                                                <Shield className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                                                <input
                                                    type="text"
                                                    id="role"
                                                    className="w-full bg-white/5 border border-white/10 rounded p-2.5 pl-10 text-sm text-white focus:border-red-500 focus:bg-red-500/5 focus:outline-none transition-all placeholder:text-neutral-600"
                                                    placeholder="ROLE / TITLE"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-xs font-mono text-red-400 uppercase">Communication</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded p-2.5 pl-10 text-sm text-white focus:border-red-500 focus:bg-red-500/5 focus:outline-none transition-all placeholder:text-neutral-600"
                                                placeholder="WORK_EMAIL_ADDRESS"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="company" className="text-xs font-mono text-red-400 uppercase">Organization</label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                                            <input
                                                type="text"
                                                id="company"
                                                className="w-full bg-white/5 border border-white/10 rounded p-2.5 pl-10 text-sm text-white focus:border-red-500 focus:bg-red-500/5 focus:outline-none transition-all placeholder:text-neutral-600"
                                                placeholder="COMPANY_NAME"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="message" className="text-xs font-mono text-red-400 uppercase">Mission Parameters</label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                                            <textarea
                                                id="message"
                                                rows={3}
                                                placeholder="ENV_DETAILS / CHALLENGES"
                                                className="w-full bg-white/5 border border-white/10 rounded p-2.5 pl-10 text-sm text-white focus:border-red-500 focus:bg-red-500/5 focus:outline-none transition-all placeholder:text-neutral-600 resize-none"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-premium-dark w-full flex items-center justify-center gap-2 group uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]"
                                >
                                    <Activity className="w-4 h-4 animate-pulse" />
                                    Initialize Request
                                </button>

                                <div className="flex justify-between items-center text-[10px] text-neutral-600 font-mono uppercase">
                                    <span>Encryption: AES-256</span>
                                    <span>Secure Connection</span>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
