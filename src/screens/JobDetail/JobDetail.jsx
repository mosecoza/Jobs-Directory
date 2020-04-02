import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { ReactComponent as Placeholder } from "../../assets/placeholder.svg";
import Loader from "../../components/Loader/Loader";
import ErrorView from "../../components/ErrorView/ErrorView";


const INITIAL_STATE = {
    id: '',
    type: '',
    url: '',
    created_at: '',
    company: '',
    company_url: '',
    location: '',
    title: '',
    description: '',
    how_to_apply: '',
    company_logo: ''
}



export default function JobDetail() {
    const innerLocation = useLocation();
    const [state, setState] = useState(INITIAL_STATE);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const descriptionRef = useRef(null);
    const applyRef = useRef(null);
    const [descriptionHTML, setDescriptionHTML] = useState();
    const [applyHTML, setApplyHTML] = useState();

    useEffect(() => {

        if (descriptionRef.current) {
            descriptionRef.current.innerHTML = descriptionHTML;
        }
    }, [state.description]);

    useEffect(() => {

        if (applyRef.current) {
            applyRef.current.innerHTML = applyHTML;
        }
    }, [state.how_to_apply]);

    useEffect(() => {
        if (applyHTML && applyHTML.includes("<a")) {


            if (!applyHTML.includes("click to apply")) {
                let t = applyHTML.split("<a")[1].split("\"")[1];
                let x = applyHTML.split(t);
                if (x[2]) return setApplyHTML(`${x[0]}${t}${x[1]}click to apply${x[2]}`)
            }
        }
    }, [applyHTML]);

    useEffect(() => {
        getJob();
    }, []);

    async function getJob() {

        try{
            const fetchResponse = await fetch(`https://us-central1-mlab-challenge.cloudfunctions.net/job?id=${innerLocation.pathname.split('/')[1]}`);
        fetchResponse.json().then(job => {
            setLoading(false);

            setApplyHTML(job.how_to_apply);
            setDescriptionHTML(job.description);
            setState(job);

        }).catch(rejected => {
            setLoading(false);
            setError(rejected.message);
        })
    }catch(e){
        setLoading(false);
            setError(e.message);
    }

    }


    return (
        <>
            {
                loading ? <Loader /> :
                    <div
                        className='text-dark'
                        style={{
                            flex: 1,
                            minHeight: window.outerHeight,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            // backgroundColor: 'red'
                        }}
                    >
                        {error? <ErrorView error={error}/>: null}
                        <div style={{height:250}} className='d-flex justify-content-center h-40'>
                            {
                                state.company_logo ?
                                    <img className='img-fluid'  src={state.company_logo}  alt="company logo" /> :
                                    null
                            }
                        </div>
                        <div className='container'>
                            <div>

                            <h5 className='text-bold text-capitalize'>{state.title ? (state.title).toLowerCase() : null}</h5>
                            <h6>{state.company ? state.company : null}</h6>
                            <p>{state.created_at ? state.created_at : null}</p>
                            </div>
                            <p className="border-bottom p-1" ref={descriptionRef}></p>
                            <div className=" p-1 text-wrap" ref={applyRef}></div>
                        </div>

                    </div>
            }
        </>
    )
}
