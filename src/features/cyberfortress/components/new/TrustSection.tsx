import React from 'react';
import styles from '../CyberFortress.module.css';

export function TrustSection() {
    return (
        <section className={styles.trustSection}>
            <div className={styles.container}>
                <div className={styles.fullWidthSection}>
                    <h2>Platform Capabilities</h2>
                    <div className={styles.trustGrid}>
                        <div className={styles.trustItem}>
                            <span className={styles.trustVal}>90%</span>
                            <span className={styles.trustLabel}>MTTD Reduction</span>
                        </div>
                        <div className={styles.trustItem}>
                            <span className={styles.trustVal}>1%</span>
                            <span className={styles.trustLabel}>False Positives</span>
                        </div>
                        <div className={styles.trustItem}>
                            <span className={styles.trustVal}>100K+</span>
                            <span className={styles.trustLabel}>Events/Second</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
