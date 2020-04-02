import React from 'react'

export default function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight, width: window.innerWidth}}>
            <div className="spinner-border m-16" role="status">
                
            </div>
            <span className="ml-16">Loading...</span>
        </div>
    )
}
