import React from 'react';

export const BrandIcon = ({ className = "w-6 h-6" }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Outer Circle (Implicit or Defined) */}
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="5" className="opacity-90" />

            {/* The 'A' Left Stroke */}
            <path
                d="M35 80 L50 20 L55 40"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* The 'L' Shape */}
            <path
                d="M65 35 V80 H85"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* The Dynamic Swoosh (Crossbar of A + Cut through L) */}
            <path
                d="M25 80 C 40 50, 60 55, 90 25"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                className="mix-blend-overlay"
            />
            <path
                d="M25 80 C 40 50, 60 55, 90 25"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-80"
            />
        </svg>
    );
};
