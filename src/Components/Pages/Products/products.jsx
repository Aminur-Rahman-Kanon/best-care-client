import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './products.module.css';
import cookies from '../../Others/Cookies/cookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '../../Others/Backdrop/backdrop';
import { category } from '../../Others/Data/data';

function Products() {

    const params = useParams();

    const cookie = cookies.get('token');

    const [products, setProducts] = useState([]);

    const [sidePanel, setSidePanel] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        fetch(`https://bes-care-server.onrender.com/fetch-category/${params.productsId}`).then(res => res.json()).then(data => {
            console.log(data);
            if (data.data){
                setProducts(data.data);
            }
        }).catch(err => console.log(err));
    }, []);

    const categoryContainer = category.map(item => <a key={item} href={`/products/${item}`} className={params.productsId === item ? `${styles.category} ${styles.active}` : styles.category}
    >{item}</a>)

    let displayProducts;
    console.log(products);

    if (products.length){
        displayProducts = products.map(item => <Link to={`/product/${item.title}`} key={item._id} className={styles.product}>
            <div className={styles.productImgContainer}>
                <img src={item.img[Object.keys(item.img)[0]]} alt="img" className={styles.productImg} />
            </div>
            <div className={styles.productDetailsContainer}>
                <p className={styles.productDetailsP}>Title: {item.title}</p>
                <p className={styles.productDetailsP}>Category: {item.category}</p>
                <p className={styles.productDetailsP}>Sub-Category: {item.subCategory}</p>
                <p className={styles.productDetailsP}>Price: {item.price.originalPrice}</p>
            </div>
        </Link>)
    }
    else {
        displayProducts = <div className={styles.defaultproductDisplay}>
            <h4>No item</h4>
        </div>
    }

    const toggleSidepanel = () => {
        setSidePanel((sidePanel) => !sidePanel);
        setBackdrop((backdrop) => !backdrop);
    }

    if (cookie === undefined) return window.location.href = '/';
    return (
        <>
        <Backdrop backdrop={backdrop} toggleBackdrop={toggleSidepanel}/>
        <section className={styles.productsContainer}>
            <div className={styles.drawToggle} onClick={toggleSidepanel}>
                <FontAwesomeIcon icon={faList}/>
            </div>
            <div className={sidePanel ? `${styles.categoryContainer} ${styles.on}` : styles.categoryContainer}>
                <a href='/products/all-products' className={params.productsId === 'all-products' ? `${styles.category} ${styles.active}` : styles.category}
                    >All products</a>
                <a href='/products/hot-deals' className={params.productsId === 'hot-deals' ? `${styles.category} ${styles.active}` : styles.category}
                    >Hot Deals</a>
                <a href='/products/popular-products' className={params.productsId === 'popular-products' ? `${styles.category} ${styles.active}` : styles.category}
                    >Popular Products</a>
                <a href='/products/new-arrivals' className={params.productsId === 'new-arrivals' ? `${styles.category} ${styles.active}` : styles.category}
                    >New Arrivals</a>
                {categoryContainer}
            </div>
            <div className={styles.productDisplayContainer}>
                {displayProducts}
            </div>
        </section>
        </>
    )
}

export default Products