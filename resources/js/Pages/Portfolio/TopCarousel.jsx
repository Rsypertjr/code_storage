import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../../Components/CarouselImage';

export default function TopCarousel(props){  
  
    return (
        <>
         <Carousel id="topCarousel" className="d-flex justify-content-center top-carousel">
                <Carousel.Item>                    
                    <Carousel.Caption>
                        <h4>Richard L. Sypert Jr's Work Portfolio</h4> 
                        <p className="top-desc rounded">This site shows my experience as a Software Developer, Technical Writer, and Manufacturing Engineer (resume).&nbsp;&nbsp;It is coded with Laravel11, React, Vite, and Bootstrap 5, as well as 
                            other technologies.&nbsp;&nbsp;Please view this carousel for information about my work history.</p>
                    </Carousel.Caption>								
                </Carousel.Item>	
                <Carousel.Item>                    
                    <Carousel.Caption>
                        <h4>VSCode CoPilot AI-Assisted Next.js Presidential Voting Analyzer</h4> 
                        <p className="top-desc rounded">Comprehensive Next.js application with Supabase SQL integration featuring interactive electoral data analysis, real-time voting
							trend visualization, and demographic insights. Incorporates GitHub Copilot-powered code management with intelligent organization, automated tagging, 
                            search functionality, and collaborative development.&nbsp;&nbsp;Link to code:&nbsp;<a href="https://github.com/Rsypertjr/code_storage/tree/presidentelect" target="_blank">Next.js-Presidential-Voting-Analyzer Code</a><br/>
                            Link to app:&nbsp;<a href="https://codestorage.vercel.app/" target="_blank">Next.js Presidential Voting Analyzer</a>
                        </p>
                    </Carousel.Caption>								
                </Carousel.Item>				
                <Carousel.Item>
                    <Carousel.Caption>
                        <h4>Digital Ocean Cloud-based computing and Ubuntu Linux Virtual Hosting</h4> 
                        <p className="top-desc rounded">This site is hosted on Ubuntu Digital Ocean Droplets,&nbsp;utilizing Apache Virtual Hosting.&nbsp;&nbsp; Microsoft Visual Studio Code using both Virtual Linux (wsl), and non-virtual Linux are the development environments for this portfolio.&nbsp;&nbsp;
                            Remote SSH or SSHFS are used for direct access to the droplets operating system and files.
                        </p> 
                    </Carousel.Caption>                               
                </Carousel.Item>				
                <Carousel.Item>
                    <Carousel.Caption>
                        <h4>PHP-based and JavaScript-based, and other technologies and frameworks featured</h4>
                        <p className="top-desc rounded">Laravel 11, React.js, React-Bootstrap, Chart.js, SVG, NPM, Vite asset bundling, MySQL, Docker, Docker-Compose,
                            PM2 process management, JSON formatting, Document Object Modeling, Mongo document database, Express.js
                        </p>
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