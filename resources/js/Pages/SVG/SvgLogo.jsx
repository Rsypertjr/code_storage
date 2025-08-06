import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
import rhino from './rhino.jpeg';
const parser = new DOMParser();

export default function SvgLogo(props){

return (
    <>
        <svg version="1.1"
             width="300" height="200"
             xmlns="http://www.w3.org/2000/svg">

            <rect width="100%" height="100%" fill="red" />

            <circle cx="150" cy="100" r="80" fill="green" />

            <text x="150" y="125" style={{fontSize:"60",textAnchor:"middle"}} fill="white">SVG</text>

        </svg>
    
    
    </>
);

}
