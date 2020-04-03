import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { ReactComponent as Placeholder } from "../../assets/placeholder.svg";
import Loader from "../../components/Loader/Loader";
import BackButton from "../../components/BackButton/BackButton";
import ErrorView from "../../components/ErrorView/ErrorView";
import Header from "../../components/Header/Header";
import { removeTags, sanitize } from "../../utils/html-sanitiser";
import { handleTitle, createMarkup } from '../../utils/functions';
import moment from 'moment';


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
    let mount = true;
    const innerLocation = useLocation();
    const [state, setState] = useState(INITIAL_STATE);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const descriptionRef = useRef(null);
    const applyRef = useRef(null);
    const [descriptionHTML, setDescriptionHTML] = useState();
    const [applyHTML, setApplyHTML] = useState();


    useEffect(() => {
        if (mount) {
            getJob();
        }
        return () => {
            mount = false
        }
    }, []);

    useEffect(() => {
        if (mount) {
            if (descriptionRef.current) {
                descriptionRef.current.innerHTML = descriptionHTML;
            }
        }
        return () => {
            mount = false
        }
    }, [state.description]);

    async function unsanitizeDesc(string) {
        let r = await sanitize(string);
        setDescriptionHTML(r)
    }

    async function unsanitizeApply(string) {
        let r = await sanitize(string);
        setApplyHTML(r)
    }

    useEffect(() => {
        if (mount) {
            if (applyRef.current) {
                applyRef.current.innerHTML = applyHTML;
            }
        }
        return () => {
            mount = false
        }
    }, [state.how_to_apply]);

    useEffect(() => {
        if (mount) {
            if (applyHTML && applyHTML.includes("<a")) {


                if (!applyHTML.includes("APPLY FOR THIS JOB")) {
                    let t = applyHTML.split("<a")[1].split("\"")[1];
                    let x = applyHTML.split(t);
                    if (x[2]) return setApplyHTML(`${x[0]}${t}${x[1]}APPLY FOR THIS JOB${x[2]}`)
                }
            }
        }
        return () => {
            mount = false
        }
    }, [applyHTML]);



    async function getJob() {

        try {
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
        } catch (e) {
            setLoading(false);
            setError(e.message);
        }

    }

    return (
        <>

            <Header backButton={<BackButton />} title='Job Details' />
            {
                loading ? <Loader /> :
                    <div
                        className='text-dark'
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        {error ? <ErrorView error={error} /> : null}
                        <div
                            // style={{ height: 250 }}
                            className='d-flex justify-content-center border-bottom '
                        >
                            {
                                state.company_logo ?
                                    <img
                                        className='img-fluid'
                                        src={state.company_logo}
                                        alt=" logo" />
                                    :
                                    <Placeholder className='img-fluid' />
                            }
                        </div>
                        <div className='container'>
                            <div className='alert-dark  w-100 p-1 m-2 border border-dark'>

                                <h5
                                    className='text-bold text-capitalize'>
                                    {state.title ? handleTitle(state.title) : null}
                                </h5>
                                <p className='font-italic' style={{ fontSize: 12 }}>{state.type}</p>
                                <a
                                    href={state.company_url != 'http:' ? state.company_url : null}
                                    className='text-info'>
                                    {state.company ? state.company : null}
                                </a>
                                <div
                                    className="w-100 flex-column justify-content-end m-0">

                                    <p
                                        className='text-secondary align-self-end'>
                                        Created: {state.created_at ? moment(state.created_at).fromNow() : null}
                                    </p>
                                </div>

                            </div>
                            <div className='d-flex justify-content-center '>

                                <div
                                    className="  w-80 m-2 alert-success shadow p-1 text-wrap"
                                    dangerouslySetInnerHTML={createMarkup(applyHTML)}
                                >
                                </div>
                            </div>
                            <p className="border-bottom p-1"
                                dangerouslySetInnerHTML={createMarkup(descriptionHTML)}
                            >
                            </p>
                            <div className='d-flex justify-content-center '>

                                <div
                                    className="  w-80 m-2 alert-success shadow p-1 text-wrap"
                                    dangerouslySetInnerHTML={createMarkup(applyHTML)}
                                >
                                </div>
                            </div>
                            
                        </div>

                    </div>
            }
        </>
    )
}
