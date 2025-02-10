import React, { useState, useEffect, useRef } from 'react';
import {Container,Row,Card,ListGroup, Button } from 'react-bootstrap';

export default function Specifications(props){

    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        div.addEventListener("click", removeCover);
        $('#specifications').addClass('upslide');
            return () => {
                // unsubscribe event
                div.removeEventListener("click", removeCover);
            };
    },[]);

    const removeCover = () => {
        $('.cover').css('display','none');
    }

    const handleClick = () => {
        $('#specifications').removeClass('upslide').addClass('downslide').addClass('hidden');
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
            <Container id="specifications" className="fluid">      
                <Card>
                    <Button variant="outline-success" onClick={handleClick} className="viewerClose justify-content-center" style={bStyle}>Close</Button>
                    <Card.Body>
                        <Card.Title className="p-4">
                            <Container className="d-flex justify-content-center">     
                                <h3>Technical Specification Documents</h3>
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
                                        <a href="https://rsypertjr.com/whitePaper" target="_blank">
                                            <p>	
                                                <a href="https://rsypertjr.com/whitePaper" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">White Paper</a>	
                                            </p>
                                        </a>
                                    </Container>
                                    <object data="https://rsypertjr.com/whitePaper" height="200" width="1000"></object>
                                    <Container className="fluid">  
                                        <p className="desc">This is a technical specification called a White Paper which explains the technology behind 
									    a companies product.&nbsp;&nbsp;In this case an Electrical Motor Energy Efficiency Device.</p>
                                    </Container>
                                </ListGroup.Item>
                            </ListGroup>
                            <ListGroup className="mb-2">
                                <ListGroup.Item variant="primary">
                                    <Container className="d-flex justify-content-center mb-2">                                            
                                        <img src="./images/techwritingimg.jpg" alt="Technical Writing"/>
                                    </Container>
                                    <Container className="d-flex justify-content-center"> 
                                        <a href="https://rsypertjr.com/engSpec" target="_blank">
                                            <p>	
                                                <a href="https://rsypertjr.com/engSpec" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Engineering Specification</a>
                                            </p>
                                        </a> 
                                    </Container>
                                    <Container className="fluid">  
                                        <object data="https://rsypertjr.com/engSpec" height="200" width="1000"></object>
                                        <Container className="d-flex justify-content-center">  
                                            <p className="desc">This is a technical specification for the Clark County Land Development Approval process.&nbsp;&nbsp; 
								            I authored it as an Environmental Health Engineer for Southern Nevada Health District.
                                            </p>
                                        </Container>
                                    </Container>
                                </ListGroup.Item>                                                     
                            </ListGroup>
                        </Card.Text>                           
                            <div className="container fluid cover" ref={innerRef} >
                                <div className="container d-flex justify-content-center">
                                    <div>
                                        <Container className="d-flex justify-content-center lamp p-2 mb-2"> 
                                            <i class="bi bi-pen"></i>
                                        </Container>                                            
                                        <Container className="d-flex justify-content-center"> 
                                            <h1>Technical Specifications</h1>
                                        </Container>
                                        <p>Technology Explanation (White Paper) and Business Process Description.&nbsp;&nbsp;<font color="green">Click Page to Open.</font></p>						
                                    </div>                                            
                                </div>                                
                            </div>
                    </Card.Body>
                </Card>
            </Container> 
        </div>
    );
}