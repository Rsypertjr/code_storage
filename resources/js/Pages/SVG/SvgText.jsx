import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function SvgText(props){

const textStyle = {
    dominantBaseline: "hanging",
    font: "28px Verdana, Helvetica, Arial, sans-serif"
};

   return(
    <>
        <svg width="500" height="500" version="1.1" xmlns="http://www.w3.org/2000/svg"> 
            <text style={Object.assign({},{fontWeight:"bold"}, textStyle)} >
                This is 
                <tspan  fill="red">&nbsp;bold and red</tspan>
            </text>
        </svg>
          
        <svg width="200" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg"> 
            <path id="my_path" d="M 20, 20 C 80,60 100,40 120,20" fill="transparent" />
            <text style={{textStyle}}>
                <textPath xmlns:xlink="http://www.w3.org/1999/xlink" href="#my_path">
                    A curve.
                </textPath>
            </text>
        </svg>
          
    
    </>
);

}
