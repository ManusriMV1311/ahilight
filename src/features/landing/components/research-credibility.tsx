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
        link: "https://github.com/ahilight", // Company GitHub placeholder
    },
    {
        title: "Standards Alignment",
        description: "MITRE ATT&CK, NIST, Zero Trust Architecture — we build on validated standards and contribute back through working groups and public research.",
        link: "/research",
    },
];

export function ResearchCredibility() {
    return (
        <Section background="transparent" className="py-12 md:py-24">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                <div className="max-w-3xl mb-16 text-center mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                        We don&apos;t guess.
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Every platform we build is grounded in peer-reviewed research. If we can&apos;t prove it works, we don&apos;t ship it.
                    </p>
                </div>
                <HoverEffect items={[
                    {
                        title: "We wrote the papers",
                        description: "Peer-reviewed work across machine learning and distributed systems. We had to write them because the existing answers weren't good enough.",
                        link: "/research",
                    },
                    {
                        title: "Open Source",
                        description: "We work in the open where possible. Transparent research builds better security.",
                        link: "https://github.com/ahilight",
                    },
                    {
                        title: "Standards",
                        description: "We respect MITRE ATT&CK and NIST, but we don't treat them as checklists. We treat them as baselines.",
                        link: "/research",
                    },
                ]} className="grid md:grid-cols-3 gap-8" />
            </div>
        </Section>
    );
}
