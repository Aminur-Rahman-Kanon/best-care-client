import React from 'react';
import styles from './updateMsg.module.css';

function UpdateMsg({ status }) {
    let displayUpdateMsg = null;

    if (status === 'success'){
        displayUpdateMsg = <div className={styles.updateMsgContainer} style={{ backgroundColor: '#00a100a8' }}>
            <p className={styles.updateMsgH4}>Details Updated</p>
        </div>
    }
    else if (status === 'failed'){
        displayUpdateMsg = <div className={styles.updateMsgContainer} style={{ backgroundColor: '#a1000099' }}>
            <p className={styles.updateMsgH4}>Update Failed</p>
        </div>
    }
    else if (status === 'error'){
        displayUpdateMsg = <div className={styles.updateMsgContainer} style={{ backgroundColor: '#a1000099' }}>
            <p className={styles.updateMsgH4}>Network error</p>
        </div>
    }

    return displayUpdateMsg;
}

export default UpdateMsg;
