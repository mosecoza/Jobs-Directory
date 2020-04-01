import React,{useEffect, useRef, useState} from 'react';
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
import {ReactComponent as Placeholder} from "../../assets/placeholder.svg";

export default function CardBodyTitleSubtitleExample({ id, type, url, created_at, company, company_url, location, title, description, how_to_apply, company_logo }) {
    var parser = new DOMParser();
    const spanRef = useRef(null);
    const [someHTML,] = useState(description.split('<p>')[2]);
    const html = description;
    const pattern = description.split('<p>')[2];
    console.log(company_logo)

    useEffect(() => {
        if (spanRef.current) {
          spanRef.current.innerHTML = someHTML;
        }
      }, [spanRef.current]);

    // Parse the text
    var doc = parser.parseFromString(html, "text/html");
    // console.log(doc)
    return (
            <Card className='card' style={{ maxWidth: 300,margin: 4 }}>
                <CardHeader className='text-truncate d-flex justify-content-between'>
                {company_logo?
                <img className='bd-placeholder-img card-img-top ml-1 mr-1' style={{ backgroundColor: 'grey',imageRendering: 'crisp-edges', width: 30, height: 30, objectFit: "cover" }} src={company_logo} alt='company logo' />:
                <Placeholder style={{ backgroundColor: 'grey',imageRendering: 'crisp-edges', width: 30, height: 30 }} className='bd-placeholder-img card-img-top ml-1 mr-1'/>
                }
                <div className='d-flex flex-column'>
                    <div className='font-weight-bold'>
                    {title}
                    </div>
                    {created_at}
                </div>
                    </CardHeader>
                
                <CardBody className='card-body'>
                    <CardTitle>{company}</CardTitle>
                    <p>{type}</p>
                    <span className='h-5 text-truncate' ref={spanRef} />
                    <Button>Read more &rarr;</Button>
                </CardBody>
                <CardFooter>{location}</CardFooter>
            </Card>

    );
}