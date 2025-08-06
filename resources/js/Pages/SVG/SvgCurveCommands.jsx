import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function SvgCurveCommands(props){

return (
    <>
        <svg version="1.1" width="300" height="500" xmlns="http://www.w3.org/2000/svg">

            {/* Bezier Curves */}
            <path d="M 10 10 C 20 20, 40 20 50 10" stroke="black" fill="transparent" />
            <path d="M 70 10 C 70 20, 110 20, 110 10" stroke="black" fill="transparent" />
            <path
                d="M 130 10 C 120 20, 180 20, 170 10"
                stroke="black"
                fill="transparent" />

            <path d="M 10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent" />
            <path d="M 70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent" /> 
            <path 
                d="M 130 60 C 120 80, 180 80, 170 60" 
                stroke="black"
                fill="transparent" /> 
            <path 
                d="M 10 110 C 20 140, 40 140, 50 110"
                stroke="black"
                fill="transparent" />
            <path 
                d="M 70 110 C 70 140, 110 140, 110, 110" 
                stroke="black" 
                fill="transparent" /> 
            <path 
                d="M 130 110 C 120, 140, 180 140, 170 110" 
                stroke="black" 
                fill="transparent"
            />
            
            <path 
                d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                stroke="black"
                fill="transparent"
            />

            {/* Quadratic Curves */}
            <path d="M 10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
            <path d="M 10 80 Q 52.5 10, 95 250 T 180 250" stroke="black" fill="transparent" />


        </svg>
    
    
    </>
);

}
