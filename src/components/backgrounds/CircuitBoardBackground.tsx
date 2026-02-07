"use client";

import { useEffect, useRef } from "react";

export function CircuitBoardBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let circuitLines: CircuitLine[] = [];

        // Set canvas size
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initCircuits();
        };

        class CircuitLine {
            x: number;
            y: number;
            length: number;
            direction: 'h' | 'v'; // horizontal or vertical
            speed: number;
            color: string;
            progress: number;
            width: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.length = 50 + Math.random() * 200;
                this.direction = Math.random() > 0.5 ? 'h' : 'v';
                this.speed = 0.5 + Math.random() * 2;
                this.width = Math.random() > 0.8 ? 2 : 1;
                this.progress = 0;

                // Tech colors
                const colors = ['#00F2FF', '#7D5FFF', '#4facfe', '#00f2fe'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.progress += this.speed;
                if (this.progress > this.length + 100) { // +100 for tail fade
                    this.reset();
                }
            }

            reset() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.direction = Math.random() > 0.5 ? 'h' : 'v';
                this.progress = 0;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                const gradient = ctx.createLinearGradient(
                    this.direction === 'h' ? this.x : this.x,
                    this.direction === 'h' ? this.y : this.y,
                    this.direction === 'h' ? this.x + this.progress : this.x,
                    this.direction === 'h' ? this.y : this.y + this.progress
                );

                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(0.5, this.color);
                gradient.addColorStop(1, 'rgba(255,255,255,0.8)');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.width;
                ctx.lineCap = 'round';

                if (this.direction === 'h') {
                    const drawLen = Math.min(this.progress, this.length);
                    // Draw main line
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x + drawLen, this.y);

                    // Draw circuit dot at head
                    if (this.progress < this.length) {
                        ctx.fillStyle = '#fff';
                        ctx.beginPath();
                        ctx.arc(this.x + drawLen, this.y, this.width + 1, 0, Math.PI * 2);
                        ctx.fill();
                    }
                } else {
                    const drawLen = Math.min(this.progress, this.length);
                    // Draw main line
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x, this.y + drawLen);

                    // Draw circuit dot at head
                    if (this.progress < this.length) {
                        ctx.fillStyle = '#fff';
                        ctx.beginPath();
                        ctx.arc(this.x, this.y + drawLen, this.width + 1, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                ctx.stroke();
            }
        }

        const initCircuits = () => {
            circuitLines = [];
            const count = Math.floor((canvas.width * canvas.height) / 25000); // Density based on screen size
            for (let i = 0; i < count; i++) {
                circuitLines.push(new CircuitLine());
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(2, 11, 45, 0.1)'; // Fade effect for trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid matrix background
            ctx.strokeStyle = 'rgba(30, 41, 59, 0.3)';
            ctx.lineWidth = 0.5;
            const gridSize = 40;

            // Draw active circuits
            circuitLines.forEach(line => {
                line.update();
                line.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 bg-deep-navy w-full h-full pointer-events-none"
        />
    );
}
