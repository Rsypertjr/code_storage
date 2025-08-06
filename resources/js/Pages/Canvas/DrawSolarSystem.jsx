import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
const parser = new DOMParser();
import canvas_sun from '../../../images/sun.gif';
import canvas_moon from '../../../images/moon.gif';
import canvas_earth from './earth.png';

export default function DrawSolarSystem(props){
    const sun = new Image();
    const moon = new Image();
    const earth = new Image();
    let ctx = null;


    const canvasStyle = {
        border: "1px solid black"
    };
       
    useEffect(() =>{
       
        ctx = document.getElementById("canvas").getContext("2d");
        sun.src =  canvas_sun;
        moon.src = canvas_moon;
        earth.src = canvas_earth;
       
    },[]);

    useEffect(() => {
       window.requestAnimationFrame(draw);
      
     

    },[ctx]);

  
    function draw(){
        let orbit = 175;
        ctx.globalCompositeOperation = "destination-over";
      
        ctx.clearRect(0, 0, 500, 500);  // clear canvas


        ctx.fillStyle = "rgb(0 0 0 / 5%)";
        ctx.strokeStyle = "rgb(0 153 255 / 40%)";
        ctx.fillRect(0, 0, 500, 500);
        ctx.save();
        ctx.translate(250, 250);

        // Earth
        const time = new Date();
        ctx.rotate(
            ((2 * Math.PI) / 60) * time.getSeconds() +
            ((2 * Math.PI) / 60000) * time.getMilliseconds(),
        );
        ctx.translate(orbit, 0);
        //ctx.fillStyle = "rgb(0 0 0 / 50%)";
        //ctx.fillRect(-25, -25, 50, 50); //Shadow
        ctx.drawImage(earth, -25, -25,50,50);

        // Moon
        ctx.save();
        ctx.rotate(
            ((2 * Math.PI) / 6) * time.getSeconds() +
            ((2 * Math.PI) / 6000) * time.getMilliseconds(),
        );
        ctx.translate(30,0);
        ctx.drawImage(moon, 0, 0, 20, 20);
        ctx.restore();

        ctx.restore();

        ctx.beginPath();
        ctx.arc(250, 250, orbit, 0, Math.PI * 2, false);  // Earth orbit
        ctx.stroke();
        ctx.drawImage(sun,195,195);

        window.requestAnimationFrame(draw);


    }

    return (
        <>
            <Container>
                <canvas id="canvas" style={{canvasStyle, position:"absolute",left:"0",top:"0",zIndex:"1"}} width="500" height="500"></canvas>
            </Container>
        </>

    );

    
}