import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function PatternsSVG(props){

    

   return(
    <>
        <svg width="1000" height="1000" version="1.1" xmlns="http://www.w3.org/2000/svg"> 
            <defs>
                <linearGradient id="Gradient1">
                    <stop offset="5%" stop-color="white" />
                    <stop offset="95%" stop-color="blue" />
                </linearGradient> 
                <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stop-color="red" />
                    <stop offset="95%" stop-color="orange" />
                </linearGradient>
            </defs>

            <pattern id="Pattern1" x="0" y="0" width=".25" height=".25">
                <rect x="0" y="0" width="50" height="50" fill="skyblue" />
                <rect x="0" y="0" width="25" height="25" fill="url(#Gradient2)" />
                <circle 
                    cx="25"
                    cy="25"
                    r="20"
                    fill="url(#Gradient1)"
                    fill-opacity="0.5" />
            </pattern>
           
           <rect fill="url(#Pattern1)" stroke="black" width="200" height="200" />

           <pattern id="Pattern2" width=".25" height=".25" patternContentUnits="objectBoundingBox">
                <rect x="0" y="0" width=".25" height=".25" fill="skyblue" />
                <rect x="0" y="0" width=".125" height=".125" fill="url(#Gradient2)" />
                <circle cx=".125" cy=".125" r=".1" fill="url(#Gradient1)" fill-opacity="0.5" />
           </pattern>

           <rect fill="url(#Pattern2)" x="300" y="300"  stroke="black" width="200" height="200" />

           <pattern id="Pattern3" x="10" y="10" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="50" height="50" fill="skyblue" />
                <rect x="0" y="0" width="25" height="25" fill="url(#Gradient2)" />
                <circle cx="25" cy="25" r="20" fill="url(#Gradient1)" fill-opacity="0.5" />
           </pattern>

           <rect fill="url(#Pattern3)" x="550" y="550" stroke="black" width="210" height="210" />
        </svg>
    
    </>
);

}
