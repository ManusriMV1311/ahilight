"use client";
import React from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Section } from "@/components/ui/section";

const researchProofs = [
    {
        title: "Research Publications",
        description: "Peer-reviewed papers across machine learning, distributed systems, and cryptography. Our work is cited by academic researchers and industry practitioners building next-generation infrastructure.",
        link: "/research",
    },
    {
        title: "Open Source",
        description: "Active open-source projects with contributions from enterprise security and infrastructure teams. We believe in transparent research — our tools are used by Fortune 500 teams.",
        link: "https://github.com",
    },
    {
        title: "Standards Alignment",
        description: "MITRE ATT&CK, NIST, Zero Trust Architecture — we build on validated standards and contribute back through working groups and public research.",
        link: "/research",
    },
];

export function ResearchCredibility() {
    return (
        <Section background="navy-gradient" className="py-24">
            <div className="max-w-5xl mx-auto px-8">
                <div className="max-w-3xl mb-16 text-center mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Built on Research, Not Marketing
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Every AhiLight platform is grounded in peer-reviewed research, open-source contributions, and transparent validation.
                    </p>
                </div>
                <HoverEffect items={researchProofs} className="grid md:grid-cols-3 gap-8" />
            </div>
        </Section>
    );
}
