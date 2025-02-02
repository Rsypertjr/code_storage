import React, { useState, useEffect, useRef } from 'react';
import {Container,Row,Card,ListGroup, Button } from 'react-bootstrap';

export default function About(props){

    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        div.addEventListener("click", removeCover);
        $('#about').addClass('upslide');
            return () => {
                // unsubscribe event
                div.removeEventListener("click", removeCover);
            };
    },[]);

    const removeCover = () => {
        $('.cover').css('display','none');
    }

    const handleClick = () => {
        $('#about').removeClass('upslide').addClass('downslide').addClass('hidden');
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
            
            <Container id="about" className="fluid">              
                                   
                    <Card>
                        <Button variant="outline-success" onClick={handleClick} className="viewerClose justify-content-center" style={bStyle}>Close</Button>
                        <Card.Body>
                            <Card.Title className="p-4">
                                <Container className="d-flex justify-content-center">     
                                    <h3>About</h3>
                                </Container>
                                <Container className="d-flex justify-content-center lamp"> 
                                    <i class="bi bi-wrench"></i>
                                </Container> 
                            </Card.Title>
                            <Card.Text>
                                <ListGroup className="mb-2">
                                    <ListGroup.Item variant="success">
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                                <img src="./images/technologyideas.jpg" alt="Technology Ideas"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                                <a href="https://rsypertjr.com/webTech" target="_blank">
                                                    <p>
                                                        <a href="https://rsypertjr.com/webTech" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Web Technologies Used</a>	
                                                    </p>                                                
                                                </a>
                                        </Container>
                                            <object data="https://rsypertjr.com/webTech" height="200" width="1000"></object>
                                            <p className="desc centerit">Link to a Mobile version of My work portfolio. I developed it using JQuery Mobile and it should run on Android devices.</p>
                                    </ListGroup.Item>   
                                </ListGroup>
                                <ListGroup className="mb-2">
                                    <ListGroup.Item variant="primary">
                                        <Container className="d-flex justify-content-center mb-2 lamp">                                            
                                            <span><i class="bi bi-mailbox"></i></span> 
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                                <a href="https://rsypertjr.com/emailno" target="_blank">
                                                    <p>
                                                        <a href="https://rsypertjr.com/emailno" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Make Contact</a>	
                                                    </p>                                                
                                                </a>
                                        </Container>
                                            <object data="https://rsypertjr.com/emailno" height="200" width="1000"></object>
                                            <p className="desc centerit">You can email me if you like. Also more contact info is given in my resume.</p>
                                    </ListGroup.Item>   
                                </ListGroup>
                                <ListGroup className="mb-2">
                                    <ListGroup.Item variant="secondary">
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                            <img src="./images/myFace.jpg" alt="My Profile"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                                <a href="https://www.linkedin.com/in/rlsworks/" target="_blank">
                                                    <p>
                                                        <a href="https://www.linkedin.com/in/rlsworks/" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Personal Profile</a>	
                                                    </p>                                                
                                                </a>
                                        </Container>
                                            <object data="https://www.linkedin.com/in/rlsworks/" height="200" width="1000"></object>
                                            <p className="desc centerit">You can view my Linked-In Personal Profile for more info on me.</p>
                                    </ListGroup.Item>   
                                </ListGroup>
                            </Card.Text>                           
                                <div className="container fluid cover" ref={innerRef} >
                                    <div className="container d-flex justify-content-center">
                                        <div>
                                            <Container className="d-flex justify-content-center lamp p-2 mb-2"> 
                                                <i class="bi bi-wrench"></i>
                                            </Container>                                            
                                            <Container className="d-flex justify-content-center"> 
                                                <h1>About</h1>
                                            </Container>
                                            <p>Beneath there is a page about technologies that I've used, and an email contact page.  
                                            Also you can see more about me on my LinkedIn profile page.  Click this cover panel to see.
                                            &nbsp;&nbsp;<font color="green">Click Page to Open.</font></p>						
                                        </div>                                            
                                    </div>                                
                                </div>
                        </Card.Body>
                    </Card>
                        
                </Container> 
        </div>
    );
}