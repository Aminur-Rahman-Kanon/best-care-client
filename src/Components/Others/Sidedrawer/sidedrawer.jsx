import React from 'react';
import styles from './sidedrawer.module.css';
import Logo from '../../Pages/Topbar/Logo/logo';
import Navbar from '../../Pages/Topbar/Navbar/navbar';

function Sidedrawer({ sidedrawer }) {
    
    if (!sidedrawer) return;

    return (
        <div className={sidedrawer ? `${styles.sidedrawerContainer} ${styles.on}` : styles.sidedrawerContainer}>
            <Logo />
            <Navbar />
        </div>
    )
}

export default Sidedrawer
