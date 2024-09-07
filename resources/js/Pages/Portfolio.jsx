import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
import TopCarousel from './TopCarousel';
import MidCarousel from './MidCarousel';
import TopNav from './TopNav';


export default function Portfolio(props){  

    return(
       
        <>			
			
					
           
			<Container style={{width:"95%"}} fluid>
                 <TopCarousel /> 
                 <Container className="d-flex justify-content-center" style={{backgroundColor:"black"}} fluid>
                    <TopNav />
                 </Container>
                 <MidCarousel />
                 
            </Container>
			

		    {/* -------- Display Panels with Cover Layers --------------- */}

            {/* Home Panel */}
            <Container id="home" className="apanel" style={{width:"95%"}} fluid>
                <Card >
                    <Card.Img/>
                    <Card.Body>
                        <Card.Title>Home/Code Repos</Card.Title>
                        <Card.Body>
                            <Card.Link href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF" data-toggle="tooltip"
                                                data-placement="right" title="Click for Sites GIT Repo!">FUEL-CMS Git Repository</Card.Link>
                            <Card.Text>Link to GIT Repository for this FuelCMS-based Site</Card.Text>
                        </Card.Body>
                    </Card.Body>
                </Card>

                <Container id="homeCovr" className="coverPanel" fluid>
                    <Card>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title>Home/Code Repos</Card.Title>
                            <Card.Body>
                                <Card.Text><i className="home icon"></i></Card.Text>
                                <Card.Text>Home/Code Repos</Card.Text>
                                <Card.Text>Beneath are links to FuelCMS-based site Code</Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </Container>
               
            </Container>
				  
		

            <Container id="about" className="apanel" style={{width:"95%"}} fluid>
                <Card>
                    <Card.Img src="technologyideas" alt="Technology Ideas"/>
                    <Card.Body>
                        <Card.Title>Web Page Technologies Used</Card.Title>
                        <Card.Link href="webTech" data-toggle="tooltip" data-placement="right" title="Click to See Technologies!">Web Technologies Used</Card.Link>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Link href="emailno" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">Making Contact</Card.Link>
                        <Card.Text>You can email me if you like.&nbsp;&nbsp;Also more contact info is given in my resume.</Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img src="myFace" alt="My Face"/>
                    <Card.Body>
                        <Card.Title>Personal Profile</Card.Title>
                        <Card.Link href="emailno" data-toggle="tooltip" data-placement="right" title="Click to See My Profile!">Web Technologies Used</Card.Link>
                    </Card.Body>
                </Card>


                <Container id="aboutCovr" className="coverPanel" fluid>
                    <Card>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title>About</Card.Title>
                            <Card.Text><i className="wrench icon"></i></Card.Text>
                            <Card.Text>Beneath there is a page about technologies that I've used, and an email contact page.  Also you can see more about me on my LinkedIn profile page.  
                                Click this cover panel to see.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
               
            </Container>




				  
            {/* Lamp Panel */}
            <div id="lamp" className="container-fluid">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span>Software Development</span>
                        <span className="glyphicon glyphicon-lamp"></span>
                    </div>
                    <div className="panel-body">
                        <ol>
                            <li className="list-group-item list-group-item-success">
                                <img className="img-circle img-fluid" src="<?php echo $vars['dataanalysis']; ?>" alt="Data Anaysis"/>
                                <a href="amino" target="_blank">
                                    <p className="sectionTitle">
                                        <a href="amino" target="_blank" data-toggle="tooltip" data-placement="right"
                                            title="Click for Full Page App!">Amino Acid Code Sequence Analyzer</a>
                                    </p>
                                </a>
                                <object data="amino" height="200" width="300"></object>
                                <p>This program gives statistics for all combinations of 
                                amino acid sequences within a protein. The protein sequence is 
                                parsed by regex techniques from a text file, into a MySQL database. 
                                The first and last amino acid is chosen in the GUI, as well as, 
                                the desired statistical output. The database accessed by JavaScript-AJAX to PHP-MySQL 
                                on the server side which returns the statistics.<br/>The Code for PHP-based apps is
                                here: <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application"
                                    target="_blank">PHP Code</a>
                                </p>
                            </li>
                            <li className="list-group-item list-group-item-warning">
                                <a href="orominer1" target="_blank">
                                    <p  className="sectionTitle" >
                                        <a href="orominer1" target="_blank"  data-toggle="tooltip" data-placement="right"
                                            title="Click for Full Page App!">Human Organ System Analyzer 1</a>	
                                    </p>
                                </a>
                                <object data="orominer1" height="200" width="300"></object>
                                <p>The Orominer program shows a hierarchical organization of the human body constitution. 
                                Its top level is Organ Systems.  It uses JavaScript, JQuery for event synchronization between 
                                hierarchical display and graphic display, as well as, dynamic generation of SVG graphical elements 
                                based on DOM HTML elements.  MySQL Database information is converted into XML format using PHP 
                                for up front access by the code for generation of Hierachical Display. Unfortunately ONLY THE 
                                First 3 NODES Of DATA was developed at Project Completion.<br/>The Code for PHP-based apps is
                                here: <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application"
                                    target="_blank">PHP Code</a>
                                </p>
                            </li>
                            <li className="list-group-item list-group-item-danger">
                                <a href="orominer2" target="_blank">
                                    <p  className="sectionTitle" >	
                                        <a href="orominer2" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Human Organ System Analyzer 2</a>	
                                    </p>
                                </a>
                                <object data="orominer2" height="200" width="300"></object>
                                <p>This orominer program contains Histological Data within the Hierarchical Organization of Human Body 
                                    makeup. Histological Data is information about Human Organs and their tissues and cells. This 
                                    application uses JavaScript Objects to store active data requests from which graphics is generated.
                                    <br/>The Code for PHP-based apps is here: 
                                        <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application"	target="_blank">PHP Code</a>
                                </p>
                            </li>
                            <li className="list-group-item">
                                <img className="img-circle img-fluid" src="<?php echo $vars['othellogameimage']; ?>" alt="Game Coding"/>
                                <a href="othello" target="_blank">
                                    <p  className="sectionTitle" >	
                                        <a href="othello" target="_blank" data-toggle="tooltip" data-placement="right"
                                            title="Click for Full Page App!">Play Othello Game thru AJAX</a>
                                    </p>
                                </a>
                                <object data="othello" height="200" width="300"></object>
                                <p>Play the Othello Game using AJAX technology which will eliminate Page Reloads.
                                <br/>The Code for PHP-based app is here: 
                                        <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">Othello Game Code</a>
                                </p>
                            </li>
                        
                        </ol>
                    
                    </div>
                </div>
                
                <div id="lampCovr" className="container-fluid covr">
                    <div className="row justify-content-center cvrimg align-items-center">
                        <span className="glyphicon glyphicon-lamp">
                            <i className="lightbulb outline icon"></i>
                        </span>
                    </div>
                    <div className="row cvrtitle justify-content-center align-items-center">
                        <p>LAMP Technologies</p>
                    </div>
                    <div className="row cvrbody justify-content-center align-items-center">							
                        <p className="text-center">PHP/MySQL is used on the back-end for these apps. Regex is used to parse text files into a database.  
                        I programmatically converted flat non-relational tables into a relational-XMLfile for app data.  PHP/SQL is
                        used to query database and send tabular results to front-end.  Javascript/JQuery is used for dynamic DOM manipulation
                        and SVG graphic element generation. AJAX is also used to update and process game-board data, as well as
                        load XML data files.  Click on this Panel to see apps.</p>
                    </div>
                </div>
            </div> {/* End of Lamp Panel */}
                
            
                
            {/* Mobile Panel */}    
            <div id="mobile" className="container-fluid">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span>Mobile Portfolio</span>
                        <span className="glyphicon glyphicon-phone"></span>
                    </div>
                    <div className="panel-body">
                        <ol>
                            <li className="list-group-item list-group-item-success">
                                <img className="img-circle img-fluid" src="<?php echo $vars['mobiledevelopmentimage']; ?>" alt="Mobile Development"/>
                                <a href="mobile" target="_blank">
                                    <p  className="sectionTitle" >
                                        <a href="mobile#" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">JQuery Mobile Web Portfolio</a>
                                    </p>
                                </a>
                                <object data="mobile" height="200" width="300"></object>
                                <p>Link to a Mobile version of My work portfolio. I developed it using JQuery Mobile
                                and it should run on Android devices.
                                </p>
                            </li>
                        </ol>
                    </div>
                </div>
                
                <div id="mobileCovr" className="container-fluid covr">
                    <div className="row justify-content-center cvrimg align-items-center">
                        <span>
                            <i className="phone icon"></i>								
                        </span>
                    </div>
                    <div className="row cvrtitle justify-content-center align-items-center">
                        <p>Mobile Portfolio</p>
                    </div>
                    <div className="row cvrbody justify-content-center align-items-center">							
                        <p className="text-center">Beneath is a JQuery Mobile version of my portfolio that is mobile-device-responsive</p>
                    </div>
                </div>
            </div>  {/* End of Mobile Panel */}
				  
			{/*Frameworks Panel */}	  
            <div id="frameworks" className="container-fluid">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span>Frameworks</span>
                        <span className="glyphicon glyphicon-tree-conifer"></span>
                    </div>
                    <div className="panel-body">
                        <ol>
                            {/*<li className="list-group-item list-group-item-warning">
                                <a href="apitest" target="_blank">
                                    <p  className="sectionTitle">
                                        <a href="apitest" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Vue Javascript App</a>
                                    </p>
                                </a>
                                <object data="apitest" height="200" width="300"></object>
                                <p>A Vue JS based app that accesses an API to create a Dynamic List converted from a static HMTL page.  Added Paging Function and Select Page Size.<br>GitHub link
                                to Code is here <a href="https://github.com/Rsypertjr/vueapp/tree/vueapp" target="_blank">Vue App Code</a>
                                </p>
                            </li> */}
                            {/*<!li className="list-group-item list-group-item-warning">
                                <a href="expressApp1" target="_blank">
                                    <p  className="sectionTitle">
                                        <a href="http://206.189.211.36/" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Express/Node Javascript App</a>
                                    </p>
                                </a>
                                <object data="http://206.189.211.36/" height="200" width="300"></object>
                                <p>A Simple App based on a Digital Ocean droplet with Ubuntu 16 OS and nginx server installed.<br/>Express.js/Node.js application framework is used and it also
                                utilizes Pug templating, Bootstrap, Mongo/Mongoose document-based database, Nodemon, Pm2, NPM, and other technologies.<br/>
                                Here is the code: <a href="https://github.com/Rsypertjr/expressnode" target="_blank">Express/Node Code</a>
                                </p>
                            </li>*/}
                            {/*<li className="list-group-item list-group-item-danger">
                                <a href="laravelApp2" target="_blank">
                                    <p  className="sectionTitle">
                                        <a href="laravelApp2" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Simple Laravel App</a>
                                    </p>
                                </a>
                                <object data="laravelApp2" height="200" width="300"></object>
                                <p>Originally developed using Homestead development environment which utilizes Vagrant VM Linux Server, and deployed to Heroku server.<br>
                                Here is the code: <a href="https://bitbucket.org/Rsypertjr/laravel-test/src/master/" target="_blank">Laravel Code</a>
                                </p>
                            </li>
                            <li className="list-group-item list-group-item-info">
                                <a href="laravelApp3" target="_blank">
                                    <p  className="sectionTitle">
                                        <a href="laravelApp3" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Another Laravel App</a>
                                    </p>
                                </a>
                                <object data="laravelApp3" height="200" width="300"></object>
                                <p>Developed using Laravel Homestead Environment for generating Homeschool grade transcripts for my kids.<br>
                                Here is the code: <a href="https://github.com/Rsypertjr/transcriptor" target="_blank">Laravel Code</a>
                                </p>
                            </li> */}
                            <li className="list-group-item list-group-item-success">
                                <a href="reactTestApp" target="_blank">
                                    <p  className="sectionTitle">
                                        <a href="https://hackerreact.rsypertjr.net" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">HackerRank React Test App</a>
                                    </p>
                                </a>
                                <object data="https://hackerreact.rsypertjr.net" height="200" width="300"></object>
                                <p>I was given a download during a Hacker Rank test the included the components, but needed all the logical and data linkage between them to operate.  I had the download, 
                                    so I finished after the test.<br/>
                                    Link to this code is: <a href="https://github.com/Rsypertjr/react-product-cart.git" target="_blank">Hacker Rank React Test App</a>
                                </p>
                            </li>
                            <li className="list-group-item list-group-item-success">
                                <a href="https://angularvotes.rsypertjr.net" target="_blank">
                                    <p className="sectionTitle">
                                        <a href="https://angularvotes.rsypertjr.net" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Angular version of Vote Parser</a>
                                    </p>
                                </a>
                                <object type="text/html" data="https://angularvotes.rsypertjr.net" height="200" width="300"></object>
                                <p>Angular used with Bootstrap, JQuery Datatable, JQuery, Node.js, NPM.  Angular utilizes Components, Services, and Routing.<br/>
                                    Here is the code: <a href="https://github.com/Rsypertjr/AngularVoteParser/tree/voteParser" target="_blank">Angular Code</a>
                                    <br/>This same app has a Docker implementation that uses Docker Engine and contains Dockerfile and Docker-compose<br/> 
                                    implementations of development and production versions. Karma and Protractor unit testing of code is included.<br/> 
                                    Link to this code is: <a href="https://github.com/Rsypertjr/dockerVoteParser/tree/dockerVoteParser" target="_blank">Docker Angular Code</a>
                                </p> 
                                
                            </li>
                            <li className="list-group-item">
                                <a href="tictactoe" target="_blank">
                                    <p  className="sectionTitle">
                                        <a href="tictactoe" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">React Javascript Tic-Tac-Toe</a>
                                    </p>
                                </a>
                                <object data="tictactoe" height="200" width="300"></object>
                                <p>React Javascript Tic Tac Toe app with CSS animations for victory celebration.<br/>
                                Here is the code: <a href="https://github.com/Rsypertjr/fuelCMS/blob/newfuel/fuel/application/views/tictactoe.php" target="_blank">React Javascript Code</a>
                                </p>
                            </li> 							
                            <li className="list-group-item list-group-item-success">
                                <a href="https://laravelvotes.rsypertjr.com/votes-table" target="_blank">
                                    <p  className="sectionTitle">
                                        <a href="https://laravelvotes.rsypertjr.net/votes-table" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Laravel(Mix) w/React & Chart.js & Bootstrap.js Vote Parser</a>
                                    </p>
                                </a>
                                <object data="https://laravelvotes.rsypertjr.net/votes-table" height="200" width="300"></object>
                                <p>The app uses Laravel (Mix) with React.js (including React Router).  Composer is used to 
                                manage PHP dependencies, and NPM is used to managed the Node-based React.js dependencies. 
                                Laravel routing is used to serve main page and React routing for fast rendering of tables 
                                and charts. Table and paging is a custom code and charts utilize Chart.js. Here is code link: 
                                <a href="https://github.com/Rsypertjr/Laravel-React-Chartjs-Votes-Parser/tree/latest2" target="_blank">Laravel(Mix)/React/Chart.js/Bootstrap.js Vote Parser Code</a>
                                </p>
                            </li>
                            <li className="list-group-item list-group-item-success">
                                <a href="https://vuevotes.rsypertjr.net" target="_blank">
                                    <p  className="sectionTitle">
                                        <a href="https://vuevotes.rsypertjr.net" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">Vue 3 Composition API & Chart.js & Bootstrap.js Vote Parser</a>
                                    </p>
                                </a>
                                <object data="https://vuevotes.rsypertjr.net" height="200" width="300"></object>
                                <p>The app uses Vue 3 Composition API. NPM is used to managed the Node-based Vue 3 dependencies. 
                                Vue 3 Composition API allows for function-based components which is inspired by React w/Hooks.  Here is code link: 
                                <a href="https://github.com/Rsypertjr/Vue3-Chartjs-Bootstrap.git" target="_blank">Vue3(Composition API)/Chart.js/Bootstrap.js Vote Parser Code</a>
                                </p>
                            </li>
                            <li className="list-group-item list-group-item-success">
                                <a href="https://carinfo.rsypertjr.net" target="_blank">
                                    <p  className="sectionTitle">
                                            <a href="https://carinfo.rsypertjr.net" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click for Full Page App!">React-Bootstrap with Express ATLAS Cloud MongoDb Backend</a>
                                    </p>
                                </a>
                                <object data="https://carinfo.rsypertjr.net" height="200" width="300"></object>
                                <p>A MERN Stack application that uses Google Programmable API to make customized searches for Car Information within React-Bootstrap. 
                                <a href="https://github.com/Rsypertjr/react_carinfo_server" target="_blank">Server Code</a><a href="https://github.com/Rsypertjr/react_carinfo_client" target="_blank">Client Code</a>
                                </p>
                            </li>
                        </ol>
                    </div>
                </div> 
                
                <div id="frameworksCovr" className="container-fluid covr">
                    <div className="row justify-content-center cvrimg align-items-center">
                        <span>
                            <i className="tree icon"></i>
                        </span>
                    </div>
                    <div className="row cvrtitle justify-content-center align-items-center">
                        <p>Frameworks</p>
                    </div>
                    <div className="row cvrbody justify-content-center align-items-center">
                        <p className="text-center">Programming I've done using:<br/>Node.js based technologies of Vue, Angular, and React,<br/>Some utilization of the Laravel MVC Framework and Node Express.
                        Docker and Docker Compose Technologies used withth NPM and Webpack dependency management.</p>
                    </div>
                </div>
            </div> {/* End of Frameworks Panel */}
					

            {/* Manuals Panel */}
            <div id="manuals" className="container-fluid">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <span>Production Maintenance Manuals</span>
                        <span className="glyphicon glyphicon-edit"></span>
                    </div>
                    <div className="panel-body">
                        <ol>
                            <li className="list-group-item list-group-item-success">
                                <img className="img-circle img-fluid" src="<?php echo $vars['technicalwritingimage']; ?>" alt="Technical Writing"/>
                                <a href="graingerABCDE" target="_blank">
                                    <p  className="sectionTitle" >
                                        <a href="graingerABCDE" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click to See it Full Page!">Grainger ABCDE Series B</a>
                                    </p>
                                </a>
                                <object data="graingerABCDE" height="200" width="300"></object>
                                <p>This is a Maintenance and Product Information Manual tailored for a customers implementation 
                                of a Motor Efficiency Controller (MEC). It is a new generation product manual. I wrote it
                                using Adobe InDesign according to the customers style rules
                                </p>
                            </li>
                            <li className="list-group-item list-group-item-warning">
                                <a href="graingerCDE" target="_blank">
                                    <p  className="sectionTitle" >
                                        <a href="graingerCDE" target="_blank" data-toggle="tooltip" data-placement="right"  title="Click to See it Full Page!">Grainger CDE</a>
                                    </p>
                                </a>
                                <object data="graingerCDE" height="200" width="300"></object>
                                <p>This is a Maintenance and Product Information Manual tailored for a customers implementation of a 
                                Motor Efficiency Controller (MEC). It is a new generation product manual. I wrote it in Adobe InDesign 
                                according to the customer's style rules.
                                </p>
                            </li>
                            <li className="list-group-item list-group-item-danger">
                                <a href="mecPManual" target="_blank">
                                    <p className="sectionTitle"> 
                                        <a href="mecPManual" target="_blank"  data-toggle="tooltip"  data-placement="right" title="Click to it Full Page!">MEC Product Manual VT 1.6</a>
                                    </p>
                                </a>
                                <object data="mecPManual" height="200" width="300"></object>
                                <p>This is a Product Manual for a Motor Efficiency Controller (MEC). It is a new generation product manual. 
                                I wrote it in Adobe InDesign according to the customer's style rules.
                                </p>
                            </li>
                        </ol>
                    </div> 
                
                    <div id="manualsCovr" className="container-fluid covr">							
                        <div className="row justify-content-center cvrimg align-items-center">
                            <span>
                                <i className="edit icon"></i>
                            </span>
                        </div>
                        <div className="row cvrtitle justify-content-center align-items-center">
                            <p>Production Manuals</p>
                        </div>
                        <div className="row cvrbody justify-content-center align-items-center">							
                            <p className="text-center">Operation and Maintenance Manuals for an Electro-Mechanical Application</p>
                        </div>
                    </div>
                </div>  {/* End of Manual Panel */}
            </div>
                
					
                {/* Specifications Panel */}
                <div id="specifications" className="container-fluid">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <span>Technical Specification Documents</span>
                            <span className="glyphicon glyphicon-edit"></span>
                        </div>
                        <div className="panel-body">
                            <ol>
                                <li className="list-group-item list-group-item-success">
                                    <img className="img-circle img-fluid" src="<?php echo $vars['engProcessSpec']; ?>" alt="Technical Writing"/>
                                    <a href="whitePaper" target="_blank">
                                        <p  className="sectionTitle" >
                                            <a href="whitePaper" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click to See it Full Page!">White Paper</a>
                                        </p>
                                    </a>
                                    <object data="whitePaper" height="200" width="300"></object>
                                    <p>This is a technical specification called a White Paper which explains the technology behind 
                                        a companies product. In this case an Electrical Motor Energy Efficiency Device.
                                        </p>
                                </li>
                                <li className="list-group-item list-group-item-warning">
                                    <a href="engSpec" target="_blank">
                                        <p  className="sectionTitle">
                                            <a href="engSpec" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click to See it Full Page!">Engineering Specification</a>
                                        </p>
                                    </a>
                                    <object data="engSpec" height="200" width="300"></object>
                                    <p>This is a technical specification for the Clark County Land Development Approval process. 
                                    I authored it as an Environmental Health Engineer for Southern Nevada Health District.
                                    </p>
                                </li>
                            </ol>								
                        </div>
                    </div>
                </div>
                
                <div id="specificationsCovr" className="container-fluid covr">
                    <div className="row justify-content-center cvrimg align-items-center">
                        <span>
                            <i className="edit icon"></i>
                        </span>
                    </div>
                    <div className="row cvrtitle justify-content-center align-items-center">
                        <p>Technical Specifications</p>
                    </div>
                    <div className="row cvrbody justify-content-center align-items-center">							
                        <p className="text-center">Technology Explanation (White Paper) and Business Process Description</p>
                    </div>
                </div> {/* End of Specifications Panel */}
			  
                {/* Resume Panel */}
                <div id="resume" className="container-fluid">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <span>Resume</span>	
                                <span className="glyphicon glyphicon-book"></span>
                            </div>
                            <div className="panel-body">
                                <li className="list-group-item list-group-item-success">
                                    <img className="img-circle img-fluid" src="<?php echo $vars['jobdone']; ?>" alt="Resume"/>
                                    <a href="dynResume" target="_blank">
                                        <p  className="sectionTitle" >
                                            <a href="dynResume" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click to See It Full Page!">Dynamic HTML Resume w/Downloads</a>
                                        </p>
                                    </a>
                                    <object data="dynResume" height="200" width="300"></object>
                                    <p>Here is a link to my resume which uses dynamic CSS formatting.</p>
                                </li>
                            </div>	
                        </div>
                        
                        <div id="resumeCovr" className="container-fluid covr">
                            <div className="row justify-content-center cvrimg align-items-center">
                                <span>
                                    <i className="book icon"></i>
                                </span>							
                            </div>
                            <div className="row cvrtitle justify-content-center align-items-center">
                                <p>Resume</p>
                            </div>
                            <div className="row cvrbody justify-content-center align-items-center">
                                <p className="text-center">A Dynamic HTML and CSS version of my Resume.  Also a Download Link for a PDF version</p>
                            </div>
                        </div>
                    </div> {/* End of Resume Panel */}
		
                    {/* Living Panel */}
                    <div id="living" className="container-fluid">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <span>Living In Las Vegas</span>	
                                <span className="glyphicon glyphicon-camera"></span>
                            </div> 
                            <div className="panel-body">
                                <li className="list-group-item list-group-item-success">
                                    <a href="inVegas" target="_blank">
                                        <p className="sectionTitle">
                                            <a href="inVegas" target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click to See It Full Page!">Having Vegas Family Fun</a>
                                        </p>
                                    </a>
                                    <object data="inVegas" height="200" width="300"></object>
                                    <p>See a slide show and facts about Family Fun In Vegas.</p>
                                </li>
                            </div>
                        </div>
                        
                        <div id="livingCovr" className="container-fluid covr">
                            <div className="row justify-content-center cvrimg align-items-center">
                                <span>
                                    <i className="camera retro icon"></i>
                                </span>
                            </div>
                            <div className="row cvrtitle justify-content-center align-items-center">
                                <p>Living In Vegas</p>
                            </div>
                            <div className="row cvrbody justify-content-center align-items-center">
                                <p className="text-center">How to Have Family Fun in and around Vegas!&nbsp;&nbsp;Although a little dated.</p>
                            </div>
                        </div>
                    </div> {/* End of Living Panel */}			 
            
                    {/* Front Panel */}
                    <div id="front" className="container-fluid">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <span>Non Bootstrap Portfolio</span>	
                                <span className="glyphicon glyphicon-lamp"></span>
                            </div> 
                            <div className="panel-body">
                                <li className="list-group-item list-group-item-success">
                                    <img className="img-rounded img-fluid" src="<?php echo $vars['lampTechs']; ?>" alt="Lamp Technologies"/>
                                    <a href="frontCMS" target="_blank">
                                        <p className="sectionTitle">
                                            <a href="frontCMS"  target="_blank"  data-toggle="tooltip" data-placement="right"  title="Click to See It Full Page!">Non-Bootstrap Work Portfolio</a>
                                        </p>
                                    </a>
                                    <object data="frontCMS" height="200" width="300"></object>
                                    <p>My old work portfolio using LAMP technologies including  CodeIgniter MVC Framework,FUEL-CMS
                                    (a CodeIgniter-based Content Management System), PHP, MySQL, HTML, JavaScript,
                                    JQuery, JQuery UI, JQuery Mobile, Angular JS, ReactJS (ngrx) CSS, CSS3, SVG, AJAX, XML,
                                    JSON, Regex, DOM, Notepad++, Cloud9 IDE, GIT, Heroku Server, Laravel MVC, GitHub API,
                                    Facebook API, Active Campaign API, Bootstrap, WordPress, Ruby On Rails,
                                    Google Developer Tools, Homestead Dev, Vagrant VMs, Adobe InDesign,
                                    GIMP (like Photoshop), and other technologies.
                                    </p>
                                </li>
                            </div>
                    </div>
        
                    <div id="frontCovr" className="container-fluid covr">
                        <div className="row justify-content-center cvrimg align-items-center">
                            <span className="glyphicon glyphicon-lamp">
                                <i className="lightbulb icon"></i>
                            </span>
                        </div>
                        <div className="row cvrtitle justify-content-center align-items-center">
                            <p>Non-Bootstrap Portfolio</p>
                        </div>
                        <div className="row cvrbody justify-content-center align-items-center">
                            <p className="text-center">CodeIgniter,Fuel CMS, and Lamp technologies are used as the MVC framework. They are based on PHP/LAMP technologies. 
                            Includes lot of built-in routing, modular storage of code in a database, and Active Object database access.  
                            On the front-end, CSS 2-D and 3-D tranformations are used to produce animations.
                            </p>
                        </div>
                    </div> {/* End of Front Panel */}

			</div>  
			
			{/* Footer Section */}
            <div id="footer" className="container-fluid">
                <div className="row">
                    <div className="col-sm-2" style={{color:"black"}}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#collapse1">Software Development</a>
                            </h4>
                            </div>
                            <div id="collapse1" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p><a href="amino" target="_blank" >Amino Acid Sequence Analyzer</a></p>
                                    <p><a href="orominer1" target="_blank" >Human Organ System Analyzer 1</a></p>
                                    <p><a href="orominer2" target="_blank" >Human Organ System Analyzer 2</a></p>													
                                    <p><a href="mobile" target="_blank" >Mobile Web Portfopo</a></p>	
                                    <p><a href="gitRepo" target="_blank" >GIT Repository</a></p>
                                    <p><a href="othello" target="_blank" >Play Othello Game</a></p>
                                    <p><a href="laravelApp2" target="_blank" >Sample Laravel 1</a></p>
                                    <p><a href="laravelApp3" target="_blank" >Sample Laravel 2</a></p>
                                    <p><a href="angularApp" target="_blank" >Angular JavaScript</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a data-toggle="collapse" href="#collapse2">Technical Writing</a>
                                </h4>
                            </div>
                            <div id="collapse2" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p><a href="graingerABCDE" target="_blank" >Grainger ABCDE Series B Product Manual</a></p>
                                    <p><a href="graingerCDE" target="_blank" >Grainger CDE Product Manual</a></p>
                                    <p><a href="mecPManual" target="_blank" >MEC Product Manual VT 1.6</a></p>	
                                    <p><a href="whitePaper" target="_blank" >Technology White Paper</a></p>
                                    <p><a href="engSpec" target="_blank" >Engineering Specification</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a data-toggle="collapse" href="#collapse3">Resumes</a>
                                </h4>  
                            </div>
                            <div id="collapse3" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p><a href="pdfResume" target="_blank" >PDF Resume</a></p>
                                    <p><a href="dynResume" target="_blank" >Dynamic Resume</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                        <div className="col-sm-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" href="#collapse4">Contact</a>
                                    </h4>  
                                </div>
                                <div id="collapse4" className="panel-collapse collapse">
                                    <div className="panel-body">
                                        <p><a href="emailno" target="_blank" >Email</a></p>
                                        <p><a href="linkedIn" target="_blank" >Linked In Profile</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="col-sm-1"></div>
			    </div>
		    </div>  {/* End of Footer Section */}

           {/*<script src="<?php echo $vars['jsBootPortfolio']; ?>"></script>
            <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

            <script
            src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
            crossorigin></script>

            <script
            src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossorigin></script>

            <script>var Alert = ReactBootstrap.Alert;</script>*/}
                    
        </>
               
    );


};