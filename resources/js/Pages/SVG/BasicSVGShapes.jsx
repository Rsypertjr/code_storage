import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
import rhino from './rhino.jpeg';
const parser = new DOMParser();

export default function BasicSVGShapes(props){

return (
    <>
        <svg version="1.1"
             width="500" height="500"
             xmlns="http://www.w3.org/2000/svg">

            <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5" />
            <rect x="60" y="10" rx="10" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5" />
            <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5" />
            <ellipse cx="75" cy="75" rx="20" ry="5" storke="red" fill="transparent" stroke-width="5" />

            <line x1="10" x2="50" y1="110" y2="150" stroke="orange" stroke-width="5" />
            <polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145" stroke="orange" fill="transparent" stroke-width="5" />
            <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 40 190 30 180 45 180" stroke="green" fill="transparent" stroke-width="5" />

            <path d="M20,230 Q40,205, 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>

            {/*<path d="M 10 10 H 90 V 90 H 10 L10 10" />
            <path d="M 100 100 H 190 V 190 H 100 Z" />*/}
            <path d="M 100 100 h 180 v 180 h -180 Z" fill="transparent" stroke="blue" />
 

        </svg>
    
    
    </>
);

}
