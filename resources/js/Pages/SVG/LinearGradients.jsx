import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function LinearGradients(props){

    const rect1 = {
        fill:"url(#Gradient1)"
    };

    const stop1 = {
        stopColor:"red"
    }

    const stop2 = {
        stopColor: "black",
        stopOpacity: "0"
    }

    const stop3 = {
        stopColor:"blue"
    }

   return(
    <>
        <svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="Gradient1">
                    <stop style={stop1} offset="0%" />
                    <stop style={stop2} offset="50%" />
                    <stop style={stop3} offset="100%" />
                </linearGradient>
                <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" style={stop1} />
                    <stop offset="50%" style={stop2}/>
                    <stop offset="100%" style={stop3} />                    
                </linearGradient> 
            </defs>
           
           <rect style={rect1} x="10" y="10" rx="15" ry="15" width="100" height="100" /> 
           <rect 
                x="10" 
                y="120"
                rx="15"
                ry="15"
                width="100"
                height="100"
                fill="url(#Gradient2)"
            />
        </svg>
    
    </>
);

}
