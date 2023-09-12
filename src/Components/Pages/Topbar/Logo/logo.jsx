import React from 'react';
import styles from './logo.module.css';
import logo from '../../../../Assets/logo.jpeg';

function Logo() {
    return <img src={logo} alt="logo" className={styles.logo}/>
}

export default Logo
