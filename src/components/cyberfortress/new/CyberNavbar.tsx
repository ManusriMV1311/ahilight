"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from '../CyberFortress.module.css';
import gsap from 'gsap';
import Link from 'next/link';

import { Shield, Box } from 'lucide-react';

export function CyberNavbar() {
    const navbarRef = useRef<HTMLElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileToggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                if (!navbar.classList.contains(styles.scanned)) {
                    navbar.classList.add(styles.scanned);
                }
                // Background handling is now done via CSS animation 'gradientShift'
                gsap.to(navbar, { padding: '1rem 0', duration: 0.3 });
            } else {
                gsap.to(navbar, { padding: '1.2rem 0', duration: 0.3 });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        const navLinks = mobileMenuRef.current;
        const spans = mobileToggleRef.current?.querySelectorAll('span');

        if (!isMobileMenuOpen) {
            // Open menu
            if (navLinks && spans) {
                navLinks.style.display = 'flex';
                // Animate items in
                gsap.fromTo(navLinks.querySelectorAll(`.${styles.navLink}`),
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
                );

                gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
            }
        } else {
            // Close menu
            if (navLinks && spans) {
                gsap.to(navLinks.querySelectorAll(`.${styles.navLink}`), {
                    opacity: 0,
                    y: 20,
                    duration: 0.2,
                    stagger: 0.05,
                    onComplete: () => {
                        navLinks.style.display = 'none';
                    }
                });

                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { opacity: 1, duration: 0.3 });
                gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
            }
        }
    };

    return (
        <header ref={navbarRef} className={styles.navbar}>
            <div className={`${styles.container} ${styles.navbarContainer}`}>
                {/* Left: AhiLight Brand + CyberFortress Shield */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity">
                        <div className="bg-gradient-to-br from-red-600 to-red-900 p-1.5 rounded-md">
                            <Box className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight font-brand">AhiLight</span>
                    </Link>

                    <div className="h-6 w-px bg-white/20"></div>

                    <Link href="/products/cyberfortress" className={styles.logo}>
                        <Shield className={`${styles.redIcon} w-6 h-6 fill-current`} />
                        <span className="logo-text">CyberFortress</span>
                    </Link>
                </div>

                <nav ref={mobileMenuRef} className={styles.navLinks}>
                    {/* Overview link removed - linked via Logo */}
                    <Link href="/products/cyberfortress/features" className={styles.navLink}>Features</Link>
                    <Link href="/products/cyberfortress/architecture" className={styles.navLink}>Architecture</Link>
                    <Link href="/products/cyberfortress/security" className={styles.navLink}>Security</Link>
                    <Link href="/products/cyberfortress/use-cases" className={styles.navLink}>Use Cases</Link>
                    <Link href="/products/cyberfortress/demo" className={styles.navLink}>Demo</Link>
                </nav>
                <button
                    ref={mobileToggleRef}
                    className={styles.mobileToggle}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
