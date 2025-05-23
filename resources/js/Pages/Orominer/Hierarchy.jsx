import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
const parser = new DOMParser();
const partContentIndexes = [];
const organLayerIndexes = [];


export default function Hierarchy(props){
    const [xmlDoc, setXmlDoc] = useState(null);
    const [systemsArr, setSystemsArr] = useState([]);
    const [showOrgans, setShowOrgans] = useState([]);
    const [showOrganParts, setShowOrganParts] = useState([]);
    const [showOrganLayers, setShowOrganLayers] = useState([]);
    const [showPartContents, setShowPartContents] = useState([]);
    const [histoLayerNode, setHistoLayerNode] = useState(false);
    const [otherStructuresNode, setOtherStructuresNode ] = useState(false);
    

    const [systems, setSystems] = useState([]);
    const [allSystems,setAllSystems] = useState([]);
    const [systemSet, setSystemSet ] = useState([
        {
            "systemName" : "",
            "organs": []
        }
    ]);
    

    
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
        
            const newItems2 = [...showOrgans];
            newItems2[index] = !newItems2[index];
            setShowOrgans(newItems2);
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
        console.log("Selected Index:", idx);
        const newItems4 = [...showPartContents];
        newItems4[idx] = !newItems4[idx];
        setShowPartContents(newItems4);        
    }

    const getPartContentIdx = () => {
        let idx = partContentIndexes.length;
        //console.log("show part content length",idx);
        partContentIndexes[idx] = false;
        setShowPartContents(partContentIndexes);
        return idx;
    }

    const getOrganLayerIdx = () => {
        let idx = organLayerIndexes.length;
        //console.log("show part content length",idx);
        organLayerIndexes[idx] = false;
        setShowOrganLayers(partContentIndexes);
        return idx;
    }

    const ContentButton = (props) => {


        return (
            <>

            {
                !(props.items === undefined) && Array.from(props.items).filter((item) => item.name != "null").length > 0 ?
                <Button onClick={() => togglePartItems(props.idx)}  style={{width:"100%",float:"left",height:"2.5em",fontSize:"1em"}} variant="light">
                {
                    
                    <div style={{position:"relative",width:"100%"}}>
                        <span style={{float:"left",width:"80%",fontSize:"0.9em",color:"#800080"}}>
                            {!showPartContents[props.idx] && <span style={{color:"green"}}><b>Click to See&nbsp;&nbsp;</b></span>}
                            {showPartContents[props.idx] && <span><b>Click to Close&nbsp;&nbsp;</b></span>}
                            <font color="red">
                                { props.items.filter((item) => item.name != "null" ).length}
                                <span style={{color:"black",marginLeft:"0.5em"}}>{props.name}</span>
                            </font> 
                            
                        </span> 
                        <span style={{float:"right",width:"20%",transform:"scale(0.75)",marginTop:"-38px",marginLeft:"5px",color:"#800080"}}>
                            {!showPartContents[props.idx] && <span style={{color:"green"}}><i className="bi bi-box-arrow-in-down"></i></span>}
                            {showPartContents[props.idx] && <i className="bi bi-x"></i>}
                        </span>                      
                    </div>                                                                   

                    }
            
                </Button>
                :   <Container className="d-flex justify-content-center" style={{color:"black",padding:"0.5em",margin:"0.25em 0",border:"1px solid white",borderRadius:"5px",backgroundColor:"white"}}>
                        <span ><font color="red">0&nbsp;&nbsp;</font>{props.name}</span>
                    </Container> 


            }
         

            </>
           
               
        );

    };


    const SystemContentButton = (props) => {


        return (
            <>

            {
                !(props.items === undefined) && Array.from(props.items).filter((item) => item.name != "null").length > 0 ?
                <Button onClick={() => toggleOrgans(props.idx)}  style={{width:"100%",float:"left",height:"2.5em",fontSize:"1em"}} variant="light">
                {
                    
                    <div style={{position:"relative",width:"100%"}}>
                        <span style={{float:"left",width:"80%",fontSize:"0.9em"}}>
                            {!showOrgans[props.idx] && <span style={{color:"green"}}><b>Click to See&nbsp;&nbsp;</b></span>}
                            {showOrgans[props.idx] && <span style={{color:"#800080"}}><b>Click to Close&nbsp;&nbsp;</b></span>}
                            <font color="red">
                                { props.items.filter((item) => item.name != "null" ).length}
                                <span style={{color:"black",marginLeft:"0.5em"}}>{props.name}</span>
                            </font> 
                            
                        </span> 
                        <span style={{float:"right",width:"20%",transform:"scale(0.75)",marginTop:"-38px",marginLeft:"5px",color:"#800080"}}>
                            {!showOrgans[props.idx] && <span style={{color:"green"}}><i className="bi bi-box-arrow-in-down"></i></span>}
                            {showOrgans[props.idx] && <i className="bi bi-x"></i>}
                        </span>                      
                    </div>                                                                   

                    }
            
                </Button>
                :   <Container className="d-flex justify-content-center" style={{color:"black",padding:"0.5em",margin:"0.25em 0",border:"1px solid white",borderRadius:"5px",backgroundColor:"white"}}>
                        <span ><font color="red">0&nbsp;&nbsp;</font>{props.name}</span>
                    </Container> 


            }
         

            </>
           
               
        );

    };


    
   

     useEffect(() => {
        getXML();
        initializeSystems();
     },[]);

     useEffect(() => {

        let setArr = [];
      
        let partContents = [];
        
       
        systemsArr.filter((system) => {return $(system).contents()[0].nodeValue != "null"}).forEach((system,i) => {
            const newItems = [...showOrgans];
            newItems[i] = false;
            setShowOrgans(newItems);
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
               
                partContents[i][j] = [];
                
                let organ_contents = $(organ).contents();
                let organ_name  = $(organ).contents()[0].nodeValue;
                let organLayers = [];
                Array.from($(organ).find('Organ_Layer')).map((layer) => {
                    if($(layer).text() != "null")
                        organLayers.push({"name":$(layer).contents()[0].nodeValue,"organ_layer_idx":getOrganLayerIdx()});
                });

               
                let p_arts = []; 
                let find_parts = $(organ).find("Part");
                Array.from(find_parts).map((part,k) => {                    
                 
                    let subparts = [];
                    let histo_layers = [];
                    let part_contents = $(part).contents();
                    //console.log("Part Contents: ",part_contents);
                    
                    let idx = getPartContentIdx();


                       
                        
                    let part_other_structures = [];
                    Array.from(part_contents).map((part_content,l) => {
                        //console.log("content: ", $(part_content));
                        let name;
                        let desc;
                        let nameArr;
                        let cont;
                        let remainder;
                        let idx;
                        partContents[i][j][k] = [];
                        
                        //console.log("Part Content: ",$(content));
                      
                        let histo_layer_Obj = {
                            "name":"",
                            "histo_sublayers":[],
                            "histo_layer_idx":""
                        };
                        switch ($(part_content)[0].nodeName) {
                            case "#text":
                               
                                let other_structure_name = $(part_content)[0].textContent;
                                let other_structure = part_content;
                                desc = { "type":$(part_content)[0].nodeName, "name":other_structure_name, "content":other_structure,"other_structure_idx":getPartContentIdx()};

                                part_other_structures.push(desc);
                                break;
                            case "Subpart":     
                                name = $(part_content)[0].innerHTML;
                                nameArr = name.split('<');
                                cont = nameArr.splice(0,1);
                                let subpart = part_content;
                                let subpart_name = cont[0];
                                remainder = nameArr.join('<');

                                idx = partContentIndexes.length;
                                //console.log("show part content length",idx);
                                partContentIndexes[idx] = false;
                                setShowPartContents(partContentIndexes);
                               
                                desc = { "type":$(subpart)[0].nodeName, "name":subpart_name, "content":$(subpart).contents(), "subpart_idx":getPartContentIdx() };
                                histo_layers.push(desc);
                            
                                subparts.push(desc);
                                break;
                            case "histo_Layer":
                                name = $(part_content)[0].innerHTML;
                                nameArr = name.split('<');
                                cont = nameArr.splice(0,1);
                                remainder = nameArr.join('<');
                                let histo_layer = part_content;
                                let histo_layer_name = cont[0];
                                
                                let histo_sublayers = $(histo_layer).find("histo_Sublayer");   
                                //console.log("histo_Sublayers: ",histo_sublayers);
                               
                                Array.from(histo_sublayers).map((histo_sublayer) => {
                                    let name = histo_sublayer.innerHTML;
                                    //console.log("sublayer contents", $(sublayer).contents());
                                    let nameArr = name.split('<');
                                    let cont = nameArr.splice(0,1);
                                    let histo_sublayer_name = cont[0];
                                    
                                     
                                    let histo_sublayers_Obj = {
                                        "name":histo_sublayer_name,
                                        "type":$(histo_sublayer)[0].nodeName,
                                        "histo_chars":[],
                                        "other_structures":[],
                                        "histo_sublayer_idx":getPartContentIdx()
                                    };
                                    let histo_char_other_structures = [];
                                    //console.log("SubLayer Contents:",$(histo_sublayer).contents());
                                    Array.from($(histo_sublayer).contents()).map((histo_sublayer_content,n) => {
                                        
                                        switch ($(histo_sublayer_content)[0].nodeName) {
                                            case "#text":
                                              
                                                name = $(histo_sublayer_content)[0].textContent;
                                                desc = { "type":$(histo_sublayer_content)[0].nodeName, "name":histo_sublayer_name, "content":histo_sublayer_content,"other_structure_idx":getPartContentIdx()};
                
                                                histo_sublayers_Obj.other_structures.push(desc);
                                                break;                                           
                                            case "histo_Char":
                                                name = $(histo_sublayer_content)[0].innerHTML;
                                                nameArr = name.split('<');
                                                cont = nameArr.splice(0,1);
                                                remainder = nameArr.join('<');
                                                let histo_char_name = cont[0];
                                                let histo_char = histo_sublayer_content;
                                                
                                               
                                                let cells = $(histo_sublayer_content).find("Cell");   
                                                console.log("Number of Cells: ",cells.length);
                                                let cells_Obj = {
                                                    "cells":[]
                                                };

                                                histo_sublayers_Obj
                                               
                                                histo_sublayers_Obj.histo_chars.push({"type":$(histo_char)[0].nodeName,"name":histo_char_name,"content":histo_char,"histo_char_idx":getPartContentIdx()});
                                                   
                                                
                                                
                                                Array.from(cells).map((cell) => {
                                                    let name = cell.innerHTML;
                                                    //console.log("sublayer contents", $(sublayer).contents());
                                                    let nameArr = name.split('<');
                                                    let cont = nameArr.splice(0,1);
                                                    let cell_name = cont[0];
                                                    idx = partContentIndexes.length;
                                                    //console.log("show part content length",idx);
                                                    partContentIndexes[idx] = false;
                                                    setShowPartContents(partContentIndexes); 

                                                    
                                                    //console.log("histo_Char Contents:",$(histo_char).contents());
                                                  
                                                });
                                                break;
                                        };

                                    });

                                    histo_layer_Obj.name = histo_layer_name;
                                    histo_layer_Obj.histo_sublayers.push(histo_sublayers_Obj);
                                    histo_layer_Obj.histo_layer_idx = getPartContentIdx();

            

                                });
                                 //console.log("histo_sublayers_Obj: ", histo_layers_Obj);



                                desc = { "type":$(histo_layer)[0].nodeName, "name":histo_layer_name, "content":histo_layer_Obj, "histo_layer_idx":getPartContentIdx()};
                                //console.log("histo_layer html/contents: ",$(content).contents());
                                histo_layers.push(desc);
                                break;
                        };
                       
                        partContents[i][j][k].push({"subparts":subparts, "histo_layers":histo_layers, "other_structures":part_other_structures});
                        //console.log("Part Contents: ",partContents[i][j][k]);   
                      
                          
                    });    
                    p_arts.push({"name":$(part).contents()[0].nodeValue,"contents":partContents[i][j][k],"part_idx":idx,
                         "part_histo_layers_idx":getPartContentIdx(),"part_subparts_idx":getPartContentIdx(),"part_other_structures_idx":getPartContentIdx()});
                   
                    
                });
               
                        
                //setShowPartContents(showPartSubParts);

               
                organArr.push({"organ_name":organ_name,"organ_layers":organLayers,"parts":p_arts,"organ_organ_layers_idx":getOrganLayerIdx(),"organ_organ_parts_idx":getOrganLayerIdx()}); 
                
                
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
    <Container className="d-grid gap-1">
        {              
        systemsArr != null && systemsArr.length > 0 &&                                
        systemSet.map((system, j) => (                                
        <>
            
            <Container key={j.toString()} style={{width:"75%",marginLeft:"1em",padding:"1.5em",backgroundColor:"#ffff99",
                                border:"2px solid black", borderRadius:"10px",marginTop:"1.5em"}} >
                <Row><p>System:&nbsp;&nbsp;<span style={{color:"red"}}>{system.systemName}</span></p></Row>                     
                <Row><SystemContentButton idx={j} items={system.organs} name="System Organs"/></Row>  

            </Container>      
                {
                    showOrgans[j] && system.organs.length > 0 &&                                                 
                    system.organs.map((organ, k) => (
                        <>
                            
                            <Container key={k.toString()} style={{width:"75%",marginLeft:"2em",padding:"1.5em",backgroundColor:"#e6eeff",
                                border:"2px solid black", borderRadius:"10px",marginTop:"1em",marginBottom:"1em"}} >
                                <Row>
                                    <Col lg="2">
                                    <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)",color:"black"}} className="bi bi-arrow-return-right"></i>
                                    </Col>
                                    <Col lg="" style={{color:"black",fontSize:"1.2em"}} className="d-flex justify-content-start">
                                        <span>Organ: </span>&nbsp;&nbsp;<span style={{color:"red"}}>{organ.organ_name}</span>
                                    </Col>
                                    
                                </Row>                                 
                                <Row><ContentButton idx={organ.organ_organ_parts_idx} items={organ.parts} name="Organ Parts"/></Row>
                                <Row><ContentButton idx={organ.organ_organ_layers_idx} items={organ.organ_layers} name="Organ Layers"/></Row>  
                            </Container>

                            {
                            showPartContents[organ.organ_organ_parts_idx] && organ.parts.length > 0 &&
                                Array.from(organ.parts).map((part, l) => (
                                <>
                                    
                                    <Container  key={l.toString()} style={{width:"75%",height:"auto",color:"black",fontSize:"1em",marginBottom:"1em",
                                        border:"2px solid black", borderRadius:"10px",padding:"1.5em",marginLeft:"3em",marginTop:"1em",backgroundColor:"#ffe6f2"}} >
                                            <Row>
                                                <Col lg="2">
                                                    <i style={{marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                </Col>
                                                <Col lg="8" style={{color:"black",fontSize:"1.2em"}} className="d-flex justify-content-start">
                                                    <span>Organ Part:</span>&nbsp;&nbsp;<span style={{color:"red"}}>{part.name}</span>
                                                </Col>
                                              
                                            </Row> 
                                            {console.log("Part Contents:", part.contents)}
                                            <Row><ContentButton idx={part.part_histo_layers_idx} items={part.contents[0].histo_layers} name="Part Histo-Layers"/></Row>
                                            <Row><ContentButton idx={part.part_other_structures_idx} items={part.contents[0].other_structures} name="Part Structures"/></Row>
                                            <Row><ContentButton idx={part.part_subparts_idx} items={part.contents[0].subparts} name="Part Sub-Parts"/></Row>
                                       
                                        
                                    </Container>
                                    {/*console.log("Show Part SubParts: ", showPartContents[part.showIdx])*/}
                                
                                    {   
                                    showPartContents[part.part_histo_layers_idx] && part.contents[0].histo_layers.length > 0 &&
                                        part.contents[0].histo_layers.filter((histo_layer) => {return histo_layer.name != "null"}).map((histo_layer,m) => (
                                        <>
                                            <Container key={m.toString()} style={{width:"75%",fontSize:"1.0em",padding:"1.5em",marginLeft:"4em",border:"2px solid black", borderRadius:"10px",
                                                marginTop:"1em",backgroundColor:"#e5ffe5",
                                                color:"black"}}>
                                                <Row style={{marginBottom:"0.5em"}}>
                                                    <Col lg="2">
                                                        <i style={{marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                    </Col>
                                                    <Col lg="8" className="d-flex justify-content-start" style={{color:"black",marginLeft:"-1em"}}>
                                                        <span>Part Histo_Layer:</span>&nbsp;&nbsp;<span style={{color:"red"}}>{histo_layer.name}</span>
                                                    </Col>                                                
                                                </Row>            
                                                <Row><ContentButton idx={histo_layer.histo_layer_idx} items={histo_layer.content.histo_sublayers} name="Histo_SubLayers"/></Row>
                                             </Container>

                                            {   
                                                showPartContents[histo_layer.histo_layer_idx] && histo_layer.content.histo_sublayers != "undefined" && histo_layer.content.histo_sublayers.length > 0 
                                                &&
                                                histo_layer.content.histo_sublayers.map((histo_sublayer,m) => (
                                                <>
                                                    <Container key={m.toString()} style={{width:"75%",fontSize:"1em",marginLeft:"4em",
                                                        padding:"1em",border:"2px solid black", borderRadius:"10px",
                                                        backgroundColor:"#ccffff",color:"black"}}>
                                                        <Row style={{marginBottom:"0.5em"}}>
                                                            <Col lg="2">
                                                                <i style={{marginLeft:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                            </Col>
                                                            <Col lg="8" className="d-flex justify-content-start" style={{color:"black",marginLeft:"1em"}}>
                                                                <span>Histo_SubLayers:</span>&nbsp;&nbsp;<span style={{color:"red"}}>{histo_sublayer.name}</span>
                                                            </Col>                                                
                                                        </Row>   
                                                    </Container>
                                                </>
                                                ))
                                            }




                                        </>
                                        ))
                                    }
                                    
                                    {

                                        showPartContents[part.part_subparts_idx] && part.contents[0].subparts.length > 0  &&
                                        part.contents[0].subparts.filter((subpart) => {return subpart.name != "null"}).map((subpart,m) => (
                                        <>
                                            <Container key={m.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"4em",padding:"1em",border:"2px solid black", borderRadius:"10px",
                                                backgroundColor:"#e8daef",color:"black"}}>
                                               
                                                <Row style={{marginBottom:"0.5em"}}>
                                                    <Col lg="2">
                                                        <i style={{marginLeft:"-0.25em",marginTop:"0em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                    </Col>
                                                    <Col lg="8" className="d-flex justify-content-start" style={{color:"black",marginLeft:"1em"}}>
                                                        <span>Part Sub-Part:</span>&nbsp;&nbsp;<span style={{color:"red"}}>{subpart.name}</span>
                                                    </Col>                                                
                                                </Row>                                                  
                                            </Container>
                                        </>
                                        ))


                                    }
                                    {   
                                    showPartContents[part.part_other_structures_idx] && part.contents[0].other_structures.length > 0  &&
                                        part.contents[0].other_structures.filter((other_structure) => {return other_structure.name != "null"}).map((other_structure,n) => (
                                        <>
                                            <Container key={n.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"4em",marginTop:"1em",marginBottom:"1em",
                                            padding:"1em",border:"2px solid black", borderRadius:"10px",
                                                backgroundColor:" #f9ffe6",color:"black"}}>

                                                <Row style={{marginBottom:"0.5em"}}>
                                                    <Col lg="2">
                                                        <i style={{marginLeft:"-0.25em",marginTop:"0em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                    </Col>
                                                    <Col lg="8" className="d-flex justify-content-center" style={{color:"black",marginLeft:"1em"}}>
                                                        <span>Part Structures:</span>&nbsp;&nbsp;<span style={{color:"red"}}>{other_structure.name}</span>
                                                    </Col>                                                
                                                </Row>     
                                            </Container>
                                        </>
                                        ))
                                    }

                                
                                </>
                                ))
                            

                            }
                        

                            {
                            showPartContents[organ.organ_organ_layers_idx] && organ.organ_layers.length > 0 &&
                                Array.from(organ.organ_layers).map((organ_layer, l) => (
                                <>
                                    
                                    <Button  key={l.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"3em",padding:"1em",border:"2px solid black", borderRadius:"10px",
                                        backgroundColor:"lightGray",color:"black"}}  className="d-inline-flex justify-content-start inline">
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
    </Container>
    </>
    );




}