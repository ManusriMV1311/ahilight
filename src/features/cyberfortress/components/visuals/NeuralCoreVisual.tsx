"use client";

import React from 'react';

export function NeuralCoreVisual() {
    return (
        <div className="w-full h-full relative bg-[#0a0e27] overflow-hidden flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)]"></div>

            {/* Header */}
            <div className="absolute top-4 left-6 z-20">
                <h3 className="text-lg font-bold font-heading text-white">Core</h3>
                <p className="text-xs text-slate-400">Self adaptive AI processing unit.</p>
            </div>

            {/* Metrics Layout - Absolute corners */}
            <div className="absolute bottom-4 left-4 z-20">
                <div className="text-[9px] text-slate-500 uppercase font-bold">Models Active</div>
                <div className="text-lg font-mono text-white font-bold">12</div>
            </div>
            <div className="absolute bottom-4 right-4 z-20 text-right">
                <div className="text-[9px] text-slate-500 uppercase font-bold">Accuracy</div>
                <div className="text-lg font-mono text-cyan-400 font-bold">99.2%</div>
            </div>

            {/* Core Visualization */}
            <div className="relative w-48 h-48 flex items-center justify-center">

                {/* Outer Ring - Data Ingestion */}
                <div className="absolute inset-0 border border-slate-700/50 rounded-full"></div>

                {/* Rotating Segments - Middle Layer */}
                <div className="absolute inset-2 border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_12s_linear_infinite]"></div>
                <div className="absolute inset-2 border-t-2 border-r-2 border-transparent border-t-cyan-500 rounded-full animate-[spin_3s_linear_infinite]"></div>

                {/* Counter Rotating Ring */}
                <div className="absolute inset-8 border border-slate-600 rounded-full animate-[spin_8s_linear_infinite_reverse] opacity-50"></div>
                <div className="absolute inset-8 border-b-4 border-l-4 border-transparent border-b-red-500/50 rounded-full animate-[spin_4s_ease-in-out_infinite_reverse]"></div>

                {/* Center Core */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-red-600 to-black rounded-lg transform rotate-45 shadow-[0_0_40px_rgba(220,38,38,0.6)] flex items-center justify-center z-10 border border-red-500/50">
                    <div className="absolute inset-0 bg-red-500/20 animate-ping rounded-lg"></div>
                    <div className="text-white font-mono text-xs font-bold -rotate-45">AI</div>
                </div>

                {/* Floating Labels around the core (optional, kept simple for clarity) */}

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black border border-red-500/30 rounded text-[8px] text-red-400 uppercase tracking-widest whitespace-nowrap">
                    Threat Defeated
                </div>
            </div>

            {/* Particle Dust Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png')] bg-repeat opacity-10 animate-pulse"></div>
        </div>
    );
}
