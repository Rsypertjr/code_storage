import React, { useState, useEffect, useRef } from 'react';
import {Container,Row,Card,ListGroup, Button } from 'react-bootstrap';
import kidsPlaying from './images/kidsPlaying.gif';

export default function InVegas(props){

    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        div.addEventListener("click", removeCover);
        $('#invegas').addClass('upslide');
            return () => {
                // unsubscribe event
                div.removeEventListener("click", removeCover);
            };
    },[]);

    const removeCover = () => {
        $('.cover').css('display','none');
    }

    const handleClick = () => {
        $('#invegas').removeClass('upslide').addClass('downslide').addClass('hidden');
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
            
            <Container id="invegas" className="fluid">              
                                   
                    <Card>
                        <Button variant="outline-success" onClick={handleClick} className="viewerClose justify-content-center" style={bStyle}>Close</Button>
                        <Card.Body>
                            <Card.Title className="p-4">
                                <Container className="d-flex justify-content-center">     
                                    <h3>Living In Vegas</h3>
                                </Container>
                                <Container className="d-flex justify-content-center lamp"> 
                                    <i class="bi bi-camera"></i>
                                </Container> 
                            </Card.Title>
                            <Card.Text>
                                <ListGroup>
                                    <ListGroup.Item variant="success">
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                                <img src={kidsPlaying} alt="Job Done"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                                <a href="https://rsypertjr.com/inVegas" target="_blank">
                                                    <p>
                                                        <a href="https://rsypertjr.com/inVegas" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Having Vegas Family Fun</a>	
                                                    </p>                                                
                                                </a>
                                        </Container>
                                            <object data="https://rsypertjr.com/inVegas" height="200" width="1000"></object>
                                            <p className="desc centerit">See a slide show and facts about Family Fun In Vegas.</p>
                                    </ListGroup.Item>   
                                </ListGroup>
                            </Card.Text>                           
                                <div className="container fluid cover" ref={innerRef} >
                                    <div className="container d-flex justify-content-center">
                                        <div>
                                            <Container className="d-flex justify-content-center lamp p-2 mb-2"> 
                                                <i class="bi bi-camera"></i>
                                            </Container>                                            
                                            <Container className="d-flex justify-content-center"> 
                                                <h1>Living In Vegas</h1>
                                            </Container>
                                            <p>How to Have Family Fun in and around Vegas!&nbsp;&nbsp;Although a little dated.<font color="green">Click Page to Open.</font></p>	
                                        </div>                                            
                                    </div>                                
                                </div>
                        </Card.Body>
                    </Card>
                        
                </Container> 
        </div>
    );
}