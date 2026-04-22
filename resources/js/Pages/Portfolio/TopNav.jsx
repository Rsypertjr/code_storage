import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "@inertiajs/react";

export default function TopNav() {
    return (
        <>
          <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-center" id="topNav">  {/* Beginning of Navigation */}
                    {/*<a className="navbar-brand" href="#">Bootstrap Work Portfolio</a>*/}
                    <Container>
                        <Navbar.Brand href="/#home">Bootstrap Work Portfolio</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>*/}
                        <Navbar.Collapse id="myNavbar">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home/Code Repos</Nav.Link>
                                <Nav.Link href="#about">About</Nav.Link>
                                <NavDropdown title="Software Development" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#lamp">LAMP - based</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#mobile">JQuery Mobile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#frameworks">Frameworks</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#aiAssisted">CoPilot AI-Assisted Apps</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Technical Writing" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#manuals">Production and Maintenance Manuals</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#specifications">Technical Specification Manuals</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="#resume">My Resume</Nav.Link>
                                <Nav.Link as={Link} to="#living">Living In Vegas</Nav.Link>
                                <Nav.Link as={Link} to="#nonBootstrap">Non-Bootstrap Portfolio</Nav.Link>
                                <Nav.Link as={Link} to="#bootPortfolio">CodeIgniter Portfolio</Nav.Link>
                                <Nav.Link as={Link} to="#laravelreact">Laravel React Bootstrap Portfolio</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                        {/*<div className="collapse navbar-collapse d-flex justify-content-center" id="myNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#home">Home/Code Repos</a>
                                </li>
                                <li>
                                    <a className="nav-link" href="#about">About</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false" >Software Development <span className="caret"></span></a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="#lamp">LAMP - based</a>
                                        <a className="dropdown-item" href="#mobile">JQuery Mobile</a>
                                        <a className="dropdown-item" href="#frameworks">Frameworks</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false" >Technical Writing <span className="caret"></span></a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="#manuals">Production and Maintenance Manuals</a>
                                        <a className="dropdown-item" href="#specifications">Technical Specification Manuals</a>
                                    </div>
                                </li>
                                <li className="nav-item"><a className="nav-link" href="#resume">My Resume</a></li>
                                <li className="nav-item"><a className="nav-link"  href="#living">Living In Vegas</a></li>
                                <li className="nav-item" ><a className="nav-link"  href="#front">Non-Bootstrap Portfolio</a></li>
                                <li className="nav-item"><a className="nav-link"  href="laravelreact" target="_blank">Laravel React Bootstrap Portfolio</a></li>
                            </ul>
                        </div>*/}
                    </Container>

            </Navbar>    {/*---- End of Navigation Header ---------------------------------*/}
        </>
    );
}
