"use client";

import { useEffect, useRef } from 'react';

export function CircuitBoardBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Circuit nodes
        const nodes: { x: number; y: number; connections: number[] }[] = [];
        const nodeCount = 50;

        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                connections: []
            });
        }

        // Connect nearby nodes
        nodes.forEach((node, i) => {
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150 && node.connections.length < 3) {
                        node.connections.push(j);
                    }
                }
            });
        });

        let pulseOffset = 0;

        function draw() {
            if (!ctx || !canvas) return;

            ctx.fillStyle = 'rgba(2, 11, 45, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw connections (circuit traces)
            nodes.forEach((node, i) => {
                node.connections.forEach(connectionIndex => {
                    const target = nodes[connectionIndex];

                    // Circuit trace
                    ctx.strokeStyle = 'rgba(0, 242, 255, 0.2)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();

                    // Animated pulse along the trace
                    const dx = target.x - node.x;
                    const dy = target.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const pulsePos = ((pulseOffset + i * 100) % distance) / distance;

                    const pulseX = node.x + dx * pulsePos;
                    const pulseY = node.y + dy * pulsePos;

                    // Glow effect
                    const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8);
                    gradient.addColorStop(0, 'rgba(0, 242, 255, 0.8)');
                    gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Draw node
                ctx.fillStyle = 'rgba(0, 242, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
                ctx.fill();

                // Node glow
                ctx.strokeStyle = 'rgba(0, 242, 255, 0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
                ctx.stroke();
            });

            pulseOffset += 2;
        }

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0"
            style={{ background: '#020B2D' }}
        />
    );
}
