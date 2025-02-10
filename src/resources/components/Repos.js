import React, { useState, useEffect, useRef } from 'react';
import {Container,Row,Card,ListGroup, Button } from 'react-bootstrap';
import codeStorageImage from "../images/codestorageimage.jpg";

export default function About(props){

    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        div.addEventListener("click", removeCover);
        $('#repos').addClass('upslide');
            return () => {
                // unsubscribe event
                div.removeEventListener("click", removeCover);
            };
    },[]);

    const removeCover = () => {
        $('.cover').css('display','none');
    }

    const handleClick = () => {
        $('#repos').removeClass('upslide').addClass('downslide').addClass('hidden');
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
            
            <Container id="repos" className="fluid">              
                                   
                    <Card>
                        <Button variant="outline-success" onClick={handleClick} className="viewerClose justify-content-center" style={bStyle}>Close</Button>
                        <Card.Body>
                            <Card.Title className="p-4">
                                <Container className="d-flex justify-content-center">     
                                    <h3>Home/Code Repos</h3>
                                </Container>
                                <Container className="d-flex justify-content-center lamp"> 
                                    <i class="bi bi-archive"></i>
                                </Container> 
                            </Card.Title>
                            <Card.Text>
                                <ListGroup>
                                    <ListGroup.Item variant="success">
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                                <img src={codeStorageImage} alt="Technology Ideas"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                                <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF" target="_blank">
                                                    <p>
                                                        <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Code Storage</a>	
                                                    </p>                                                
                                                </a>
                                        </Container>
                                            <object data="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF" height="200" width="1000"></object>
                                            <p className="desc centerit">Link to Repository of Code I have written. See the Git Repository link for the 
								            code of this site done within the CodeIgniter MVC Framework.</p>
                                    </ListGroup.Item>   
                                </ListGroup>                            
                            </Card.Text>                           
                                <div className="container fluid cover" ref={innerRef} >
                                    <div id="description" className="container d-flex justify-content-center">
                                        <div>
                                            <Container className="d-flex justify-content-center lamp p-2 mb-2"> 
                                                <i class="bi bi-archive"></i>
                                            </Container>                                            
                                            <Container className="d-flex justify-content-center"> 
                                                <h1>Git Repository</h1>
                                            </Container>
                                            <p>Link to GIT code repository provided thru BitBucket.&nbsp;&nbsp;<font color="green">Click Page to Open.</font></p>						
                                        </div>                                            
                                    </div>                                
                                </div>
                        </Card.Body>
                    </Card>
                        
                </Container> 
        </div>
    );
}