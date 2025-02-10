import React, { useState, useEffect, useRef } from 'react';
import {Container,Row,Card,ListGroup, Button } from 'react-bootstrap';

export default function OldPortfolio(props){

    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        div.addEventListener("click", removeCover);
        $('#oldportfolio').addClass('upslide');
            return () => {
                // unsubscribe event
                div.removeEventListener("click", removeCover);
            };
    },[]);

    const removeCover = () => {
        $('.cover').css('display','none');
    }

    const handleClick = () => {
        $('#oldportfolio').removeClass('upslide').addClass('downslide').addClass('hidden');
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
            <Container id="oldportfolio" className="fluid">   
                <Card>
                    <Button variant="outline-success" onClick={handleClick} className="viewerClose justify-content-center" style={bStyle}>Close</Button>
                    <Card.Body>
                        <Card.Title className="p-4">
                            <Container className="d-flex justify-content-center">     
                                <h3>Old Work Portfolio</h3>
                            </Container>
                            <Container className="d-flex justify-content-center lamp"> 
                                <i class="bi bi-lamp"></i>
                            </Container> 
                        </Card.Title>
                        <Card.Text>
                            <ListGroup>
                                <ListGroup.Item variant="success">
                                    <Container className="d-flex justify-content-center mb-2">                                            
                                            <img src="./images/lampTechs.jpg" alt="Lamp Technologies"/>
                                    </Container>
                                    <Container className="d-flex justify-content-center">
                                            <a href="https://rsypertjr.com/frontCMS" target="_blank">
                                                <p>
                                                    <a href="https://rsypertjr.com/frontCMS" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Old Work Portfolio</a>	
                                                </p>                                                
                                            </a>
                                    </Container>
                                        <object data="https://rsypertjr.com/frontCMS" height="200" width="1000"></object>
                                        <p className="desc">My old work portfolio using LAMP technologies including CodeIgniter MVC Framework, FUEL-CMS
                                        (a CodeIgniter-based Content Management System), PHP, MySQL, HTML, JavaScript, JQuery, JQuery UI, JQuery Mobile, Angular JS, ReactJS (ngrx) CSS,
                                        CSS3, SVG, AJAX, XML, JSON, Regex, DOM, Notepad++, Cloud9 IDE, GIT, Heroku Server, Laravel MVC, GitHub API, Facebook API, Active Campaign API, 
                                        Bootstrap, WordPress, Ruby On Rails, Google Developer Tools, Homestead Dev, Vagrant VMs, Adobe InDesign, GIMP (like Photoshop), and other technologies.
                                        </p>
                                </ListGroup.Item>   
                            </ListGroup>
                        </Card.Text>                           
                            <div className="container fluid cover" ref={innerRef} >
                                <div className="container d-flex justify-content-center">
                                    <div>
                                        <Container className="d-flex justify-content-center lamp p-2 mb-2"> 
                                            <i class="bi bi-lamp"></i>
                                        </Container>                                            
                                        <Container className="d-flex justify-content-center"> 
                                            <h1>Old Work Portfolio</h1>
                                        </Container>
                                        <p>CodeIgniter, Fuel CMS, and Lamp technologies are used as the MVC framework.&nbsp;&npsp;They are based on PHP/LAMP technologies.&nbsp;&nbsp; 
                                            Includes lot of built-in routing, modular storage of code in a database, and Active Object database access.&nbsp;&nbsp;  
                                            On the front-end, CSS 2-D and 3-D tranformations are used to produce animations.<font color="green">Click Page to Open.</font>
                                        </p>	
                                    </div>                                            
                                </div>                                
                            </div>
                    </Card.Body>
                </Card>                    
            </Container> 
        </div>
    );
}