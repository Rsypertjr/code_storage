import React, { useState, useEffect, useRef } from 'react';
import {Container,Row,Card,ListGroup, Button } from 'react-bootstrap';
import dataanalysis from '../images/dataanalysis.jpg'

export default function LampBased(props){
    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        $('#lamp').addClass('upslide');
        div.addEventListener("click", removeCover);
            return () => {
            // unsubscribe event
            div.removeEventListener("click", removeCover);
            };
    },[]);

    const removeCover = () => {
        $('.cover').css('display','none');
    }

    const handleClick = () => {
        $('#lamp').removeClass('upslide').addClass('downslide').addClass('hidden');
        $('.viewerClose').css('display','none');
    }

    const bStyle = {
        top:"1em",
        zIndex:"10",
        width:"33%",
        marginLeft:"33%",
        opacity:"1.0"


    }
 

    return (
                 
				<div>                 
				  <Container id="lamp" className="fluid">                      
                    <Card>
                        <Button variant="outline-success" onClick={handleClick} className="viewerClose justify-content-center" style={bStyle}>Close</Button>
                        <Card.Body>
                            <Card.Title className="p-4">
                                <Container className="d-flex justify-content-center">     
                                    <h3>Software Development</h3>
                                </Container>
                                <Container className="d-flex justify-content-center lamp"> 
                                    <i class="bi bi-lamp"></i>
                                </Container> 
                            </Card.Title>
                            <Card.Text>
                                <ListGroup className="mb-2">
                                    <ListGroup.Item variant="success" >
                                        <Container className="d-flex justify-content-center">                                            
                                                <img class="img-circle" src={dataanalysis} alt="Data Anaysis"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                                <a href="https://rsypertjr.com/amino" target="_blank">
                                                    <p>
                                                        <a href="https://rsypertjr.com/amino" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Amino Acid Code Sequence Analyzer</a>	
                                                    </p>                                                
                                                </a>
                                        </Container>
                                            <object data="https://rsypertjr.com/amino" height="200" width="1000"></object>
                                            <p className="desc">This program gives statistics for all combinations of amino acid sequences within a protein.&nbsp;&nbsp;The protein sequence is 
                                            parsed by regex techniques from a text file, into a MySQL database. The first and last amino acid is chosen in the GUI, as well as, 
                                            the desired statistical output.&nbsp;&nbsp;The database accessed by JavaScript-AJAX to PHP-MySQL on the server side which returns the statistics.&nbsp;&nbsp;
                                            The Code for PHP-based apps is here: <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">PHP Code</a>
                                            </p> 
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup className="mb-2">
                                    <ListGroup.Item variant="warning" className="mb-2"> 
                                        <Container className="d-flex justify-content-center">                                            
                                                <img class="img-circle" src={dataanalysis} alt="Data Anaysis"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                            <a href="orominer1" target="_blank">
                                                <p>
                                                    <a href="https://rsypertjr.com/orominer1" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Human Organ System Analyzer 1</a>	
                                                </p>
                                            </a>
                                        </Container>
                                        <object data="https://rsypertjr.com/orominer1" height="200" width="1000"></object>
                                        <p className="desc">The Orominer program shows a hierarchical organization of the human body constitution.&nbsp;&nbsp; 
                                            Its top level is Organ Systems.&nbsp;&nbsp;It uses JavaScript, JQuery for event synchronization between 
                                            hierarchical display and graphic display, as well as, dynamic generation of SVG graphical elements 
                                            based on DOM HTML elements.&nbsp;&nbsp; MySQL Database information is converted into XML format using PHP 
                                            for up front access by the code for generation of Hierachical Display.&nbsp;&nbsp;Unfortunately ONLY THE 
                                            First 3 NODES Of DATA was developed at Project Completion.&nbsp;&nbsp;The Code for PHP-based apps is
                                            here: <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">PHP Code</a>
                                        </p>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup className="mb-2" >
                                    <ListGroup.Item variant="danger"className="mb-2" >
                                        <Container className="d-flex justify-content-center">                                            
                                                <img class="img-circle" src={dataanalysis} alt="Data Anaysis"/>
                                        </Container> 
                                        <Container className="d-flex justify-content-center">
                                            <a href="orominer2" target="_blank">
                                                <p>	
                                                    <a href="https://rsypertjr.com/orominer2" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Human Organ System Analyzer 2</a>	
                                                </p>
                                            </a>
                                        </Container>
                                        <object data="https://rsypertjr.com/orominer2" height="200" width="1000"></object>
                                        <p className="desc">This orominer program contains Histological Data within the Hierarchical Organization of Human Body 
                                            makeup.&nbsp;&nbsp;Histological Data is information about Human Organs and their tissues and cells.&nbsp;&nbsp;This 
                                            application uses JavaScript Objects to store active data requests from which graphics is generated.&nbsp;&nbsp;
                                            The Code for PHP-based apps is here: <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">PHP Code</a>
                                        </p>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup className="mb-2">
                                    <ListGroup.Item variant="primary" className="mb-2">
                                        <Container className="d-flex justify-content-center">
                                            <img class="img-circle" src="./images/othellogameimage.jpg" alt="Game Coding"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center"> 
                                            <a href="https://rsypertjr.com/othello" target="_blank">
                                                <p>	
                                                    <a href="https://rsypertjr.com/othello" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Play Othello Game thru AJAX</a>
                                                </p>
                                            </a> 
                                        </Container>
                                        <Container className="fluid">  
                                            <object data="https://rsypertjr.com/othello" height="200" width="1000"></object>
                                            <p className="desc centerit">Play the Othello Game using AJAX technology which will eliminate Page Reloads.&nbsp;&nbsp;The Code for PHP-based apps is here: <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">PHP Code</a></p>
                                        </Container>
                                    </ListGroup.Item> 
                                </ListGroup>
                                <ListGroup className="mb-2"> 
                                    <ListGroup.Item variant="secondary" className="mb-2">
                                        <Container className="d-flex justify-content-center">                                            
                                                <img class="img-circle" src={dataanalysis} alt="Data Anaysis"/>
                                        </Container> 
                                        <Container className="d-flex justify-content-center">
                                            <a href="voteparser" target="_blank">
                                                <p>	
                                                    <a href="voteparser" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">2020 Presidential Election Vote Parser</a>
                                                </p>
                                            </a>
                                        </Container>
                                        <object data="voteparser" height="200" width="300"></object>
                                        <p className="desc">See Tabular and Graphic Parser of 2020 Presidential Election Voting which uses Vue.js, JQuery, Bootstrap, Datatables, and JChartfx, on the front-end, and PHP on the backend 
                                            to create a dashboard and charts of elections data for all states.&nbsp;&nbsp;It pulls actual election data from the New York Times website and parses the JSON formatted data.&nbsp;&nbsp;   
                                            The Code for PHP-based apps is here: <a href="https://github.com/Rsypertjr/voteparser/blob/voteparser/parse_votes.php" target="_blank">PHP Code</a>
                                        </p>
                                    </ListGroup.Item>                                    
                                </ListGroup>
                            </Card.Text>
                                
                            
                            <Container className="fluid cover" ref={innerRef}>
                                <Container className="d-flex justify-content-center lamp p-2 mb-2"> 
                                    <i class="bi bi-lamp"></i>
                                </Container>
                                <Container className="d-flex justify-content-center"> 
                                    <h1>LAMP Technologies</h1>
                                </Container>
                                    <p>PHP/MySQL is used on the back-end for these apps.&nbsp;&nbsp;Regex is used to parse text files into a database.&nbsp;&nbsp;  
                                    I programmatically converted flat non-relational tables into a relational-XMLfile for app data.&nbsp;&nbsp;PHP/SQL is
                                    used to query database and send tabular results to front-end.&nbsp;&nbsp;Javascript/JQuery is used for dynamic DOM manipulation
                                    and SVG graphic element generation. AJAX is also used to update and process game-board data, as well as
                                    load XML data files.&nbsp;&nbsp;<font color="green">Click Page to Open.</font></p>
                            </Container>
                        </Card.Body>
                    </Card>
                        
                </Container> 

          </div>        
    );
}