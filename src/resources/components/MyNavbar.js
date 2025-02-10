import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {Navbar,Nav,NavDropdown,Container } from 'react-bootstrap';
import LampBased from './LampBased';
import Frameworks from './Frameworks';
import MobileApp from './MobileApp';
import About from './About';
import Repos from './Repos';
import Manuals from './Manuals';
import Specifications from './Specifications';
import Resume from './Resume';
import InVegas from './InVegas';
import OldPortfolio from './OldPortfolio';


import styled from "styled-components";
const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'black',
  fontSize: '0.8em'
};

const linkStyle2 = {
    color: 'white'
  };

const handleClick = (e) => {
    alert(JSON.stringify(e));

}
export default function MyNavbar(props){
     useEffect(() => {
        $('#basic-navbar-nav > div > div:nth-child(3) > a,#basic-navbar-nav > div > div:nth-child(4) > a, a.nav-link > a ').on('mousedown',function(){
            $('#basic-navbar-nav > div > div:nth-child(3) > a,#basic-navbar-nav > div > div:nth-child(4) > a, a.nav-link > a ').css('color','white');
            $(this).css('color','grey');
        });
      
     });
    return(
        <BrowserRouter>            
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Container className="nav-bar">
                    <Navbar.Brand href="#home">Laravel/React/Bootstrap Work Porfolio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto rounded-3">
                            <Nav.Link href="#home"><Link to="/repos" onMouseDown={handleClick} >Home/Code Repos</Link></Nav.Link>
                            <Nav.Link href="#about"><Link to="/about" >About</Link></Nav.Link>
                            <NavDropdown title="Software Development" >
                                <NavDropdown.Item href="#"><Link to="/lamp"  style={linkStyle}>LAMP - based</Link></NavDropdown.Item>                                
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#mobile"><Link to="/mobile"  style={linkStyle}>JQuery Mobile</Link></NavDropdown.Item>                                
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#frameworks"><Link to="/frameworks"  style={linkStyle}>Frameworks</Link></NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Technical Writing" >
                                <NavDropdown.Item href="#manuals"><Link to="/manuals" style={linkStyle}>Production and Maintenance Manuals</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#specifications"><Link to="/specifications" style={linkStyle}>Technical Specification Manuals</Link></NavDropdown.Item>
                            </NavDropdown>                        
                            <Nav.Link href="#resume"><Link to="/resume" >My Resume</Link></Nav.Link>                        
                            <Nav.Link href="#living"><Link to="/living" >Living In Vegas</Link></Nav.Link>
                            <Nav.Link href="#oldportfolio"><Link to="/oldportfolio" >Old Lamp/CodeIgniter Portfolio</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        <Routes>
            <Route path='/home'/>
            <Route exact path="/" element={<LampBased />} />
            <Route path="/lamp" element={<LampBased />} />
            <Route path="/frameworks" element={<Frameworks />}/>
            <Route path="/mobile" element={<MobileApp />}/>
            <Route path="/about" element={<About />} />
            <Route path="/repos" element={<Repos />}/>
            <Route path="/manuals" element={<Manuals /> }/>
            <Route path="/specifications" element={<Specifications />} />            
            <Route path="/resume" element={<Resume />} />
            <Route path="/living" element={<InVegas />} />
            <Route path="/oldportfolio" element={<OldPortfolio />} />
        </Routes>
    </BrowserRouter> 
    );

}