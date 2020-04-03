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
import Header from "../../components/Header/Header";


const ListCard = React.lazy(() => import('../../components/ListCard/ListCard'));
function Home() {
    let mount = true;
    const [state, setState] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchString, setSearchString] = useState();
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        if (mount) {
            getJobs();
        }
        return () => {
            mount = false
        }
    }, []);


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
        setSearchString(event.currentTarget.value);
    }

    function submitQuery(e) {
        e.preventDefault();
        if (searchString) {
            handleFilter()
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
        setFilteredResults(r);
    }

    function handleClearSearchInput() {

        if (searchString) {
            console.log('handleClearSearchInput ');
            setSearchString('');
            setFilteredResults([]);
        }
    }



    return (
        <>
            <Header
                title={'Jobs'}
                searchForm={<SearchView
                    handleform= {submitQuery}
    query= {searchString}
    handleClear ={handleClearSearchInput}
    handleInput= {handleSearchInputChange}
                    />}
            />
            {
                loading ?
                    <Loader /> :
                    <div className='bg-light flex-column'>
                        <div
                            className=' w-100 d-flex align-content-start align-items-start flex-wrap'
                        >

                            {
                                filteredResults && filteredResults.length > 0 ? filteredResults.map((jobEntry, index) => {
                                    return <Suspense key={index} fallback={<PlaceholderView key={index} />}>
                                        <ListCard key={jobEntry.id} {...jobEntry} />
                                    </Suspense>
                                })
                                    :
                                    state ? state.map((jobEntry, index) => {
                                        return <Suspense key={index} fallback={<PlaceholderView key={index} />}>
                                            <ListCard key={jobEntry.id} {...jobEntry} />
                                        </Suspense>
                                    })
                                        :
                                        error ? <ErrorView error={error} /> : null
                            }
                        </div>

                    </div>}
        </>
    );
}

export default Home;

const PlaceholderView = () => {
    return <Card className='card alert-secondary' style={{ maxWidth: 300, margin: 4 }}>
        <div className='d-flex bd-highlight p-2 card-header'>
            <div className=' bd-example mr-4' style={{ width: "80%", height: "10%", fill: "#868a96" }}>

                <Placeholder style={{ backgroundColor: '#aaa', }} className='img-fluid ml-1 mr-1 rounded mx-auto d-block' />

            </div>
            <div style={{ width: "20%", height: "4%", fill: "#868a96" }} className='p-2 flex-grow-1 bd-highlight flex-column'>
                <h6 className='font-weight-bold text-wrap text-capitalize'>
                </h6>
                <p className="font-weight-light">
                </p>
            </div>

        </div>
        <div style={{ maxWidth: 100 }} className="card-body">
            <CardTitle><div style={{ width: "250%", height: "4%", fill: "#868a96" }} className="font-weight-light" ></div></CardTitle>


        </div>
        <CardFooter> <div className="d-flex justify-content-end">

            <button type="button" className='btn btn-outline-secondary align-self-end disabled' disabled>text</button>
        </div></CardFooter>
    </Card>
}

const SearchView = ({
    handleform ,
    query , 
    handleClear , 
    handleInput 
}) => {
    return <form
        onSubmit={handleform}
        className='rounded d-flex justify-content-center'
        action="">
        {
            query ?
                <button
                    onClick={() => handleClear()}
                    className='btn btn-sm btn-warning m-1'
                    type="button">
                    clear
                    </button>
                : null
        }
        <input
            value={query}
            onChange={e => handleInput(e)}
            placeholder='Search by key word' type="text"
            className='border rounded m-1' name="searchInput"
            id="searchInput" />
        <button className='btn btn-sm btn-success m-1' type="submit">
            Search
        </button>
    </form>
}
