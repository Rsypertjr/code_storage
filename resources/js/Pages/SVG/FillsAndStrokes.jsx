import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();
const MyRect = {
    stroke:"black",
    strokeWidth:"15",
    fill:"red",
    paintOrder:"fill"
};

export default function FillsAndStrokes(props){

    const [linkStyle, SetLinkStyle]  = useState({});

return (
    <>
        <svg version="1.1" width="160" height="140" xmlns="http://www.w3.org/2000/svg">
            <rect
                x="10"
                y="10" 
                width="100" 
                height="100" 
                stroke="blue" 
                fill="purple" 
                fill-opacity="0.5" 
                stroke-opacity="0.8" 
                stroke-width="15"
            />
        </svg>
        <svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt" />
            <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square" />
            <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round" />
        </svg>
        <svg width="160" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1"> 
            <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20" stroke-linecap="butt" fill="none" stroke-linejoin="miter" />
            <polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20" stroke-linecap="round" fill="none" stroke-linejoin="round" />
            <polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20" stroke-linecap="square" fill="none" stroke-linejoin="bevel" />
        </svg> 
        <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black" stroke-linecap="round" stroke-dasharray="5,10,5" fill="none" />
            <path d="M 10 75 L 190 75" stroke="red" stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none" /> 
        </svg>
        <svg width="400" height="180" xmlns="http://www.w3.org/2000/svg" version="1.1"> 
            <polyline 
                points="40 80 80 40 120 80" 
                stroke-width="15" 
                stroke="black" 
                fill="coral" 
                paint-order="fill"
            />
            <polyline 
                points="40 140 80 100 120 140" 
                stroke-width="15"
                stroke="black" 
                fill="coral" 
                paint-order="stroke"
            />
        </svg>

        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1"> 
            
            <rect x="10" height="180" y="10" width="180" onMouseOver={() => {SetLinkStyle(MyRect)}} onMouseLeave={()=>{SetLinkStyle({})}} style={linkStyle} />

        </svg>
    
    </>
);

}
