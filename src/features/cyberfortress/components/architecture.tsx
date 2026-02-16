"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Server, ShieldAlert, GitBranch, CheckCircle } from "lucide-react"
import { Section } from "@/components/ui/section"
import { cn } from "@/lib/utils"

const layers = [
    {
        id: "edge",
        icon: Server,
        title: "Edge Collection",
        description: "Distributed lightweight agents collect telemetry from endpoints, cloud, and network in real-time.",
        color: "text-slate-400"
    },
    {
        id: "inference",
        icon: GitBranch,
        title: "Correlation Engine",
        description: "Behavioral graphs map relationships between events to identify complex attack patterns.",
        color: "text-cyan-accent"
    },
    {
        id: "response",
        icon: ShieldAlert,
        title: "Response Orchestrator",
        description: "Policy engine executes mitigation actions (isolate, block, rollback) instantly.",
        color: "text-electric-blue"
    },
    {
        id: "audit",
        icon: CheckCircle,
        title: "Immutable Ledger",
        description: "All events and actions are hashed and stored for permanent, tamper-proof compliance.",
        color: "text-success-green"
    }
]

export function ArchitectureDiagram() {
    const [activeLayer, setActiveLayer] = useState(layers[1].id)

    return (
        <Section background="navy-gradient" className="py-24 border-y border-white/10">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4 font-heading">Platform Architecture</h2>
                    <p className="text-slate-400">Zero-Trust. Post-Quantum Ready. Fully Autonomous.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Interactive Diagram Left */}
                    <div className="relative">
                        <div className="absolute inset-x-10 top-0 bottom-0 bg-electric-blue/5 blur-3xl rounded-full" />
                        <div className="flex flex-col gap-6 relative z-10">
                            {layers.map((layer) => (
                                <motion.button
                                    key={layer.id}
                                    onClick={() => setActiveLayer(layer.id)}
                                    className={cn(
                                        "flex items-center gap-6 p-6 rounded-2xl border text-left transition-all duration-300",
                                        activeLayer === layer.id
                                            ? "bg-white/10 border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.2)] scale-105"
                                            : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-red-500/20"
                                    )}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className={cn("p-3 rounded-lg bg-deep-navy shadow-inner", layer.color)}>
                                        <layer.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className={cn("text-lg font-bold mb-1", activeLayer === layer.id ? "text-white" : "text-slate-300")}>
                                            {layer.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm hidden sm:block">
                                            {activeLayer === layer.id && "Active Layer Selected"}
                                        </p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Details Panel Right */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[400px] relative overflow-hidden backdrop-blur-sm">
                        <AnimatePresence mode="wait">
                            {layers.map((layer) => (
                                activeLayer === layer.id && (
                                    <motion.div
                                        key={layer.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full flex flex-col"
                                    >
                                        <div className={cn("inline-flex items-center gap-2 mb-6", layer.color)}>
                                            <layer.icon className="w-6 h-6" />
                                            <span className="font-mono text-sm uppercase tracking-wider font-bold">{layer.id.toUpperCase()} LAYER</span>
                                        </div>

                                        <h3 className="text-3xl font-bold text-white mb-6 font-heading">{layer.title}</h3>
                                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                                            {layer.description}
                                        </p>

                                        <div className="mt-auto p-4 bg-deep-navy/50 rounded-xl border border-white/5 font-mono text-xs text-slate-400">
                                            <div>// Protocol Spec</div>
                                            <div className="mt-2 text-yellow-500">throughput: 10GB/s</div>
                                            <div className="text-red-500">latency: &lt;1ms</div>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Section>
    )
}
