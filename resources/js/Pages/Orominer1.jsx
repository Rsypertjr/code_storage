import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';

const reader = new FileReader()


export default function Orominer(props){
    const [xmlDoc, setXmlDoc] = useState(null);
    const [systemsArr, setSystemsArr] = useState([]);

     const headerStyle = {
        fontSize:"1.25em", 
        border:"2px black solid"
     };

     const getXML = () => {

        axios.get('/getxmlfile')
        .then(function (response) {
            let xmlData = response.data;
         
            console.log("xmlData: ",xmlData);
            const parser = new DOMParser();
            let xml_doc = parser.parseFromString(xmlData,'text/xml');
            let systems = $(xml_doc).find('System');
            console.log("Systems: ",systems);
            console.log("xmlDoc: ",xml_doc);
            console.log("Systems: ",Array.from(systems));
            setXmlDoc(xml_doc);
            setSystemsArr(Array.from(systems));
        });
     };


     const initializeSystems = () => {
       
     }

     useEffect(() => {
        getXML();
        initializeSystems();
     },[]);

    return (
        <>
             <Container id="" className="w-85">
                <Row>
                    <div id="" style={{border:"20px ridge silver", width:"70%", marginLeft:"15%", fontSize:"1.5em"}} className="mb-4 p-2 d-flex justify-content-center">
                        Organism Relation Ontology (ORO) Miner
                    </div>
                </Row>
                <Row style={{height:"50em"}}>
                    <Col id ="harchframe" className="w-100 p-0">
                        <span id="" style={ headerStyle} className="w-100 d-flex justify-content-center">Hierarchy Display</span>
                        <ButtonGroup aria-label="Basic example" className="w-100">  
                            <Container>
                                {
                                    systemsArr != null && systemsArr.length > 0 &&
                                
                                        Array.from(systemsArr).map((system, j) => (
                                            <Row key={$(system).attr('id')} className="mb-2 d-flex w-100">   
                                                     { console.log(system)}
                                                    <Button variant="primary" className="d-flex w-10 justify-content-center">{$(system).html().split('<')[0]}</Button>
                                                        <Container>
                                                            <Row style={{marginLeft:'2em'}}>
                                                              
                                                                {
                                                                    $(system).find('Organ') != null  && $(system).find('Organ').length > 0 &&
                                                                             
                                                                            Array.from($(system).find('Organ')).map((organ, k) => (
                                                                                <>
                                                                                   
                                                                                    <Button  key={k}  variant="info" className="d-inline-flex w-10 justify-content-start inline">
                                                                                        <i className="bi bi-arrow-return-right" style={{marginLeft:''}}></i>
                                                                                        <span style={{marginLeft:'2em'}}>{$(organ).html().split('<')[0]}</span>
                                                                                    </Button>
                                                                                    <Row style={{marginLeft:'3em'}} className="mb-2 d-flex justify-content-start">
                                                                                        {                                                                                        
                                                                                        

                                                                                            $(organ).find('Part') != null &&  $(organ).find('Part').length > 0 &&
                                                                                            Array.from($(organ).find('Part')).map((part, l) => (
                                                                                            <>
                                                                                               
                                                                                                    <Button  key={l} style={{width:"20em",fontSize:"1em"}} variant="light" className="d-inline-flex justify-content-start inline">
                                                                                                        <i className="bi bi-arrow-return-right" style={{marginLeft:''}}></i>
                                                                                                        <span style={{marginLeft:'2em'}}>{$(part).html().split('<')[0]}</span>
                                                                                                    </Button>
                                                                                                    <Row style={{marginLeft:'3em'}} className="mb-2 d-flex justify-content-start">
                                                                                                        {
                                                                                                             $(part).find('PartContactOrgan') != null &&  $(part).find('PartContactOrgan').length > 0 &&
                                                                                                             Array.from($(part).find('PartContactOrgan')).map((partcontactorgan, m) => (
                                                                                                                <>                                                                                               
                                                                                                                    <Button  key={l} style={{width:"20em",fontSize:"1em"}} variant="success" className="d-inline-flex justify-content-start inline">
                                                                                                                        <i className="bi bi-arrow-return-right" style={{marginLeft:''}}></i>
                                                                                                                        <span style={{marginLeft:'2em'}}>{$(partcontactorgan).html()}</span>
                                                                                                                    </Button>
                                                                                                                </>

                                                                                                             ))
                                                                                                        }
                                                                                                    </Row>
                                                                                               
                                                                                            </>
                                                                                            ))
                                                                                            
                                                                                        
                                                                                        }
                                                                                   </Row> 
                                                                                </>

                                                                        ))
                                                                    
                                                               }
                                                            </Row>
                                                                </Container>

                                            </Row>
                                                
                                        ))         
                                }
                            </Container>   
                         </ButtonGroup>
                    </Col>
                    <Col id="grphframe1" className="w-100 p-0">
                        <Row className="h-10">
                            <span id="" style={headerStyle} className="d-flex justify-content-center">Graph Display</span> 
                        </Row>                       
                        <Row id="gphtitle" className="h-20">
                            <Col id="tab1" className="tab">Cell-to-Cell</Col>
                            <Col id="tab2" className="tab">Cell-to-Lumen</Col>
                            <Col id="gphmess">Graph Messages Here</Col>
                        </Row>
                       <Row className="h-70">
                            <div id="gphdisp">
                                <div id="gphdisp2">
                                {/*<svg id="mySVG" style="overflow: visible" width="100%" height="100%" viewBox = "0 0 4000 4000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>*/}
                                </div>
                            </div>
                       </Row>
                        
                    </Col>
                    <Col id="dispframe" className="dispframe w-100 p-0">
                        <span id="" style={headerStyle} className="d-flex justify-content-center">Info Display</span> 
                        <div id="panel"></div>
                    </Col>
                </Row>
                
            </Container>
        </>
            
    );
}  