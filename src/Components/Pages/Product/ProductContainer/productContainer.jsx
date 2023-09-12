import React, { useEffect, useState } from 'react';
import styles from './productContainer.module.css';
import { category, subCategory } from '../../../Others/Data/data';
import AddNewImg from '../AddNewImg/addNewImg';
import Spinner from '../../../Others/Spinner/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import StatusMsg from '../StatusMsg/statusMsg';
import UpdateMsg from '../../../Others/UpdateMsg/updateMsg';

function ProductContainer({ product, productTitle }) {
    const [img, setImg] = useState({});
    const [productCategory, setProductCategory] = useState(product.category);
    const [productSubCategory, setProductSubCategory] = useState(product.subCategory);
    const [stock, setStock] = useState(product.stock);
    const [title, setTitle] = useState(product.title);
    const [originalPrice, setOriginalPrice] = useState(product.price.originalPrice);
    const [discountPrice, setDiscountPrice] = useState(product.price.discountedPrice);
    const [description, setDiscription] = useState(product.description);
    const [spinner, setSpinner] = useState(false);
    const [showRemovePrompt, setShowRemovePrompt] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [removeBtnSpinner, setRemoveBtnSpinner] = useState(false);
    const [removeImgStatus, setRemoveImgStatus] = useState('');
    const [removeStatus, setRemoveStatus] = useState(false);

    const [showChangeImg, setShowChangeImg] = useState(false);
    const [changeImg, setChangeImg] = useState(null);
    const [changeImgId, setChangeImgId] = useState(null);
    const [changeImgStatus, setChangeImgStatus] = useState('');
    const [showChangeImgStatus, setShowChangeImgStatus] = useState(false);
    const [changeImgSpinner, setChangeImgSpinner] = useState(false);
    const [updateDetailsStatus, setUpdateDetailsStatus] = useState('');
    const [updateDetailsSpinner, setUpdateDetailsSpinner] = useState(false);
    const [showUpdateDetailsMsg, setShowUpdateDetailsMsg] = useState(false);

    useEffect(() => {
        const imgs = JSON.parse(JSON.stringify(product.img));
        setImg(imgs);
    }, [])
    
    if (!product) return;

    const removeImgHandler = async (e, img) => {
        e.preventDefault();
        setRemoveBtnSpinner(true);
        await fetch('https://bes-care-server.onrender.com/remove-img',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ img, category: product.category, title: product.title })
        }).then(res => res.json()).then(result => {
            if (result.status === 'success'){
                setRemoveBtnSpinner(false);
                setRemoveImgStatus('success');
                setRemoveStatus(true);
                setShowRemovePrompt(false);
            }
            else {
                setRemoveBtnSpinner(false);
                setRemoveImgStatus('failed');
                setRemoveStatus(true);
                setShowRemovePrompt(false);
            }
        }).catch(err => {
            setRemoveBtnSpinner(false);
            setRemoveImgStatus('error');
            setRemoveStatus(true);
            setShowRemovePrompt(false);
        })
    }

    const changeImgHandler = async (e) => {
        e.preventDefault();
        setChangeImgSpinner(true);
        try {
            if (changeImg) {
                const formData = new FormData();
                formData.append('data', JSON.stringify({ title: product.title, category: product.category }))
                formData.append('photo', changeImg);
                await fetch('https://bes-care-server.onrender.com/add-photo', {
                    method: 'POST',
                    body: formData
                }).then(res => res.json()).then(data => {
                    setChangeImgSpinner(false);
                    setChangeImgStatus('success');
                    setShowChangeImgStatus(true);
                }).catch(err => {
                    setChangeImgSpinner(false);
                    setChangeImgStatus('failed');
                    setShowChangeImgStatus(true);
                })
            }
        } catch (error) {
            setChangeImgSpinner(false);
            setChangeImgStatus('failed');
            setShowChangeImgStatus(true);
        }
    }

    const onFileSelect = (e, id, name) => {
        const changeImgs = e.target.files[0];
        const file = new File([changeImgs], `${name}`, {
            dateModified: Date.now(),
            type: changeImgs.type
        })

        setChangeImg(file);
        const reader = new FileReader();
        const imgTag = document.getElementById(id);
        imgTag.title = changeImgs.name;
        reader.onload  = (e) => {
            imgTag.src = e.target.result;
        }

        reader.readAsDataURL(changeImgs);
    }

    const submitUpdateDetails = async (e) => {
        e.preventDefault();
        setShowUpdateDetailsMsg(false);
        setUpdateDetailsSpinner(true);
        const data = {
            productTitle: productTitle.trim(),
            title: title.trim(),
            description: description.trim(),
            productCategory,
            productSubCategory,
            stock,
            price: {
                originalPrice: originalPrice,
                discountedPrice: discountPrice
            }
        }
        await fetch('https://bes-care-server.onrender.com/update-product-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        }).then(res => res.json()).then(result => {
            console.log(result);
            if (result.status === 'success') {
                setUpdateDetailsSpinner(false);
                setUpdateDetailsStatus('success');
                setShowUpdateDetailsMsg(true);
            }
            else {
                setUpdateDetailsSpinner(false);
                setUpdateDetailsStatus('failed');
                setShowUpdateDetailsMsg(true);
            }
        }).catch(err => {
            setUpdateDetailsSpinner(false);
            setUpdateDetailsStatus('error');
            setShowUpdateDetailsMsg(true);
        })
    }

    const displayImg = Object.keys(img).map((item, idx) => {
        if (img[item]){
            return <div key={idx} className={styles.imgs}>
                <div className={styles.imgContainer}>
                    <img id={String(idx)} src={img[item]} alt="img" className={styles.img}/>
                </div>
                <div className={styles.titleContainer}>
                    <span className={styles.title}>Title: {item}</span>
                </div>
                <div className={styles.imgOptionContainer}>
                    <button className={styles.changeBtn} onClick={() => {
                        setShowChangeImg(true);
                        setChangeImgId(idx);
                    }}>Change Image</button>
                    <button className={styles.removeBtn} onClick={(e) => {
                        e.preventDefault();
                        setRemoveId(idx);
                        setShowRemovePrompt(true);
                    }}>Remove</button>
                </div>
                <div className={styles.actionPromptContainer} style={showRemovePrompt && removeId === idx ? {display: 'flex'} : {display: 'none'}}>
                    <h4 className={styles.productContainerH4}>Are you sure</h4>
                    <div className={styles.actionPromptBtnContainer}>
                        <button className={styles.actionPromptBtn} onClick={(e) => removeImgHandler(e, item)}>{
                            removeBtnSpinner ? <FontAwesomeIcon icon={faSpinner} spinPulse/> : 'Yes'
                        }</button>
                        <button className={styles.actionPromptBtn} onClick={(e) => {
                            e.preventDefault();
                            setShowRemovePrompt(false)
                        }}>No</button>
                    </div>
                </div>
                <div className={styles.removeStatusContainer} style={removeStatus && removeId === idx ? {display: 'flex'}:{display: 'none'} }>
                    <StatusMsg action={'remove'} status={removeImgStatus}/>
                </div>
                <div className={showChangeImg && changeImgId == idx ? `${styles.addNewImgContainer} ${styles.showContainer}` : styles.addNewImgContainer}>
                    <div className={showChangeImgStatus ? `${styles.displayStatus} ${styles.show}` : styles.displayStatus}>
                        <StatusMsg action={'change'} status={changeImgStatus}/>
                    </div>
                    <form encType='multipart/form-data' className={styles.newImgDetailsContainer}>
                        <input type='file' accept='image/png, image/jpeg' className={styles.newImgFileInput} onChange={(e) => onFileSelect(e, idx, item)}/>
                        <button className={styles.addImgBtn}
                                onClick={changeImgHandler}
                                disabled={!changeImg}>
                                {
                                    changeImgSpinner ? <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinner}/> : 'Change Photo'
                                }
                        </button>
                    </form>
                </div>
            </div>
        }
        else {
            return <AddNewImg key={idx}
                              id={item}
                              category={product.category}
                              title={product.title}/>
        }
    })

    return (
        <>
        <Spinner spinner={spinner}/>
        <div className={styles.productContainer}>
            <div className={styles.form}>
                <div className={styles.imgContainerMain}>
                    { displayImg }
                </div>
                <form className={styles.productDetailsContainer}>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Category</label>
                        <select className={styles.select}
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}>
                            {
                                category.map(cat => <option key={cat} value={cat} className={styles.option}>{cat}</option>)
                            }                    
                        </select>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Sub-category</label>
                        <select className={styles.select}
                                value={productSubCategory}
                                onChange={(e) => setProductSubCategory(e.target.value)}>
                            {
                                subCategory.map(cat => <option key={cat} className={styles.option}>{cat}</option>)
                            }                    
                        </select>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Stock</label>
                        <input type='number'
                               value={stock}
                               className={styles.input}
                               placeholder='Stock'
                               onChange={(e) => setStock(Number(e.target.value))}/>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Product's Title</label>
                        <input type='text'
                               className={styles.input}
                               value={title}
                               placeholder='Product Title'
                               onChange={(e) => setTitle(e.target.value)}/>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Original Price</label>
                        <input type='number'
                               className={styles.input}
                               value={originalPrice}
                               placeholder='Original Price'
                               onChange={(e) => setOriginalPrice(Number(e.target.value))}/>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Discount Price</label>
                        <input type='number'
                               className={styles.input}
                               value={discountPrice}
                               placeholder='Discount Price'
                               onChange={(e) => setDiscountPrice(Number(e.target.value))}/>
                    </fieldset>
                    <fieldset className={styles.fieldset}>
                        <label className={styles.label}>Description</label>
                        <textarea className={styles.textarea}
                                  placeholder='Product Description'
                                  value={description}
                                  onChange={(e) => setDiscription(e.target.value)} />
                    </fieldset>
                    <div className={styles.displayUpdateMsg} style={showUpdateDetailsMsg ? {display: 'flex'} : {display: 'none'}}>
                        <UpdateMsg status={updateDetailsStatus}/>
                    </div>
                    <button className={styles.submitBtn} onClick={submitUpdateDetails}>
                        {
                            updateDetailsSpinner ? <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinner}/> : 'Submit Changes'
                        }
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}

export default ProductContainer
