import React, { useState, useEffect, useRef } from 'react';
import {Container,Row,Card,ListGroup, Button } from 'react-bootstrap';

export default function MyApp(props){

    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        div.addEventListener("click", removeCover);
        $('#mobile').addClass('upslide');
            return () => {
                // unsubscribe event
                div.removeEventListener("click", removeCover);
            };
    },[]);

    const removeCover = () => {
        $('.cover').css('display','none');
    }

    const handleClick = () => {
        $('#mobile').removeClass('upslide').addClass('downslide').addClass('hidden');
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
            
            <Container id="mobile" className="fluid">              
                                   
                    <Card>
                        <Button variant="outline-success" onClick={handleClick} className="viewerClose justify-content-center" style={bStyle}>Close</Button>
                        <Card.Body>
                            <Card.Title className="p-4">
                                <Container className="d-flex justify-content-center">     
                                    <h3>Mobile Portfolio</h3>
                                </Container>
                                <Container className="d-flex justify-content-center lamp"> 
                                    <i class="bi bi-phone"></i>
                                </Container> 
                            </Card.Title>
                            <Card.Text>
                                <ListGroup>
                                    <ListGroup.Item variant="success">
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                                <img src="./images/mobiledevelopmentimage.jpg" alt="Mobile Icon"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                                <a href="https://rsypertjr.com/mobile" target="_blank">
                                                    <p>
                                                        <a href="https://rsypertjr.com/mobile" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">JQuery Mobile App</a>	
                                                    </p>                                                
                                                </a>
                                        </Container>
                                            <object data="https://rsypertjr.com/mobile" height="200" width="1000"></object>
                                            <p className="desc centerit">Link to a Mobile version of My work portfolio. I developed it using JQuery Mobile and it should run on Android devices.</p>
                                    </ListGroup.Item>   
                                </ListGroup>
                            </Card.Text>                           
                                <div className="container fluid cover" ref={innerRef} >
                                    <div className="container d-flex justify-content-center">
                                        <div>
                                            <Container className="d-flex justify-content-center lamp p-2 mb-2"> 
                                                <i class="bi bi-phone"></i>
                                            </Container>                                            
                                            <Container className="d-flex justify-content-center"> 
                                                <h1>Mobile Portfolio</h1>
                                            </Container>
                                            <p>Beneath is a JQuery Mobile version of my portfolio that is mobile-device-responsive.&nbsp;&nbsp;<font color="green">Click Page to Open.</font></p>						
                                        </div>                                            
                                    </div>                                
                                </div>
                        </Card.Body>
                    </Card>
                        
                </Container> 
        </div>
    );
}