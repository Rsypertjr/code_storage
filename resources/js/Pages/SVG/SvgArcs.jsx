import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function SvgArcs(props){

return (
    <>
        <svg version="1.1" width="360" height="360" xmlns="http://www.w3.org/2000/svg">

            {/* Bezier Curves */}
            {/*<path 
                d="M 10 315
                   L 110 215 
                   A 30 50 0 0 1 162.55 162.45
                   L 172.55 152.45
                   A 30 50 -45 0 1 215.1 109.9
                   L 315 10"
                stroke="black" 
                fill="green" 
                stroke-width="2"
                fill-opacity="0.5"            
            />
            <path
                d="M 10 315
                   L 110 215
                   A 30 60 0 0 1 150.71 170.29 
                   L 172.55 152.45 
                   A 30 50 -45 0 1 215.1 109.9 
                   L 315 10"
                stroke="black" 
                fill="green" 
                stroke-width="2" 
                fill-opacity="0.5"
            />*/}

               <path  
                d="M 100 100 
                   A 45 45, 0, 0, 0, 145 145 
                   L 145 100 Z" 
                fill="#00FF00A0" 
                stroke="black" 
                stroke-width="2"
               />
               <path 
               d="M 250 100 
                  A 45 45, 0, 1, 0, 295 145
                  L 295 100 Z" 
               fill="#FF0000A0" 
               stroke="black" 
               stroke-width="2"
               /> 
               <path 
               d="M 100 250 
                  A 45 45, 0, 0, 1, 145 295
                  L 145 250 Z
               "
               fill="#FF00FFA0"
               stroke="black"
               stroke-width="2"
               />
               <path
               d="M 250 250 
                  A 45 45, 0, 1, 1, 295, 295 
                  L 295 250 Z"
                fill="#0000FFA0" 
                stroke="black" 
                stroke-width="2"
               /> 
               <path 
               d="M 45 45 L 345 45 L 345 345 L 45 345 Z M 195 45 L 195 345 M 45 195 L 345 195" 
               fill="none" 
               stroke="black"
               /> 
               <text x="140" y="20" font-size="20" fill="black">Large arc flag</text>
               <text 
                x="-15"
                y="195"
                font-size="20"
                fill="black"
                transform="rotate(-90)"
                transform-origin="20 195">
                Sweep flag
                </text>
                <text x="120" y="40" font-size="20" fill="black">0</text>
                <text x="270" y="40" font-size="20" fill="black">1</text>
                <text x="30" y="120" font-size="20" fill="black">0</text>
                <text x="30" y="270" font-size="20" fill="black">1</text>

        </svg>
    
    
    </>
);

}
