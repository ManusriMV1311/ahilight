"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const team = [
    {
        name: "Dr. Alex Thorne",
        role: "Founder & CEO",
        bio: "Built the AI infrastructure at CyberDyne. Now solving the same problems here, but without the legacy code.",
        image: null // Placeholder for real image
    },
    {
        name: "Sarah Chen",
        role: "Head of Research",
        bio: "Former Principal Researcher at DeepMind. She makes sure our math is actually right.",
        image: null
    },
    {
        name: "James Voss",
        role: "VP of Engineering",
        bio: "20 years of experience. He's seen every way a system can fail, and helps us avoid most of them.",
        image: null
    }
];



export function AboutTeam() {
    return (
        <Section className="bg-slate-950/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-4 font-heading">Leadership</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        A multidisciplinary team combining deep academic research with battle tested enterprise engineering.
                    </p>
                </motion.div>

                {/* Core Team Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-deep-navy border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-colors group"
                        >
                            <div className="aspect-[4/3] bg-slate-800 relative flex items-center justify-center">
                                {/* Placeholder Avatar */}
                                <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-3xl font-bold text-slate-500">
                                    {member.name.charAt(0)}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-80" />
                            </div>
                            <div className="p-6 relative">
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-electric-blue text-sm font-medium mb-4">{member.role}</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {member.bio}
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>
        </Section>
    )
}
