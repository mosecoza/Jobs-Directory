import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { ReactComponent as Placeholder } from "../../assets/placeholder.svg";
import moment from 'moment';
import { handleTitle, createMarkup } from '../../utils/functions';

export default function CardBodyTitleSubtitleExample({
    id,
    type,
    url,
    created_at,
    company,
    company_url,
    location,
    title,
    description,
    how_to_apply,
    company_logo
}) {

    var mounted = true;
    const innerLocation = useLocation();
    const innerHistory = useHistory();


    function handleSelectedJob() {

        const location = innerLocation.pathname = `/${id}`;
        innerHistory.push(location);
    }

    return (
        <div className='col-md-3'>
            <div className='card mb-4 shadow-sm ' >
                <div className='d-flex bd-highlight p-2 bg-white card-header clearfix'>
                    <div className=' p-2 bd-highlight'>

                        {company_logo ?
                            <img
                                className=' ml-1 mr-1 rounded mx-auto d-block'
                                style={{
                                    flex: 8,
                                    objectFit: 'cover',
                                    objectPosition: '100% 0',
                                    backgroundColor: 'grey',
                                    width: 50,
                                    height: 50
                                }}
                                src={company_logo}
                                alt=' logo' /> :
                            <Placeholder
                                style={{
                                    backgroundColor: 'grey',
                                    width: 50,
                                    height: 50
                                }}
                                className=' ml-1 mr-1 rounded mx-auto d-block' />
                        }
                    </div>
                    <div className='p-2 flex-grow-1 bd-highlight flex-column'>
                        <h6
                            style={{ maxHeight: 20, }}
                            className='font-weight-bold text-truncate text-wrap text-capitalize'>
                            {handleTitle(title)}
                        </h6>
                        <p className="font-weight-light">
                            {location}
                        </p>
                    </div>
                </div>

                <div className='card-body m-1 p-1'>
                    <a className='card-title text-info'>{company}</a>
                    <p className='font-italic' style={{ fontSize: 10 }}>{type}</p>
                    <p
                        style={{ maxHeight: 100, maxWidth: 250, fontSize: 14 }}
                        className='h-5 text-wrap text-center  text-truncate d-inline-block overflow-hidden'
                        dangerouslySetInnerHTML={createMarkup(description)}
                    >

                    </p>

                </div>
                <div className='d-flex bd-highlight bg-white p-2 card-footer clearfix'>

                    <div
                        style={{ fontSize: 12 }}
                        className=" flex-grow-1 p-2 bd-highlight">
                        Created: {created_at ? moment(created_at).fromNow() : null}
                    </div>
                    <div className="p-2  bd-highlight flex-column justify-content-end m-0">
                        <button
                            type="button"
                            className='btn btn-outline-primary align-self-end'
                            onClick={() => handleSelectedJob()}>
                            View Job
                            </button>
                    </div>
                </div>
            </div>
        </div>

    );
}