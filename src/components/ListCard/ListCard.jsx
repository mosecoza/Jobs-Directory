import React, { useEffect, useRef, useState } from 'react';
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
import { useLocation, useHistory } from "react-router-dom";
import { ReactComponent as Placeholder } from "../../assets/placeholder.svg";

export default function CardBodyTitleSubtitleExample({ id, type, url, created_at, company, company_url, location, title, description, how_to_apply, company_logo }) {
    const innerLocation = useLocation();
    const innerHistory = useHistory();

    var parser = new DOMParser();
    const spanRef = useRef(null);
    const [someHTML,] = useState(description.split('<p>')[2]);
    const html = description;
    const pattern = description.split('<p>')[2];
    // console.log(company_logo)

    useEffect(() => {

        if (spanRef.current) {
            spanRef.current.innerHTML = someHTML;
        }
    }, [spanRef.current]);

    // Parse the text

    // console.log(description)

    function handleSelectedJob() {

        const location = innerLocation.pathname = `/${id}`;
        innerHistory.push(location);
    }

    return (
        <Card className='card shadow ' style={{ maxWidth: 300, margin: 4 }}>
            <div className='d-flex justify-content-between d-flex align-items-center p-2'>
                <div className=' bd-example mr-4' style={{ flex:2, }}>

                    {company_logo ?
                        <img className=' ml-1 mr-1 rounded mx-auto d-block' style={{flex:8, objectFit: 'cover', objectPosition: '100% 0', backgroundColor: 'grey', width: 50, height: 50 }} src={company_logo} alt='company logo' /> :
                        <Placeholder style={{ backgroundColor: 'grey',  width: 50, height: 50 }} className=' ml-1 mr-1 rounded mx-auto d-block' />
                    }
                </div>
                <div className='d-flex flex-column'>
                    <h6 className='font-weight-bold text-wrap text-capitalize'>
                        {(title).toLowerCase() }
                    </h6>
                    <p className="font-weight-light">
                        {created_at}
                    </p>
                </div>
            </div>

            <div className='card-body'>
                <CardTitle>{company}</CardTitle>
                <p>{type}</p>
                <span className='h-5 text-wrap  text-truncate' ref={spanRef} />
                <div class="d-flex justify-content-end">

                <button type="button" className='btn btn-outline-primary align-self-end' onClick={() => handleSelectedJob()}>View Job </button>
                </div>
            </div>
            <CardFooter>{location}</CardFooter>
        </Card>

    );
}