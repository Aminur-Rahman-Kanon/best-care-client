import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

function Modal({ modal, children }) {
    if (!modal) return;

    return ReactDOM.createPortal(<div className={styles.modalContainer}>
        {children}
    </div>, document.getElementById('modal'));
}

export default Modal
