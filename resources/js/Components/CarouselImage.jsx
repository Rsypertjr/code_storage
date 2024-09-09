import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

export default function CarouselImage({ ...props }) {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center">
                <img src={props.image} alt={props.text} style={{width:'8em',height:'4em',marginTop:'7em',transform:"Scale(4)"}}/>
            </Container>            
        </>
    );
}
