import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
const parser = new DOMParser();
const partContentIndexes = [];

export default function Orominer(props){
    const [xmlDoc, setXmlDoc] = useState(null);
    const [systemsArr, setSystemsArr] = useState([]);
    const [showItem, setShowItem] = useState([]);
    const [showOrganParts, setShowOrganParts] = useState([]);
    const [showOrganLayers, setShowOrganLayers] = useState([]);
    const [showPartContents, setShowPartContents] = useState([]);
    

    const [systems, setSystems] = useState([]);
    const [allSystems,setAllSystems] = useState([]);
    const [systemSet, setSystemSet ] = useState([
        {
            "systemName" : "",
            "organs": []
        }
    ]);
    

    const headerStyle = {
        fontSize:"1.25em", 
        border:"2px black solid"
     };
    
     const getXML = () => {

        axios.get('/getxmlfile')
        .then(function (response) {
            let xmlData = response.data;
         
            //console.log("xmlData: ",xmlData);
          
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
        
            const newItems2 = [...showOrganParts];
            newItems2[i,j] = !newItems2[i,j];
            setShowOrganParts(newItems2);


            const newItems3 = [...showOrganLayers];
            newItems3[i,j] = !newItems3[i,j];
            setShowOrganLayers(newItems3);
    }


    const togglePartItems = (idx) => {
        //alert(index);
        
            const newItems4 = [...showPartContents];
            newItems4[idx] = !newItems4[idx];
            setShowPartContents(newItems4);


    }
   

     useEffect(() => {
        getXML();
        initializeSystems();
     },[]);

     useEffect(() => {

        let setArr = [];
      
        let partContents = [];

       
        systemsArr.filter((system) => {return $(system).contents()[0].nodeValue != "null"}).forEach((system,i) => {
            const newItems = [...showItem];
            newItems[i] = false;
            setShowItem(newItems);
            partContents[i] = [];


            let item = {"systemName":"","organs":[]};
            //item.systemName = Array.from(system.childNodes).map((node) => { return node.nodeName == "#text" ?  node.nodeValue :  null  })
            let sys = $(system);
            //console.log("Check: ",sys[0].childNodes);
            item.systemName = sys[0].childNodes[0].nodeValue;
            // let sys = [...systems];
            let organs = Array.from(sys[0].childNodes).map((node) =>  { return node.nodeName == "Organ" ? node : null});
            //console.log(item.systemName +" Organs:",organs);
            let organArr = [];
            let partArr = [];
           
            let filtered_organs = Array.from(organs).filter((organ) => {
                return $(organ).val() != null;
            });
            //console.log("Filtered Organs: ", filtered_organs);
           
            Array.from(filtered_organs).forEach((organ,j) => {
               
                 //const newItems2 = [];
                let showParts = [];
                let showOrganLayers = []; 
                showParts[i] = [];
                showOrganLayers[i] = [];
                showParts[i][j] = false;
                showOrganLayers[i][j] = false;
                partContents[i][j] = [];
                
                let organ_contents = $(organ).contents();
                let organ_name  = $(organ).contents()[0].nodeValue;
                let organLayers = [];
                Array.from($(organ).find('Organ_Layer')).map((layer) => {
                    if($(layer).text() != "null")
                        organLayers.push({"name":$(layer).contents()[0].nodeValue});
                });

               
                let p_arts = []; 
                let find_parts = $(organ).find("Part");
                Array.from(find_parts).map((part,k) => {                    
                 
                    let subparts = [];
                    let histo_layers = [];
                    let other_structures = [];
                    let part_contents = $(part).contents();
                    //console.log("Part Contents: ",part_contents);
                    
                    let idx = partContentIndexes.length;
                    console.log("show part content length",idx);
                    partContentIndexes[idx] = false;
                    setShowPartContents(partContentIndexes);


                       

                    
                    Array.from(part_contents).map((content,l) => {
                        //console.log("content: ", $(content));
                        let name = $(content)[0].textContent;
                        let desc = { "type":$(content)[0].nodeName, "name":name, "content":content };
                        partContents[i][j][k] = [];
                        
                        //console.log("Part Content: ",$(content));
                      
                        
                        switch ($(content)[0].nodeName) {
                            case "#text":
                                other_structures.push(desc);
                                break;
                            case "Subpart":                               
                                subparts.push(desc);
                                break;
                            case "histo_Layer":
                                name = $(content)[0].innerHTML;
                                let nameArr = name.split('<');
                                let cont = nameArr.splice(0,1);
                                let remainder = nameArr.join('<');

                                desc = { "type":$(content)[0].nodeName, "name":cont[0], "content":"<"+remainder };
                                histo_layers.push(desc);
                                break;
                        };
                        partContents[i][j][k].push({"subparts":subparts, "histo_layers":histo_layers, "other_structures":other_structures});
                        //console.log("Part Contents: ",partContents[i][j][k]);    
                        //console.log("Show Part Sub Parts: ",showPartSubParts);
                      
                          
                    });    
                    p_arts.push({"name":$(part).contents()[0].nodeValue,"contents":partContents[i][j][k],"showIdx":idx});
                   
                    
                });
               
                        
                //setShowPartContents(showPartSubParts);

               
                organArr.push({"organ_name":organ_name,"organ_layers":organLayers,"parts":p_arts}); 
                setShowOrganLayers(showOrganLayers);
                setShowOrganParts(showParts);
                
                
            });
           
            item.organs = organArr;
            setArr.push(item);
    


        });
        console.log("SystemSet: ", setArr);
        console.log("Show ORgan Parts: ",showOrganParts);
        setSystemSet(setArr);

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
                       
                        {
                             

                             
                            systemsArr != null && systemsArr.length > 0 &&                                
                            systemSet.map((system, j) => (                                
                                <>
                                
                                <Button key={j.toString()} variant="primary" onClick={() => toggleOrgans(j)} size="lg">{system.systemName}</Button>
                              
                        
                                    {

                                        showItem[j] && system.organs.length > 0 &&                                                 
                                        system.organs.map((organ, k) => (
                                            <>
                                                
                                                <Button key={k.toString()} style={{marginLeft:"1em"}}  onClick={() => toggleOrganItems(j,k)} variant="info">
                                                    <div style={{position:"relative",width:"100%"}}>
                                                        <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                        <span style={{float:"left",marginLeft:"1.5em",textWrap:"wrap",height:"auto"}}>Organ: <font color="red">{organ.organ_name}</font></span>     
                                                        <span style={{width:"100%",float:"left"}}>{ organ.parts.length > 0 ? <span><font color="red">{organ.parts.length}</font> Organ Parts</span> : 
                                                            <span><font color="red">0</font> Organ Parts</span> }</span>
                                                        <span style={{width:"100%",float:"left"}}>{ organ.organ_layers.length > 0 ? <span><font color="red">{organ.organ_layers.length}</font> Organ Layers</span> : 
                                                            <span><font color="red">0</font> Organ Layers</span> }</span>
                                                  
                                                    </div>
                                                    
                                                </Button>

                                                {
                                                showOrganParts[j,k] && organ.parts.length > 0 &&
                                                    Array.from(organ.parts).map((part, l) => (
                                                    <>
                                                        
                                                        <Button  key={l.toString()} onClick={() => togglePartItems(part.showIdx)} style={{width:"20em",fontSize:"1em",marginLeft:"2em"}} variant="light" className="d-inline-flex justify-content-start inline">
                                                            <div style={{position:"relative",width:"100%"}}>
                                                                <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                <div style={{width:"100%",float:"left",marginTop:"-3em"}}><span>Organ Part:</span><br/><font color="red">{part.name}</font></div>
                                                            </div>
                                                            
                                                        </Button>
                                                        {console.log("Show Part SubParts: ", showPartContents[part.showIdx])}
                                                       
                                                        {   
                                                           showPartContents[part.showIdx] && part.contents[0].histo_layers.length > 0 &&
                                                            part.contents[0].histo_layers.map((layer,m) => (
                                                           <>
                                                               <Button key={m.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"2em"}} variant="light" className="d-inline-flex justify-content-start inline">
                                                                   <div style={{position:"relative",width:"100%"}}>
                                                                       <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                       <div style={{width:"100%",float:"left",marginTop:"-3em"}}><span>Part Histo_Layer:</span><br/><font color="red">test</font></div>
                                                                   </div>
                                                                   
                                                               </Button>
                                                           </>
                                                            ))

                                                       }
                                                         
                                                        
                                                    </>
                                                    ))
                                                

                                                }
                                               

                                                {
                                                showOrganLayers[j,k] && organ.organ_layers.length > 0 &&
                                                    Array.from(organ.organ_layers).map((organ_layer, l) => (
                                                    <>
                                                        
                                                        <Button  key={l.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"2em",backgroundColor:"lightGray"}}  className="d-inline-flex justify-content-start inline">
                                                            <div style={{position:"relative",width:"100%"}}>
                                                                <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                <div style={{width:"100%",float:"left",marginTop:"-3em"}}><span style={{color:"black"}}>Organ Layer:</span><br/><font color="red">{organ_layer.name}</font></div>
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