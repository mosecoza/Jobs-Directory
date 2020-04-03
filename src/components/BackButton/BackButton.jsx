import React from 'react';
import { useHistory } from "react-router-dom";
import { ReactComponent as Button } from "../../assets/back-button.svg";


export default function Item () {
    let history = useHistory();
    return (
        <>
        <Button onClick={() => history.goBack()} className='text-white text-bold ' />
        </>
    );
};