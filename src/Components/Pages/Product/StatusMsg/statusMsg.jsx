import React from 'react';
import styles from './statusMsg.module.css';

function StatusMsg({ action, status }) {

    let removeImgStatusMsg;
    if (status === 'success'){
        removeImgStatusMsg  = <div className={styles.statusMsgContainer}>
            <h4 className={styles.productContainerH4}>Image {action === 'change' ? 'Changed' : 'Removed'}</h4>
            <button className={styles.actionPromptBtn} onClick={() => window.location.reload()}>Ok</button>
        </div>
    }
    else {
        removeImgStatusMsg  = <div className={styles.statusMsgContainer}>
            <h4 className={styles.productContainerH4}>Failed</h4>
            <h4 className={styles.productContainerH4}>Please try again</h4>
            <button className={styles.actionPromptBtn}>Ok</button>
        </div>
    }

    return removeImgStatusMsg;
}

export default StatusMsg
