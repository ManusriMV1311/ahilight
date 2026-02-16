"use client";
import React from "react";
import { Section } from "@/components/ui/section";
import { HorizontalTracingBeam } from "@/components/ui/horizontal-tracing-beam";
import { motion } from "framer-motion";

const quarters = [
    {
        quarter: "Q1 2026",
        title: "Foundation & Compliance",
        items: ["Enhanced OT/ICS protocol support", "AWS GovCloud deployment option"],
        active: true
    },
    {
        quarter: "Q2 2026",
        title: "Advanced Operations",
        items: ["Advanced threat hunting UI", "Kubernetes-native deployment"],
        active: false
    },
    {
        quarter: "Q3 2026",
        title: "Quantum & Federal",
        items: ["Post-quantum cryptography module (ML-KEM) integration", "FedRAMP authorization pursuit begins"],
        active: false
    },
    {
        quarter: "Q4 2026",
        title: "Next-Gen Autonomy",
        items: ["Hardware security module integration preview", "Next-generation honeypot adaptive learning v2"],
        active: false
    }
]

export function Roadmap() {
    return (
        <Section background="navy-gradient" className="py-24 relative overflow-visible">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-20 relative z-10 font-heading">
                Where We're <span className="text-electric-blue">Going</span>
            </h2>

            <HorizontalTracingBeam className="px-6">
                <div className="max-w-2xl mx-auto antialiased pt-4 pb-20 relative">
                    {quarters.map((q, idx) => (
                        <div key={idx} className="mb-12 relative group">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-4 py-1 text-sm font-bold rounded-full border ${q.active ? "bg-electric-blue/20 text-electric-blue border-electric-blue/30" : "bg-gray-500/10 text-gray-500 border-gray-500/20"}`}>
                                    {q.quarter}
                                </span>
                            </div>
                            <h3 className={`text-2xl font-bold mb-4 ${q.active ? "text-white" : "text-gray-400 group-hover:text-gray-300 transition-colors"}`}>{q.title}</h3>
                            <ul className="space-y-2 text-gray-400">
                                {q.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${q.active ? "text-electric-blue" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </HorizontalTracingBeam>
        </Section>
    );
}
