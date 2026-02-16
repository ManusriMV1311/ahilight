"use client"

import { Section } from "@/components/ui/section"
import { motion } from "framer-motion"

export function Principles() {
    return (
        <Section background="transparent" className="py-12 md:py-24">
            <div className="container mx-auto px-4 text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">Research-Backed. Engineering-Driven.</h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    We build the foundational software systems that power the next generation of enterprise autonomy.
                </p>
            </div>

            <div className="container mx-auto px-4 text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">We did the math.</h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    You can&apos;t patch your way to stability. You have to prove it.
                </p>
            </div>

            <div className="container mx-auto px-4">
                {/* Irregular grid: 1 large on left, 2 stacked on right */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

                    {/* Large Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-2 bg-navy-card p-6 md:p-10 rounded-2xl border border-white/5 hover:border-electric-blue/50 transition-colors group text-left flex flex-col justify-center"
                    >
                        <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-2 py-1 rounded inline-block mb-6 w-fit">
                            First Principles
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-electric-blue transition-colors">Resilience isn&apos;t a feature.</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            It&apos;s a mathematical property of correct systems. We don&apos;t build by assembling off-the-shelf components and hoping they hold together. We engineer from the ground up for absolute correctness.
                        </p>
                    </motion.div>

                    {/* Stacked Cards */}
                    <div className="flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-navy-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-electric-blue/50 transition-colors group text-left flex-1"
                        >
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">Research First</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We solve hard problems through fundamental research. If the answer doesn&apos;t exist, we write the paper.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-navy-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-electric-blue/50 transition-colors group text-left flex-1"
                        >
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">Domain Agnostic</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Good architecture applies everywhere. From security to logistics.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
