import React from 'react';
import styles from './topbar.module.css';
import admin from '../../../Assets/admin.png';
import cookies from '../../Others/Cookies/cookies';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Navbar from './Navbar/navbar';
import Logo from './Logo/logo';

function Topbar({ toggleSidedrawer }) {

    const cookie = cookies.get('token');

    const displayLoggedInUser = cookie !== undefined ? <div className={styles.loggedInContainer}>
        <div className={styles.userContainer}>
            <img src={admin} alt="admin" className={styles.user}/>
        </div>
        <div className={styles.adminContainer}>
            <span className={styles.adminText}>Admin</span>
            <button className={styles.logoutBtn} onClick={() => {
                cookies.remove('token');
                return window.location.href = '/';
            }}>Logout</button>
        </div>
    </div>
    :
    <div className={styles.loggedInContainer}>
        <Link to="/" className={styles.loginLink}>Login</Link>
    </div>

    return (
        <div className={styles.topbarContainer}>
            <div className={styles.drawtoggleContainer} onClick={toggleSidedrawer}>
                <FontAwesomeIcon icon={faBars} className={styles.bars}/>
            </div>
            <div className={styles.topbarItem}>
                <Logo />
            </div>
            <div className={styles.topbarItem}>
                <Navbar />
            </div>
            <div className={styles.userContainerMain}>
                {displayLoggedInUser}
            </div>
        </div>
    )
}

export default Topbar
