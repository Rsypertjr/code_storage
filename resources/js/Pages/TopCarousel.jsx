import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../Components/CarouselImage';

export default function TopCarousel(props){
    return (
        <>
         <Carousel className="d-flex justify-content-center top-carousel">
                <Carousel.Item>                    
                    <Carousel.Caption>
                        <h4>Richard L. Sypert Jr's Work Portfolio</h4> 
                        <p className="top-desc rounded">This site shows my experience as a Software Developer,Technical Writer,and Engineer.  t has been updated to Bootstrap 4.0. Please View thru 
                            this carousel for info about my work history.</p>
                    </Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <Carousel.Caption>
                        <h4>Digital Ocean Cloud-based computing and Ubuntu Linux Virtual Hosting</h4> 
                        <p className="top-desc rounded">This site is hosted on Ubuntu 18.04 Digital Ocean Droplets,&nbsp;utilizing Apache Virtual Hosting.&nbsp;&nbsp; Some apps have been deployed to Heroku Server.&nbsp;&nbsp;
                        Microsoft Visual Studio Code using Virtual Linux (wsl) is the development environment for this portfolio.&nbsp;&nbsp;VirtualBox Ubuntu 18.04 machine is used for direct ssh access to the droplets,&nbsp;and 
                        sshfs to the files on the droplets.
                        </p> 
                    </Carousel.Caption>                               
                </Carousel.Item>				
                <Carousel.Item>
                    <Carousel.Caption>
                        <h4>PHP-based and JavaScript-based technologies and frameworks featured</h4>
                        <p className="top-desc rounded"> Fuel CMS framework (CodeIgniter-based)</p>
                    </Carousel.Caption>								
                </Carousel.Item>					
                <Carousel.Item>
                    <Carousel.Caption>
                        <h4>Laravel-Mix MVC, React/Bootstrap/JQuery/ChartJs Component-based Front End</h4> 
                        <p className="top-desc rounded">Laravel (Mix) with React.js,&nbsp;React Router,&nbsp;Chart.js,&nbsp;and Bootstrap is used in this app:&nbsp;
                        <a href="https://laravelvotes.rsypertjr.net/votes-table" 
                        target="_blank">Laravel(Mix)/React/Chart.js/Bootstrap.js Vote Parser</a>.&nbsp;&nbsp;This app uses React Hooks like UseEffect and UseState for functional components.&nbsp;&nbsp;
                        Here is code link:&nbsp;
                        <a href="https://github.com/Rsypertjr/Laravel-React-Chartjs-Votes-Parser/tree/latest2" target="_blank">Laravel(Mix)/React/Chart.js/Bootstrap.js Vote Parser Code</a>.
                        </p>		
                    </Carousel.Caption>								
                </Carousel.Item>
                <Carousel.Item>
                    <Carousel.Caption>
                        <h4>Docker Laravel-9 Vite,React 17/Bootstrap/Chartjs Vote Parser Implementation</h4>
                        <p className="top-desc rounded">Also included is the code for another Vote Parer implementation using Docker/Docker-compose of Laravel 9 with Vite for React 17 javascript compilation. React Bootstrap and Chartjs is also utilized as before.
                        Link to this code is <a href="https://github.com/Rsypertjr/Docker-Laravel-Vite-React-Bootstrap-Chartjs/tree/docker-laravel-vite" target="_blank">Docker Laravel-Vite/React Code</a>
                        </p>
                    </Carousel.Caption>								
                </Carousel.Item>
                <Carousel.Item>
                    <Carousel.Caption>
                        <h4>Vue3 Composition API, Vue3/Bootstrap/JQuery/ChartJs Component-based front end</h4> 
                        <p  className="top-desc rounded">Vue 3 Composition API,&nbsp;Chart.js,&nbsp;and Bootstrap is used in this app:&nbsp;<a href="http://vuevotes.rsypertjr.net" 
                        target="_blank">Vue3(Composition API)/Chart.js/Bootstrap.js Vote Parser</a>.&nbsp;&nbsp;This app uses Vue3 Composition API which allows more function-based writing of components,&nbsp;inspired by React Hooks.&nbsp;&nbsp;
                        Here is code link:&nbsp;<a href="https://github.com/Rsypertjr/Vue3-Chartjs-Bootstrap.git" target="_blank">Vue3(Compostion API)/Chart.js/Bootstrap.js Vote Parser Code</a>.
                        </p>
                    </Carousel.Caption>								
                </Carousel.Item>		
                <Carousel.Item>
                    <Carousel.Caption>
                        <h4>React using Google Programmable API with Express Backend using ATLAS Cloud API with Webpack and NPM compiling and PM2 process management.</h4> 
                        <p className="top-desc rounded">Google Programmable API is used to target searches at selected Web Sites and Customize Return Info:<br/>
                            <a href="http://wbcarinfo.rsypertjr.net" target="_blank">Mern Stack Application with React-Bootstrap</a><br/>
                                React-Bootstrap Components are used to enhance responsiveness.<br/>
                            <a href="https://github.com/Rsypertjr/webpack-express-carinfo/tree/webpack-express-carinfo" target="_blank">Front End/Back End Code</a>.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>						
            </Carousel>			
        </>
           
    );
}