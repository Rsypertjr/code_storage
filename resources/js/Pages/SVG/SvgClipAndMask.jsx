import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function SvgClipAndMask(props){

return (
    <>
        <svg version="1.1" width="360" height="360" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="cut-off-bottom">
                <rect x="0" y="0" width="200" height="100" />               
                </clipPath>
            </defs>
            <circle cx="100" cy="100" r="100" clip-path="url(#cut-off-bottom)" />
        </svg>

        <svg 
            width="200" 
            height="200" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <linearGradient id="Gradient1">
                    <stop offset="0" stop-color="black" />
                    <stop offset="1" stop-color="white" />
                </linearGradient>
                <mask id="Mask">
                    <rect x="0" y="0" width="200" height="200" fill="url(#Gradient1)" />
                </mask>
            </defs>

            <rect x="0" y="0" width="200" height="200" fill="green" />
            <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)" />       
        </svg>

        <svg 
            width="200"
            height="200" 
            version="1.1"
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect x="0" y="0" width="200" height="200" fill="blue" />
            <circle 
                cx="100"
                cy="100"
                r="50" 
                stroke="yellow" 
                stroke-width="40" 
                stroke-opacity=".5"
                fill="red" />
        </svg>

    
    
    </>
);

}
