import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
import rhino from './rhino.jpeg';
const parser = new DOMParser();

export default function ColorPicker(props){
    let img;   
    let canvas;
    let ctx;


    useEffect(() => {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");

        img = new Image();
        img.crossOrigin = "anonymous";
        img.src = rhino;
        ctx.drawImage(img, 0, 0, 300, 300);
        img.style.display = "none";

        const hoveredColor = document.getElementById("hovered-color");
        const selectedColor = document.getElementById("selected-color");

        canvas.addEventListener("mousemove", (event) => pick(event, hoveredColor));
        canvas.addEventListener("click", (event) => pick(event, selectedColor));
    },[]);

    function pick(event, destination) {
        const bounding = canvas.getBoundingClientRect();
        const x = event.clientX - bounding.left;
        const y = event.clientY - bounding.top;
        const pixel = ctx.getImageData(x, y, 1, 1);
        const data = pixel.data;

        const rgbColor = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
        destination.style.background = rgbColor;
        destination.textContent = rgbColor;

        return rgbColor;
    }



    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Row><span>Source</span></Row>
                        <Row><canvas id="canvas" style={{border:"1px solid"}} width="300" height="300"></canvas></Row>                        
                    </Col>
                    <Col>
                        <Row><span>Hovered-Over Color</span></Row>
                        <Row><div id="hovered-color" style={{width:"300px",height:"300px"}}></div></Row>
                    </Col>
                    <Col>
                        <Row><span>Selected Color</span></Row>
                        <Row><div id="selected-color" style={{width:"300px",height:"300px"}}></div></Row>
                    </Col>
                </Row>
            </Container>
           
        </>
    );

}
    