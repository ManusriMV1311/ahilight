"use client";

import { useEffect, useRef } from "react";

export function CodeMatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        // Characters to use (mix of code symbols, numbers, and katakana for Matrix feel)
        const chars = "XYZ0123456789<>[]{}/*-+=@#$%&";
        const charArray = chars.split("");

        const fontSize = 14;
        const columns = w / fontSize;
        const drops: number[] = [];

        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create trailing effect
            // Using deep-navy tint instead of pure black for brand consistency
            ctx.fillStyle = "rgba(2, 6, 23, 0.05)";
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = "#0f0"; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = charArray[Math.floor(Math.random() * charArray.length)];

                // Varied colors: Mostly Matrix Green, but some Cyan/Blue for Research theme
                const isCyan = Math.random() > 0.9;
                ctx.fillStyle = isCyan ? "#06b6d4" : "#22c55e"; // Cyan-500 or Green-500

                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Reset drop or increment y
                if (y > h && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            // Re-init drops on resize to avoid gaps
            const newColumns = w / fontSize;
            drops.length = 0;
            for (let i = 0; i < newColumns; i++) drops[i] = 1;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 bg-deep-navy pointer-events-none opacity-40"
        />
    );
}
