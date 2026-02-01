"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterText } from "@/components/ui/typewriter-text";

export default function CareersPage() {
    return (
        <div className="flex flex-col gap-0">
            {/* Hero Section */}
            <Section background="navy-gradient" className="pt-32 pb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6">
                        <TypewriterText
                            text="Join Our "
                            className="text-5xl md:text-7xl font-bold tracking-tight text-white inline-block mr-4"
                            cursor={false}
                        />
                        <div className="inline-block">
                            <TypewriterText
                                text="Team"
                                delay={1}
                                cursor={true}
                                className="text-5xl md:text-7xl font-bold tracking-tight text-electric-blue"
                            />
                        </div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-slate-300"
                    >
                        Help us build the next generation of intelligent enterprise software.
                    </motion.p>
                </div>
            </Section>

            {/* Open Positions */}
            <Section className="">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Open Positions</h2>
                    <div className="space-y-4">
                        {[
                            { title: "Senior Systems Engineer", dept: "Engineering", loc: "Remote / New York" },
                            { title: "AI Research Scientist", dept: "Research", loc: "London, UK" },
                            { title: "Product Designer", dept: "Product", loc: "Remote" },
                            { title: "Frontend Developer (React/Next.js)", dept: "Engineering", loc: "Remote" }
                        ].map((job, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-slate-900 border border-slate-800 p-6 rounded-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-electric-blue/20 hover:bg-electric-blue hover:border-electric-blue hover:text-white flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-white transition-colors">{job.title}</h3>
                                    <div className="flex gap-4 text-slate-400 text-sm mt-1 group-hover:text-white/80">
                                        <span>{job.dept}</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.loc}</span>
                                    </div>
                                </div>
                                <Button className="shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-electric-blue">
                                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
