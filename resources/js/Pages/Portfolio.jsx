import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import TopCarousel from './TopCarousel';
import MidCarousel from './MidCarousel';
import TopNav from './TopNav';
import $ from 'jquery';

import technologyideas from '../../images/technologyideas.jpg';
import myFace from '../../images/myFace.jpg';
import technicalwritingimage from '../../images/technicalwritingimage.jpg';
import lampTechs from '../../images/lampTechs.jpg';
import jobdone from '../../images/jobdone.jpg';
import engProcessSpec from '../../images/engProcessSpec.jpg';


export default function Portfolio(props){  
    const [putLampCover, setPutLampCover] = useState(false);


    const hideLampCover = (e) => {
        $('#lampCover').css('visibility','hidden');
    };

    const hideMobileCover = (e) => {
        $('#mobileCover').css('visibility','hidden');
    };

    const hideAboutCover = (e) => {
        $('#aboutCover').css('visibility','hidden');
    };


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
            <Container id="home" className="panel-container"  fluid>
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
            {/* End of Home Panel */}
				  
		
            {/* About Panel */}
            <Container id="about" className="panel-container" onClick={hideAboutCover} fluid>
                <div>
                    <Card>
                        <img src={technologyideas} height="20%" width="20%" style={{margin:'1em 0 0 40%'}} alt="Technology Ideas"/>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/webTech" data-toggle="tooltip" data-placement="right" title="Click to See Technologies!">Web Technologies Used</Card.Link>
                            <Card.Text><p>This is a page that gives explanation of the programming technologies used on this site.</p></Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/emailno" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">Making Contact</Card.Link>
                            <Card.Text>You can email me if you like.&nbsp;&nbsp;Also more contact info is given in my resume.</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <img variant="top" src={myFace} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}}  alt="My Face"/>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/emailno" data-toggle="tooltip" data-placement="right" title="Click to See My Profile!">Personal Profile</Card.Link>
                            <Card.Text><p>You can view my Linked-In Personal Profile for more info on me.</p></Card.Text>
                        </Card.Body>
                    </Card>
                </div>               
                <div>
                    <Container id="aboutCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>About</h2></Card.Title>
                                <Card.Text><i className="bi bi-wrench"></i></Card.Text>
                                <Card.Text>Beneath there is a page about technologies that I've used, and an email contact page.  Also you can see more about me on my LinkedIn profile page.  
                                    Click this cover panel to see.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>           
                </div>
                   
            </Container>
            {/* End of About Panel */}


            {/* Lamp Panel */}
            <Container id="lamp" className="panel-container" onClick={hideLampCover} fluid>
                <div >
                    <Card  >
                        <Card.Img variant="top" src="dataanalysis" alt="Data Analysis"/>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/amino" data-toggle="tooltip" data-placement="right" title="Click for Full Page App!">Amino Acid Code Sequence Analyzer</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/amino" height="200" width="300"></object></Card.Text>
                            <Card.Text><p>This program gives statistics for all combinations of amino acid sequences within a protein. The protein sequence is parsed by regex 
                                techniques from a text file, into a MySQL database. The first and last amino acid is chosen in the GUI, as well as, the desired statistical output. The 
                                database accessed by JavaScript-AJAX to PHP-MySQL on the server side which returns the statistics.<br/>The Code for PHP-based apps is here: 
                                <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank"/>PHP Code</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card >
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/orominer1" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">Human Organ System Analyzer 1</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/orominer1" height="200" width="300"></object></Card.Text>
                            <Card.Text> <p>The Orominer program shows a hierarchical organization of the human body constitution. 
                                    Its top level is Organ Systems.  It uses JavaScript, JQuery for event synchronization between 
                                    hierarchical display and graphic display, as well as, dynamic generation of SVG graphical elements 
                                    based on DOM HTML elements.  MySQL Database information is converted into XML format using PHP 
                                    for up front access by the code for generation of Hierachical Display. Unfortunately ONLY THE 
                                    First 3 NODES Of DATA was developed at Project Completion.<br/>The Code for PHP-based apps is
                                    here: <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application"
                                        target="_blank">PHP Code</a>
                                    </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card >
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/orominer2" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">Human Organ System Analyzer 2</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/orominer2" height="200" width="300"></object></Card.Text>
                            <Card.Text> <p>This orominer program contains Histological Data within the Hierarchical Organization of Human Body 
                                        makeup. Histological Data is information about Human Organs and their tissues and cells. This 
                                        application uses JavaScript Objects to store active data requests from which graphics is generated.
                                        <br/>The Code for PHP-based apps is here: 
                                        <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application"	target="_blank">PHP Code</a>
                                    </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card >
                        <Card.Img variant="top" src="othellogameimage" alt="Othello Game Image"/>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/othello" data-toggle="tooltip" data-placement="right" title="Click to See My Profile!">Play Othello Game thru AJAX</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/othello" height="200" width="300"></object></Card.Text>
                            <Card.Text><p>Play the Othello Game using AJAX technology which will eliminate Page Reloads.<br/>The Code for PHP-based app is here: 
                                    <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">Othello Game Code</a>
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </div>
               

                <div id="lampCover" className="coverPanel d-flex align-items-center"  fluid>
                    <Card>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title><h2>LAMP Technologies</h2></Card.Title>
                            <Card.Text><i class="bi bi-lightbulb"></i></Card.Text>
                            <Card.Text>
                                <p className="text-center">PHP/MySQL is used on the back-end for these apps. Regex is used to parse text files into a database.  
                                    I programmatically converted flat non-relational tables into a relational-XMLfile for app data.  PHP/SQL is
                                    used to query database and send tabular results to front-end.  Javascript/JQuery is used for dynamic DOM manipulation
                                    and SVG graphic element generation. AJAX is also used to update and process game-board data, as well as
                                    load XML data files.  Click on this Panel to see apps.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>               
            </Container>
            {/* End of Lamp Panel */}
            
          
            {/* Mobile Panel */}
            <Container id="mobile" className="panel-container" onClick={hideMobileCover} fluid>
                <div>
                    <Card >
                        <Card.Img variant="top" src="mobiledevelopmentimage"></Card.Img>
                        <Card.Body>
                            <Card.Body>
                                <Card.Link href="https://rsypertjr.net/mobile" data-toggle="tooltip" data-placement="right" title="Click for Sites GIT Repo!">Jquery Mobile Web Development</Card.Link>
                                <Card.Text><object data="https://rsypertjr.net/mobile" height="200" width="300"></object></Card.Text>
                                <Card.Text><p>Link to a Mobile version of My work portfolio. I developed it using JQuery Mobile
                                    and it should run on Android devices.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </div>
              

                <div id="mobileCover" className="coverPanel d-flex align-items-center" fluid>
                    <Card>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title><h2>Mobile Portfolio</h2></Card.Title>
                            <Card.Body>
                                <Card.Text><i className="bi bi-phone"></i></Card.Text>
                                <Card.Text><p>Beneath is a JQuery Mobile version of my portfolio that is mobile-device-responsive.</p></Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </div>               
            </Container>
            {/* End of Mobile Panel */}				  


            {/* Frameworks Panel */}
            <Container id="frameworks" className="panel-container" fluid>
               
                <Card>
                    <Card.Body>
                        <Card.Link href="https://rsypertjr.net/tictactoe" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">React Javascript Tic-Tac-Toe</Card.Link>
                        <Card.Text><object data="https://rsypertjr.net/tictactoe" height="200" width="300"></object></Card.Text>
                        <Card.Text>
                            <p>React Javascript Tic Tac Toe app with CSS animations for victory celebration.<br/>
                                Here is the code: <a href="https://github.com/Rsypertjr/fuelCMS/blob/newfuel/fuel/application/views/tictactoe.php" target="_blank">React Javascript Code</a>
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Link href="https://laravelvotes.rsypertjr.net/votes-table" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">Laravel(Mix) w/React & Chart.js & Bootstrap.js Vote Parser</Card.Link>
                        <Card.Text><object data="https://laravelvotes.rsypertjr.net/votes-table" height="200" width="300"></object></Card.Text>
                        <Card.Text> <p>This orominer program contains Histological Data within the Hierarchical Organization of Human Body 
                                    makeup. Histological Data is information about Human Organs and their tissues and cells. This 
                                    application uses JavaScript Objects to store active data requests from which graphics is generated.
                                    <br/>The Code for PHP-based apps is here: 
                                    <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application"	target="_blank">PHP Code</a>
                                </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Link href="https://vuevotes.rsypertjr.net" data-toggle="tooltip" data-placement="right" title="Click to See My Profile!">Vue 3 Composition API & Chart.js & Bootstrap.js Vote Parser</Card.Link>
                        <Card.Text><object data="https://vuevotes.rsypertjr.net"></object></Card.Text>
                        <Card.Text>
                            <p>The app uses Vue 3 Composition API. NPM is used to managed the Node-based Vue 3 dependencies. 
                                Vue 3 Composition API allows for function-based components which is inspired by React w/Hooks.  Here is code link: 
                                <a href="https://github.com/Rsypertjr/Vue3-Chartjs-Bootstrap.git" target="_blank">Vue3(Composition API)/Chart.js/Bootstrap.js Vote Parser Code</a>
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Link href="https://wbcarinfo.rsypertjr.net" data-toggle="tooltip" data-placement="right" title="Click to See My Profile!">React-Bootstrap with Express ATLAS Cloud MongoDb Backend</Card.Link>
                        <Card.Text><object data="https://wbcarinfo.rsypertjr.net" height="200" width="300"></object></Card.Text>
                        <Card.Text>
                        <p className="text-center">Programming I've done using:<br/>Node.js based technologies of Vue, Angular, and React,<br/>Some utilization of the Laravel MVC Framework and Node Express.
                            Docker and Docker Compose Technologies used withth NPM and Webpack dependency management.</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Link href="https://preselections.rsypertjr.net" data-toggle="tooltip" data-placement="right" title="Click to See My Profile!">Docker based Laravel Vite, React, Bootstrap 5, Chart.js, MongoDb App</Card.Link>
                        <Card.Text><object data="https://preselections.rsypertjr.net" height="200" width="300"></object></Card.Text>
                        <Card.Text>
                        <p className="text-center">A Docker based app that uses Laravel/Bootstrap 5 with Vite management of React.js with a networked containers of: Nginx, PHP, Mariadb, Composer, Artisan, NPM, Redis, 
                            Phpmyadmin. Utilizes Laravel Api for a Cloud-based MongoDb backend. Client and Server Code
                        </p>
                        </Card.Text>
                    </Card.Body>
                </Card>


                <Container id="frameworksCovr" className="coverPanel" fluid>
                    <Card>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title>Frameworks</Card.Title>
                            <Card.Text>
                                <span>
                                    <i className="tree icon"></i>
                                </span>
                            </Card.Text>
                            <Card.Text>
                                <p className="text-center">Programming I've done using:<br/>Node.js based technologies of Vue, Angular, and React,<br/>Some utilization of the Laravel MVC Framework and Node Express.
                                Docker and Docker Compose Technologies used withth NPM and Webpack dependency management.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>               
            </Container>
            {/* End of Frameworks Panel */}
            

            {/* Manuals Panel */}
            <Container id="manuals" className="panel-container" fluid>
                <Card>
                    <Card.Img href={technicalwritingimage}/>
                    <Card.Body>
                        <Card.Link href="https://rsypertjr.net/graingerABCDE" data-toggle="tooltip" data-placement="right" title="Click for Full Page App!">Grainger ABCDE Series B</Card.Link>
                        <Card.Text><object type="text/html" data="https://rsypertjr.net/graingerABCDE" height="200" width="300"></object></Card.Text>
                        <Card.Text> 
                            <p>This is a Maintenance and Product Information Manual tailored for a customers implementation 
                                of a Motor Efficiency Controller (MEC). It is a new generation product manual. I wrote it
                                using Adobe InDesign according to the customers style rules
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Link href="https://rsypertjr.net/graingerCDE" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">Grainger CDE</Card.Link>
                        <Card.Text><object data="https://rsypertjr.net/graingerCDE" height="200" width="300"></object></Card.Text>
                        <Card.Text>
                            <p>This is a Maintenance and Product Information Manual tailored for a customers implementation of a 
                                Motor Efficiency Controller (MEC). It is a new generation product manual. I wrote it in Adobe InDesign 
                                according to the customer's style rules.
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Link href="https://rsypertjr.net/mecPManual" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">MEC Product Manual VT 1.6</Card.Link>
                        <Card.Text><object data="https://rsypertjr.net/mecPManual" height="200" width="300"></object></Card.Text>
                        <Card.Text> 
                            <p>This is a Product Manual for a Motor Efficiency Controller (MEC). It is a new generation product manual. 
                                I wrote it in Adobe InDesign according to the customer's style rules.
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
             
                <Container id="manualsCovr" className="coverPanel" fluid>
                    <Card>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title>Production Manuals</Card.Title>
                            <Card.Text>
                                <span>
                                    <i className="edit icon"></i>
                                </span>
                            </Card.Text>
                            <Card.Text>
                                <p className="text-center">Operation and Maintenance Manuals for an Electro-Mechanical Application</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>               
            </Container>
            {/* End of Manuals Panel */}
            
        
            {/* Specifications Panel */}
            <Container id="specifications" className="panel-container" fluid>
                <Card>
                    <img src={engProcessSpec} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Engineering Process Specification"/>   
                    <Card.Body>
                        <Card.Link href="https://rsypertjr.net/whitePaper" data-toggle="tooltip" data-placement="right" title="Click for Full Page App!">Technical Writing</Card.Link>
                        <Card.Text><object type="text/html" data="https://rsypertjr.net/whitePaper" height="200" width="300"></object></Card.Text>
                        <Card.Text> 
                            <p>This is a technical specification called a White Paper which explains the technology behind 
                                a companies product. In this case an Electrical Motor Energy Efficiency Device.
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Link href="https://rsypertjr.net/engSpec" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">Engineering Specification</Card.Link>
                        <Card.Text><object data="https://rsypertjr.net/engSpec" height="200" width="300"></object></Card.Text>
                        <Card.Text>
                            <p>This is a technical specification for the Clark County Land Development Approval process. 
                                I authored it as an Environmental Health Engineer for Southern Nevada Health District.
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>               
             
                <Container id="specificationsCovr" className="coverPanel" fluid>
                    <Card>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title>Technical Specifications</Card.Title>
                            <Card.Text>
                                <span>
                                    <i className="edit icon"></i>
                                </span>
                            </Card.Text>
                            <Card.Text>
                                <p className="text-center">Technology Explanation (White Paper) and Business Process Description</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>               
            </Container>
            {/* End of Specifications Panel */}		  
              
            {/* Resume Panel */}
            <Container id="resume" className="panel-container" fluid>
                <Card>
                    <img src={jobdone} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Job Done"/>
                    <Card.Body>
                        <Card.Link href="https://rsypertjr.net/dynResume" data-toggle="tooltip" data-placement="right" title="Click for Full Page App!">Dynamic HTML Resume w/Downloads</Card.Link>
                        <Card.Text><object type="text/html" data="https://rsypertjr.net/dynResume" height="200" width="300"></object></Card.Text>
                        <Card.Text> 
                            <p>Here is a link to my resume which uses dynamic CSS formatting.</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
             
                <Container id="resumeCovr" className="coverPanel" fluid>
                    <Card>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title>Resume</Card.Title>
                            <Card.Text>
                                <span>
                                    <i className="book icon"></i>
                                </span>
                            </Card.Text>
                            <Card.Text>
                                <p className="text-center">A Dynamic HTML and CSS version of my Resume.  Also a Download Link for a PDF version</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>               
            </Container>
            {/* End of Resume Panel */}


            {/* Living Panel */}
            <Container id="living" className="panel-container" fluid>
                <Card>                   
                    <Card.Body>
                        <Card.Link href="https://rsypertjr.net/inVegas" data-toggle="tooltip" data-placement="right" title="Click for Full Page App!">Having Vegas Family Fun</Card.Link>
                        <Card.Text><object type="text/html" data="https://rsypertjr.net/inVegas" height="200" width="300"></object></Card.Text>
                        <Card.Text> 
                            <p>See a slide show and facts about Family Fun In Vegas.</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
             
                <Container id="livingCovr" className="coverPanel" fluid>
                    <Card>
                        <Card.Body>
                            <Card.Title>Living In Vegas</Card.Title>
                            <Card.Text>
                                <span>
                                    <i className="camera retro icon"></i>
                                </span>
                            </Card.Text>
                            <Card.Text>
                                <p className="text-center">How to Have Family Fun in and around Vegas!&nbsp;&nbsp;Although a little dated.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>               
            </Container>
            {/* End of Living Panel */}

            {/* Front Panel */}
            <Container id="front" className="panel-container" fluid>
                <Card>
                    <img src={lampTechs} height="20%" width="20%" style={{margin:'1em 0 0 40%'}} alt="Fuel CMS"/>
                    <Card.Body>
                        <Card.Link href="https://rsypertjr.net/frontCMS" data-toggle="tooltip" data-placement="right" title="Click for Full Page App!">Non-Bootstrap Work Portfolio</Card.Link>
                        <Card.Text><object type="text/html" data="https://rsypertjr.net/frontCMS" height="200" width="300"></object></Card.Text>
                        <Card.Text> 
                            <p>My old work portfolio using LAMP technologies including  CodeIgniter MVC Framework,FUEL-CMS
                                (a CodeIgniter-based Content Management System), PHP, MySQL, HTML, JavaScript,
                                JQuery, JQuery UI, JQuery Mobile, Angular JS, ReactJS (ngrx) CSS, CSS3, SVG, AJAX, XML,
                                JSON, Regex, DOM, Notepad++, Cloud9 IDE, GIT, Heroku Server, Laravel MVC, GitHub API,
                                Facebook API, Active Campaign API, Bootstrap, WordPress, Ruby On Rails,
                                Google Developer Tools, Homestead Dev, Vagrant VMs, Adobe InDesign,
                                GIMP (like Photoshop), and other technologies.
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            
                <Container id="frontCovr" className="coverPanel" fluid>
                    <Card>
                        <Card.Body>
                            <Card.Title>Non-Bootstrap Portfolio</Card.Title>
                            <Card.Text>
                                <span>
                                    <i className="lightbulb icon"></i>
                                </span>
                            </Card.Text>
                            <Card.Text>
                            <p className="text-center">CodeIgniter,Fuel CMS, and Lamp technologies are used as the MVC framework. They are based on PHP/LAMP technologies. 
                                Includes lot of built-in routing, modular storage of code in a database, and Active Object database access.  
                                On the front-end, CSS 2-D and 3-D tranformations are used to produce animations.
                            </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>               
            </Container>
            {/* End of Front Panel */}


			{/* Footer Section */}
            <Container id="footer" fluid>
                <Row>     
                    <Col>              
                        <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Software Development
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="amino">Amino Acid Sequence Analyzer</Dropdown.Item>
                            <Dropdown.Item href="orominer1">Human Organ System Analyzer 1</Dropdown.Item>
                            <Dropdown.Item href="orominer2">Human Organ System Analyzer 2</Dropdown.Item>
                            <Dropdown.Item href="mobile">Mobile Web Portfolio</Dropdown.Item>
                            <Dropdown.Item href="gitRepo">GIT Repository</Dropdown.Item>
                            <Dropdown.Item href="othello">Play Othello Game</Dropdown.Item>
                            <Dropdown.Item href="laravelApp2">Sample Laravel 1</Dropdown.Item>
                            <Dropdown.Item href="laravelApp3">Sample Laravel 2</Dropdown.Item>
                            <Dropdown.Item href="angularApp">Angular Javascript</Dropdown.Item>
                        </Dropdown.Menu>

                        </Dropdown>
                    </Col>
                   
                    <Col>              
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Technical Writing
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="graingerABCDE">Grainger ABCDE Series B Product Manual</Dropdown.Item>
                                <Dropdown.Item href="graingerCDE">Grainger CDE Product Manual</Dropdown.Item>
                                <Dropdown.Item href="mecPManual">MEC Product Manual VT 1.6</Dropdown.Item>
                                <Dropdown.Item href="whitePaper">Technology White Paper</Dropdown.Item>
                                <Dropdown.Item href="engSpec">Engineering Specification</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>                   
                   
                    <Col>              
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Resumes
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="pdfResume">PDF Resume</Dropdown.Item>
                                <Dropdown.Item href="dynResume">Dynamic Resume</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                   
                    <Col>              
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Contact
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="emailno">Email</Dropdown.Item>
                                <Dropdown.Item href="linkedIn">LinkedIn Profile</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
			    </Row>
		    </Container>  {/* End of Footer Section */}

         

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