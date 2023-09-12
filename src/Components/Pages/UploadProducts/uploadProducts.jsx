import React, { useEffect, useState } from 'react';
import styles from './uploadProducts.module.css';
import { category, subCategory } from '../../Others/Data/data';
import cookies from '../../Others/Cookies/cookies';
import Spinner from '../../Others/Spinner/spinner';
import MessageContainer from '../../Others/MessageContainer/messageContainer';
import Modal from '../../Others/Modal/modal';
import Backdrop from '../../Others/Backdrop/backdrop';
import { disableScroll } from '../../Others/Utility/utility';

const selectCategory = category.map(item => <option key={item} value={item} className={styles.options}>{item}</option>);
const selectSubCategory = subCategory.map(item => <option key={item} value={item} className={styles.options}>{item}</option>);

function UploadProducts() {

    const cookie = cookies.get('token');

    const [productCategory, setProductCategory] = useState('');
    const [productSubCategory, setProductSubCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [productImages, setProductImages] = useState(null);
    const [productImagesToSend, setProductImagesToSend] = useState([]);
    const [description, setDescription] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [status, setStatus] = useState('');
    const [displayMsg, setDisplayMsg] = useState(false);
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        if (cookie !== undefined){
            fetch('https://bes-care-server.onrender.com/verify-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: cookie })
            }).then(res => res.json()).then(data => {
                if (data.status !== 'valid') {
                    cookies.remove('token')
                    window.location.href = '/'
                }
            }).catch(err => window.location.href = '/');
        }
    }, [])

    useEffect(() => {
        if (productImages !== null && title){
            const otherImg = [];
            for (let i=0; i<productImages.length; i++){
                const file = new File([productImages[i]], `${title}${i+1}`, {
                    dateModified: Date.now()
                })
                otherImg.push(file);
            }
            setProductImagesToSend(otherImg);
        }
    }, [productImages]);

    useEffect(() => {
        if (backdrop){
            disableScroll();
        }
        else {
            window.onscroll = () => { };
        }
    }, [backdrop])

    const submitHandler = async (e) => {
        e.preventDefault();
        setSpinner(true);

        const formData = new FormData();
        const productPrice = {
            originalPrice: price,
            discountedPrice
        }

        productImagesToSend.forEach(img => formData.append('photo', img));
        formData.append('data', JSON.stringify({ 
            productCategory, productSubCategory, stock, title, productPrice, description
         }));

        await fetch('https://bes-care-server.onrender.com/upload-products', {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            setSpinner(false);
            setStatus(data);
            setBackdrop(true);
            setDisplayMsg(true);
            setModal(true);
        }).catch(err => {
            setSpinner(false);
            setStatus('error');
            setBackdrop(true);
            setDisplayMsg(true);
            setModal(true);
        });
    }

    const toggleDisplayMsg = () => {
        setStatus('');
        setDisplayMsg(false);
        setModal(false);
        setBackdrop(false);
    }

    // if (cookie === undefined) return window.location.href = '/';

    return (
        <>
        <Backdrop backdrop={backdrop} toggleBackdrop={toggleDisplayMsg}/>
        <Modal modal={modal}>
            <MessageContainer display={displayMsg} toggleDisplay={toggleDisplayMsg} data={status}/>
        </Modal>
        <Spinner spinner={spinner} />
        <div className={styles.uploadProductsContainer}>
            <h2>Upload Products</h2>
            <form className={styles.form} encType='multipart/form-data'>
                <div className={styles.fieldsetGroup}>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Category</label>
                        <select defaultValue="Select a category" className={styles.select} onChange={(e) => setProductCategory(e.target.value)}>
                            <option disabled>Select a category</option>
                            {selectCategory}
                        </select>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Sub-category</label>
                        <select defaultValue="Select a Sub-category" className={styles.select} onChange={(e) => setProductSubCategory(e.target.value)}>
                            <option disabled>Select a Sub-category</option>
                            {selectSubCategory}
                        </select>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Stock</label>
                        <input type="number"
                            className={styles.input}
                            placeholder="Product's amount"
                            onChange={(e) => setStock(Number(e.target.value))} />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Product Title</label>
                        <input type="text"
                            className={styles.input}
                            placeholder="Product's Title"
                            onChange={(e) => setTitle(e.target.value)}/>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Product's Price</label>
                        <input type="number"
                            className={styles.input}
                            placeholder="Product's Price"
                            onChange={(e) => setPrice(Number(e.target.value))} />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Discounted Price</label>
                        <input type="number"
                            className={styles.input}
                            placeholder="Discounted Price"
                            onChange={(e) => setDiscountedPrice(Number(e.target.value))} />
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Product Images</label>
                        <input type='file' multiple onChange={(e) => setProductImages(e.target.files)}/>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Product Description</label>
                        <textarea placeholder='Product Description'
                                className={styles.textarea}
                                onChange={(e) => setDescription(e.target.value)}/>
                    </fieldset>
                </div>
                <button onClick={submitHandler}
                        disabled={!category || !subCategory || !stock || !title || !price || !productImages || !description}
                        className={styles.submitBtn}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default UploadProducts;
