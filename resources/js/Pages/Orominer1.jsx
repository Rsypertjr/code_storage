import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
const parser = new DOMParser();

export default function Orominer(props){
    const [xmlDoc, setXmlDoc] = useState(null);
    const [systemsArr, setSystemsArr] = useState([]);
    const [showItem, setShowItem] = useState([]);
    const [showOrganItems, setShowOrganItems] = useState([]);
    const [systems, setSystems] = useState([]);
    const [allSystems,setAllSystems] = useState([]);


    const headerStyle = {
        fontSize:"1.25em", 
        border:"2px black solid"
     };
     const systemsSet = [
            {
                "systemName" : "",
                "organs": []
            }
    ];
     const getXML = () => {

        axios.get('/getxmlfile')
        .then(function (response) {
            let xmlData = response.data;
         
            console.log("xmlData: ",xmlData);
          
            let xml_doc = parser.parseFromString(xmlData,'text/xml');
            let systems = $(xml_doc).find('System');
            setSystems(systems);
            //console.log("Systems: ",systems);
            //console.log("xmlDoc: ",xml_doc);
            //console.log("Systems: ",Array.from(systems));
            setXmlDoc(xml_doc);
            setSystemsArr(Array.from(systems));
        });
     };


    const initializeSystems = () => {
       
     }

    const toggleOrgans = (index) => {
        //alert(index);
        
            const newItems2 = [...showItem];
            newItems2[index] = !newItems2[index];
            setShowItem(newItems2);

    }

    const toggleOrganItems = (i,j) => {
        //alert(index);
        
            const newItems2 = [...showOrganItems];
            newItems2[i,j] = !newItems2[i,j];
            setShowOrganItems(newItems2);

    }
   

     useEffect(() => {
        getXML();
        initializeSystems();
     },[]);

     useEffect(() => {

        systemsArr.forEach((system,i) => {
            const newItems = [...showItem];
            newItems[i] = false;
            setShowItem(newItems);
            let item = {"systemName":"","organs":[]};
            item.systemName = systemsArr[i].childNodes[0].nodeValue;
            let sys = [...systems];
            let organs = sys[i].getElementsByTagName('Organ');
            //console.log(item.systemName +" Organs:",organs);
            let organArr = [];
            let showParts = [];
            Array.from(organs).forEach((organ,j) => {
                //console.log("Organ",organ);
                //const newItems2 = [];
                showParts[i] = [];
                showParts[i][j] = false;

                let organName = organs[j].childNodes[0].nodeValue;
                let organ_layers = organs[j].getElementsByTagName("Organ_Layer");
                Array.from(organ_layers).map((layer) => {return layer.textContent != "null";});
                let parts = organ.getElementsByTagName("Part");
                organArr.push({"organName":"Organ: "+organName,"organLayers":organ_layers,"parts":parts})

            });
            setShowOrganItems(showParts);
            item.organs = organArr;
            systemsSet.push(item);


        });
        console.log("SystemSet: ", systemsSet);
        setAllSystems(systemsSet);

     },[systemsArr,systems]);

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
                   
                    <div className="d-grid gap-1">
                        {/* console.log("System: ",system) */}
                        {/* console.log("SystemsArr: ",systemsArr) */}
                        { /*console.log("System split: ",$(system).html().split('<') ) */}
                       
                        {
                             

                             
                            systemsArr != null && systemsArr.length > 0 &&                                
                            allSystems.map((system, j) => (                                
                                <>
                                
                                <Button key={j.toString()} variant="primary" onClick={() => toggleOrgans(j)} size="lg">{system.systemName}</Button>
                              
                        
                                    {

                                        showItem[j] && system.organs.length > 0 &&                                                 
                                        system.organs.map((organ, k) => (
                                            <>
                                                
                                                <Button style={{marginLeft:"1em"}} key={k} onClick={() => toggleOrganItems(j,k)} variant="info">
                                                    <div style={{position:"relative",width:"100%"}}>
                                                        <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                        <span style={{float:"left",marginLeft:"1.5em",textWrap:"wrap",height:"auto"}}>{organ.organName}</span>     
                                                        <span style={{width:"100%",float:"left"}}>{ organ.parts.length > 0 ? <span>has parts</span> : <span>no parts</span> }</span>
                                                    </div>
                                                    
                                                </Button>

                                                {
                                                showOrganItems[j,k] && organ.parts.length > 0 &&
                                                    Array.from(organ.parts).map((part, l) => (
                                                    <>
                                                        
                                                        <Button  key={l} style={{width:"20em",fontSize:"1em",marginLeft:"2em"}} variant="light" className="d-inline-flex justify-content-start inline">
                                                            <div style={{position:"relative",width:"100%"}}>
                                                                <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                <span style={{width:"100%",float:"left"}}>{part.textContent}</span>
                                                            </div>
                                                            
                                                        </Button>
                                                        <Row style={{marginLeft:'3em'}} className="mb-2 d-flex justify-content-start">
                                                            {/*
                                                                    $(part).find('PartContactOrgan') != null &&  $(part).find('PartContactOrgan').length > 0 &&
                                                                    Array.from($(part).find('PartContactOrgan')).map((partcontactorgan, m) => (
                                                                    <>                                                                                               
                                                                        <Button  key={l} style={{width:"20em",fontSize:"1em"}} variant="success" className="d-inline-flex justify-content-start inline">
                                                                            <i className="bi bi-arrow-return-right" style={{marginLeft:''}}></i>
                                                                            <span style={{marginLeft:'2em'}}>{$(partcontactorgan).html()}</span>
                                                                        </Button>
                                                                    </>

                                                                    ))
                                                            */}
                                                        </Row>
                                                        
                                                    </>
                                                    ))

                                                }
                                            </>


                                        ))


                                    }
                                        
                       
                                </>
                                   
                          ))         
                                  
                        } 
                    </div>
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