import React, { useState, useEffect, useRef } from 'react';
import {Container,Row,Card,ListGroup, Button } from 'react-bootstrap';

export default function Manuals(props){

    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        div.addEventListener("click", removeCover);
        $('#manuals').addClass('upslide');
            return () => {
                // unsubscribe event
                div.removeEventListener("click", removeCover);
            };
    },[]);

    const removeCover = () => {
        $('.cover').css('display','none');
    }

    const handleClick = () => {
        $('#manuals').removeClass('upslide').addClass('downslide').addClass('hidden');
        $('.viewerClose').css('display','none');
    }

    const bStyle = {
        top:"1em",
        zIndex:"10",
        width:"33%",
        marginLeft:"33%",
        opacity:"1.0"


    }
 

    return(
        <div>
            
            <Container id="manuals" className="fluid">              
                                   
                    <Card>
                        <Button variant="outline-success" onClick={handleClick} className="viewerClose justify-content-center" style={bStyle}>Close</Button>
                        <Card.Body>
                            <Card.Title className="p-4">
                                <Container className="d-flex justify-content-center">     
                                    <h3>Production Maintenance Manuals</h3>
                                </Container>
                                <Container className="d-flex justify-content-center lamp"> 
                                    <i class="bi bi-pen"></i>
                                </Container> 
                            </Card.Title>
                            <Card.Text>
                                <ListGroup className="mb-2">                                                           
                                    <ListGroup.Item variant="danger"> 
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                                <img src="./images/technicalwritingimage.jpg" alt="Technical Writing"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                            <a href="https://rsypertjr.com/graingerABCDE" target="_blank">
                                                <p>	
                                                    <a href="https://rsypertjr.com/graingerABCDE" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Grainger ABCDE Series B</a>	
                                                </p>
                                            </a>
                                        </Container>
                                        <object data="https://rsypertjr.com/graingerABCDE" height="200" width="1000"></object>
                                        <Container className="fluid">  
                                            <p className="desc">This is a Maintenance and Product Information Manual tailored for a customers implementation 
                                            of a Motor Efficiency Controller (MEC). It is a new generation product manual. I wrote it
                                            using Adobe InDesign according to the customers style rules
                                                        </p>
                                        </Container>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup className="mb-2">                                    
                                    <ListGroup.Item variant="primary">
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                            <img src="./images/techwritingimg.jpg" alt="Technical Writing"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center"> 
                                            <a href="https://rsypertjr.com/graingerCDE" target="_blank">
                                                <p>	
                                                    <a href="https://rsypertjr.com/graingerCDE" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Grainger CDE</a>
                                                </p>
                                            </a> 
                                        </Container>
                                        <Container className="fluid">  
                                            <object data="https://rsypertjr.com/graingerCDE" height="200" width="1000"></object>
                                            <Container className="d-flex justify-content-center">  
                                                <p className="desc">This is a Maintenance and Product Information Manual tailored for a customers implementation of a 
                                                Motor Efficiency Controller (MEC). It is a new generation product manual. I wrote it in Adobe InDesign 
                                                according to the customer's style rules.
                                                </p>
                                            </Container>
                                        </Container>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup  className="mb-2">
                                    <ListGroup.Item variant="secondary">
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                                <img src="./images/techWriter.jpg" alt="Technical Writing"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                            <a href="https://rsypertjr.com/mecPManual" target="_blank">
                                                <p>	
                                                    <a href="https://rsypertjr.com/mecPManual" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">MEC Product Manual VT 1.6</a>
                                                </p>
                                            </a>
                                        </Container>
                                        <object data="https://rsypertjr.com/mecPManual" height="200" width="1000"></object>
                                        <Container className="d-flex justify-content-center">  
                                            <p className="desc">This is a Product Manual for a Motor Efficiency Controller (MEC). It is a new generation product manual. 
								            I wrote it in Adobe InDesign according to the customer's style rules.</p>
                                        </Container>
                                    </ListGroup.Item>                                   
                                </ListGroup>
                            </Card.Text>                           
                                <div className="container fluid cover" ref={innerRef} >
                                    <div className="container d-flex justify-content-center">
                                        <div>
                                            <Container className="d-flex justify-content-center lamp p-2 mb-2"> 
                                                <i class="bi bi-archive"></i>
                                            </Container>                                            
                                            <Container className="d-flex justify-content-center"> 
                                                <h1>Production Manuals</h1>
                                            </Container>
                                            <p>Operation and Maintenance Manuals for an Electro-Mechanical Application&nbsp;&nbsp;<font color="green">Click Page to Open.</font></p>						
                                        </div>                                            
                                    </div>                                
                                </div>
                        </Card.Body>
                    </Card>
                        
                </Container> 
        </div>
    );
}