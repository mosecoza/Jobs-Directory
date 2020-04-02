import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button,
    Col
} from "shards-react";
import { ReactComponent as Placeholder } from "../../assets/placeholder.svg";
import Loader from "../../components/Loader/Loader";
import ErrorView from "../../components/ErrorView/ErrorView";
const ListCard = React.lazy(() => import('../../components/ListCard/ListCard'));
function Home() {

    const [state, setState] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchString, setSearchString] = useState();
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        getJobs();
    }, []);

    useEffect(() => {
        // getJobs();
    }, [filteredResults]);

    async function getJobs() {
        try {
            const fetchResponse = await fetch("https://us-central1-mlab-challenge.cloudfunctions.net/jobs");

            fetchResponse.json().then(jobs => {
                setLoading(false)
                if (state.length === 0) {
                    setState(jobs)
                }
            }).catch(rejected => {
                setLoading(false)
                setError(rejected.message);
            })
        } catch (e) {
            setLoading(false)
            setError(e.message);
        }
    }



    function handleSearchInputChange(event) {
        // event.currentTarget.persit()
        setSearchString(event.currentTarget.value);

    }

    function submitQuery(e) {
        e.preventDefault();
        if (searchString) {
            handleFilter()
        }
        else {
            setState([]);
            setLoading(true)
            getJobs();
        }
    }

    function handleFilter() {
        let r = state.filter(entry => {
            return Object.keys(entry).some(k => {
                if (entry[k]) {
                    return entry[k].toLowerCase().includes(searchString.toLowerCase())
                }
                // 
            });
        });
        setFilteredResults(state);
        setState(r)
    }



    return (
        <>
            {loading ? <Loader /> : <div className='d-flex justify-content-center'>
                <form style={{ opacity: 0.3 }} onSubmit={submitQuery} className='mt-20 fixed-top w-100 bg-secondary shadow-lg rounded d-flex justify-content-center' action="">
                    <input value={searchString} onChange={e => handleSearchInputChange(e)} placeholder='Search by key word' type="text" className='border rounded m-1' name="searchInput" id="searchInput" />
                    <button className='btn btn-sm btn-warning m-1' type="submit">
                        Search
                    </button>
                </form>
                <div style={{ paddingTop: 30 }} className='container-fluid d-flex justify-content-around flex-wrap'>

                    {
                        state ? state.map((jobEntry, index) => {
                            return <Suspense key={index} fallback={<PlaceholderView key={index} />}>
                                <ListCard key={jobEntry.id} {...jobEntry} />
                            </Suspense>
                        }) : null
                    }
                </div>

                {error ? <ErrorView error={error} /> : null}
            </div>}
        </>
    );
}

export default Home;

const PlaceholderView = () => {
    return <Card className='card alert-secondary' style={{ maxWidth: 300, margin: 4 }}>
        <div className='d-flex justify-content-between d-flex align-items-center card-header'>
            <div className=' bd-example mr-4' style={{ flex: 2 }}>

                <Placeholder style={{ backgroundColor: 'grey', }} className='img-fluid ml-1 mr-1 rounded mx-auto d-block' />

            </div>
            <div className='d-flex flex-column'>
                <rect className='font-weight-bold text-wrap text-capitalize' width="30%" height="8%" fill="#868e96"></rect>
                <rect className="font-weight-light" width="250%" height="4%" fill="#868a96"></rect>

            </div>

        </div>
        <div className="card-body">
            <CardTitle><rect className="font-weight-light" width="250%" height="4%" fill="#868a96"></rect></CardTitle>
            <p></p>
            <span className='h-5 text-wrap  text-truncate' />
            <div className="d-flex justify-content-end">

                <button type="button" className='btn btn-outline-secondary align-self-end disabled' disabled>text</button>
            </div>

        </div>
        <CardFooter><rect className="font-weight-light" width="250%" height="4%" fill="#868a96"></rect></CardFooter>
    </Card>
}

// const
