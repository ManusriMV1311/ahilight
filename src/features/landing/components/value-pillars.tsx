"use client";
import React from "react";
import { Activity, ShieldCheck, Ghost, Database, LayoutGrid } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"; // Verify import path
import { Section } from "@/components/ui/section";

const pillars = [
    {
        title: "Autonomous Detection",
        description: "Traditional tools alert on signatures. CyberFortress correlates behaviors across network, endpoint, and identity to identify attack chains before they complete.",
        icon: Activity,
        label: "Detection"
    },
    {
        title: "Policy-Driven Response",
        description: "Automation without guardrails is dangerous. CyberFortress executes predefined response playbooks with rollback capabilities and human override.",
        icon: ShieldCheck,
        label: "Response"
    },
    {
        title: "Adversarial Deception",
        description: "Passive defense is insufficient. CyberFortress deploys adaptive honeypots powered by generative AI that waste adversary time and gather threat intel.",
        icon: Ghost,
        label: "Deception"
    },
    {
        title: "Immutable Audit",
        description: "Compliance requires tamper-proof records. Every detection and response action is logged to a blockchain-backed audit trail — unalterable and verifiable.",
        icon: Database,
        label: "Audit"
    },
    {
        title: "Unified Platform",
        description: "Replace fragmented stacks with a single platform that integrates with or replaces existing tools. One control plane for your entire security posture.",
        icon: LayoutGrid,
        label: "Unity"
    },
];

export function ValuePillars() {
    return (
        <Section background="navy-gradient" className="relative py-24">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    CyberFortress. <span className="text-electric-blue">Five capabilities.</span>
                </h2>
                <p className="text-xl text-slate-400">
                    Built from first principles to solve the operational challenges of modern security.
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
                {pillars.map((pillar, idx) => (
                    <CardContainer key={pillar.title} className="inter-var">
                        <CardBody className="bg-neutral-900 relative group/card border-white/10 w-auto sm:w-[22rem] h-auto rounded-xl p-6 border hover:border-electric-blue/30 transition-all">

                            {/* Label badge */}
                            <CardItem translateZ="50" className="mb-4">
                                <span className="px-3 py-1 bg-electric-blue/10 text-electric-blue rounded-full text-xs font-semibold border border-electric-blue/20">
                                    {pillar.label}
                                </span>
                            </CardItem>

                            {/* Title */}
                            <CardItem
                                translateZ="60"
                                className="text-xl font-bold text-white mb-3 font-heading"
                            >
                                {pillar.title}
                            </CardItem>

                            {/* Description */}
                            <CardItem
                                as="p"
                                translateZ="40"
                                className="text-neutral-400 text-sm leading-relaxed"
                            >
                                {pillar.description}
                            </CardItem>

                            {/* Decorative icon */}
                            <CardItem translateZ="80" className="mt-8">
                                <div className="h-10 w-10 rounded-lg bg-electric-blue/10 flex items-center justify-center border border-electric-blue/20 text-electric-blue">
                                    <pillar.icon className="w-5 h-5" />
                                </div>
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </Section>
    );
}
