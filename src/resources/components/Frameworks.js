import React, { useState, useEffect, useRef } from 'react';
import {Container,Row,Card,ListGroup, Button } from 'react-bootstrap';

import dataanalysis from './images/dataanalysis.jpg';
import laravelMVC from './images/laravelMVC.jpg';
import lampTechs from './images/lampTechs.jpg';
import reactlogo from './images/reactlogo.jpg';





export default function Frameworks(props){

    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        div.addEventListener("click", removeCover);
        $('#frameworks').addClass('upslide');
            return () => {
                // unsubscribe event
                div.removeEventListener("click", removeCover);
            };
    },[]);

    const removeCover = () => {
        $('.cover').css('display','none');
    }

    const handleClick = () => {
        $('#frameworks').removeClass('upslide').addClass('downslide').addClass('hidden');
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
            
            <Container id="frameworks" className="fluid">              
                                   
                    <Card>
                        <Button variant="outline-success" onClick={handleClick} className="viewerClose justify-content-center" style={bStyle}>Close</Button>
                        <Card.Body>
                            <Card.Title className="p-4">
                                <Container className="d-flex justify-content-center">     
                                    <h3>Frameworks</h3>
                                </Container>
                                <Container className="d-flex justify-content-center lamp"> 
                                    <i class="bi bi-tree"></i>
                                </Container> 
                            </Card.Title>
                            <Card.Text>
                                {/*<ListGroup.Item variant="success">
                                    <Container className="d-flex justify-content-center mb-2">                                            
                                            <img src="./images/vuejs_logo.jpg" alt="VueJs Icon"/>
                                    </Container>
                                    <Container className="d-flex justify-content-center">
                                            <a href="amino" target="_blank">
                                                <p class="sectionTitle">
                                                    <a href="amino" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Vue JavaScript App</a>	
                                                </p>                                                
                                            </a>
                                    </Container>
                                        <object data="amino" height="200" width="300"></object>
                                        <p>A Vue JS based app that accesses an API to create a Dynamic List converted from a static HMTL page.  Added Paging Function and Select Page Size.  GitHub link
                                        to Code is here <a href="https://github.com/Rsypertjr/vueapp/tree/vueapp" target="_blank">Vue App Code</a>
                                        </p>
                                    </ListGroup.Item>                                    
                                    <ListGroup.Item variant="danger"> 
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                                <img src="./images/laravel_icon.jpg" alt="Laravel Icon"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                            <a href="https://safe-bayou-92699.herokuapp.com/" target="_blank">
                                                <p>	
                                                    <a href="https://safe-bayou-92699.herokuapp.com/" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Simple Laravel App</a>	
                                                </p>
                                            </a>
                                        </Container>
                                        <object data="https://safe-bayou-92699.herokuapp.com/" height="200" width="1000"></object>
                                        <Container className="fluid">  
                                            <p className="desc">Originally developed using Homestead development environment which utilizes Vagrant VM Linux Server, and deployed to Heroku server.&nbsp;&nbsp;
                                            Here is the code: <a href="https://bitbucket.org/Rsypertjr/laravel-test/src/master/" target="_blank">Laravel Code</a>
                                            </p>
                                        </Container>
                                    </ListGroup.Item>
                                    <ListGroup.Item variant="primary">
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                                <img src="./images/laravel_icon.jpg" alt="Laravel Icon"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center"> 
                                            <a href="https://safe-bayou-92699.herokuapp.com/cinp" target="_blank">
                                                <p>	
                                                    <a href="https://safe-bayou-92699.herokuapp.com/cinp" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Another Laravel App</a>
                                                </p>
                                            </a> 
                                        </Container>
                                        <Container className="fluid">  
                                            <object data="https://safe-bayou-92699.herokuapp.com/cinp" height="200" width="1000"></object>
                                            <Container className="d-flex justify-content-center">  
                                                <p className="desc">Developed using Laravel Homestead Environment for generating Homeschool grade transcripts for my kids. Here is the code: <a href="https://github.com/Rsypertjr/transcriptor" target="_blank">Laravel Code</a></p>
                                            </Container>
                                        </Container>
                                    </ListGroup.Item>
                                    <ListGroup.Item variant="secondary">
                                        <Container className="d-flex justify-content-center mb-2">                                            
                                                <img src="./images/angular_icon.jpg" alt="Laravel Icon"/>
                                        </Container>
                                        <Container className="d-flex justify-content-center">
                                            <a href="angularApp" target="_blank">
                                                <p>	
                                                    <a href="angularApp" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Angular2 JavaScript and Redux State Container</a>
                                                </p>
                                            </a>
                                        </Container>
                                        <object data="angularApp" height="200" width="1000"></object>
                                        <Container className="d-flex justify-content-center">  
                                            <p className="desc">Angular2 App with Redux deployed to Heroku Server. Here is the code: <a href="https://github.com/Rsypertjr/angularRedux" target="_blank">Angular Code</a></p>
                                        </Container>
                                    </ListGroup.Item> **/}
                                    <ListGroup className="mb-2">
                                        <ListGroup.Item variant="light">
                                            <Container className="d-flex justify-content-center">                                            
                                                    <img class="img-circle" src={dataanalysis} alt="Data Anaysis"/>
                                            </Container>
                                            <Container className="d-flex justify-content-center">
                                                <a href="https://angularvotes.rsypertjr.com" target="_blank">
                                                    <p>	
                                                        <a href="https://angularvotes.rsypertjr.com" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Angular version of Vote Parser</a>
                                                    </p>
                                                </a>
                                            </Container>
                                            <object data="https://angularvotes.rsypertjr.com" height="200" width="1000"></object>
                                            <p className="desc">Angular used with Bootstrap, JQuery Datatable, JQuery, Node.js, NPM.&nbsp;&nbsp;Angular utilizes Components, Services, and Routing  Here is the code: 
                                            <a href="https://github.com/Rsypertjr/AngularVoteParser/tree/voteParser" target="_blank">&nbsp;&nbsp;Angular Code</a>&nbsp;&nbsp;This same app has a Docker implementation that uses Docker Engine and 
                                            contains Dockerfile and Docker-compose implementations of development and production versions.&nbsp;&nbsp;Karma and Protractor unit testing of code is included.&nbsp;&nbsp;Link to this 
                                            code is <a href="https://github.com/Rsypertjr/dockerVoteParser/tree/dockerVoteParser" target="_blank">Docker Angular Code.</a>
                                            </p> 
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup className="mb-2">
                                        <ListGroup.Item variant="info">
                                            <Container className="d-flex justify-content-center mb-2">                                            
                                                    <img class="img-circle" src={reactlogo} alt="React Icon"/>
                                            </Container>
                                            <Container className="d-flex justify-content-center">
                                                <a href="https://rsypertjr.com/tictactoe" target="_blank">
                                                    <p>	
                                                        <a href="https://rsypertjr.com/tictactoe" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">React Javascript Tic-Tac-Toe</a>
                                                    </p>
                                                </a>
                                            </Container>
                                            <object data="https://rsypertjr.com/tictactoe" height="200" width="1000"></object>
                                            <Container className="d-flex justify-content-center">  
                                                <p className="desc">React Javascript Tic Tac Toe app with CSS animations for victory celebration.&nbsp;&nbsp;Here is the code: <a href="https://github.com/Rsypertjr/fuelCMS/blob/newfuel/fuel/application/views/tictactoe.php" target="_blank">React Javascript Code</a>
                                                </p>
                                            </Container>
                                        </ListGroup.Item>     
                                    </ListGroup>
                                    <ListGroup className="mb-2">
                                        <ListGroup.Item variant="secondary">
                                            <Container className="d-flex justify-content-center mb-2"> 
                                                    <img class="img-circle" src={laravelMVC} alt="Laravel MVC"/>                                 
                                                    <img class="img-circle" src={reactlogo} alt="React Icon"/>
                                            </Container>
                                            <Container className="d-flex justify-content-center">
                                                <a href="https://laravelvotes.rsypertjr.com/votes-table" target="_blank">
                                                    <p>	
                                                        <a href="https://laravelvotes.rsypertjr.com/votes-table" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Laravel(Mix)/React/Chart.js/Bootstrap.js Vote Parser</a>
                                                    </p>
                                                </a>
                                            </Container>
                                            <object data="https://laravelvotes.rsypertjr.com/votes-table" height="200" width="1000"></object>
                                            <p className="desc">The app uses Laravel (Mix) with React.js (including React Router).&nbsp;&nbsp;Composer is used to 
                                            manage PHP dependencies, and NPM is used to managed the Node-based React.js dependencies.&nbsp;&nbsp;Laravel routing is used to serve main page 
                                            and React routing for fast rendering of tables and charts.&nbsp;&nbsp;Table and paging is a custom code and charts utilize Chart.js.
                                            </p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Text>                           
                                <div className=" container fluid cover" ref={innerRef} >
                                    <div className="container d-flex justify-content-center">
                                        <div>
                                            <Container className="d-flex justify-content-center lamp p-2 mb-2"> 
                                                <i class="bi bi-tree"></i>
                                            </Container>                                            
                                            <Container className="d-flex justify-content-center"> 
                                                <h1>Frameworks</h1>
                                            </Container>
                                            <p>Programming I've done using: Node.js based technologies of Vue, Angular, React, and Express.&nbsp;&nbsp;Also using the MVC framework of Laravel.&nbsp;&nbsp;<font color="green">Click Page to Open.</font></p>						
                                        </div>                                            
                                    </div>                                
                                </div>
                        </Card.Body>
                    </Card>
                        
                </Container> 
        </div>
    );
}