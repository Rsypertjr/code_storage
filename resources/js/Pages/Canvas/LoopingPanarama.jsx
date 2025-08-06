import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
import yosemite_image from "./Capitan_Meadows,_Yosemite_National_Park.jpg";

const parser = new DOMParser();

export default function LoopingPanarama(props){
    let ctx = null;
    const img = new Image();
     

    // User Variables - customizel these top change the image being scrolled, its 
    // direction, and its speed
    img.src = yosemite_image;
    const canvasXSize = 800;
    const canvasYSize = 200;
    const speed = 30;  // lower is faster
    const scale = 1.05;
    const y = -4.5;  // vertical offset

    // Main program
    const dx = 0.75;
    let imgW;
    let imgH;
    let x = 0;
    let clearX;
    let clearY;

    useEffect(() => {
        imgW = img.width * scale;
        imgH = img.height * scale;

        if( imgW > canvasXSize) {
            //Image larger than canvas
            x = canvasXSize - imgW;
        }

        // Check if image description is larger than canvas
        clearX = Math.max(imgW, canvasXSize);
        clearY = Math.max(imgH, canvasYSize);

        // Get canvas content
        ctx = document.getElementById("canvas").getContext("2d");

        // Set refresh rate
        setInterval(draw, speed);
    },[]);


    function draw() {
        ctx.clearRect(0, 0, clearX, clearY );  // clear the canvas

        // If image is <= canvas size
        if (imgW <= canvasXSize) {
            // Reset, start from the beginning
            if (x > canvasXSize) {
                x = -imgW + x;
            }

            // Draw additional image1
            if (x > 0) {
                ctx.drawImage(img, -imgW + x, y, imgW, imgH);
            }

            // Draw additional image2
            if(x - imgW > 0) {
                ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
            }
        } else {
            // Image is > canvas size
            // Reset, start from beginning
            if (x > canvasXSize) {
                x = canvasXSize - imgW;
            }

            // Draw additional image
            if (x > canvasXSize - imgW) {
                ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
            }
        }

        // Draw image
        ctx.drawImage(img, x, y, imgW, imgH);

        // Amount to move
        x += dx;
 
    }
    








    return (
        <>
            <canvas id="canvas" width="800" height="200">Yosemite National Park, meadow at the base of El Capitan</canvas>
        </>

    );
}