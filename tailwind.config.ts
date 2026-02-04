import type { Config } from "tailwindcss";
const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
            animation: {
                "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
                spotlight: "spotlight 2s ease .75s 1 forwards",
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
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        addVariablesForColors,
    ],
};

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}

export default config;
