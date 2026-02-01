"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Activity, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"

export function CyberFortressHero() {
    return (
        <Section background="default" className="min-h-[90vh] flex items-center justify-center overflow-hidden relative border-b border-white/10">

            {/* Background Tech Mesh */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.electric-blue)_0%,transparent_70%)] opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-6">
                        <Shield className="w-4 h-4" /> CyberFortress Platform
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Autonomous Security for the <br />
                        <span className="text-electric-blue">Modern Enterprise</span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-lg">
                        Detect threats through behavioral correlation. Respond with policy-driven automation. Maintain tamper-proof audit trails.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="h-14 px-8 text-lg bg-electric-blue hover:bg-electric-blue/90 shadow-[0_0_30px_-10px_theme(colors.electric-blue)]">
                            Schedule Demo
                        </Button>
                        <Button size="lg" variant="ghost" className="h-14 px-8 text-lg text-white border border-white/20 hover:bg-white/10">
                            Download Sheet
                        </Button>
                    </div>
                </motion.div>

                {/* Hero Visual - Abstract Security Dashboard/Shield */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                        {/* Central Shield */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-64 h-64 bg-deep-navy border border-electric-blue/30 rounded-full flex items-center justify-center shadow-[0_0_50px_theme(colors.electric-blue)] bg-opacity-50 backdrop-blur-md">
                                <Shield className="w-32 h-32 text-electric-blue opacity-80" />

                                {/* Orbiting Elements */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-40px] border border-cyan-accent/20 rounded-full border-dashed"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-80px] border border-white/5 rounded-full"
                                />

                                {/* Satellite Nodes */}
                                <div className="absolute top-0 right-0 p-4 bg-deep-navy border border-white/10 rounded-xl backdrop-blur-md translate-x-12 -translate-y-12 shadow-xl">
                                    <Activity className="w-6 h-6 text-success-green mb-2" />
                                    <div className="text-sm font-mono text-white">System: Secure</div>
                                    <div className="text-xs text-slate-500">Latency: 2ms</div>
                                </div>

                                <div className="absolute bottom-0 left-0 p-4 bg-deep-navy border border-white/10 rounded-xl backdrop-blur-md -translate-x-12 translate-y-12 shadow-xl">
                                    <Lock className="w-6 h-6 text-cyan-accent mb-2" />
                                    <div className="text-sm font-mono text-white">Audit: Active</div>
                                    <div className="text-xs text-slate-500">Block chain verified</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    )
}
