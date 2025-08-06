import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
const parser = new DOMParser();

export default function DrawBall(props){
    let canvas = null;
    let ctx = null;
    let raf;
   
    
    const ball = {
        x: 100, 
        y: 100, 
        vx: 5,
        vy: 2,
        radius: 25,
        color: "blue",
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };


    function draw(){
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(255 255 255 / 30%)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy *= 0.99;
        ball.vy += 2;
        
        if(
            ball.y + ball.vy > canvas.height - ball.radius ||
            ball.y + ball.vy < ball.radius
        ){
            ball.vy = -ball.vy;
        }
        if(
            ball.x + ball.vx > canvas.width - ball.radius ||
            ball.x + ball.vx < ball.radius
        ){
            ball.vx = -ball.vx;
        }
        raf = window.requestAnimationFrame(draw);
    }

   

    useEffect(() => {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mouseover", (e) => {
          
            raf = window.requestAnimationFrame(draw);
        });

        canvas.addEventListener("mouseout", (e) => {
            window.cancelAnimationFrame(raf);
        })
    



        ball.draw();

    },[])

    return (
        <>
         <canvas id="canvas"  width="600" height="600">drawing a Ball</canvas>
      
        </>
    );
}