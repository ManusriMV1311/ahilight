import React from 'react';
import styles from '../CyberFortress.module.css';

export function NewsTicker() {
    return (
        <div className={styles.newsTicker}>
            <div className={`${styles.container} ${styles.tickerWrap}`}>
                <div className={styles.tickerLabel}>LATEST NEWS</div>
                <div className={styles.tickerContent}>
                    <span>CyberFortress Now Available: Autonomous Security Platform for Enterprise Deployment</span>
                    <span className={styles.separator}>|</span>
                    <span>Industry Leading Detection: Reduce MTTD by 90% with Behavioral Correlation</span>
                    <span className={styles.separator}>|</span>
                    <span>New Research Publication: &quot;Graph Neural Networks for Threat Detection&quot;</span>
                    {/* Duplicate content for seamless scrolling */}
                    <span className={styles.separator}>|</span>
                    <span>CyberFortress Now Available: Autonomous Security Platform for Enterprise Deployment</span>
                    <span className={styles.separator}>|</span>
                    <span>Industry Leading Detection: Reduce MTTD by 90% with Behavioral Correlation</span>
                    <span className={styles.separator}>|</span>
                    <span>New Research Publication: &quot;Graph Neural Networks for Threat Detection&quot;</span>
                </div>
            </div>
        </div>
    );
}
