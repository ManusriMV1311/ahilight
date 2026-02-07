import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                teal: {
                    400: '#7D5FFF', // Cyber Purple (Replacement for Teal)
                    500: '#7D5FFF', // Cyber Purple
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-jetbrains-mono)", "monospace"],
                heading: ["var(--font-space-grotesk)", "sans-serif"],
                ui: ["var(--font-ibm-plex)", "sans-serif"],
                brand: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "Segoe UI", "Roboto", "sans-serif"],
            },
            keyframes: {
                "border-beam": {
                    "100%": {
                        "offset-distance": "100%",
                    },
                },
                spotlight: {
                    "0%": {
                        opacity: "0",
                        transform: "translate(-72%, -62%) scale(0.5)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translate(-50%,-40%) scale(1)",
                    },
                },
                shimmer: {
                    from: {
                        backgroundPosition: "0 0",
                    },
                    to: {
                        backgroundPosition: "-200% 0",
                    },
                },
            },
            animation: {
                "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
                spotlight: "spotlight 2s ease .75s 1 forwards",
                shimmer: "shimmer 2s linear infinite",
            },
        },
    },
    plugins: [
        tailwindcssAnimate,
        addVariablesForColors,
    ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
    const allColors = flattenColorPalette(theme("colors"));
    const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}

export default config;
