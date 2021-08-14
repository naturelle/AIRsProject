import React from 'react'


function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
            bottom: 0,
            left: 0
        }}>
           <p>  <i className="material-icons"></i></p>
        </div>
    )
}

export default Footer
