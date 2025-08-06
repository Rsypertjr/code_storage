import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { createContext } from 'react';
import rhino from './rhino.jpeg';
const parser = new DOMParser();

export default function GrayScaleAndInvert(props){
    let img;   
    let canvas;
    let ctx;
    const [selectedFilter, setSelectedFilter ] = useState('original');


    useEffect(() => {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        img = new Image();
        img.crossOrigin = "anonymous";
        img.src = rhino;
        ctx.drawImage(img, 0, 0, 200, 200);
        img.style.display = "none";

        const inputs = document.querySelectorAll("[name='color_filter']");
        for (const input of inputs) {
            input.addEventListener("change", (evt) => {
                switch (evt.target.value) {
                    case "inverted":
                        return invert();
                    case "grayscale":
                        return grayscale();
                    case "sepia":
                        return sepia();
                    default:
                        return original();
                }
            })
        }
    

    },[]);

    const invert = () => {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];  // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2];  //blue
        }
        ctx.putImageData(imageData, 0, 0);
    };

    const grayscale = () => {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4){
            const avg = (data[i] + data[i+1] + data[i+2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg;  // green
            data[i + 2] = avg;  // blue
        }
        ctx.putImageData(imageData, 0, 0);
    };

   
    const sepia = () => {
        grayscale();
        //ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          let newRed = 0.393 * data[i] + 0.769 * data[i] + 0.189 * data[i];  // Desaturated Red
          let newGreen = 0.349 * data[i + 1]+ 0.686 * data[i + 1] + 0.168 * data[i + 1];  // Desaturated Green
          let newBlue = 0.272 * data[i + 2] + 0.534 * data[i + 2] + 0.131 * data[i + 2];  // Desaturated Blue 

          data[i] = newRed; // red
          data[i + 1] = newGreen; // green
          data[i + 2] = newBlue; // blue
        }
        ctx.putImageData(imageData, 0, 0);
      };

    const original = () => {
        ctx.drawImage(img, 0, 0);
    };




    return (
        <>
            <Container style={{width:"50%",height:"50%"}}>               
                <Row><canvas id="canvas" style={{border:"1px solid",zoom:"50%"}} width="200" height="200"></canvas></Row> 
                
                    <form>
                        <Row>
                            <Col> 
                                <input onClick={() => setSelectedFilter("original")} type="radio" id="original" name="color_filter" value="original"/>
                                <label htmlFor="input">Original</label>
                            </Col>                   
                            <Col> 
                                <input onClick={() => setSelectedFilter("grayscale")}  type="radio" id="grayscale" name="color_filter" value="grayscale"/>
                                <label htmlFor="input">Grayscale</label>
                            </Col>
                            <Col> 
                                <input onClick={() => setSelectedFilter("inverted")} type="radio" id="inverted" name="color_filter" value="inverted"/>
                                <label htmlFor="input">Inverted</label>
                            </Col>
                            <Col> 
                                <input onClick={() => setSelectedFilter("sepia")} type="radio" id="sepia" name="color_filter" value="sepia"/>
                                <label htmlFor="input">Sepia</label>
                            </Col>
                        </Row>
                    </form>     
                                  
               
            </Container>

        </>
    );
}
