"use client";

import React, { useEffect, useState } from 'react';
import { Shield, Zap, Activity, Lock } from 'lucide-react';

export function AutonomousDefenseVisual() {
    const [scannedNodes, setScannedNodes] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomNode = Math.floor(Math.random() * 20);
            setScannedNodes(prev => {
                const newSet = [...prev, randomNode];
                if (newSet.length > 5) newSet.shift();
                return newSet;
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    // Generate static node positions for stability
    const nodes = [
        { x: 20, y: 50 }, { x: 35, y: 30 }, { x: 35, y: 70 },
        { x: 50, y: 50 }, { x: 65, y: 20 }, { x: 65, y: 80 },
        { x: 80, y: 50 }, { x: 50, y: 20 }, { x: 50, y: 80 },
        { x: 20, y: 20 }, { x: 80, y: 20 }, { x: 20, y: 80 }, { x: 80, y: 80 }
    ];

    const connections = [
        [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5],
        [4, 6], [5, 6], [7, 4], [8, 5], [1, 7], [2, 8]
    ];

    return (
        <div className="w-full h-full relative bg-[#0a0e27] overflow-hidden flex flex-col">
            {/* Header / Metrics */}
            <div className="absolute top-0 left-0 w-full p-6 z-20 flex flex-col gap-4 pointer-events-none">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold font-heading text-white mb-1">Autonomous Defense</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-xs text-emerald-500 font-mono">SYSTEM ACTIVE</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Threats Neutralized</div>
                        <div className="text-xl font-mono text-cyan-400 font-bold">1,247</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">ML Confidence</div>
                        <div className="text-xl font-mono text-emerald-400 font-bold">94%</div>
                    </div>
                </div>
            </div>

            {/* Visual Graph Area */}
            <div className="relative flex-1 w-full h-full">
                {/* Hex Shield Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('/hex-grid.svg')] opacity-10 pointer-events-none"></div>

                <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Definitions for glows */}
                    <defs>
                        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Connections */}
                    {connections.map(([start, end], i) => (
                        <line
                            key={`conn-${i}`}
                            x1={nodes[start].x + "%"} y1={nodes[start].y + "%"}
                            x2={nodes[end].x + "%"} y2={nodes[end].y + "%"}
                            stroke="#1e293b"
                            strokeWidth="0.5"
                        />
                    ))}

                    {/* Active Threat Paths (Animated) */}
                    <path
                        d={`M${nodes[0].x},${nodes[0].y} L${nodes[1].x},${nodes[1].y} L${nodes[3].x},${nodes[3].y}`}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="0.8"
                        strokeDasharray="5,5"
                        className="animate-[dash_2s_linear_infinite]"
                        vectorEffect="non-scaling-stroke"
                        filter="url(#glow-red)"
                        opacity="0.6"
                    />
                    <path
                        d={`M${nodes[12].x},${nodes[12].y} L${nodes[6].x},${nodes[6].y} L${nodes[4].x},${nodes[4].y}`}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="0.8"
                        strokeDasharray="5,5"
                        className="animate-[dash_3s_linear_infinite_reverse]"
                        vectorEffect="non-scaling-stroke"
                        filter="url(#glow-red)"
                        opacity="0.6"
                    />

                    {/* Defense Response Paths (Cyan) */}
                    <path
                        d={`M${nodes[7].x},${nodes[7].y} L${nodes[4].x},${nodes[4].y}`}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1"
                        strokeDasharray="10,10"
                        className="animate-[dash_1s_linear_infinite]"
                        vectorEffect="non-scaling-stroke"
                        filter="url(#glow-cyan)"
                    />

                    {/* Nodes */}
                    {nodes.map((node, i) => {
                        const isScanned = scannedNodes.includes(i);
                        const isThreat = i === 4 || i === 3; // Fixed threat nodes
                        const isShield = i === 7 || i === 5;

                        return (
                            <g key={`node-${i}`} transform={`translate(${node.x} ${node.y})`}>
                                {/* Pulse Effect */}
                                <circle r="3" fill={isThreat ? "#ef4444" : "#0f172a"} className={`${isThreat ? "animate-ping opacity-20" : "hidden"}`} />
                                <circle
                                    r={isShield ? 2.5 : 1.5}
                                    fill={isThreat ? "#ef4444" : isShield ? "#06b6d4" : "#1e293b"}
                                    filter={isShield ? "url(#glow-cyan)" : isThreat ? "url(#glow-red)" : ""}
                                    className="transition-colors duration-500"
                                />
                                {isShield && (
                                    <path
                                        d="M0,-3 L2.5,-1.5 L2.5,1.5 L0,3 L-2.5,1.5 L-2.5,-1.5 Z"
                                        fill="none"
                                        stroke="#06b6d4"
                                        strokeWidth="0.2"
                                        className="animate-[spin_4s_linear_infinite]"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Glassmorphism Shield Overlay (Visual Interest) */}
                <div className="absolute bottom-10 right-10 pointer-events-none">
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                        <Shield className="w-16 h-16 text-cyan-400 relative z-10 opacity-80" strokeWidth={1} />
                        <div className="absolute -top-2 -right-2 w-full h-full border border-cyan-500/30 rounded-lg animate-[spin_10s_linear_infinite]"></div>
                    </div>
                </div>

                {/* Heatmap Gradient Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-red-900/20 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <style jsx>{`
                @keyframes dash {
                   to { stroke-dashoffset: -20; }
                }
            `}</style>
        </div>
    );
}
