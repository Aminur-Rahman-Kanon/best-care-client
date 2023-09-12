import React from 'react';
import styles from './navbar.module.css';
import {useLocation} from 'react-router-dom';

function Navbar() {

    const location = useLocation();

    return (
        <ul className={styles.navbarLists}>
            <li className={styles.navbarList}>
                <a href="/welcome" className={location.pathname === '/welcome' ? `${styles.navItem} ${styles.active}` : styles.navItem}>Home</a>
            </li>
            <li className={styles.navbarList}>
                <a href="/upload-products" className={location.pathname === '/upload-products' ? `${styles.navItem} ${styles.active}` : styles.navItem}>Upload products</a>
            </li>
            <li className={styles.navbarList}>
                <a href="/products" className={location.pathname === '/products' ? `${styles.navItem} ${styles.active}` : styles.navItem}>Products</a>
            </li>
            <li className={styles.navbarList}>
                <a href="#" className={location.pathname === '/others' ? `${styles.navItem} ${styles.active}` : styles.navItem}>Others</a>
            </li>
        </ul>
    )
}

export default Navbar
