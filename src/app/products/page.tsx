"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, Shield, Database, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TypewriterText } from "@/components/ui/typewriter-text";

export default function ProductsPage() {
    return (
        <div className="flex flex-col gap-0">
            {/* Hero Section */}
            <Section background="navy-gradient" className="pt-32 pb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-6">
                        <TypewriterText
                            text="Enterprise-Grade "
                            className="text-5xl md:text-7xl font-bold tracking-tight text-white inline-block mr-4"
                            cursor={false}
                        />
                        <div className="inline-block">
                            <TypewriterText
                                text="Solutions"
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
                        A suite of advanced tools designed for scale, security, and intelligence.
                    </motion.p>
                </div>
            </Section>

            {/* Product Grid */}
            <Section className="">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* CyberFortress Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-electric-blue/20 hover:bg-electric-blue hover:border-electric-blue hover:text-white group relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-6 text-electric-blue group-hover:bg-white group-hover:text-electric-blue transition-colors">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">CyberFortress</h3>
                            <p className="text-slate-400 mb-6 min-h-[80px] group-hover:text-white/90">
                                Next-generation security platform providing real-time threat detection and autonomous response capabilities.
                            </p>
                            <Button asChild variant="outline" className="w-full justify-between bg-transparent border-slate-700 text-white group-hover:bg-white group-hover:text-electric-blue group-hover:border-white transition-all duration-300">
                                <Link href="/cyberfortress">
                                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Future Innovations Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="col-span-1 md:col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
                        <div className="relative z-10 max-w-lg">
                            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 mx-auto text-slate-500">
                                <Box className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Future Innovations</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                We are actively engineering advanced solutions to further empower enterprise operations. Access to these next-generation tools will be available soon.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
