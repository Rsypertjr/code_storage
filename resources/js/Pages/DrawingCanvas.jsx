import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import mosaic_img from './Canvas/mosaic-8590725_640.png';
import spiral from '../../images/spiral.gif';
import sun from '../../images/sun.gif';
import canvas_frame from "./Canvas/canvas_picture_frame.png";
import DrawSolarSystem from './Canvas/DrawSolarSystem';
import AnimatedClock from './Canvas/AnimatedClock';
import LoopingPanarama from './Canvas/LoopingPanarama';
import MouseFollowing from './Canvas/MouseFollowing';
import DrawBall from './Canvas/DrawBall';
import MouseBall from './Canvas/MouseBall';
import ColorPicker from './SVG/ColorPicker';
import GrayScaleAndInvert from './SVG/GrayScaleAndInvert';
import ZoomImageExample from './SVG/ZoomImageExample';
import SvgLogo from './SVG/SvgLogo';
import BasicSVGShapes from './SVG/BasicSVGShapes';
import SvgCurveCommands from './SVG/SvgCurveCommands';
import SvgArcs from './SVG/SvgArcs';
import FillsAndStrokes from './SVG/FillsAndStrokes';
import LinearGradients from './SVG/LinearGradients';
import RadialGradientSpread from './SVG/RadialGradientSpread';
import PatternsSVG from './SVG/PatternsSVG';
import SvgText from './SVG/SvgText';
import GandTransformations from './SVG/GandTransformations';
import SvgClipAndMask from './SVG/SvgClipAndMask';
import SvgImage from './SVG/SvgImage';
import SvgFilter from './SVG/SvgFilter';
import SvgFonts from './SVG/SvgFonts';
import SvgCSS from './SVG/SvgCSS';

export default function DrawingCanvas(props){

    function draw() {
        const canvas = document.getElementById("tutorial");
        if (canvas.getContext) {
          const ctx = canvas.getContext("2d");

          ctx.fillStyle = "rgb(200,0,0)";
          ctx.fillRect(10,10,50,50);

          ctx.fillStyle = "rgb(0 0 200 / 50%)";
          ctx.fillRect(30,30,50,50);

          ctx.fillRect(25, 25, 100, 100);
          ctx.clearRect(45, 45, 60, 60);
          ctx.strokeRect(50, 50, 50, 50);
        }
      }

      function drawTriangle() {
        const canvas = document.getElementById("tutorial");
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            ctx.beginPath();

            ctx.moveTo(75, 50);
            ctx.lineTo(100, 75);
            ctx.lineTo(100, 25);
            ctx.fill();
        }
      }

      function drawFace(){
        const canvas = document.getElementById("canvas");
        if(canvas.getContext) {
            const ctx = canvas.getContext("2d");

            ctx.beginPath();
            ctx.arc(75, 75, 50, 0, Math.PI * 2, true);  // Outer circle
            ctx.moveTo(110, 75);
            ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
            ctx.moveTo(65, 65);
            ctx.arc(60, 65, 5, 0, Math.PI*2, true);  // Left eye
            ctx.moveTo(95, 65);
            ctx.arc(90, 65, 5, 0, Math.PI*2, true);  // Right eye
            ctx.stroke();
        }
      }

      function drawTwoTriangles(){

        const canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            // Filled triangle
            ctx.beginPath();
            ctx.moveTo(25,25);
            ctx.lineTo(105,25);
            ctx.lineTo(25, 105);
            ctx.fill();

            // Stoked triangle
            ctx.beginPath();
            ctx.moveTo(125, 125);
            ctx.lineTo(125, 45);
            ctx.lineTo(45, 125);
            ctx.closePath();
            ctx.stroke();

        }
      }


    function drawArcs(){

        const canvas = document.getElementById("canvas");
        if(canvas.getContext){
            const ctx = canvas.getContext("2d");

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    ctx.beginPath();
                    const x = 25 + j * 50;  // x coordinate
                    const y = 25 + i * 50;  // y coordinate
                    const radius = 20;  // Arc radius
                    const startAngle = 0; // Startig point on circle
                    const endAngle = Math.PI + (Math.PI * j) / 2;  // End point on circle
                    const counterclockwise = i % 2 !== 0;   // clockwise or counterclockwise

                    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

                    if (i > 1) {
                        ctx.fill();
                    } else {
                        ctx.stroke();
                    }
                }
            }
        }

    }

    function drawQuadraticBezierCurves() {
        const canvas = document.getElementById("canvas");

        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            //Quadratic curves example
            ctx.beginPath();
            ctx.moveTo(75,25);
            ctx.quadraticCurveTo(25, 25, 25, 62.5);
            ctx.quadraticCurveTo(25, 100, 50, 100);
            ctx.quadraticCurveTo(50, 120, 30, 125);
            ctx.quadraticCurveTo(60, 120, 65, 100);
            ctx.quadraticCurveTo(125, 100, 125, 62.5);
            ctx.quadraticCurveTo(125, 25, 75, 25);
          
            ctx.stroke();
        }
    }




    function drawCubicBezierCurves(){
        const canvas = document.getElementById("canvas");
        if(canvas.getContext){
            const ctx = canvas.getContext("2d");

            // Cubic curves example
            ctx.beginPath();
            ctx.moveTo(75, 40);
            ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
            ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
            ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
            ctx.fill();
        }
    }


    function drawShapesWithHoles() {
        const canvas = document.getElementById("canvas");
        if(canvas.getContext){
            const ctx = canvas.getContext("2d");

            ctx.beginPath();

            //Outer shape clockwise
            ctx.moveTo(0, 0);
            ctx.lineTo(150, 0);
            ctx.lineTo(75, 129.9);

            // Inner shape anticlockwise
            ctx.moveTo(75, 20);
            ctx.lineTo(50, 60);
            ctx.lineTo(100, 60);

            ctx.fill();
        }
    }
    


    function drawPath2DExample() {
        const canvas = document.getElementById("canvas");
        if(canvas.getContext){
            const ctx = canvas.getContext("2d");

            const rectangle = new Path2D();
            rectangle.rect(10, 10, 50, 50);

            const circle = new Path2D();
            circle.arc(100,35,25,0, 2 * Math.PI);

            ctx.stroke(rectangle);
            ctx.fill(circle);
        }
    }

    function drawSVGPaths(){
        const canvas = document.getElementById("canvas");
        if(canvas.getContext){
            const ctx = canvas.getContext("2d");

            let p = new Path2D("M10 10 h 80 v 80 h -80 Z");
            ctx.fill(p);
        }
    }

    function drawFillStyle() {
        const canvas = document.getElementById("canvas");
        if(canvas.getContext){
            const ctx = canvas.getContext("2d");
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 6; j++) {
                    ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)} ${Math.floor(255 - 42.5 * j)} 0)`;            
                    ctx.fillRect(j * 25, i * 25, 25, 25);
                }
            }
        }       
    }

    function drawStrokeStyle() {
        const ctx = document.getElementById("canvas").getContext("2d");
        for ( let i = 0; i < 6; i++) {
            for ( let j = 0; j < 6; j++) {
                ctx.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * i)} ${Math.floor(255 - 42.5 * j)})`
                ctx.beginPath();
                ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);
                ctx.stroke();
            }
        }
    }
    
    function drawGlobalAlpha() {
        const ctx = document.getElementById("canvas").getContext("2d");

        //draw background
        ctx.fillStyle = "#FD0";
        ctx.fillRect(0, 0, 75, 75);
        ctx.fillStyle = "#6C0";
        ctx.fillRect(75, 0, 75, 75);
        ctx.fillStyle = "#09F";
        ctx.fillRect(0, 75, 75, 75);
        ctx.fillStyle = "#F30";
        ctx.fillRect(75, 75, 75, 75);
        ctx.fillStyle = "#FFF";

        ctx.globalAlpha = 0.2;

        //Draw semi transparent circles
        for (let i = 0; i < 7; i++) {
            ctx.beginPath();
            ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }

    function drawRGBAlphaTransparency() {

        const ctx = document.getElementById("canvas").getContext("2d");

        // Draw background
        ctx.fillStyle = "rgb(255 221 0)";
        ctx.fillRect(0, 0, 150, 37.5);
        ctx.fillStyle = "rgb(102 204 0)";
        ctx.fillRect(0, 37.5, 150, 37.5);
        ctx.fillStyle = "rgb(0 153 255)";
        ctx.fillRect(0, 75, 150, 37.5);
        ctx.fillStyle = "rgb(255 51 0)";
        ctx.fillRect(0, 112.5, 150, 37.5);


        // Draw semi transparent rectangles
        for ( let i = 0; i < 10; i++) {
            ctx.fillStyle = `rgb(255 255 255 / ${(i + 1) / 10})`;
            for ( let j = 0; j < 4; j++) {
                ctx.fillRect(5 + i * 14, j * 37.5, 14, 27.5);
            }
        }
    }
    
    function drawLineWidth(){
        const ctx = document.getElementById("canvas").getContext("2d");
        for (let i = 0; i < 10; i++) {
            ctx.lineWidth = 1 + i;
            ctx.beginPath();
            ctx.moveTo( 6 + i * 14, 5);
            ctx.lineTo( 6 + i * 14, 140);
            ctx.stroke();
        }
    }


    function drawLineCap(){

        const ctx = document.getElementById("canvas").getContext("2d");

        // Draw guides
        ctx.strokeStyle = "#09f";
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(140, 10);
        ctx.moveTo(10, 140);
        ctx.lineTo(140, 140);
        ctx.stroke();

        // Draw Lines
        ctx.strokeStyle = "black";
        ["butt", "round", "square"].forEach((lineCap, i) => {
            ctx.lineWidth = 15;
            ctx.lineCap = lineCap;
            ctx.beginPath();
            ctx.moveTo(25 + i * 50, 10);
            ctx.lineTo(25 + i * 50, 140);
            ctx.stroke();

        });
    }

    function drawLineJoin(){
        const ctx = document.getElementById("canvas").getContext("2d");
        ctx.lineWidth = 10;
        ["round", "bevel", "miter"].forEach((lineJoin, i) => {
            ctx.lineJoin = lineJoin;
            ctx.beginPath();
            ctx.moveTo(-5, 5 + i * 40);
            ctx.lineTo(35, 45 + i * 40);
            ctx.lineTo(75, 5 + i * 40);
            ctx.lineTo(115, 45 + i * 40);
            ctx.lineTo(155, 5 + i * 40);
            ctx.stroke();

        });
    }

    function drawMiterLimit() {
        const ctx = document.getElementById("canvas").getContext("2d");


        // Clear canvas
        ctx.clearRect(0, 0, 1590, 150);

        // Draw guides
        ctx.strokeStyle = "#09f";
        ctx.lineWidth = 2;
        ctx.strokeRect(-5, 50, 160, 50);

        // Set line styles
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 10;

        // check input
        if (document.getElementById("miterLimit").checkValidity()) {
            ctx.miterLimit = parseFloat(document.getElementById("miterLimit").value);
        }

        // Draw lines
        ctx.beginPath();
        ctx.moveTo(0, 100);
        for (let i = 0; i < 24; i++) {
            const dy = i % 2 === 0 ? 25 : -25;
            ctx.lineTo(i ** 1.5 * 2, 75 + dy);
        }
        ctx.stroke();
        return false;
    }


    function drawLineDashes() {
        const ctx = document.getElementById("canvas").getContext("2d");
        
        ctx.clearRect(0, 0,150, 200);
        ctx.setLineDash([4,2]);
        ctx.lineDashOffset = -offset;
        ctx.strokeRect(10, 10, 100, 100);
    }

    let offset = 0;
    function march() {       
        offset++;
        if (offset > 5) {
            offset = 0;
        }
        drawLineDashes();
        setTimeout(march, 20);
    }

    const canvasStyle = {
        border: "1px solid black"
    };
    
    const redraw = () => {
        drawMiterLimit();
    };


    function drawLinearGradient(){
        const ctx = document.getElementById("canvas").getContext("2d");

        // Create gradients
        const linGrad = ctx.createLinearGradient(0, 0, 0, 150);
        linGrad.addColorStop(0, "#00ABEB");
        linGrad.addColorStop(0.5, "#fff");
        linGrad.addColorStop(0.5, "#26C000");
        linGrad.addColorStop(1, "#fff");

        const linGrad2 = ctx.createLinearGradient(0, 50, 0, 95);
        linGrad2.addColorStop(0.5, "#000");
        linGrad2.addColorStop(1, "rgb(0 0 0 / 0%)");

        // assign gradients to fill and stroke styles
        ctx.fillStyle = linGrad;
        ctx.strokeStyle = linGrad2;

        // draw shapes
        ctx.fillRect(10, 10, 130, 130);
        ctx.strokeRect(50, 50, 50, 50);
    }



    function drawCreateRadialGradient() {
        const ctx = document.getElementById("canvas").getContext("2d");
        // Create gradients
        const radGrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
        radGrad.addColorStop(0, "#A7D30C");
        radGrad.addColorStop(0.9, "#019F62");
        radGrad.addColorStop(1, "rgb(1 159 98 / 0%)");

        const radGrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
        radGrad2.addColorStop(0, "#FF5F98");
        radGrad2.addColorStop(0.8, "#FF0188");
        radGrad2.addColorStop(1, "rgb(255 1 136 / 0%)");

        const radGrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
        radGrad3.addColorStop(0, "#00C9FF");
        radGrad3.addColorStop(0.8, "#00B5E2");
        radGrad3.addColorStop(1, "rgb(0 210 255 / 0%)");

        const radGrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
        radGrad4.addColorStop(0, "#F4F201");
        radGrad4.addColorStop(0.8, "#E4C700");
        radGrad4.addColorStop(1, "rgb(288 199 0 / 0%)");

        // draw shapes
        ctx.fillStyle = radGrad4;
        ctx.fillRect(0, 0, 150, 150);
        ctx.fillStyle = radGrad3;
        ctx.fillRect(0, 0, 150, 150);
        ctx.fillStyle = radGrad2;
        ctx.fillRect(0, 0, 150, 150);
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, 150, 150);
    }


    function drawConicGradient() {
        const ctx = document.getElementById("canvas").getContext("2d");

        // Create gradients
        const conicGrad1 = ctx.createConicGradient(2, 62, 75);
        conicGrad1.addColorStop(0, "#A7D30C");
        conicGrad1.addColorStop(1,"#fff");

        const conicGrad2 = ctx.createConicGradient(0, 187, 75);
        // we multiply our values by Math.PI/180 to convert degrees to radians
        conicGrad2.addColorStop(0, "black");
        conicGrad2.addColorStop(0.25, "black");
        conicGrad2.addColorStop(0.25, "white");
        conicGrad2.addColorStop(0.5, "white");
        conicGrad2.addColorStop(0.5, "black");
        conicGrad2.addColorStop(0.75, "black");
        conicGrad2.addColorStop(0.75, "white");
        conicGrad2.addColorStop(1, "white");
      
        // draw shapes
        ctx.fillStyle = conicGrad1;
        ctx.fillRect(12, 25, 100, 100);
        ctx.fillStyle = conicGrad2;
        ctx.fillRect(137, 25, 100, 100);    
    }

    function drawPattern(){
        const ctx = document.getElementById("canvas").getContext("2d");

        // create new image object to use as pattern
        const img = new Image();
        img.src = mosaic_img;

        img.onload = () => {
            //create pattern
            const pattern = ctx.createPattern(img, "repeat");
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, 1000, 1000);
        }
    }


    function drawShadowedText(){
        const ctx = document.getElementById("canvas").getContext("2d");

        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.shadowOffsetX = 2;
        ctx.showOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgb(0 0 0 / 50%)";

        ctx.font = '30px Times New Roman';
        ctx.fillStyle = "#000";
        ctx.fillText("Sample String", 5, 30);
    }

    function drawCanvasFillRules() {
        const ctx = document.getElementById("canvas").getContext("2d");
        ctx.beginPath();
        ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
        ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
        ctx.fill("evenodd");
    }

    function drawHelloWorldFillText() {
        const ctx = document.getElementById("canvas").getContext("2d");
        ctx.font = "48px serif";
        ctx.fillText("Hello World", 10, 50,500);
    }

    function drawHelloWorldStrokeText() {
        const ctx = document.getElementById("canvas").getContext("2d");
        ctx.font = "48px serif";
        ctx.strokeText("Hello World", 10, 50);
    }

    function drawTextBaseLineExample() {
        const ctx = document.getElementById("canvas").getContext("2d");
        ctx.font = "48px serif";

        ctx.textBaseLine = "hanging";
        ctx.strokeText("hanging",10, 50);

        ctx.textBaseLine = "middle";
        ctx.strokeText("middle", 250, 50);

        ctx.beginPath();
        ctx.moveTo(10, 50);
        ctx.lineTo(300, 50);
        ctx.stroke();
        
    }

    function drawTextMeasuring(){
        const ctx = document.getElementById("canvas").getContext("2d");
        const text = ctx.measureText("foo");  //TextMetrics object
        //alert(text.width);
    }


    function drawLoadingImage(){
        const ctx = document.getElementById("canvas").getContext("2d");
        const img = new Image();

        img.addEventListener("load", () => {
            ctx.drawImage(img, 0, 0);
        });

        img.src = mosaic_img;
    }


    async function drawImagesAfterLoad() {        
        let images = [];
        const ctx = document.getElementById("canvas").getContext("2d");
        // Wait for all images to be loaded:
        await Promise.all(
            images = Array.from(document.images).map(
                (image) => 
                    new Promise((resolve) => {return image.addEventListener("load",resolve(image))}),
            ),
            images.map((image,i) => {
                image.then((img) => {
                    let i_mage = new Image();
                    i_mage.src = $(img).attr('src');
                    ctx.drawImage(i_mage,i*300,i*300);
                    //console.log("what's this", $(img).attr('src'));            
                })
            })
        );
    }

    function drawAllDocumentImages() {
        drawImagesAfterLoad();
    }


    function drawTilingAnImage(){
        const ctx = document.getElementById("canvas").getContext("2d");
        const img = new Image();
        img.onload = () => {
            for (let i = 0; i < 4; i++ ) {
                for (let j = 0; j < 3; j++) {
                    ctx.drawImage(img, j * 50, i * 38, 50, 38);
                }
            }
        }
        img.src = "https://mdn.github.io/shared-assets/images/examples/rhino.jpg";
    }

    async function drawFramingAnImage() {
        // Wait for all images to be loaded
        await Promise.all(
            Array.from(document.images).map(
                (image) => 
                    {
                        //console.log("what's here:", image);
                        new Promise((resolve) => image.addEventListener("load", resolve))
                    },
            ),
        );

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        // Draw slice
        ctx.drawImage(
            document.getElementById("source"),
            33,
            71,
            104,
            124,
            21,
            20,
            87,
            104,
        );

        // Draw frame
        ctx.drawImage(document.getElementById("frame"), 0, 0);
    }

    function drawSaveAndRestoreExample(){
        const ctx = document.getElementById("canvas").getContext("2d");

        ctx.fillRect(0, 0, 150, 150);  // Draw a Black rectangle with default settings
        ctx.save();

        ctx.fillStyle = "#09F";  // Make changes to saved settings
        ctx.fillRect(15, 15, 120, 120);  // Draw a Blue rectangel with new settings
        ctx.save();   // Save the current state

        ctx.fillStyle = "#FFF";  // Make changes to saved settings
        ctx.globalAlpha = 0.5;
        ctx.fillRect(30, 30, 90, 90);  // Draw a 50%-White rectangle with newest settings

        ctx.restore();  // Restore to previous state
        ctx.fillRect(45, 45, 60, 60); // Draw a rectangle with restored Blue setting

        ctx.restore();  // Restore to original state
        ctx.fillRect(60, 60, 30, 30);  // Draw a rectangel with restored Black setting
    }

    function drawTranslateExample() {
        const ctx = document.getElementById("canvas").getContext("2d");
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++) {
                ctx.save();
                ctx.fillStyle = `rgb(${51 * i} ${255 -51 * i} 255)`;
                ctx.translate(10 + j * 50, 10 + i * 50);
                ctx.fillRect(0, 0, 25, 25);
                ctx.restore();
            }
        }
    }

    function drawRotateExample() {
        const ctx = document.getElementById("canvas").getContext("2d");

        // left rectangles, rotate from canvas origin
        ctx.save();
        // blue rect
        ctx.fillStyle = "#0095DD";
        ctx.fillRect(30, 30, 100, 100);
        ctx.rotate((Math.PI / 180) * 25);
        // grey rect
        ctx.fillStyle = "#4D4E53";
        ctx.fillRect(30, 30, 100, 100);
        ctx.restore();

        // right rectangles, rotate from rectangle center
        // draw blue rect
        ctx.fillStyle = "#0095DD";
        ctx.fillRect(150, 30, 100, 100);

        ctx.translate(200, 80);   // translate to rectangle center
        // x = x + 0.5 * width
        // y = y + 0.5 * height
        ctx.rotate((Math.PI / 180) * 25); //rotate
        ctx.translate(-200, -80); // translate back

        // draw grey rect
        ctx.fillStyle = "#4D4E53";
        ctx.fillRect(150, 30, 100, 100);
    }


    function drawScaleExample(){
        const ctx = document.getElementById("canvas").getContext("2d");

        // draw a simple rectangle, but scale it.
        ctx.save();
        ctx.scale(10, 3);
        ctx.fillRect(1, 10, 10, 10);
        ctx.restore();

        // mirror horizontally
        ctx.scale(-1, 1);
        ctx.font = "48px serif";
        ctx.fillText("MDN", -135, 120);
    }

    function drawMatrixTranform() {
        const ctx = document.getElementById("canvas").getContext("2d");

        const sin = Math.sin(Math.PI / 6);
        const cos = Math.cos(Math.PI / 6);
        ctx.translate(100, 100);
        let c = 0;
        for (let i = 0; i <= 12;i++) {
            c = Math.floor((255 / 12) * i);
            ctx.fillStyle = `rgb(${c} ${c} ${c})`;
            ctx.fillRect(0, 0, 100, 10);
            ctx.transform(cos, sin, -sin, cos, 0, 0);
        }
        ctx.setTransform(-1, 0, 0, 1, 100, 100);
        ctx.fillStyle = "rgb(255 128 255 / 50%)";
        ctx.fillRect(0, 50, 100, 100);
    }

    function drawClippingExample() {
        const ctx = document.getElementById("canvas").getContext("2d");
        ctx.fillRect(0, 0, 150, 150);
        ctx.translate(75, 75);

        // Create a circular clipping path
        ctx.beginPath();
        ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
        ctx.clip();

        //Draw background
        const linGrad = ctx.createLinearGradient(0, -75, 0, 75);
        linGrad.addColorStop(0,"#232256");
        linGrad.addColorStop(1,"#143778");
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = linGrad;
        ctx.fillRect(-75, -75, 150, 150);

        generateStars(ctx);
    }

    function drawSolarSystemBackground() {
        const ctx = document.getElementById("canvas2").getContext("2d");
       
        //ctx.translate(75, 75);


        //Draw background
        const linGrad = ctx.createLinearGradient(0, 0, 0, 500);
        linGrad.addColorStop(0,"#232256");
        linGrad.addColorStop(1,"#000000");
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = linGrad;
        ctx.fillRect(0, 0, 500, 500);

        generateStars(ctx,500);
    }

    function generateStars(ctx,l) {
        for (let j = 1; j < 50; j++) {
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.translate(
                l - Math.floor(Math.random() * l),
                l - Math.floor(Math.random() * l),
            );
            drawStar(ctx, Math.floor(Math.random() * 4) + 2);
            ctx.restore();
        }
    }

    function drawStar(ctx, r) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(r, 0);
        for ( let i = 0; i < 9; i++) {
            ctx.rotate(Math.PI / 5);
            if ( i % 2 === 0) {
                ctx.lineTo((r / 0.525731) * 0.200811,0);
            } else {
                ctx.lineTo(r, 0);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function drawInverseClippingExample(){
        const canvas = document.getElementById("canvas");
        if(canvas.getContext){
            const ctx = canvas.getContext("2d");
            ctx.translate(75, 75);

            // Clipping path
            ctx.beginPath();
            ctx.rect(-75, -75, 150, 150); // Outer rectangle
            ctx.arc(0, 0, 60, 0, Math.PI * 2, true);  // Hole anticlockwise
            ctx.clip();

            // Draw background
            const linGrad = ctx.createLinearGradient(0, -75, 0, 75);
            linGrad.addColorStop(0, "#232256");
            linGrad.addColorStop(1, "#143778");

            ctx.fillStyle = linGrad;
            ctx.fillRect(-75, -75, 150, 150);
            
            generateStars(ctx);
        }
    }





    useEffect(() => {
        //drawQuadraticBezierCurves();
        //drawTwoTriangles();
        //drawCubicBezierCurves();
        //drawShapesWithHoles();
        //drawPath2DExample();
        //drawSVGPaths();
        //drawFillStyle();
        //drawStrokeStyle(); 
        //drawGlobalAlpha();
        //drawRGBAlphaTransparency(); 
        //drawLineWidth();
        //drawLineCap();
        //drawLineJoin();
        //march();
        //drawLinearGradient();
        //drawCreateRadialGradient();
        //drawConicGradient();
        //drawPattern();
        //drawShadowedText();
        //drawCanvasFillRules();
        //drawHelloWorldFillText();
        //drawHelloWorldStrokeText();
        //drawTextBaseLineExample();
        //drawTextMeasuring();
        //drawLoadingImage();
        //drawAllDocumentImages();
        //drawTilingAnImage();
        //drawFramingAnImage();
        //drawSaveAndRestoreExample();
        //drawTranslateExample();
        //drawRotateExample();
        //drawScaleExample();
        //drawMatrixTranform(); 
        //drawClippingExample();
        //drawInverseClippingExample();
        //drawSolarSystemBackground();


        //window.addEventListener("load", draw);
        document.title = "Canvas Tutorial";

    },[]);

    return(
        <Container>

            {/*<canvas style={{canvasStyle, position:"absolute",left:"0",top:"0",opacity:"1",zIndex:"-1"}} id="canvas2" width="500" height="500"></canvas>
            <DrawSolarSystem/>
            <AnimatedClock />
            <LoopingPanarama />
            <MouseFollowing />
            <DrawBall/>
            <MouseBall />
            <ColorPicker />
            <GrayScaleAndInvert />
            <ZoomImageExample/>
            <SvgLogo/>
            <BasicSVGShapes />
            <SvgCurveCommands />
            <SvgArcs />
            <FillsAndStrokes />
            <LinearGradients />
            <RadialGradients />
            <RadialGradientSpread />
            <PatternsSVG />
            <SvgText />
            <GandTransformations />
            <SvgClipAndMask/>
            <SvgImage />
            <SvgFilter />
            <SvgFonts />*/}
            <SvgCSS />


            {/*<div style={{display:"none"}}>
                <img
                    id="source"
                    src="https://mdn.github.io/shared-assets/images/examples/rhino.jpg"
                    width="300"
                    height="227" />
                <img id="frame" src={canvas_frame} width="132" height="150" />
            </div>*/}


            {/*<canvas style={{canvasStyle, position:"absolute",left:"0",top:"0",zIndex:"1"}} id="tutorial" width="150" height="150"></canvas>   
            <canvas style={{canvasStyle, position:"absolute",left:"0",top:"0",zIndex:"2",opacity:"0.5"}} id="canvas" width="1000" height="1000"></canvas>*/}
            {/*<img src={spiral} alt="spiral" ></img>
            <img src={sun} alt="sun"></img>
            <img src={mosaic_img} alt="mosaic"></img>*/}
            {/*<input type="text" id="miterLimit" name="miterLimit" />
            <Button onClick={redraw}>Redraw</Button>*/}
        </Container>


    );









}
