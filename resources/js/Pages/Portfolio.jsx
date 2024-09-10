import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger } from 'react-bootstrap';
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
import dataanalysis from '../../images/dataanalysis.jpg';
import websiteconstruction from '../../images/websiteconstruction.jpg';
import othellogameimage from '../../images/othellogameimage.jpg';
import mobiledevelopmentimage from '../../images/mobiledevelopmentimage.jpg';

export default function Portfolio(props){  
    const [putLampCover, setPutLampCover] = useState(false);

    const hideLampCover = (e) => {
        if($('#lampCover').css('visibility') == 'visible')
            $('#lampCover').css('visibility','hidden');
        else
            $('#lampCover').css('visibility','visible');
    };

    const hideMobileCover = (e) => {
        if($('#mobileCover').css('visibility') == 'visible')
            $('#mobileCover').css('visibility','hidden');
        else
            $('#mobileCover').css('visibility','visible');
    };

    const hideAboutCover = (e) => {
        if($('#aboutCover').css('visibility') == 'visible')
            $('#aboutCover').css('visibility','hidden');
        else
            $('#aboutCover').css('visibility','visible');
    };

    const hideFrameworksCover = (e) => {
        if($('#frameworksCover').css('visibility') == 'visible')
            $('#frameworksCover').css('visibility','hidden');
        else
            $('#frameworksCover').css('visibility','visible');
    };

    const hideManualsCover = (e) => {
        if($('#manualsCover').css('visibility') == 'visible')
            $('#manualsCover').css('visibility','hidden');
        else
            $('#manualsCover').css('visibility','visible');
    };

    const hideSpecificationsCover = (e) => {
        if($('#specificationsCover').css('visibility') == 'visible')
            $('#specificationsCover').css('visibility','hidden');
        else
            $('#specificationsCover').css('visibility','visible');

    };

    const hideResumeCover = (e) => {
        if($('#resumeCover').css('visibility') == 'visible')
            $('#resumeCover').css('visibility','hidden');
        else
            $('#resumeCover').css('visibility','visible');
    };

    const hideLivingCover = (e) => {
        if($('#livingCover').css('visibility') == 'visible')
            $('#livingCover').css('visibility','hidden');
        else
            $('#livingCover').css('visibility','visible');
    };

    const hideFrontCover = (e) => {
        if($('#frontCover').css('visibility') == 'visible')
            $('#frontCover').css('visibility','hidden');
        else
            $('#frontCover').css('visibility','visible');
    };

    const hideHomeCover = (e) => {
        if($('#homeCover').css('visibility') == 'visible')
            $('#homeCover').css('visibility','hidden');
        else
            $('#homeCover').css('visibility','visible');
    };


    const tooltip = (text) => {
        return(
        <Tooltip id="tooltip">
          {text}
        </Tooltip>
        );
    };

     useEffect(() => {
        $( window ).scroll(function() {
        
            // Adjusting Cover Panels
                $('#home').on('mouseenter',function(){
                    $('#homeCover').css('visibility','visible');           
            
                });
                
                
      
                $('#about').on('mouseenter',function(){
                    $('#aboutCover').css('visibility','visible');           
            
               
                });
                    
      
                $('#lamp').on('mouseenter',function(){
                    $('#lampCover').css('visibility','visible');           
            
               
                });
                
                       
                $('#mobile').on('mouseenter',function(){
                    $('#mobileCover').css('visibility','visible');           
            
                 
                });
                    
      
    
                $('#frameworks').on('mouseenter',function(){
                    $('#frameworksCover').css('visibility','visible');           
            
              
                });
                    
                
    
                $('#manuals').on('mouseenter',function(){
                    $('#manualsCover').css('visibility','visible');           
            
                
                });
    
                $('#specifications').on('mouseenter',function(){
                    $('#specificationsCover').css('visibility','visible');           
            
               
                });
    
                $('#resume').on('mouseenter',function(){
                    $('#resumeCover').css('visibility','visible');           
            
            
                });
                
      
                $('#living').on('mouseenter',function(){
                    $('#livingCover').css('visibility','visible');           
            
               
                });
       
                $('#front').on('mouseenter',function(){
                    $('#frontCover').css('visibility','visible');           
            
               
                });
        });



     });

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
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="home" className="panel-container d-flex justify-content-center align-items-center" onClick={hideHomeCover} style={{ height:'17em'}} fluid>                
                    <Card >
                        <img src={websiteconstruction} height="55%" width="55%" style={{margin:'1em 0 0 22.5%'}} alt="Website Construction"/>
                        <Card.Body>
                            <Card.Body>
                            <OverlayTrigger placement="top" overlay={(tooltip("Click to access Code Repo"))}>
                                <Card.Link href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF"  target="_blank">GitHub Code Repository</Card.Link>
                            </OverlayTrigger>
                                <Card.Text>Link to GIT Repository for this FuelCMS-based Site</Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                    <Container id="homeCover" className="coverPanel" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Body>                                
                                    <Card.Text><h2>Code Repository</h2></Card.Text>
                                    <Card.Text><i className="bi bi-file-earmark-code-fill"></i></Card.Text>
                                    <Card.Text>Beneath are links to FuelCMS-based site Code</Card.Text>
                                </Card.Body>
                            </Card.Body>
                        </Card>
                    </Container>   
                </Container>                        
            </OverlayTrigger>
            {/* End of Home Panel */}
				  
		
            {/* About Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="about" className="panel-container" onClick={hideAboutCover} fluid>
                    <Card>
                        <img src={technologyideas} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Technology Ideas"/>
                        <Card.Body>
                            <OverlayTrigger placement="top" overlay={(tooltip("Click to see Technologies Used"))}>
                                <Card.Link href="https://rsypertjr.net/webTech" target="_blank">Web Technologies Used</Card.Link>
                            </OverlayTrigger>
                        
                            <Card.Text><p>This is a page that gives explanation of the programming technologies used on this site.</p></Card.Text>
                        </Card.Body>
                    </Card>
                    {/*<Card>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/emailno" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">Making Contact</Card.Link>
                            <Card.Text>You can email me if you like.&nbsp;&nbsp;Also more contact info is given in my resume.</Card.Text>
                        </Card.Body>
                    </Card>*/}
                    <Card>
                        <img variant="top" src={myFace} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}}  alt="My Face"/>
                        <Card.Body>
                            <Card.Link href="https://www.linkedin.com/in/rlsworks/" target="_blank" data-toggle="tooltip" data-placement="right" title="Click to See My Profile!">Personal Profile</Card.Link>
                            <Card.Text><p>You can view my Linked-In Personal Profile for more info on me.</p></Card.Text>
                        </Card.Body>
                    </Card>
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
                </Container>
            </OverlayTrigger>
            {/* End of About Panel */}


            {/* Lamp Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="lamp" className="panel-container" onClick={hideLampCover} fluid>
                    <Card>
                        <img src={dataanalysis} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Data Analysis"/> 
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/amino" target="_blank">Amino Acid Code Sequence Analyzer</Card.Link>
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
                            <Card.Link href="https://rsypertjr.net/orominer1" target="_blank">Human Organ System Analyzer 1</Card.Link>
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
                            <Card.Link href="https://rsypertjr.net/orominer2" target="_blank">Human Organ System Analyzer 2</Card.Link>
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
                    <Card>
                        <img src={othellogameimage} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Othello Game Image"/> 
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/othello" target="_blank">Play Othello Game thru AJAX</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/othello" height="200" width="300"></object></Card.Text>
                            <Card.Text><p>Play the Othello Game using AJAX technology which will eliminate Page Reloads.<br/>The Code for PHP-based app is here: 
                                    <a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">Othello Game Code</a>
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
               

                    <Container id="lampCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
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
                    </Container>               
                </Container>            
            </OverlayTrigger>
            {/* End of Lamp Panel */}
            
          
            {/* Mobile Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="mobile" className="panel-container" onClick={hideMobileCover} fluid>
                    <Card >
                        <img src={mobiledevelopmentimage} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Mobile Development Image"/> 
                        <Card.Body>
                            <Card.Body>
                                <Card.Link href="https://rsypertjr.net/mobile" target="_blank">Jquery Mobile Web Development</Card.Link>
                                <Card.Text><object data="https://rsypertjr.net/mobile" height="200" width="300"></object></Card.Text>
                                <Card.Text><p>Link to a Mobile version of My work portfolio. I developed it using JQuery Mobile
                                    and it should run on Android devices.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                

                    <Container id="mobileCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Mobile Portfolio</h2></Card.Title>
                                <Card.Body>
                                    <Card.Text><i className="bi bi-phone"></i></Card.Text>
                                    <Card.Text><p>Beneath is a JQuery Mobile version of my portfolio that is mobile-device-responsive.</p></Card.Text>
                                </Card.Body>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>
            </OverlayTrigger>
            {/* End of Mobile Panel */}				  


            {/* Frameworks Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                    <Container id="frameworks" className="panel-container" onClick={hideFrameworksCover} fluid>
                    
                    <Card>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/tictactoe" target="_blank">React Javascript Tic-Tac-Toe</Card.Link>
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
                            <Card.Link href="https://laravelvotes.rsypertjr.net/votes-table" target="_blank">Laravel(Mix) w/React & Chart.js & Bootstrap.js Vote Parser</Card.Link>
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
                            <Card.Link href="https://vuevotes.rsypertjr.net" target="_blank">Vue 3 Composition API & Chart.js & Bootstrap.js Vote Parser</Card.Link>
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
                            <Card.Link href="https://wbcarinfo.rsypertjr.net" target="_blank">React-Bootstrap with Express ATLAS Cloud MongoDb Backend</Card.Link>
                            <Card.Text><object data="https://wbcarinfo.rsypertjr.net" height="200" width="300"></object></Card.Text>
                            <Card.Text>
                                <p className="text-center">
                                    <h4>React using Google Programmable API with Express Backend using ATLAS Cloud API with Webpack and NPM compiling and PM2 process management.</h4>
                                </p> 
                                <p>Google Programmable API is used to target searches at selected Web Sites and Customize Return Info:<br/><a href="http://wbcarinfo.rsypertjr.net" target="_blank">Mern Stack Application with React-Bootstrap</a><br/>
                                React-Bootstrap Components are used to enhance responsiveness.<br/><a href="https://github.com/Rsypertjr/webpack-express-carinfo/tree/webpack-express-carinfo" target="_blank">Front End/Back End Code</a>.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Link href="https://preselections.rsypertjr.net" target="_blank">Docker based Laravel Vite, React, Bootstrap 5, Chart.js, MongoDb App</Card.Link>
                            <Card.Text><object data="https://preselections.rsypertjr.net" height="200" width="300"></object></Card.Text>
                            <Card.Text>
                            <p className="text-center">A Docker based app that uses Laravel/Bootstrap 5 with Vite management of React.js with a networked containers of: Nginx, PHP, Mariadb, Composer, Artisan, NPM, Redis, 
                                Phpmyadmin. Utilizes Laravel Api for a Cloud-based MongoDb backend. Client and Server Code
                            </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>


                    <Container id="frameworksCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h1>Frameworks</h1></Card.Title>
                                <Card.Text><i className="bi bi-tree"></i></Card.Text>
                                <Card.Text>
                                    <p className="text-center">Programming I've done using:<br/>Node.js based technologies of Vue, Angular, and React,<br/>Some utilization of the Laravel MVC Framework and Node Express.
                                    Docker and Docker Compose Technologies used withth NPM and Webpack dependency management.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>                
            </OverlayTrigger>
          
            {/* End of Frameworks Panel */}
            

            {/* Manuals Panel */}                
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="manuals" className="panel-container" onClick={hideManualsCover} fluid>
                    <Card>
                        <img src={technicalwritingimage} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Technical Writing"/> 
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/graingerABCDE" target="_blank">Grainger ABCDE Series B</Card.Link>
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
                            <Card.Link href="https://rsypertjr.net/graingerCDE" target="_blank">Grainger CDE</Card.Link>
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
                            <Card.Link href="https://rsypertjr.net/mecPManual" target="_blank">MEC Product Manual VT 1.6</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/mecPManual" height="200" width="300"></object></Card.Text>
                            <Card.Text> 
                                <p>This is a Product Manual for a Motor Efficiency Controller (MEC). It is a new generation product manual. 
                                    I wrote it in Adobe InDesign according to the customer's style rules.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                
                    <Container id="manualsCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Production Manuals</h2></Card.Title>
                                <Card.Text><i className="bi bi-pen"></i></Card.Text>
                                <Card.Text>
                                    <p className="text-center">Operation and Maintenance Manuals for an Electro-Mechanical Application</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container> 
            </OverlayTrigger>           
            {/* End of Manuals Panel */}
            
        
            {/* Specifications Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="specifications" className="panel-container" onClick={hideSpecificationsCover} fluid>
                    <Card>
                        <img src={engProcessSpec} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Engineering Process Specification"/>   
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/whitePaper" target="_blank">Technical Writing</Card.Link>
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
                            <Card.Link href="https://rsypertjr.net/engSpec" target="_blank">Engineering Specification</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/engSpec" height="200" width="300"></object></Card.Text>
                            <Card.Text>
                                <p>This is a technical specification for the Clark County Land Development Approval process. 
                                    I authored it as an Environmental Health Engineer for Southern Nevada Health District.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>               
                
                    <Container id="specificationsCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Technical Specifications</h2></Card.Title>
                                <Card.Text><i className="bi bi-card-checklist"></i></Card.Text>
                                <Card.Text>
                                    <p className="text-center">Technology Explanation (White Paper) and Business Process Description</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>   
            </OverlayTrigger>
          
            {/* End of Specifications Panel */}		  
              
            {/* Resume Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="resume" className="panel-container" onClick={hideResumeCover} fluid>
                    <Card>
                        <img src={jobdone} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Job Done"/>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/dynResume" target="_blank">Dynamic HTML Resume w/Downloads</Card.Link>
                            <Card.Text><object type="text/html" data="https://rsypertjr.net/dynResume" height="200" width="300"></object></Card.Text>
                            <Card.Text> 
                                <p>Here is a link to my resume which uses dynamic CSS formatting.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                
                    <Container id="resumeCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Resume</h2></Card.Title>
                                <Card.Text><i className="bi bi-book"></i></Card.Text>
                                <Card.Text>
                                    <p className="text-center">A Dynamic HTML and CSS version of my Resume.  Also a Download Link for a PDF version</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>
            </OverlayTrigger>
            
            {/* End of Resume Panel */}


            {/* Living Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="living" className="panel-container" onClick={hideLivingCover} fluid>
                    <Card>                   
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/inVegas" target="_blank">Having Vegas Family Fun</Card.Link>
                            <Card.Text><object type="text/html" data="https://rsypertjr.net/inVegas" height="200" width="300"></object></Card.Text>
                            <Card.Text> 
                                <p>See a slide show and facts about Family Fun In Vegas.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>                
                    <Container id="livingCover" className="coverPanel" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Living In Vegas</h2></Card.Title>
                                <Card.Text><i className="bi bi-camera2"/></Card.Text>
                                <Card.Text>
                                    <p className="text-center">How to Have Family Fun in and around Vegas!&nbsp;&nbsp;Although a little dated.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>
            </OverlayTrigger>            
            {/* End of Living Panel */}

            {/* Front Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="front" className="panel-container" onClick={hideFrontCover} fluid>
                    <Card>
                        <img src={lampTechs} height="20%" width="20%" style={{margin:'1em 0 0 40%'}} alt="Fuel CMS"/>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/frontCMS" target="_blank">Non-Bootstrap Work Portfolio</Card.Link>
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
                    <Container id="frontCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Non-Bootstrap Portfolio</h2></Card.Title>
                                <Card.Text><i className="bi bi-lightbulb"></i></Card.Text>
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
            </OverlayTrigger>
            
            {/* End of Front Panel */}


			{/* Footer Section */}
            <Container id="footer" className="d-flex justify-content-center" fluid>
                <Row>     
                    <Col>              
                        <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Software Development
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="https://rsypertjr.net/amino">Amino Acid Sequence Analyzer</Dropdown.Item>
                            <Dropdown.Item href="https://rsypertjr.net/orominer1">Human Organ System Analyzer 1</Dropdown.Item>
                            <Dropdown.Item href="https://rsypertjr.net/orominer2">Human Organ System Analyzer 2</Dropdown.Item>
                            <Dropdown.Item href="https://rsypertjr.net/mobile">Mobile Web Portfolio</Dropdown.Item>
                            <Dropdown.Item href="https://github.com/Rsypertjr/fuelCMS/blob/latest-prod-fuelCMS">GIT Repository</Dropdown.Item>
                            <Dropdown.Item href="https://rsypertjr.net/othello">Play Othello Game</Dropdown.Item>
                            <Dropdown.Item href="https://laravelvotes.rsypertjr.net/votes-table">Sample Laravel 1</Dropdown.Item>
                            <Dropdown.Item href="https://preselections.rsypertjr.net">Sample Laravel 2</Dropdown.Item>
                            <Dropdown.Item href="https://wbcarinfo.rsypertjr.net">Mern stack</Dropdown.Item>
                        </Dropdown.Menu>

                        </Dropdown>
                    </Col>
                   
                    <Col>              
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Technical Writing
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="https://rsypertjr.net/graingerABCDE">Grainger ABCDE Series B Product Manual</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/graingerCDE">Grainger CDE Product Manual</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/mecPManual">MEC Product Manual VT 1.6</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/whitePaper">Technology White Paper</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/engSpec">Engineering Specification</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>                   
                   
                    <Col>              
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Resumes
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="https://rsypertjr.net/fuel2/index.php/pdfResume">PDF Resume</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/dynResume">Dynamic Resume</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                   
                    <Col>              
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Contact
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="linkedIn">Technologies Used</Dropdown.Item>
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