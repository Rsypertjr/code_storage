import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Carousel, Container } from 'react-bootstrap';

const info = [
    {
        header:<span>Diverse Technical Experience</span>,
        statement: <span>This site shows my experience as a Software Developer, Technical Writer, and Engineer.  I have recent working experience with PHP and node.js on the backend
        and Vue.js and Semantic UI on the front end (Please see: <a href="#resume">My Resume</a> menu tab).  This experience also included PHPUnit testing on controller and
        service classes of enterprise software.</span>
    },
    {
        header:<span>Cloud-Based Hosting, Virtual Hosting, and Virtual Linux (wsl2)</span>,
        statement:<span>This site is hosted on Ubuntu 18.04 Digital Ocean Droplets, utilizing Apache Virtual Hosting.  Some apps have been deployed to Heroku Server.
        Microsoft Visual Studio Code using Virtual Linux (wsl) is the development environment for this portfolio.  VirtualBox Ubuntu 18.04 machine is used for direct 
        ssh access to the droplets, and  sshfs to the files on the droplets.</span>
    },
    {
        header:<span>Frameworks</span>,
        statement:<span>Laravel Mix w/React framework, <a href="https://presvote.tk">Angular</a>, <a href="voteparser">Vue.js</a>, <a href="http://hmobf.presvote.tk">React.js</a>,  Node.js, Ng, NPM, PM2, Laravel, Bootstrap, JQuery, JQueryUI, SVG, XML, CSS are some of the technologies used.  Framework-based applications are at the <a href="#frameworks">Frameworks</a> menu tab.
        PHP-based applications are located at the <a href="#lamp">Laravel/Boostrap/Node</a> menu tab.</span>
    },
    /*{
        header:<span>Docker Technology</span>,
        statement:<span>Docker technology is used in terms of Docker Engine for implementing an Angular javascript app that contains a Dockerfile and a 
        Docker-compose file for implementations of development and production versions. Karma and Protractor unit testing of code is also included.
        Link to this code is <a href="https://github.com/Rsypertjr/dockerVoteParser/tree/dockerVoteParser" target="_blank">Docker Angular Code</a></span>
    }, */
    {
        header:<span>Laravel Mix/React App</span>,
        statement:<span>Laravel (Mix) with React.js, React Router, Chart.js, and Bootstrap is used in this app: <a href="http://159.65.100.7/votes-table" 
        target="_blank">Laravel(Mix)/React/Chart.js/Bootstrap.js Vote Parser</a>.  This app uses React Hooks like UseEffect and UseState for functional components.
        Here is code link: <a href="https://github.com/Rsypertjr/Laravel-React-Chartjs-Votes-Parser/tree/latest2" target="_blank">Laravel(Mix)/React/Chart.js/Bootstrap.js Vote Parser Code</a></span>
    }
];

function ConvertToHtml(props) {
    const [converted, SetConverted] = useState();
   
    const convert = () => {
        let dv = $('<div></div>');
        $('.addon').append(dv);
        dv.html($.parseHTML(props.text));
        SetConverted(dv.html());
   };

   useEffect(() => {
        convert();
        //$('.addon').html('');  
   });
    return (
        <div className="addon">
            {converted}
        </div>
    );

}





export default function MyCarousel(props){
    const [cinfo, setCInfo] = useState(info);
    const [header, SetHeader] = useState();
    const [statement,SetStatement] = useState();
    
    const convertheader = (info) => {
      //let dv = $('<div></div>');
      //dv.text(info.header);
      SetHeader(info.header);
   };
   const convertstatement = (info) => {
    //let dv = $('<div></div>');
    // dv.text(info.statement);
     SetStatement(info.statement);
  };
  var stringToHTML = function (str) {
    var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};
return(  
        <Carousel id="myCarousel" >
            { cinfo.map((info) =>(
                            
              <Carousel.Item className="carousel-item">                              
                    <Carousel.Caption></Carousel.Caption> 
                    <Container className="fluid p-2 w-75 h-90">
                        <h3 className="d-flex justify-content-center">{info.header}</h3>
                        <p className="d-flex justify-content-center" >{info.statement}</p>
                    </Container>               
                </Carousel.Item>
            ))
           
        }
        </Carousel>
    );
}