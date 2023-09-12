import React from 'react';

const style = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    zIndex: '500',
    backgroundColor: '#e9e9e9ba'
}

function Backdrop({ backdrop, toggleBackdrop }) {

    if (!backdrop) return;

    return (
        <div style={style} onClick={() => toggleBackdrop(false)}>
        
        </div>
    )
}

export default Backdrop
