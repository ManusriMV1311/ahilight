
import styles from '@/components/cyberfortress/CyberFortress.module.css';

export default function CyberDemoPage() {
    return (
        <div className={styles.pageContainer}>
            <div className="pt-20">
                {/* HERO */}
                <section className={`${styles.hero} !pb-20 !pt-32`}>
                    <div className={styles.container}>
                        <p className={styles.trustLabel}>Request a Demo</p>
                        <h1 className={`${styles.heroContent} text-5xl font-bold mb-6 mt-4`}>
                            See CyberFortress in action
                        </h1>
                        <p className={styles.subtitle}>
                            Request a guided demo to understand how CyberFortress helps
                            security teams reduce noise, respond faster, and maintain
                            human control.
                        </p>
                    </div>
                </section>

                {/* DEMO PROCESS */}
                <section className={styles.problemStatement}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionHeader + " !mb-12"}>
                            <span className="text-3xl font-bold text-white">What to expect</span>
                        </h2>

                        <div className={styles.problemGrid}>
                            <div className={styles.problemCard}>
                                <h3>1. Request Review</h3>
                                <p>
                                    Our team reviews your request to understand your environment
                                    and security objectives.
                                </p>
                            </div>

                            <div className={styles.problemCard}>
                                <h3>2. Guided Walkthrough</h3>
                                <p>
                                    A live session tailored to your use cases, workflows, and
                                    risk posture.
                                </p>
                            </div>

                            <div className={styles.problemCard}>
                                <h3>3. Architecture & Security Review</h3>
                                <p>
                                    Deep dive into CyberFortress architecture, controls, and
                                    deployment options.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DEMO FORM */}
                <section className={`${styles.trustSection} bg-black/30`}>
                    <div className={`${styles.container} max-w-2xl mx-auto text-left`}>
                        <h2 className="text-3xl font-bold mb-4 text-center">Request your demo</h2>
                        <p className={`${styles.subtitle} mx-auto mb-12 text-center`}>
                            Tell us a bit about your organization so we can tailor the
                            demonstration to your needs.
                        </p>

                        <form className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm uppercase tracking-wider text-gray-400">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm uppercase tracking-wider text-gray-400">Work Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-sm uppercase tracking-wider text-gray-400">Company</label>
                                    <input
                                        type="text"
                                        id="company"
                                        className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="role" className="text-sm uppercase tracking-wider text-gray-400">Role</label>
                                    <input
                                        type="text"
                                        id="role"
                                        className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm uppercase tracking-wider text-gray-400">Tell us about your environment</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Cloud, on-prem, SOC size, key challenges..."
                                    className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`${styles.btnPrimary} ${styles.btn} w-full justify-center`}
                            >
                                Submit Request
                            </button>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                We respect your privacy. Your information will only be used
                                to respond to your request.
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}
