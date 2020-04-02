import React from 'react'

export default function ErrorView({error}) {
    return (
        <div className="d-flex justify-content-center align-items-center text-danger h4" style={{height: window.innerHeight, width: window.innerWidth}}>
            {error}
        </div>
    )
}
