import React from 'react';
import styles from './spinner.module.css';
import { SpinnerCircular } from 'spinners-react';

function Spinner({ spinner }) {
    if (!spinner) return;
    return (
        <div className={styles.spinnerContainer}>
            <SpinnerCircular size={70} thickness={100} speed={100} color="rgba(224, 118, 24, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
            <span className={styles.spinnerText}>Please Wait</span>
        </div>
    )
}

export default Spinner
