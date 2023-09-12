import React from 'react';
import styles from './productExist.module.css';

function ProductExist({ products }) {
    
    if (!products.length) return;

    const displayProduct = products.map(item => {
        return <div key={item._id} className={styles.product}>
            <div className={styles.productImgContainer}>
                <img src={item.img[Object.keys(item.img)[0]]} alt="img" className={styles.productImg}/>
            </div>
            <div className={styles.productDetailsContainer}>
                <p className={styles.productText}>Category: {item.category}</p>
                <p className={styles.productText}>Sub-Category: {item.subCategory}</p>
                <p className={styles.productText}>Title: {item.title}</p>
                <p className={styles.productText}>Price: &#2547;{item.price.originalPrice}</p>
            </div>
        </div>
    })

    return (
        <div className={styles.productExistContainer}>
            {displayProduct}
        </div>
    )
}

export default ProductExist
