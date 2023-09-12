import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './products.module.css';
import cookies from '../../Others/Cookies/cookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '../../Others/Backdrop/backdrop';

function Products() {

    const params = useParams();

    const cookie = cookies.get('token');

    const [products, setProducts] = useState({});

    const [sidePanel, setSidePanel] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [category, setcategory] = useState(() => {
        if (params.productsId){
            return params.productsId;
        }
        else {
            return 'allProducts'
        }
    });

    useEffect(() => {
        fetch('https://bes-care-server.onrender.com/fetch-products').then(res => res.json()).then(data => {
            if (data.data){
                setProducts(data.data);
            }
        }).catch(err => console.log(err));
    }, []);

    let displayProducts;
    console.log(products);

    if (Object.keys(products).length){
        displayProducts = products[Object.keys(products).filter(item => item === category)[0]].map(item => <Link to={`/products/${item.title}`} key={item._id} className={styles.product}>
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
                <div className={category === 'hotDealsProducts' ? `${styles.category} ${styles.active}` : styles.category}
                     onClick={() => {
                        setcategory('hotDealsProducts');
                        toggleSidepanel();
                    }}
                     >Hot Deals</div>
                <div className={category === 'popularProducts' ? `${styles.category} ${styles.active}` : styles.category}
                     onClick={() => {
                        setcategory('popularProducts');
                        toggleSidepanel();
                     }}
                     >Popular Products</div>
                <div className={category === 'newArrivals' ? `${styles.category} ${styles.active}` : styles.category}
                     onClick={() => {
                        setcategory('newArrivals');
                        toggleSidepanel();
                    }}
                     >New Arrivals</div>
                <div className={category === 'allProducts' ? `${styles.category} ${styles.active}` : styles.category}
                     onClick={() => {
                        setcategory('allProducts')
                        toggleSidepanel();
                    }}
                     >All products</div>
            </div>
            <div className={styles.productDisplayContainer}>
                {displayProducts}
            </div>
        </section>
        </>
    )
}

export default Products