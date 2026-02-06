"use client";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { useSpring, animated, config } from '@react-spring/three';

// ... (WavyGrid and FloatingLetters components remain mostly same, but I need to make sure I don't delete them)
// I will just replace the top imports and add the component, then replace VisionBackground body.

// ============================================================================
// RESPONSIVE CAMERA
// ============================================================================

function ResponsiveCamera() {
    const { camera, size } = useThree();

    useEffect(() => {
        // Adjust camera distance based on screen width to ensure "VISION" fits
        if (size.width < 600) { // Mobile
            camera.position.z = 28;
            camera.position.y = 4; // Look down a bit more
        } else if (size.width < 1024) { // Tablet
            camera.position.z = 22;
            camera.position.y = 3;
        } else { // Desktop
            camera.position.z = 18;
            camera.position.y = 2;
        }
        camera.updateProjectionMatrix();
    }, [size.width, camera]);

    return null;
}


// ============================================================================
// WAVY GRID COMPONENT
// ============================================================================

interface WavyGridProps {
    gridSize: number;
    gridResolution: number;
    waveAmplitude: number;
    waveSpeed: number;
    color: string;
}

function WavyGrid({
    gridSize = 60,
    gridResolution = 80,
    waveAmplitude = 1.2,
    waveSpeed = 0.3,
    color = '#6366f1'
}: Partial<WavyGridProps>) {
    const meshRef = useRef<THREE.Mesh>(null);
    const noise3D = useMemo(() => createNoise3D(), []);

    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(
            gridSize,
            gridSize,
            gridResolution,
            gridResolution
        );
    }, [gridSize, gridResolution]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const positions = meshRef.current.geometry.attributes.position;
        const time = state.clock.elapsedTime * waveSpeed;

        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);

            // Multi-layered simplex noise for realistic water-like motion
            const wave1 = noise3D(x * 0.15, y * 0.15, time * 0.5);
            const wave2 = noise3D(x * 0.3, y * 0.3, time * 0.3);
            const wave3 = noise3D(x * 0.08, y * 0.08, time * 0.7);

            const z = (wave1 + wave2 * 0.5 + wave3 * 0.3) * waveAmplitude;

            positions.setZ(i, z);
        }

        positions.needsUpdate = true;
        meshRef.current.geometry.computeVertexNormals();
    });

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            rotation={[-Math.PI / 2.5, 0, 0]}
            position={[0, -5, -8]}
        >
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.2}
                wireframe
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

// ============================================================================
// FLOATING LETTER COMPONENT
// ============================================================================

interface FloatingLetterProps {
    letter: string;
    startPosition: [number, number, number];
    endPosition: [number, number, number];
    delay: number;
    index: number;
}

// Ensure animated works with Text component
const AnimatedText = animated(Text);

function FloatingLetter({
    letter,
    startPosition,
    endPosition,
    delay,
    index
}: FloatingLetterProps) {
    const textRef = useRef<any>(null);
    const noise3D = useMemo(() => createNoise3D(), []); // Independent noise for each letter
    const [hasConverged, setHasConverged] = useState(false);

    // Spring animation for convergence
    const { position } = useSpring({
        from: { position: startPosition },
        to: { position: endPosition },
        delay: delay,
        config: {
            ...config.molasses, // Very slow, organic feel
            tension: 20,
            friction: 60, // Slight higher friction to avoid too much overshoot
            duration: 5000 // Explicit duration fallback
        },
        onRest: () => setHasConverged(true)
    });

    // Continuous floating motion logic
    useFrame((state) => {
        if (!textRef.current) return;
        const time = state.clock.elapsedTime;

        // Get current spring position values
        // @ts-ignore
        const springPos = position.get();

        // 1. Calculate Wave Physics at CURRENT position
        // Matches grid noise param (freq 0.15)
        // Horizontal drift (surface current)
        const driftX = noise3D(time * 0.2, index * 10, 0) * 0.2;
        const driftZ = noise3D(time * 0.2 + 100, index * 10, 0) * 0.1;

        // Vertical Bobbing (Wave height) - EXACTLY synchronized with surface
        const waveHeight = noise3D(springPos[0] * 0.15, springPos[2] * 0.15, time * 0.15) * 0.5;
        const bob = Math.sin(time * 1.5 + index) * 0.1;

        // Apply combined position
        // Y is strictly defined by surface wave + bob. Spring Y is 0.
        textRef.current.position.x = springPos[0] + driftX;
        textRef.current.position.y = springPos[1] + waveHeight + bob;
        textRef.current.position.z = springPos[2] + driftZ;

        // 2. Rotations (Sleeping -> Standing + Surface Tilt)

        // Calculate progress towards target for "Stand Up" animation
        // We use the spring position to determine how close we are
        const dx = springPos[0] - endPosition[0];
        const dz = springPos[2] - endPosition[2];
        const dist = Math.sqrt(dx * dx + dz * dz);

        // Stand up logic: 
        // If dist > 5, fully sleeping (-90deg). 
        // As dist goes 5 -> 0, transition to standing (0deg).
        const standUpProgress = Math.min(Math.max((10 - dist) / 10, 0), 1);
        // Eased stand up (cubic in) - stands up mostly at the end
        const standEase = standUpProgress * standUpProgress * standUpProgress;

        const baseTiltX = -Math.PI / 2 * (1 - standEase); // -90deg to 0deg

        // Wave Tilt (Surface Normal approximation)
        const waveTiltX = Math.cos(time * 0.5 + springPos[0] * 0.1) * 0.1;
        const waveTiltZ = Math.sin(time * 0.5 + springPos[2] * 0.1) * 0.1;

        textRef.current.rotation.x = baseTiltX + waveTiltX;
        textRef.current.rotation.z = waveTiltZ; // Roll always active

        if (!hasConverged) {
            // While sleeping/moving, maybe slow spin on Y is weird if they are flat?
            // If flat, Y rotation looks like spinning plate.
            // Let's orient them partly towards center + spin?
            // Simple gentle spin is fine.
            textRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.3;
        } else {
            // Settled: Face forward
            textRef.current.rotation.y = 0;
        }
    });

    return (
        <Text
            ref={textRef}
            fontSize={1.5}
            font="/fonts/SpaceGrotesk-Bold.ttf"
            color="#00d4ff" // Cyan
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#6366f1" // Indigo outline
        >
            {letter}
        </Text>
    );
}

// ============================================================================
// VISION BACKGROUND SCENE
// ============================================================================

export function VisionBackground() {
    const letters = ['V', 'I', 'S', 'I', 'O', 'N'];
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile for performance optimizations (lower grid resolution)
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Starting positions: Y is 0 to stay on "water surface"
    // Pushed further out (25-30) to ensure they start off-screen
    const startPositions: [number, number, number][] = useMemo(() => [
        [-25, 0, -10],   // V - Far Left
        [-15, 0, 20],    // I - Bottom Left
        [0, 0, -25],     // S - Top Center
        [10, 0, 15],     // I - Center Right
        [25, 0, -10],    // O - Far Right
        [20, 0, 20],     // N - Bottom Right
    ], []);

    // End positions (spelling "VISION" in center)
    const endPositions: [number, number, number][] = useMemo(() => {
        const letterSpacing = 1.6;
        const totalWidth = (letters.length - 1) * letterSpacing;
        const startX = -totalWidth / 2;

        return letters.map((_, i) => [
            startX + i * letterSpacing,
            0, // Centered vertically
            0  // Centered depth
        ]);
    }, []);

    // Stagger delays (letters don't all start moving at once)
    const delays = [0, 300, 600, 900, 1200, 1500];

    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas
                camera={{ position: [0, 2, 18], fov: 45 }}
                gl={{
                    // Reduce pixel ratio on mobile for performance
                    pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, isMobile ? 1 : 2) : 1,
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance"
                }}
            >
                <color attach="background" args={['#030014']} />

                {/* Responsive Camera Handler */}
                <ResponsiveCamera />

                {/* Cinematic Lighting */}
                <ambientLight intensity={0.4} />
                <pointLight position={[-10, 10, 5]} intensity={1} color="#00d4ff" />
                <pointLight position={[10, -5, 5]} intensity={0.8} color="#6366f1" />
                <spotLight
                    position={[0, 15, 10]}
                    angle={0.6}
                    penumbra={1}
                    intensity={1.2}
                    color="#ffffff"
                />

                {/* Wavy grid (water surface) - Lower resolution on mobile */}
                <WavyGrid
                    gridSize={60}
                    gridResolution={isMobile ? 30 : 80}
                    waveAmplitude={1.5}
                    waveSpeed={0.3}
                    color="#6366f1"
                />

                {/* Floating letters */}
                {letters.map((letter, index) => (
                    <FloatingLetter
                        key={index}
                        letter={letter}
                        startPosition={startPositions[index]}
                        endPosition={endPositions[index]}
                        delay={delays[index]}
                        index={index}
                    />
                ))}

                {/* Fog for depth */}
                <fog attach="fog" args={['#030014', 10, 60]} />
            </Canvas>

            {/* Overlay for content readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-80" />
        </div>
    );
}
