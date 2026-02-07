"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Building2, GraduationCap, Network } from "lucide-react";

export function AboutBacking() {
    return (
        <Section className="border-t border-slate-800/30">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="w-12 h-12 mx-auto rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Who stands with us</h3>
                        <p className="text-slate-400 text-sm">
                            Supported by investors who understand that deep tech takes time.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <div className="w-12 h-12 mx-auto rounded-lg bg-electric-blue/10 text-electric-blue flex items-center justify-center">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">We write code & papers</h3>
                        <p className="text-slate-400 text-sm">
                            We collaborate with labs because we like staying close to the metal.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <div className="w-12 h-12 mx-auto rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                            <Network className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Open Standards</h3>
                        <p className="text-slate-400 text-sm">
                            Committed to interoperability and contributing to open protocols for system integration.
                        </p>
                    </motion.div>
                </div>
            </div>
        </Section>
    )
}
