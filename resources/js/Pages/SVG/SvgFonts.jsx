import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function SvgFonts(props){

return (
    <>
        <svg version="1.1" viewBox="0 0 400 50" width="350" height="50" xmlns="http://www.w3.org/2000/svg">
          

           <text x="10" y="20" style={{fontFamily:"Courier New, sans-serif",fontSize:"24px",fontWeight:"bold",fontStyle:"italic"}}>Some text</text>
           <text x="10" y="50">Text styled with custom font</text>
        </svg>

    
    
    </>
);

}
