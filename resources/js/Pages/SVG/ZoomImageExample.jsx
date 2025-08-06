import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
import rhino from './rhino.jpeg';
const parser = new DOMParser();

export default function ZoomImageExample(props){

    const img = new Image();
    img.crossOrign = "anonymous";
    img.src = rhino;
    let canvas;
    let ctx;
    let smoothedZoomCtx;
    let pixelatedZoomCtx; 
    

    useEffect(() => {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        

        canvas.addEventListener("mousemove", (event) => {
            const x = event.layerX;
            const y = event.layerY;
            zoom(smoothedZoomCtx, x, y);
            zoom(pixelatedZoomCtx, x, y);
        });

        function draw(img) {
            ctx.drawImage(img, 0, 0, 400, 400);
    
            smoothedZoomCtx = document
                .getElementById('smoothed-zoom')
                .getContext("2d");
            smoothedZoomCtx.imageSmoothingEnabled = true;
    
            pixelatedZoomCtx = document
                .getElementById('pixelated-zoom')
                .getContext("2d");
            pixelatedZoomCtx.imageSmoothingEnabled = false;    
        }

        const zoom = (ctx, x, y) => {
            ctx.drawImage(
                canvas,
                Math.min(Math.max(0, x - 5), img.width - 10),
                Math.min(Math.max(0, y - 5), img.height - 10),
                10, 
                10, 
                0, 
                0, 
                400, 
                400,
            );
        };
    
      
    
    
    

        draw(img);

    },[]);


   


    return (
        <>
            <Container>
                <Row style={{margin:"0"}}>
                    <Col style={{position:"relative"}}>
                        <h2 className="text-center" style={{width:"100%"}}>Source</h2>
                        <canvas id="canvas" style={{border:"1px solid"}} width="400" height="400"></canvas>
                    </Col>
                    <Col style={{position:"relative"}}>
                        <h2 className="text-center" style={{width:"100%"}}>imageSmoothingEnabled=true</h2>                        
                        <canvas id="smoothed-zoom" style={{border:"1px solid"}} width="350" height="350"></canvas>
                                               
                    </Col>
                    <Col style={{position:"relative"}}>
                        <h2 className="text-center" style={{width:"100%"}}>imageSmoothingEnabled=false</h2>
                        <canvas id="pixelated-zoom" style={{border:"1px solid"}} width="350" height="350"></canvas>
                    </Col>
                </Row>
            </Container>
        </>

    );
}