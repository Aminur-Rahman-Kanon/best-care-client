import React from 'react';
import styles from './messageContainer.module.css';
import ProductExist from '../../Pages/UploadProducts/ProductExist/productExist';

function MessageContainer( { display, toggleDisplay, data} ) {
    let displayMessage;

    if (data.status === 'success'){
        displayMessage = <div className={styles.displayMessageContainer}>
            <h4 className={styles.messageH4}>Product's Uploaded</h4>
            <p className={styles.messageP}>This page will reload when clicking done</p>
            <button className={styles.messageBtn} onClick={() => window.location.reload()}>Done</button>
        </div>
    }
    else if (data.status === 'failed'){
        displayMessage = <div className={styles.displayMessageContainer}>
            <h4 className={styles.messageH4}>Failed to Upload</h4>
            <p className={styles.messageP}>Please try again or reload the page</p>
            <button className={styles.messageBtn} onClick={toggleDisplay}>Ok</button>
        </div>
    }
    else if (data.status === 'product exist'){
        displayMessage = <div className={styles.displayMessageContainer}>
            <h4 className={styles.messageH4}>Product exist</h4>
            <p className={styles.messageP}>This product exist in the database</p>
            <ProductExist products={data.product ? data.product : []}/>
            <button className={styles.messageBtn} onClick={toggleDisplay}>Ok</button>
        </div>
    }
    else {
        displayMessage = <div className={styles.displayMessageContainer}>
            <h4 className={styles.messageH4}>Something went wrong</h4>
            <p className={styles.messageP}>Please try again or check internet connection</p>
            <button className={styles.messageBtn} onClick={toggleDisplay}>Done</button>
        </div>
    }

    if (!display) return;

    return (
        <div className={styles.messageContainerMain}>
            {displayMessage}
        </div>
    )
}

export default MessageContainer
