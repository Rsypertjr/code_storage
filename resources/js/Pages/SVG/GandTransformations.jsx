import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function GandTransformations(props){

   return(
    <>
        <svg width="100" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg"> 
            <g fill="red">
                <rect x="0" y="0" width="10" height="10" />
                <rect x="20" y="0" width="10" height="10"  transform="translate(30,40) rotate(45)"/>
            </g>

            {/* matrix transform*/}
            <rect
                x="10" 
                y="10" 
                width="30" 
                height="20"
                fill="red" 
                transform="matrix(3 1 -1 3 30 40)" />
        </svg>      
        <svg width="100" height="100">
            <g transform="scale(2)">
                <rect width="50" height="50" />
            </g>
        </svg>    

        <svg width="100" height="100" viewBox="0 0 50 50">
            <rect width="50" height="50" />
        </svg>
    
    </>
);

}
