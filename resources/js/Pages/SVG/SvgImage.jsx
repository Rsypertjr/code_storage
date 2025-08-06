import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function SvgImage(props){

return (
    <>
        <svg version="1.1" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <image 
                x="90" 
                y="-65"
                width="128"
                height="146"
                transform="rotate(45)"
                href="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/image/mdn_logo_only_color.png"
            />
        </svg>

    
    
    </>
);

}
