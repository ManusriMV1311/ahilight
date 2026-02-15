"use client";

import React, { useEffect, useState } from 'react';
import { Globe, MapPin, Target } from 'lucide-react';

export function GlobalThreatMapVisual() {
    // Generate a simple "dot matrix" world map representation
    // We'll use a predefined set of coordinates that roughly look like continents
    // or just a randomized grid that gives the "impression" of a global density

    const [attacks, setAttacks] = useState<any[]>([]);
    const [dots, setDots] = useState<{ x: number, y: number }[]>([]);

    useEffect(() => {
        // Attack simulation loop
        const interval = setInterval(() => {
            const id = Date.now();
            const startX = Math.random() * 80 + 10; // 10% to 90%
            const startY = Math.random() * 60 + 20;
            const endX = Math.random() * 80 + 10;
            const endY = Math.random() * 60 + 20;

            setAttacks(prev => [
                ...prev,
                { id, startX, startY, endX, endY, progress: 0 }
            ]);

            // Cleanup old attacks
            setAttacks(prev => prev.filter(a => Date.now() - a.id < 2000));
        }, 1200);

        // Generate dots only on client
        const arr = [];
        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 30; c++) {
                const x = c;
                const y = r;
                let visible = Math.random() > 0.8;

                // Americas
                if (c > 2 && c < 9 && r > 2 && r < 12) visible = Math.random() > 0.3;
                // Europe/Africa
                if (c > 12 && c < 18 && r > 2 && r < 10) visible = Math.random() > 0.3;
                // Asia
                if (c > 18 && c < 26 && r > 2 && r < 8) visible = Math.random() > 0.3;

                if (visible) {
                    arr.push({ x: (c / 30) * 100, y: (r / 15) * 80 + 10 });
                }
            }
        }
        setDots(arr);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="w-full h-full relative bg-[#0a0e27] overflow-hidden flex flex-col items-center">
            {/* Holographic Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            {/* Header Overlays */}
            <div className="absolute top-4 left-6 z-20">
                <h3 className="text-xl font-bold font-heading text-white mb-1">Global Threat Intel</h3>
                <div className="text-xs text-slate-400 font-mono">LIVE VECTOR TRACKING</div>
            </div>

            {/* Stats Panel */}
            <div className="absolute top-4 right-6 z-20 bg-black/60 backdrop-blur-md border-l-2 border-red-500 p-2 pl-3">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-[10px] text-slate-400 uppercase">IOCs Enriched</span>
                        <span className="text-xs font-mono text-white font-bold">12,485</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-[10px] text-slate-400 uppercase">Zero Days</span>
                        <span className="text-xs font-mono text-red-500 font-bold animate-pulse">3 DETECTED</span>
                    </div>
                </div>
            </div>

            {/* Simple Map Visualization */}
            <div className="absolute inset-0 top-12 bottom-12 left-4 right-4 my-auto h-3/4 w-full opacity-80">
                {/* Dots Map */}
                {dots.map((d, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-slate-700"
                        style={{
                            left: `${d.x}%`,
                            top: `${d.y}%`,
                            width: '2px',
                            height: '2px',
                            boxShadow: Math.random() > 0.95 ? '0 0 4px cyan' : 'none',
                            backgroundColor: Math.random() > 0.98 ? '#06b6d4' : '#334155'
                        }}
                    />
                ))}

                {/* SVG Overlay for Arcs */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                            <stop offset="50%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                        </linearGradient>
                        <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                            <circle r="1.5" cx="2" cy="2" fill="#ef4444" className="animate-pulse" />
                        </marker>
                    </defs>

                    {attacks.map(attack => {
                        const midX = (attack.startX + attack.endX) / 2;
                        const midY = (attack.startY + attack.endY) / 2 - 20; // Curve upward
                        const d = `M${attack.startX},${attack.startY} Q${midX},${midY} ${attack.endX},${attack.endY}`;

                        return (
                            <React.Fragment key={attack.id}>
                                {/* Path Trace */}
                                <path
                                    d={d}
                                    fill="none"
                                    stroke="rgba(239, 68, 68, 0.2)"
                                    strokeWidth="1"
                                    strokeDasharray="2,2"
                                />
                                {/* Active Projectile */}
                                <circle r="2" fill="#ef4444" filter="drop-shadow(0 0 4px red)">
                                    <animateMotion dur="1.5s" repeatCount="1" path={d} calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1">
                                    </animateMotion>
                                </circle>
                                {/* Target Ping */}
                                <circle cx={attack.startX} cy={attack.startY} r="3" fill="none" stroke="red" opacity="0.5" className="animate-ping" />
                            </React.Fragment>
                        );
                    })}
                </svg>
            </div>

            {/* Bottom Data Ticker */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[10px] font-mono text-cyan-500/60 border-t border-white/5 pt-2">
                <span>INCOMING FEED 8024</span>
                <span className="animate-pulse">GEOLOCATION LOCK ACTIVE</span>
                <span>LAT: 49.201  LONG: 12.392</span>
            </div>
        </div>
    );
}
