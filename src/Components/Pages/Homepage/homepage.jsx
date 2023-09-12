import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './homepage.module.css';
import cookies from '../../Others/Cookies/cookies';

function Homepage() {

    const cookie = cookies.get('token');

    const [products, setProducts] = useState({});

    useEffect(() => {
        fetch('https://bes-care-server.onrender.com/fetch-products').then(res => res.json()).then(data => {
            console.log(data);
            if (data.data){
                setProducts(data.data);
            }
        }).catch(err => console.log(err));
    }, []);

    if (cookie === undefined) return window.location.href = '/';

    return (
        <section className={styles.homepageMain}>
            <div className={styles.homepageContainer}>
                <div className={styles.rows}>
                    <div className={styles.header}>Hot Deals:</div>
                    <div className={styles.count}>{products.hotDealsProduct ? products.hotDealsProduct.length : 0}</div>
                    <Link to="/products/hotDealsProducts" className={styles.checkBtn}>Check</Link>
                </div>
                <div className={styles.rows}>
                    <div className={styles.header}>Popular Products:</div>
                    <div className={styles.count}>{products.popularProducts ? products.popularProducts.length : 0}</div>
                    <Link to="/products/popularProducts" className={styles.checkBtn}>Check</Link>
                </div>
                <div className={styles.rows}>
                    <div className={styles.header}>New Arrivals:</div>
                    <div className={styles.count}>{products.newArrivals ? products.newArrivals.length : 0}</div>
                    <Link to="/products/newArrivals" className={styles.checkBtn}>Check</Link>
                </div>
                <div className={styles.rows}>
                    <div className={styles.header}>All Products:</div>
                    <div className={styles.count}>{products.allProducts ? products.allProducts.length : 0}</div>
                    <Link to="/products/allProducts" className={styles.checkBtn}>Check</Link>
                </div>
            </div>
        </section>
    )
}

export default Homepage
