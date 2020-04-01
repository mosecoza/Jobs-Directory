import React from 'react';
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

export default function CardBodyTitleSubtitleExample({ id, type, url, created_at, company, company_url, location, title, description, how_to_apply, company_logo }) {
    var parser = new DOMParser();

    const html = description;

    // Parse the text
    var doc = parser.parseFromString(html, "text/html");
    // console.log(doc)
    return (
        <Col sm="12" md="4" lg="3">
            <Card style={{ maxWidth: "300px", backgroundColor: '#e6ee9c', margin: 4 }}>
                <CardHeader>{title}</CardHeader>
                <CardImg style={{ backgroundColor: 'grey', width: 300, height: 220 }} src={company_logo} alt='company logo' />
                <CardBody>
                    <CardTitle>{company}</CardTitle>
                    <p>{type}</p>
                    <Button>Read more &rarr;</Button>
                </CardBody>
                <CardFooter>{location}</CardFooter>
            </Card>
        </Col>

    );
}