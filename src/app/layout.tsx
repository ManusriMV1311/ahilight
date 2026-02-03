import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AhiLight | Enterprise Intelligence Research",
  description: "AhiLight builds research-driven software systems to solve the most critical operational challenges in the enterprise.",
};

import { BackgroundFolds } from "@/components/ui/background-folds";
import { CursorGlow } from "@/components/ui/cursor-glow";
import PageWrapper from "@/components/layout/page-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased text-foreground bg-background font-sans relative`}
      >
        <CursorGlow />
        <BackgroundFolds />
        <Navbar />
        <PageWrapper>
          <main className="min-h-screen relative z-10">
            {children}
          </main>
        </PageWrapper>
        <Footer />
      </body>
    </html>
  );
}
