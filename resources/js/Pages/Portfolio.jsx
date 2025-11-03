import React, { useState, useEffect } from 'react';

import { Head } from '@inertiajs/react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Dropdown from 'react-bootstrap/Dropdown';
import TopCarousel from './Portfolio/TopCarousel';
import MidCarousel from './Portfolio/MidCarousel';
import $ from 'jquery';

import technologyideas from '../../images/technologyideas.jpg';
import myFace from '../../images/myFace.jpg';
import technicalwritingimage from '../../images/technicalwritingimage.jpg';
import techWriter from '../../images/techWriter.jpg';
import lampTechs from '../../images/lampTechs.jpg';
import jobdone from '../../images/jobdone.jpg';
import engProcessSpec from '../../images/engProcessSpec.jpg';
import dataanalysis from '../../images/dataanalysis.jpg';
import websiteconstruction from '../../images/websiteconstruction.jpg';
import othellogameimage from '../../images/othellogameimage.jpg';
import mobiledevelopmentimage from '../../images/mobiledevelopmentimage.jpg';
import tictactoe from '../../images/tictactoe.png';
import mern from '../../images/mern.jpeg';
import vegas from '../../images/vegas/vegas6.jpg';
import { set } from 'lodash';

export default function Portfolio(props){  
    const [putLampCover, setPutLampCover] = useState(false);
    const [pageTitle, setPageTitle] = useState("Work Portfolio");
    
      useEffect(() => {
          document.title = pageTitle || 'Work Portfolio'; // Set the title
          console.log("App Router page title:",pageTitle);
      },[pageTitle]);

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

    const hideNonBootstrapCover = (e) => {
        if($('#nonBootstrapCover').css('visibility') == 'visible')
            $('#nonBootstrapCover').css('visibility','hidden');
        else
            $('#nonBootstrapCover').css('visibility','visible');
    };


    const hideBootPortfolioCover = (e) => {
        if($('#bootPortfolioCover').css('visibility') == 'visible')
            $('#bootPortfolioCover').css('visibility','hidden');
        else
            $('#bootPortfolioCover').css('visibility','visible');
    };  

    const hideHomeCover = (e) => {
        if($('#homeCover').css('visibility') == 'visible')
            $('#homeCover').css('visibility','hidden');
        else
            $('#homeCover').css('visibility','visible');
    };

    const allCoversShow = () => {
        $('#mobileCover').css('visibility','visible');
    };

    const selectNavItem = (e, pTitle) => {
      //console.log(e.target);
      setPageTitle(pTitle);
      var targetEl = $(e.target.getAttribute('href'));
      if (targetEl.length) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: targetEl.offset().top
        }, 500); // Adjust the duration (in milliseconds) for the animation speed
      }
    };

    const ScrollToTop = () => {
   
        return (
            <div className="d-flex p-1 justify-content-center">
                <Button onClick={() => window.scrollTo(0,0)}  style={{backgroundColor:'black',cursor:'pointer'}}>
                    Scroll to Top
                </Button>
            </div>
           
        );
    };


    const tooltip = (text) => {
        return(
        <Tooltip id="tooltip">
          {text}
        </Tooltip>
        );
    };

     useEffect(() => {
     //   $( window ).scroll(function() {
        
            // Adjusting Cover Panels
               $('.app-description.card-text').css('background-color','#F8F8FF')
               .css('padding','1em').css('width','auto')
               .css('margin-top','1em').css('border-radius','5px').css('font-size','1.5em');
            
                $('#home').on('mouseenter',function(){
                    $('#homeCover').css('visibility','visible');  
                });
                
                
      
                $('#about').on('mouseenter',function(){
                    $('#aboutCover').css('visibility','visible'); 
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


                $('#nonBootstrap').on('mouseenter',function(){
                    $('#nonBootstrapCover').css('visibility','visible');    
                });


                $('#bootPortfolio').on('mouseenter',function(){
                    $('#bootPortfolioCover').css('visibility','visible');    
                });

                $('.nav-link').add('.dropdown').on('mouseover', function() {
                    $(this).css('background-color','#515a5a');
                });

                $('.nav-link').add('.dropdown').on('mouseout', function() {
                    $(this).css('background-color','black');
                });
    //    });



     });

    return(
       
        <>			
			
					
           
			<Container style={{width:"95%"}} fluid>
                <TopCarousel pageTitle={pageTitle}/> 
                <Container className="d-flex justify-content-center" style={{backgroundColor:"black"}} fluid>
                    <Navbar expand="lg"  style={{zIndex:200}} className="bg-body-tertiary d-flex justify-content-center" id="topNav">  {/* Beginning of Navigation */}
                    {/*<a className="navbar-brand" href="#">Bootstrap Work Portfolio</a>*/}
                    <Container>
                        <Navbar.Brand href="/#home" onClick={(e) => selectNavItem(e,"Home")}>Bootstrap Work Portfolio</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>*/}
                        <Navbar.Collapse id="myNavbar">
                            <Nav className="me-auto">
                                <Nav.Link href="#home" onClick={(e) => selectNavItem(e,"Home/Code Repos")}>Home/Code Repos</Nav.Link>
                                <Nav.Link href="#about" onClick={(e) => selectNavItem(e,"About")}>About</Nav.Link>
                                <NavDropdown title="Software Development" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#lamp" onClick={(e) => selectNavItem(e,"LAMP - based")}>LAMP - based</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#mobile" onClick={(e) => selectNavItem(e,"JQuery Mobile")}>JQuery Mobile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#frameworks" onClick={(e) => selectNavItem(e,"Frameworks")}>Frameworks</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Technical Writing" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#manuals" onClick={(e) => selectNavItem(e,"Production and Maintenance Manuals")}>Production and Maintenance Manuals</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#specifications" onClick={(e) => selectNavItem(e,"Technical Specification Manuals")}>Technical Specification Manuals</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#resume" onClick={(e) => selectNavItem(e,"My Resume")}>My Resume</Nav.Link>
                                <Nav.Link href="#living" onClick={(e) => selectNavItem(e,"Living In Vegas")}>Living In Vegas</Nav.Link>
                                <Nav.Link href="#nonBootstrap" onClick={(e) => selectNavItem(e,"Non-Bootstrap Portfolio")}>Original CodeIgniter Portfolio</Nav.Link> 
                                <Nav.Link href="#bootPortfolio" onClick={(e) => selectNavItem(e,"CodeIgniter Portfolio")}>CodeIgniter Bootstrap Portfolio</Nav.Link>      
                            </Nav>
                        </Navbar.Collapse> 
                    </Container>
                   
                </Navbar>    {/*---- End of Navigation Header ---------------------------------*/}	
            </Container>
                 <MidCarousel/>
                 
            </Container>
			

		    {/* -------- Display Panels with Cover Layers --------------- */}

            {/* Home Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="home" className="panel-container" onClick={hideHomeCover} 
                    style={{ backgroundColor:'#F5F5DC'}} fluid>                
                    <Card style={{backgroundColor:'#F0FFFF'}}>
                        <img src={websiteconstruction} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Website Construction"/>
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Body>
                                <Card.Link href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF"  target="_blank">GitHub Code Repository</Card.Link>
                                <Card.Text className="text-center app-description">Link to GIT Repository for this FuelCMS-based Site</Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                    <Container id="homeCover" className="coverPanel" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Body>                                
                                    <Card.Text><h2>Code Repository</h2></Card.Text>
                                    <Card.Text><i className="bi bi-file-earmark-code-fill"></i></Card.Text>
                                    <Card.Text className="text-center">Beneath are links to FuelCMS-based site Code</Card.Text>
                                </Card.Body>
                            </Card.Body>
                        </Card>
                    </Container>   
                </Container>                        
            </OverlayTrigger>
            {/* End of Home Panel */}
				  
		
            {/* About Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="about" className="panel-container" style={{backgroundColor:'#FFE4C4'}} onClick={hideAboutCover} fluid>
                    <Card>
                        <img src={technologyideas} height="15%" width="15%" style={{margin:'1em 0 0 42.5%', backgroundColor:'#FFE4C4'}} alt="Technology Ideas"/>
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/webTech" target="_blank">Web Technologies Used</Card.Link>                        
                            <Card.Text className="text-center app-description">
                                This is a page that gives explanation of the programming technologies used on this site.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {/*<Card>
                        <Card.Body>
                            <Card.Link href="https://rsypertjr.net/emailno" data-toggle="tooltip" data-placement="right" title="Click to Email Me!">Making Contact</Card.Link>
                            <Card.Text>You can email me if you like.&nbsp;&nbsp;Also more contact info is given in my resume.</Card.Text>
                        </Card.Body>
                    </Card>*/}
                    <Card style={{backgroundColor:'#DCDCDC'}} >
                        <img variant="top" src={myFace} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}}  alt="My Face"/>
                        <Card.Body>
                            <Card.Link href="https://www.linkedin.com/in/rlsworks/" target="_blank" data-toggle="tooltip" data-placement="right" title="Click to See My Profile!">Personal Profile</Card.Link>
                            <Card.Text className="text-center app-description">You can view my Linked-In Personal Profile for more info on me.</Card.Text>
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
                <Container id="lamp" className="panel-container" onClick={hideLampCover} style={{backgroundColor:'#FAFAD2'}} fluid>
                    <Card style={{backgroundColor:'#90EE90'}}>
                        <img src={dataanalysis} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Data Analysis"/> 
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/amino" target="_blank">Amino Acid Code Sequence Analyzer</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/amino" height="200" width="300"></object></Card.Text>
                            <Card.Text className="app-description">
                                This program gives statistics for all combinations of amino acid sequences within a protein. The protein sequence is parsed by regex 
                                techniques from a text file, into a MySQL database.  The first and last amino acid is chosen in the GUI, as well as, the desired statistical output.<br/>
                                The database accessed by JavaScript-AJAX to PHP-MySQL on the server side which returns the statistics.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#FAF0E6'}}>
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/orominer1" target="_blank">Human Organ System Analyzer 1</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/orominer1" height="200" width="300"></object></Card.Text>
                            <Card.Text className="app-description">
                                The Orominer program shows a hierarchical organization of the human body constitution. 
                                Its top level is Organ Systems.  It uses JavaScript, JQuery for event synchronization between 
                                hierarchical display and graphic display, as well as, dynamic generation of SVG graphical elements based on DOM HTML elements.
                                MySQL Database information is converted into XML format using PHP for up front access by the code for generation of Hierachical Display.
                                Unfortunately ONLY THE First 3 NODES Of DATA was developed at Project Completion.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#F5FFFA'}}>
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/orominer2" target="_blank">Human Organ System Analyzer 2</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/orominer2" height="200" width="300"></object></Card.Text>
                            <Card.Text className="app-description">
                                This orominer program contains Histological Data within the Hierarchical Organization of Human Body 
                                makeup. Histological Data is information about Human Organs and their tissues and cells. This 
                                application uses JavaScript Objects to store active data requests from which graphics is generated.                                         
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application"	target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#D8BFD8'}}>
                        <img src={othellogameimage} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Othello Game Image"/> 
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/othello" target="_blank">Play Othello Game thru AJAX</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/othello" height="200" width="300"></object></Card.Text>
                            <Card.Text className="app-description">
                                Play the Othello Game using AJAX technology which will eliminate Page Reloads.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/fuelCMS/tree/fuelPF/fuel/application" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
               

                    <Container id="lampCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>LAMP Technologies</h2></Card.Title>
                                <Card.Text><i className="bi bi-lightbulb"></i></Card.Text>
                                <Card.Text className="text-center">
                                    PHP/MySQL is used on the back-end for these apps. Regex is used to parse text files into a database.  
                                        I programmatically converted flat non-relational tables into a relational-XMLfile for app data.  PHP/SQL is
                                        used to query database and send tabular results to front-end.  Javascript/JQuery is used for dynamic DOM manipulation
                                        and SVG graphic element generation. AJAX is also used to update and process game-board data, as well as
                                        load XML data files.  Click on this Panel to see apps.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>            
            </OverlayTrigger>
            {/* End of Lamp Panel */}
            
          
            {/* Mobile Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="mobile" style={{backgroundColor:'#BC8F8F'}} className="panel-container" onClick={hideMobileCover} fluid>
                    
                    <Card style={{backgroundColor:'#FFEFD5'}}>
                        <img src={mobiledevelopmentimage} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Mobile Development Image"/> 
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Body>                                
                                <Card.Link href="https://rsypertjr.net/mobile" target="_blank">Jquery Mobile Web Development</Card.Link>
                                <Card.Text><object data="https://rsypertjr.net/mobile" height="200" width="300"></object></Card.Text>
                                <Card.Text className="text-center app-description">Link to a Mobile version of My work portfolio. I developed it using JQuery Mobile
                                    and it should run on Android devices.
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
                                    <Card.Text className="text-center">Beneath is a JQuery Mobile version of my portfolio that is mobile-device-responsive.</Card.Text>
                                </Card.Body>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>
            </OverlayTrigger>
            {/* End of Mobile Panel */}				  


            {/* Frameworks Panel */}
            <section id="frameworks">
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container  style={{backgroundColor:'#6A5ACD'}} className="panel-container" onClick={hideFrameworksCover} fluid>
                    <Card style={{backgroundColor:'#b3f5daff'}}>
                        <img src={tictactoe} className="rounded mb-2" height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Tic Tac Toe Image"/> 
                        <Card.Body>   
                            <ScrollToTop />         
                            <Card.Link href="https://codestorage.vercel.app/" target="_blank">AI-CoPilot-Next.js-Suprabase-Voting Analyzer</Card.Link>
                            <Card.Text><object data="https://codestorage.vercel.app/" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">New Next.js-AI-CoPilot Developed Presidential Voting Analyzer.&nbsp;&nbsp;Supabase SQL Integration for Front-End Dynamic Interaction, with Server-Side Rendering for SEO.&nbsp;&nbsp;
										GitHub Copilot AI is used for Code Management and Intelligent Code Generation.<a href="https://github.com/Rsypertjr/code_storage/tree/presidentelect" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#F5DEB3'}}>
                        <img src={tictactoe} className="rounded mb-2" height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Tic Tac Toe Image"/> 
                        <Card.Body>    
                            <ScrollToTop />         
                            <Card.Link href="tictactoe" target="_blank">React Javascript Tic-Tac-Toe</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/tictactoe" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                React Javascript Tic Tac Toe app with CSS animations for victory celebration.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/fuelCMS/blob/newfuel/fuel/application/views/tictactoe.php" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#7FFFD4'}}>
                        <img src={dataanalysis} className="rounded mb-2" height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Data Analysis Image"/> 
                        <Card.Body>  
                            <ScrollToTop />           
                            <Card.Link href="/amino" target="_blank">Amino Acid Code Sequence Analyzer</Card.Link>
                            <Card.Text><object data="/amino" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                This App is refactored and improved using Laravel11 with controller back-end for Mysql operations using Laravel's DB facade.  
                                The front end code is formulated with React components rendered as routes by Vite technology.  
                                State variables are maintained within components to enable dynamic data/status representations.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/code_storage/tree/laravel-portfolio-dev" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#FFFAFA'}}>
                        <img src={dataanalysis} className="rounded mb-2" height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Data Analysis Image"/> 
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://lar10reactmix.rsypertjr.net/votes-table" target="_blank">Laravel(Mix) w/React & Chart.js & Bootstrap.js Vote Parser</Card.Link>
                            <Card.Text><object data="https://lar10reactmix.rsypertjr.net/votes-table" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                This orominer program contains Histological Data within the Hierarchical Organization of Human Body 
                                makeup. Histological Data is information about Human Organs and their tissues and cells. This 
                                application uses JavaScript Objects to store active data requests from which graphics is generated.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/code_storage/tree/lar10-react-mix-prod-v2" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{backgroundColor:'#7FFFD4'}}>
                        <img src={dataanalysis} className="rounded mb-2" height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Data Analysis Image"/> 
                        <Card.Body> 
                            <ScrollToTop />            
                            <Card.Link href="https://laravelportfolio.rsypertjr.net/orominer1" target="_blank">New Laravel/React/Bootstrap Orominer</Card.Link>
                            <Card.Text><object data="https://laravelportfolio.rsypertjr.net/orominer1" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                This App is refactored and improved using Laravel11 with controller back-end for retrieval of XML file.  
                                The front end code is formulated with React components rendered as routes by Vite technology. SVG is used within
                                React for graphics. State variables are maintained within components to enable dynamic data/status representations.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/code_storage/tree/laravel-portfolio-dev" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#FFFAFA'}}>
                        <img src={dataanalysis} className="rounded mb-2" height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Data Analysis Image"/> 
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://lar10reactmix.rsypertjr.net/votes-table" target="_blank">Laravel(Mix) w/React & Chart.js & Bootstrap.js Vote Parser</Card.Link>
                            <Card.Text><object data="https://lar10reactmix.rsypertjr.net/votes-table" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                This orominer program contains Histological Data within the Hierarchical Organization of Human Body 
                                makeup. Histological Data is information about Human Organs and their tissues and cells. This 
                                application uses JavaScript Objects to store active data requests from which graphics is generated.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/code_storage/tree/lar10-react-mix-prod-v2" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{backgroundColor:'#EEE8AA'}}>
                        <img src={dataanalysis} className="rounded mb-2" height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Data Analysis Image"/> 
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://vue3chartjs.rsypertjr.net/" target="_blank">Vue 3 Composition API & Chart.js & Bootstrap.js Vote Parser</Card.Link>
                            <Card.Text><object data="https://vue3chartjs.rsypertjr.net/"></object></Card.Text>
                            <Card.Text className="text-center app-description">The app uses Vue 3 Composition API. NPM is used to managed the Node-based Vue 3 dependencies. 
                                    Vue 3 Composition API allows for function-based components which is inspired by React w/Hooks.  Here is code link: 
                                    &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/Vue3-Chartjs-Bootstrap/tree/vue-chart-v2" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#FDF5E6'}}>
                        <img src={mern} className="rounded mb-2" height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Mern Stack Image"/>                        
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://carinfo.rsypertjr.net" target="_blank">React-Bootstrap with Express ATLAS Cloud MongoDb Backend</Card.Link>
                            <Card.Text><object data="https://carinfo.rsypertjr.net" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                React using Google Programmable API with Express Backend using ATLAS Cloud API with Webpack and NPM compiling and PM2 process management.
                                Google Programmable API is used to target searches at selected Web Sites and Customize Return Info and React-Bootstrap Components are used to enhance responsiveness.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/webpack-express-carinfo/tree/car-info-prod-v2" target="_blank">Here is the Code.</a>
                               </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <ScrollToTop /> 
                            <Card.Link href="https://preselections.rsypertjr.net" target="_blank">Docker based Laravel Vite, React, Bootstrap 5, Chart.js, MongoDb App</Card.Link>
                            <Card.Text><object data="https://preselections.rsypertjr.net" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">A Docker based app that uses Laravel/Bootstrap 5 with Vite management of React.js with a networked containers of: Nginx, PHP, Mariadb, Composer, Artisan, NPM, Redis, 
                                Phpmyadmin. Utilizes Laravel Api for a Cloud-based MongoDb backend.
                                &nbsp;&nbsp;<a href="https://github.com/Rsypertjr/Docker-Laravel-Vite-React-Bootstrap-Chartjs/tree/lar-vite-chart-boot" target="_blank">Here is the Code.</a>
                            </Card.Text>
                        </Card.Body>
                    </Card>


                    <Container id="frameworksCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>         
                                <Card.Title><h1>Frameworks</h1></Card.Title>
                                <Card.Text><i className="bi bi-tree"></i></Card.Text>
                                <Card.Text className="text-center">
                                    Programming I've done using:  Node.js based technologies of Vue, Angular, and React.  Some utilization of the Laravel MVC Framework and Node Express.
                                    Docker and Docker Compose Technologies used withth NPM and Webpack dependency management.
                                    <br/>Added GitHub Copilot AI for Intelligent Code Generation and Management of Vercel-hosted Presidential Voting Analyzer App.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>                
            </OverlayTrigger>
          
            {/* End of Frameworks Panel */}
            
            </section>
            

            {/* Manuals Panel */}                
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="manuals" style={{backgroundColor:'#708090'}} className="panel-container" onClick={hideManualsCover} fluid>
                    <Card style={{backgroundColor:'#D3D3D3'}}>
                        <img src={technicalwritingimage} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Technical Writing"/> 
                        <Card.Body>                           
                            <ScrollToTop /> 
                            <Card.Link href="https://rsypertjr.net/graingerABCDE" target="_blank">Grainger ABCDE Series B</Card.Link>
                            <Card.Text><object type="text/html" data="https://rsypertjr.net/graingerABCDE" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description"> 
                                This is a Maintenance and Product Information Manual tailored for a customers implementation 
                                of a Motor Efficiency Controller (MEC). It is a new generation product manual. I wrote it
                                using Adobe InDesign according to the customers style rules
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#5F9EA0'}}>
                        <img src={technicalwritingimage} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Technical Writing"/>                       
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/graingerCDE" target="_blank">Grainger CDE</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/graingerCDE" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                This is a Maintenance and Product Information Manual tailored for a customers implementation of a 
                                Motor Efficiency Controller (MEC). It is a new generation product manual. I wrote it in Adobe InDesign 
                                according to the customer's style rules.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#F0E68C'}}>
                        <img src={techWriter} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Technical Writer"/>  
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/mecPManual" target="_blank">MEC Product Manual VT 1.6</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/mecPManual" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                This is a Product Manual for a Motor Efficiency Controller (MEC). It is a new generation product manual. 
                                I wrote it in Adobe InDesign according to the customer's style rules.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                
                    <Container id="manualsCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Production Manuals</h2></Card.Title>
                                <Card.Text><i className="bi bi-pen"></i></Card.Text>
                                <Card.Text className="text-center">
                                    Operation and Maintenance Manuals for an Electro-Mechanical Application
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container> 
            </OverlayTrigger>           
            {/* End of Manuals Panel */}
            
        
            {/* Specifications Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="specifications" style={{backgroundColor:'#D2691E'}} className="panel-container" onClick={hideSpecificationsCover} fluid>
                    <Card style={{backgroundColor:'#DEB887'}}>
                        <img src={engProcessSpec} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Engineering Process Specification"/>   
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/whitePaper" target="_blank">Technical Writing</Card.Link>
                            <Card.Text><object type="text/html" data="https://rsypertjr.net/whitePaper" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                This is a technical specification called a White Paper which explains the technology behind 
                                a companies product. In this case an Electrical Motor Energy Efficiency Device.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor:'#FFF8DC'}}>
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/engSpec" target="_blank">Engineering Specification</Card.Link>
                            <Card.Text><object data="https://rsypertjr.net/engSpec" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                This is a technical specification for the Clark County Land Development Approval process. 
                                I authored it as an Environmental Health Engineer for Southern Nevada Health District.
                            </Card.Text>
                        </Card.Body>
                    </Card>               
                
                    <Container id="specificationsCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Technical Specifications</h2></Card.Title>
                                <Card.Text><i className="bi bi-card-checklist"></i></Card.Text>
                                <Card.Text className="text-center">
                                    Technology Explanation (White Paper) and Business Process Description
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>   
            </OverlayTrigger>
          
            {/* End of Specifications Panel */}		  
              
            {/* Resume Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="resume" style={{backgroundColor:'#000000'}} className="panel-container" onClick={hideResumeCover} fluid>
                    <Card style={{backgroundColor:'#8B0000'}}>
                        <img src={jobdone} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Job Done"/>
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/index.php/pdfResume" target="_blank">PDF Version of My Resume</Card.Link>
                            <Card.Text><object type="text/html" data="https://rsypertjr.net/index.php/pdfResume" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                Here is a link to A PDF version of my Resume.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                
                    <Container id="resumeCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Resume</h2></Card.Title>
                                <Card.Text><i className="bi bi-book"></i></Card.Text>
                                <Card.Text className="text-center">
                                    A PDF version of my Resume is linked below. Click this cover panel to see.  
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>
            </OverlayTrigger>
            
            {/* End of Resume Panel */}


            {/* Living Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container style={{backgroundColor:'#FFFACD'}} id="living" className="panel-container" onClick={hideLivingCover} fluid>
                    <Card style={{backgroundColor:'#ADD8E6'}}>        
                        <img src={vegas} height="15%" width="15%" style={{margin:'1em 0 0 42.5%'}} alt="Welcome to Las Vegas"/>           
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/inVegas" target="_blank">Having Vegas Family Fun</Card.Link>
                            <Card.Text><object type="text/html" data="https://rsypertjr.net/inVegas" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                See a slide show and facts about Family Fun In Vegas.
                            </Card.Text>
                        </Card.Body>
                    </Card>                
                    <Container id="livingCover" className="coverPanel" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Living In Vegas</h2></Card.Title>
                                <Card.Text><i className="bi bi-camera2"/></Card.Text>
                                <Card.Text className="text-center">
                                    How to Have Family Fun in and around Vegas!  Although a little dated.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>
            </OverlayTrigger>            
            {/* End of Living Panel */}

            {/* nonBootstrap Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                <Container id="nonBootstrap" style={{backgroundColor:'#B0C4DE'}} className="panel-container" onClick={hideNonBootstrapCover} fluid>
                    <Card>
                        <img src={lampTechs} height="20%" width="20%" style={{margin:'1em 0 0 40%'}} alt="Fuel CMS"/>
                        <Card.Body>
                            <ScrollToTop />
                            <Card.Link href="https://rsypertjr.net/frontCMS" target="_blank">Non-Bootstrap Work Portfolio</Card.Link>
                            <Card.Text><object type="text/html" data="https://rsypertjr.net/frontCMS" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                My old work portfolio using LAMP technologies including  CodeIgniter MVC Framework,FUEL-CMS
                                (a CodeIgniter-based Content Management System), PHP, MySQL, HTML, JavaScript,
                                JQuery, JQuery UI, JQuery Mobile, Angular JS, ReactJS (ngrx) CSS, CSS3, SVG, AJAX, XML,
                                JSON, Regex, DOM, Notepad++, Cloud9 IDE, GIT, Heroku Server, Laravel MVC, GitHub API,
                                Facebook API, Active Campaign API, Bootstrap, WordPress, Ruby On Rails,
                                Google Developer Tools, Homestead Dev, Vagrant VMs, Adobe InDesign,
                                GIMP (like Photoshop), and other technologies.
                            </Card.Text>
                        </Card.Body>
                    </Card>                
                    <Container id="nonBootstrapCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Non-Bootstrap Portfolio</h2></Card.Title>
                                <Card.Text><i className="bi bi-lightbulb"></i></Card.Text>
                                <Card.Text className="text-center">
                                    CodeIgniter,Fuel CMS, and Lamp technologies are used as the MVC framework. They are based on PHP/LAMP technologies. 
                                    Includes lot of built-in routing, modular storage of code in a database, and Active Object database access.  
                                    On the front-end, CSS 2-D and 3-D tranformations are used to produce animations.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>
            </OverlayTrigger>

            {/* End of nonBootstrap Panel */}


             {/* bootPortfolio Panel */}
            <OverlayTrigger placement="top" overlay={(tooltip("Click to Toggle Cover Layer"))}>
                    <Container id="bootPortfolio" style={{backgroundColor:'#B0C4DE'}} className="panel-container" onClick={hideBootPortfolioCover} fluid>
                        <Card>
                        <img src={lampTechs} height="20%" width="20%" style={{margin:'1em 0 0 40%'}} alt="Fuel CMS"/>
                        <Card.Body>
                            <ScrollToTop /> 
                            <Card.Link href="https://rsypertjr.net/bootPortfolio" target="_blank">Boot Portfolio</Card.Link>
                            <Card.Text><object type="text/html" data="https://rsypertjr.net/bootPortfolio" height="200" width="300"></object></Card.Text>
                            <Card.Text className="text-center app-description">
                                Update on original work portfolio with utilization of Bootstrap for Mobile-first, responsive design to ensure website 
                                look good on all devices. There is continued use of CodeIgniter MVC Framework,FUEL-CMS
                                (a CodeIgniter-based Content Management System), PHP, MySQL, HTML, JavaScript,
                                JQuery, JQuery UI, JQuery Mobile, Angular JS, ReactJS (ngrx) CSS, CSS3, SVG, AJAX, XML,
                                JSON, Regex, DOM, Notepad++, Cloud9 IDE, GIT, Heroku Server, Laravel MVC, GitHub API,
                                Facebook API, Active Campaign API, Bootstrap, WordPress, Ruby On Rails,
                                Google Developer Tools, Homestead Dev, Vagrant VMs, Adobe InDesign,
                                GIMP (like Photoshop), and other technologies.
                            </Card.Text>
                        </Card.Body>
                    </Card>                
                    <Container id="bootPortfolioCover" className="coverPanel d-flex align-items-center" fluid>
                        <Card>
                            <Card.Body>
                                <Card.Title><h2>Bootstrap Portfolio</h2></Card.Title>
                                <Card.Text><i className="bi bi-lightbulb"></i></Card.Text>
                                <Card.Text className="text-center">
                                    Update on original work portfolio with utilization of Bootstrap for Mobile-first, responsive design to ensure website 
                                    look good on all devices.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>               
                </Container>
            </OverlayTrigger>

            {/* End of bootPortfolio Panel */}



			{/* Footer Section */}
            <Container id="footer" style={{backgroundImage:'linear-gradient(white,)'}} className="d-flex justify-content-center" fluid>
                <Row>     
                    <Col>              
                        <Dropdown >
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                Software Development
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="https://rsypertjr.net/amino" target="_blank">Amino Acid Sequence Analyzer</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/orominer1" target="_blank">Human Organ System Analyzer 1</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/orominer2" target="_blank">Human Organ System Analyzer 2</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/mobile" target="_blank">Mobile Web Portfolio</Dropdown.Item>
                                <Dropdown.Item href="https://github.com/Rsypertjr/fuelCMS/blob/latest-prod-fuelCMS" target="_blank">GIT Repository</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/othello" target="_blank">Play Othello Game</Dropdown.Item>
                                <Dropdown.Item href="https://laravelvotes.rsypertjr.net/votes-table" target="_blank">Sample Laravel 1</Dropdown.Item>
                                <Dropdown.Item href="https://preselections.rsypertjr.net" target="_blank">Sample Laravel 2</Dropdown.Item>
                                <Dropdown.Item href="https://wbcarinfo.rsypertjr.net" target="_blank">Mern stack</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>
                    </Col>
                   
                    <Col>              
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                Technical Writing
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="https://rsypertjr.net/graingerABCDE" target="_blank">Grainger ABCDE Series B Product Manual</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/graingerCDE" target="_blank">Grainger CDE Product Manual</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/mecPManual" target="_blank">MEC Product Manual VT 1.6</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/whitePaper" target="_blank">Technology White Paper</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/engSpec" target="_blank">Engineering Specification</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>                   
                   
                    <Col>              
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                Resumes
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="https://rsypertjr.net/fuel2/index.php/pdfResume" target="_blank">PDF Resume</Dropdown.Item>
                                <Dropdown.Item href="https://rsypertjr.net/dynResume" target="_blank">Dynamic Resume</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                   
                    <Col>              
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                Contact
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="https://rsypertjr.net/webTech" target="_blank">Technologies Used</Dropdown.Item>
                                <Dropdown.Item href="https://www.linkedin.com/in/rlsworks/" target="_blank">LinkedIn Profile</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
			    </Row>
		    </Container>  {/* End of Footer Section */}
                    
        </>
               
    );


};