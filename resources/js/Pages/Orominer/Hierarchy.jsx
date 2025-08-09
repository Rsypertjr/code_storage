import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
const parser = new DOMParser();
const itemIndexes = [];
const organLayerIndexes = [];
let local_systems;
let systemsArr = [];
let systemReferenceArr = [];
let systems = [];


export default function Hierarchy(props){
    const [xmlDoc, setXmlDoc] = useState(null);
    //const [systemsArr, setSystemsArr] = useState([]);
    const [showOrganParts, setShowOrganParts] = useState([]);
    const [showOrganLayers, setShowOrganLayers] = useState([]);
    const [histoLayerNode, setHistoLayerNode] = useState(false);
    const [otherStructuresNode, setOtherStructuresNode ] = useState(false);
    const [systemReference, setSystemReference] = useState({});
   // const [systemReferenceArr, setSystemReferenceArr] = useState([]);
    //const [systems, setSystems] = useState([]);
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
            let xml_doc = parser.parseFromString(xmlData,'text/xml');
            let s_ystems = $(xml_doc).find('System');
            systems = s_ystems;
            setXmlDoc(xml_doc);
            systemsArr = Array.from(systems);
        });
     };


    const initializeSystems = () => {
       
     }


    const openSystemOrgans = (e) => {
        props.openSystemOrgans(e);
    };
   

    const getItemIdx = () => {
        let idx = itemIndexes.length;
        itemIndexes[idx] = false;
        props.setShowItemContents(itemIndexes);  // Set boolean  variable used for toggling show of Part Content
        return idx;
    }

    const getOrganLayerIdx = () => {
        let idx = organLayerIndexes.length;
        organLayerIndexes[idx] = false;
        setShowOrganLayers(organLayerIndexes);
        return idx;
    }

    const useReferenceObject = (obj) => {
        console.log("use:",obj);

        let local_obj = Object.assign({},obj);

        props.useReferenceObject(local_obj);

    };


    const ContentButton = (props) => {

        //console.log("Content Button Props:", props);
        return (
            <>
            {
                !(props.items === undefined) && Array.from(props.items).filter((item) => item.name != "null").length > 0 
                ?        
                /* If items exist: show open/close button, number of items, open/close icon  */       
                <Button style={{width:"100%",float:"left",height:"2.5em",fontSize:"0.9em"}} variant="light">
                {                   
                    <div style={{position:"relative",width:"100%"}}>
                        <span style={{float:"left",width:"80%",fontSize:"0.9em",color:"#800080"}}>
                            {/* Open or Close */}
                            {!props.showItemContents[props.idx] && <span style={{color:"green"}}><b>Click to See&nbsp;&nbsp;</b></span>}
                            {props.showItemContents[props.idx] && <span><b>Click to Close&nbsp;&nbsp;</b></span>}

                            {/* How many to Open or Close */}
                            <font color="red">
                                { props.items.filter((item) => item.name != "null" ).length}
                                <span style={{color:"black",fontWeight:"bold", marginLeft:"0.5em"}}>{props.name}</span>
                            </font> 
                            
                        </span> 
                        {/* Open or Close Icon */}
                        <span style={{float:"right",width:"20%",transform:"scale(0.75)",marginTop:"-30px",marginLeft:"5px",color:"#800080"}}>
                            {!props.showItemContents[props.idx] && <span style={{color:"green"}}><i className="bi bi-box-arrow-in-down"></i></span>}
                            {props.showItemContents[props.idx] && <i className="bi bi-x"></i>}
                        </span>                      
                    </div>                                                                   

                    }
            
                </Button>
                :   
                /* If not items, show 0 items */
                <Container className="d-flex justify-content-center" style={{fontSize:"0.9em",color:"black",padding:"0.5em",margin:"0.25em 0",border:"1px solid white",borderRadius:"5px",backgroundColor:"white"}}>
                    <span ><font color="red">0&nbsp;&nbsp;</font>{props.name}</span>
                </Container> 
            }  
            </>
        );
    };


    const SystemContentButton = (props) => {
       // console.log("System Content Button props:", props);
        return (
            <>
            {
                !(props.items === undefined) && Array.from(props.items).filter((item) => item.name != "null").length > 0 
                ?
                /* If system organs exit:  show open/close, number of them, open/close icon  */
                <Button style={{width:"100%",float:"left",height:"2.5em",fontSize:"1em"}} variant="light">
                {
                    <div style={{position:"relative",width:"100%"}}>
                        {/* Open or Close */}
                        <span style={{float:"left",width:"80%",fontSize:"0.9em"}}>
                            {!props.showSystemOrgans[props.idx] && <span style={{color:"green"}}><b>Click to See&nbsp;&nbsp;</b></span>}
                            {props.showSystemOrgans[props.idx] && <span style={{color:"#800080"}}><b>Click to Close&nbsp;&nbsp;</b></span>}
                            <font color="red">
                                { props.items.filter((item) => item.name != "null" ).length}
                                <span style={{color:"black",marginLeft:"0.5em"}}>{props.name}</span>
                            </font>                             
                        </span> 
                        {/* Open or Close Icon */}
                        <span style={{float:"right",width:"20%",transform:"scale(0.75)",marginTop:"-30px",marginLeft:"5px",color:"#800080"}}>
                            {!props.showSystemOrgans[props.idx] && <span style={{color:"green"}}><i className="bi bi-box-arrow-in-down"></i></span>}
                            {props.showSystemOrgans[props.idx] && <i className="bi bi-x"></i>}
                        </span>                      
                    </div>   
                }            
                </Button>
                :   
                <Container className="d-flex justify-content-center" style={{color:"black",padding:"0.5em",margin:"0.25em 0",border:"1px solid white",borderRadius:"5px",backgroundColor:"white"}}>
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
        let systemsRefArr = [];
        let organ_name = '';
       
        systemsArr.filter((system) => {return $(system).contents()[0].nodeValue != "null"})
        .forEach((system,i) => {

            // Initialize Systems not the show Organs
            const newItems = [...props.showSystemOrgans];
            newItems[i] = false;
            props.setShowSystemOrgans(newItems);
            partContents[i] = [];
            systemsRefArr[i] = {};         

            let item = {"systemName":"","organs":[]};  // Item Object for system and its organs
            let sys = $(system);  // Get system and its children
            item.systemName = sys[0].childNodes[0].nodeValue;  // Get system name
            systemsRefArr[i].system_name = item.systemName;
            // Get organs for the system
            let organs = Array.from(sys[0].childNodes).map((node) =>  { return node.nodeName == "Organ" ? node : null});

            let organArr = [];
            let partArr = [];        
            
            // Filter out organs with a null value
            let filtered_organs = Array.from(organs).filter((organ) => {
                return $(organ).val() != null;
            });
         
            systemsRefArr[i].organs = [];
            Array.from(filtered_organs).forEach((organ,j) => {
               
                partContents[i][j] = [];
                systemsRefArr[i].organs[j] = {};
                let organ_contents = $(organ).contents(); // Get contents for each organ
                organ_name = organ_contents[0].textContent;  // Get name for the organ              
                systemsRefArr[i].organs[j].organ_name = organ_name;
                systemsRefArr[i].organs[j].organ_idx = getItemIdx();
                // Find Organ Layers and build array for them
                // use getOrganLayerIdx() for a unique organ_layer_idx

                let organLayers = []; 
                systemsRefArr[i].organs[j].organ_layers = [];
                Array.from($(organ).find('Organ_Layer')).map((layer) => {
                    if($(layer).text() != "null"){
                        organLayers.push({"name":$(layer).contents()[0].nodeValue,"organ_layer_idx":getItemIdx()}); 
                        systemsRefArr[i].organs[j].organ_layers.push({});
                        let length = systemsRefArr[i].organs[j].organ_layers.length;
                        systemsRefArr[i].organs[j].organ_layers[length-1].organ_layer_name = $(layer).contents()[0].nodeValue;
                        systemsRefArr[i].organs[j].organ_layers[length-1].organ_layer_idx = getItemIdx();
                    }
                });

                

                // Find Parts from Organ
                let p_arts = []; 
                systemsRefArr[i].organs[j].parts = [];
                let find_parts = $(organ).find("Part");
                // Find Part Contents from Part
                Array.from(find_parts).map((part,k) => {                       
                    let subparts = []; // Will hold Subparts
                    let histo_layers = [];  // Will hold Histo Layers
                    let part_other_structures = [];  // Will hold Other Structures

                    // Building Reference Object
                    systemsRefArr[i].organs[j].parts[k] = {};
                    systemsRefArr[i].organs[j].parts[k].part_name = $(part).contents()[0].nodeValue;
                    systemsRefArr[i].organs[j].parts[k].parts_idx = getItemIdx();
                    systemsRefArr[i].organs[j].parts[k].subparts = [];
                    systemsRefArr[i].organs[j].parts[k].histo_layers = [];
                    systemsRefArr[i].organs[j].parts[k].part_other_structures = [];


                    let part_contents = $(part).contents();  // Content of each Part
                    let idx = getItemIdx();  // Provides unique number for part_idx later on                       
                        
                    // Get other structures, histo layers, and subparts from Part Contents
                   
                    Array.from(part_contents).map((part_content,l) => {
                        let name;
                        let desc;
                        let nameArr;
                        let cont;
                        //let remainder;
                        let idx;
                        partContents[i][j][k] = [];
                        
                        // Define Histo Layer Obj to hold Histo Sublayer contents
                        let histo_layer_Obj = {
                            "name":"",
                            "histo_sublayers":[],
                            "histo_layer_idx":""
                        };
                        switch ($(part_content)[0].nodeName) {
                            case "#text":
                               
                                let other_structure_name = $(part_content)[0].textContent;
                                let other_structure = part_content;
                                // getPartContentIdx provides unique number for other_structure_idx
                                desc = { "type":$(part_content)[0].nodeName, "name":other_structure_name, "content":other_structure,"other_structure_idx":getItemIdx()};

                                part_other_structures.push(desc);

                                // Build Reference Object
                                if(other_structure_name !== 'null')
                                    systemsRefArr[i].organs[j].parts[k].part_other_structures.push({"other_structure_name":other_structure_name}); 

                                break;
                            case "Subpart":     
                                name = $(part_content)[0].innerHTML;
                                nameArr = name.split('<');
                                cont = nameArr.splice(0,1);
                                let subpart = part_content;
                                let subpart_name = cont[0];
                                //remainder = nameArr.join('<');

                                idx = getItemIdx();
                                
                                // Subpart description and contents
                                desc = { 
                                    "type":$(subpart)[0].nodeName, 
                                    "name":subpart_name, 
                                    "content":$(subpart).contents(), 
                                    "subpart_idx":getItemIdx() 
                                };
                                subparts.push(desc);

                                // Build Reference Object
                                if(subpart_name !== 'null')
                                    systemsRefArr[i].organs[j].parts[k].subparts.push({"subpart_name":subpart_name}); 

                                break;
                            case "histo_Layer":
                                name = $(part_content)[0].innerHTML;
                                nameArr = name.split('<');
                                cont = nameArr.splice(0,1);
                                //remainder = nameArr.join('<');

                                let histo_layer = part_content;
                                let histo_layer_name = cont[0];   
                                let length;
                                // Build Reference Object
                                if(histo_layer_name !== 'null'){
                                    systemsRefArr[i].organs[j].parts[k].histo_layers.push({}); 
                                    length = systemsRefArr[i].organs[j].parts[k].histo_layers.length;
                                    systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1] = {
                                        "histo_sublayers":[],
                                        "histo_layer_name":histo_layer_name
                                    };

                                }

                                let histo_sublayers = $(histo_layer).find("histo_Sublayer");   
                                

                                // Get histo sublayers from histo layer
                                Array.from(histo_sublayers).map((histo_sublayer) => {
                                    let name = histo_sublayer.innerHTML;
                                    let nameArr = name.split('<');
                                    let cont = nameArr.splice(0,1);
                                    let histo_sublayer_name = cont[0];                                    
                                    
                                    systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1].histo_sublayers.push({});
                                    let length2 = systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1].histo_sublayers.length;
                                    systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1].histo_sublayers[length2 - 1] = {
                                        "histo_chars":[],
                                        "other_structures":[],
                                        "histo_sublayer_name":name
                                    };


                                    // Define Object for Histo Sublayer to hold name, histo_chars, other_structures, and its own content
                                    // getPartContentIdx() is used for unique id's
                                    let histo_sublayer_Obj = {
                                        "name":histo_sublayer_name,
                                        "type":$(histo_sublayer)[0].nodeName,
                                        "histo_chars":[],
                                        "other_structures":[],
                                        "content":histo_sublayer,
                                        "histo_sublayer_idx":getItemIdx(),
                                        "histo_sublayer_histo_chars_idx":getItemIdx()
                                    };

                                  
                                    let histo_chars_Arr = [];  // Will hold Histo Chars
                                    
                                    // Get histo chars from histo sublayer
                                    Array.from($(histo_sublayer).contents()).map((histo_sublayer_content,n) => {
                                        
                                        switch ($(histo_sublayer_content)[0].nodeName) {
                                            case "#text":                                              
                                                name = $(histo_sublayer_content)[0].textContent;
                                                desc = { "type":$(histo_sublayer_content)[0].nodeName, "name":histo_sublayer_name, "content":histo_sublayer_content,"other_structure_idx":getItemIdx()};
                
                                                histo_sublayer_Obj.other_structures.push(desc);

                                                // Build Reference Object
                                                systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1].histo_sublayers[length2 - 1].other_structures
                                                    .push({"other_structures_name": name});

                                                break;                                           
                                            case "histo_Char":
                                                name = $(histo_sublayer_content)[0].innerHTML;
                                                nameArr = name.split('<');
                                                cont = nameArr.splice(0,1);
                                                //remainder = nameArr.join('<');
                                                let histo_char_name = cont[0];
                                                let histo_char = histo_sublayer_content;                                   
                                               
                                                // Build Reference Object
                                                systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1].histo_sublayers[length2 - 1].histo_chars
                                                    .push({}); 

                                                let length3 = systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1].histo_sublayers[length2 - 1]
                                                  .histo_chars.length;

                                                systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1].histo_sublayers[length2 - 1]
                                                  .histo_chars[length3 - 1] = {
                                                    "cells": [],
                                                    "ecell_matrices":[],
                                                    "histo_char_name": histo_char_name
                                                  };
                                                


                                                // Find cells from Histo Char and build Cells array
                                                // getPartContentIdx() provides unique id for the cell
                                                let cells_Obj = [];
                                                let cells = $(histo_char).find("Cell");  
                                                Array.from(cells).map((cell) => {   
                                                    let name = $(cell)[0].textContent; 

                                                    if(name !== null || name !== 'null'){
                                                         cells_Obj.push({"name":name,"type":$(cell)[0].nodeName,"cell_idx":getItemIdx()});

                                                         // Build Reference Object
                                                         systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1].histo_sublayers[length2 - 1]
                                                            .histo_chars[length3 - 1].cells.push({"cell_name":name});
                                                     }                                            
                                                   
                                                });

                                                // Find Ecell-Matrix from Histo Char and build Cells array
                                                // getPartContentIdx() provides unique id for the Ecell-Matrix
                                                let ecell_Matrices_Obj = []
                                                let Ecell_Matrices = $(histo_char).find("Ecell_Matrix");  
                                                Array.from(Ecell_Matrices).map((ecell_matrix) => {   
                                                    let name = $(ecell_matrix)[0].textContent;   
                                                    if(name !== null || name !== 'null'){
                                                        ecell_Matrices_Obj.push({"name":name,"type":$(ecell_matrix)[0].nodeName,"ecell_matirix_idx":getItemIdx()});                                                   
                                                       
                                                        // Build Reference Object
                                                        systemsRefArr[i].organs[j].parts[k].histo_layers[length - 1].histo_sublayers[length2 - 1]
                                                            .histo_chars[length3 - 1].ecell_matrices.push({"ecell_matrix_name":name});
                                                    }                                          
                                                   
                                                });
                                               
                                                // Build Histo Char Object with its contents of: cells, ecell_matrices
                                                // getPartContentIdx() provides unique id for the Ecell-Matrix
                                                // Push object(s) into Histo Chars Obj, and Histo Sublayer Obj
                                                let histo_char_Obj= {
                                                    "type":$(histo_char)[0].nodeName,
                                                    "content":histo_char,
                                                    "cells":cells_Obj,
                                                    "ecell_matrices":ecell_Matrices_Obj,
                                                    "name":histo_char_name,
                                                    "histo_char_idx":getItemIdx(),
                                                    "histo_char_cells_idx":getItemIdx(),
                                                    "histo_char_ecells_matrices_idx":getItemIdx()
                                                };
                                                histo_chars_Arr.push(histo_char_Obj);
                                                histo_sublayer_Obj.histo_chars.push(histo_char_Obj); 

                                                break;
                                        };

                                    });
                                    // Push into Larger Histo Layer Object
                                    histo_layer_Obj.name = histo_layer_name;
                                    histo_layer_Obj.histo_sublayers.push(histo_sublayer_Obj);
                                    histo_layer_Obj.histo_layer_idx = getItemIdx();

            

                                });
                        
                                desc = { 
                                    "type":$(histo_layer)[0].nodeName, 
                                    "name":histo_layer_name, 
                                    "content":histo_layer_Obj, 
                                    "histo_layer_idx":getItemIdx()
                                };
                                histo_layers.push(desc);
                                break;
                        };
                       
                        partContents[i][j][k].push({"subparts":subparts, "histo_layers":histo_layers, "other_structures":part_other_structures});
                      
                          
                    });    
                    p_arts.push({"name":$(part).contents()[0].nodeValue,"contents":partContents[i][j][k],"part_idx":idx,
                         "part_histo_layers_idx":getItemIdx(),"part_subparts_idx":getItemIdx(),"part_other_structures_idx":getItemIdx()});
                   
                    
                });
               
                        
                //setShowPartContents(showPartSubParts);
                organArr.push({"organ_name":organ_name,"organ_layers":organLayers,"parts":p_arts, "organ_idx":getItemIdx(),"organ_organ_layers_idx":getItemIdx(),"organ_organ_parts_idx":getItemIdx()}); 
                
                
            });
           
            item.organs = organArr;
            console.log("Check Item", item);
            setArr.push(item);
    

        });
        setSystemSet(setArr);
        local_systems = Object.assign([], setArr);   
        console.log("System Set Array:", setArr);
        console.log("Systems Reference Array:", systemsRefArr);
        systemReferenceArr = systemsRefArr;

     },[systemsArr,systems]);
     let args;

return (
    <Container className="d-grid gap-1">
        {          
            
        systemsArr != null && systemsArr.length > 0 &&                                     
        local_systems.map((system, s_i) => (                                
        <>
            
            <Container key={s_i.toString()} style={{width:"75%",marginLeft:"1em",padding:"1.5em",backgroundColor:"#ffff99",
                                border:"2px solid black", borderRadius:"10px",marginTop:"1.5em"}} >
                                    
                <Row><p className="d-flex justify-content-center">System:&nbsp;&nbsp;<span style={{color:"red"}}>{system.systemName} (S-{s_i+1})</span></p></Row>                     
                <Row onMouseDown={() => props.openSystemOrgans(s_i)}  onMouseUp={() => useReferenceObject({
                    "system_index":s_i,
                    "system_name":systemReferenceArr[s_i].system_name,
                    "organs":systemReferenceArr[s_i].organs,
                    "idx":s_i,
                    "type":"System Organs"
                    })} >
                    <SystemContentButton idx={s_i} items={system.organs} showSystemOrgans={props.showSystemOrgans} name="System Organs"/>
                </Row>  

            </Container>      
                {
                    props.showSystemOrgans[s_i] && system.organs.length > 0 &&                                                 
                    system.organs.map((organ, o_i) => (
                        <>
                            
                            <Container key={o_i.toString()} style={{width:"75%",marginLeft:"2em",padding:"1.5em",backgroundColor:"#e6eeff",
                                border:"2px solid black", borderRadius:"10px",marginTop:"1em",marginBottom:"1em"}} >
                                <Row>
                                    <Col lg="2">
                                    <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)",color:"black"}} className="bi bi-arrow-return-right"></i>
                                    </Col>
                                    <Col lg="" style={{color:"black",fontSize:"1.2em"}} className="d-flex justify-content-start">
                                        <span>Organ: </span>&nbsp;&nbsp;<span style={{color:"red"}}>{organ.organ_name} (O-{o_i+1})</span>
                                    </Col>
                                    
                                </Row>    
                                                        
                                <Row onMouseDown={() => props.showItems(organ.organ_organ_parts_idx)} onMouseUp={() => useReferenceObject({
                                    "system_index":s_i,                                    
                                    "system_name":systemReferenceArr[s_i].system_name,
                                    "organ_index":o_i,
                                    "organ_name":systemReferenceArr[s_i].organs[o_i].organ_name,
                                    "parts":organ.parts.filter((part) => part.name !== 'null').map((part) => { return { "part_name": part.name}}),
                                    "organ_organ_parts_idx":organ.organ_organ_parts_idx,
                                    "organ_idx": systemReferenceArr[s_i].organs[o_i].organ_idx,
                                    "type":"Organ Parts"
                                    })}>
                                    <ContentButton system_idx={s_i} organ_idx={o_i} idx={organ.organ_organ_parts_idx} items={organ.parts} showItemContents={props.showItemContents} name="Organ Parts"/>
                                </Row>
                                <Row onMouseDown={() => props.showItems(organ.organ_organ_layers_idx)} onMouseUp={() => useReferenceObject({
                                    "system_index":s_i,                               
                                    "system_name":systemReferenceArr[s_i].system_name,
                                    "organ_index":o_i,
                                    "organ_name":systemReferenceArr[s_i].organs[o_i].organ_name,
                                    "organ_layers":organ.organ_layers.filter((organ_layer) => organ_layer !== 'null').map((organ_layer) => { return {"organ_layer_name": organ_layer.name}}),
                                    "idx":organ.organ_organ_layers_idx,
                                    "type":"Organ Layers"
                                    })}>
                                    <ContentButton system_idx={s_i} organ_idx={o_i} idx={organ.organ_organ_layers_idx} items={organ.organ_layers} showItemContents={props.showItemContents}  name="Organ Layers"/>
                                </Row>  
                            </Container>
                          
                            {
                            props.showItemContents[organ.organ_organ_parts_idx] && organ.parts.length > 0 &&
                                Array.from(organ.parts).map((part, p_i) => (
                                <>
                                    
                                    <Container  key={p_i.toString()} style={{width:"75%",height:"auto",color:"black",fontSize:"1em",marginBottom:"1em",
                                        border:"2px solid black", borderRadius:"10px",padding:"1.5em",marginLeft:"3em",marginTop:"1em",backgroundColor:"#ffe6f2"}} >
                                            <Row>
                                                <Col lg="2">
                                                    <i style={{marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                </Col>
                                                <Col lg="8" style={{color:"black",fontSize:"1.2em"}} className="d-flex justify-content-start">
                                                    <span>Organ Part:</span>&nbsp;&nbsp;<span style={{color:"red"}}>{part.name}</span>
                                                </Col>
                                              
                                            </Row> 
                                            <Row onMouseDown={() => props.showItems(part.part_histo_layers_idx)} onMouseUp={() => useReferenceObject({
                                                "system_index":s_i,                                                                                                                                   
                                                "system_name":systemReferenceArr[s_i].system_name,
                                                "organ_index":o_i,
                                                "organ_name":systemReferenceArr[s_i].organs[o_i].organ_name,
                                                "part_index":p_i,                                                
                                                "part_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].part_name,
                                                "histo_layers":part.contents[0].histo_layers.filter((histo_layer) => histo_layer.name !== 'null')
                                                    .map((histo_layer) => { return {"histo_layer_name": histo_layer.name }}),
                                                "part_histo_layers_idx":part.part_histo_layers_idx,
                                                "type":"Part Histo_Layers"
                                            })}>
                                                <ContentButton system_idx={s_i} organ_idx={o_i} organ_parts_idx={p_i} idx={part.part_histo_layers_idx} items={part.contents[0].histo_layers}
                                                showItemContents={props.showItemContents} name="Part Histo-Layers"/>
                                            </Row>
                                            <Row onMouseDown={() => props.showItems(part.part_other_structures_idx)} onMouseUp={() => useReferenceObject({
                                                 "system_index":s_i,                           
                                                 "system_name":systemReferenceArr[s_i].system_name,
                                                 "organ_index":o_i,                                                 
                                                 "organ_name":systemReferenceArr[s_i].organs[o_i].organ_name,
                                                 "part_index":p_i,
                                                 "part_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].part_name,
                                                 "other_structures":part.contents[0].other_structures.filter((structure) => structure.name !== 'null')
                                                    .map((structure) => { return { "other_structure_name":structure.name}}),
                                                 "idx":part.part_other_structures_idx,
                                                 "type":"Part Structures"
                                            })}>
                                                <ContentButton system_idx={s_i} organ_idx={o_i} organ_parts_idx={p_i} idx={part.part_other_structures_idx} items={part.contents[0].other_structures} 
                                                showItemContents={props.showItemContents} name="Part Structures"/>
                                            </Row>
                                            <Row onMouseDown={() => props.showItems(part.part_subparts_idx)} onMouseUp={() => useReferenceObject({
                                                 "system_index":s_i,                                                                         
                                                 "system_name":systemReferenceArr[s_i].system_name,
                                                 "organ_index":o_i,                                                                                                
                                                 "organ_name":systemReferenceArr[s_i].organs[o_i].organ_name,
                                                 "part_index":p_i,
                                                 "part_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].part_name,
                                                 "subparts":part.contents[0].subparts.filter((subpart) =>  subpart.name !== 'null').map((subpart) => {return {"subpart_name": subpart.name}}),
                                                 "idx":part.part_subparts_idx,
                                                 "type":"Part Sub-Parts"

                                            })}><ContentButton system_idx={s_i} organ_idx={o_i} organ_parts_idx={p_i} idx={part.part_subparts_idx} items={part.contents[0].subparts} 
                                                showItemContents={props.showItemContents}  name="Part Sub-Parts"/></Row>
                                    </Container>                                    
                                
                                    {   
                                    props.showItemContents[part.part_histo_layers_idx] && part.contents[0].histo_layers.length > 0 &&
                                        part.contents[0].histo_layers.filter((histo_layer) => {return histo_layer.name != "null"}).map((histo_layer,hl_i) => (
                                        <>
                                            <Container key={hl_i.toString()} style={{width:"75%",fontSize:"1.0em",padding:"1.5em",marginLeft:"4em",border:"2px solid black", borderRadius:"10px",
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
                                                <Row onMouseDown={() => props.showItems(histo_layer.histo_layer_idx)} onMouseUp={() => useReferenceObject({
                                                    "system_index":s_i,                                                                     
                                                    "system_name":systemReferenceArr[s_i].system_name,
                                                    "organ_index":o_i,                                                                                                                                                
                                                    "organ_name":systemReferenceArr[s_i].organs[o_i].organ_name,
                                                    "part_index":p_i,                                                    
                                                    "part_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].part_name,
                                                    "histo_layer_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].histo_layers[hl_i].histo_layer_name,
                                                    "histo_layer_index":hl_i,
                                                    "idx":histo_layer.histo_layer_idx,
                                                    "histo_sublayers":histo_layer.content.histo_sublayers.filter((histo_sublayer) => histo_sublayer.name !== 'null')
                                                        .map((histo_sublayer) => { return {"histo_sublayer_name": histo_sublayer.name}}),
                                                    "type":"Histo_Sublayers"
                                                })}>
                                                    <ContentButton system_idx={s_i} organ_idx={o_i} organ_parts_idx={p_i} histo_layer_idx={hl_i}
                                                    idx={histo_layer.histo_layer_idx} items={histo_layer.content.histo_sublayers} showItemContents={props.showItemContents} name="Histo_Sublayers"/>
                                                </Row>
                                             </Container>

                                            {   
                                                props.showItemContents[histo_layer.histo_layer_idx] && histo_layer.content.histo_sublayers != "undefined" && histo_layer.content.histo_sublayers.length > 0 
                                                &&
                                                histo_layer.content.histo_sublayers.map((histo_sublayer,hsl_i) => (
                                                <>
                                                    <Container key={hsl_i.toString()} style={{width:"75%",fontSize:"1em",marginLeft:"5em",
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
                                                        <Row onMouseDown={() => props.showItems(histo_sublayer.histo_sublayer_histo_chars_idx)} onMouseUp={() => useReferenceObject({
                                                            "system_index":s_i,                                                                  
                                                            "system_name":systemReferenceArr[s_i].system_name,
                                                            "organ_index":o_i,                                                                                                                                               
                                                            "organ_name":systemReferenceArr[s_i].organs[o_i].organ_name,
                                                            "part_index":p_i,                                                
                                                            "part_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].part_name,
                                                            "histo_layer_index":hl_i,
                                                            "histo_layer_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].histo_layers[hl_i].histo_layer_name,
                                                            "histo_sublayer_index":hsl_i,  
                                                            "histo_sublayer_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].histo_layers[hl_i].histo_sublayers[hsl_i].histo_sublayer_name.split('<')[0],
                                                            "idx":histo_sublayer.histo_sublayer_histo_chars_idx,         
                                                            "histo_chars": histo_sublayer.histo_chars.filter((histo_char) => histo_char.name !== 'null')
                                                                .map((histo_char) => { return {"histo_char_name": histo_char.name} }),
                                                            "type":"Histo_Chars"
                                                        })}>
                                                            <ContentButton system_idx={s_i} organ_idx={o_i} organ_parts_idx={p_i} histo_layer_idx={hl_i} 
                                                               histo_sublayer_idx={hsl_i} showItemContents={props.showItemContents} 
                                                               idx={histo_sublayer.histo_sublayer_histo_chars_idx} items={histo_sublayer.histo_chars} name="Histo_Chars"/>
                                                        </Row>
                                                    </Container>

                                                    {   
                                                        props.showItemContents[histo_sublayer.histo_sublayer_histo_chars_idx] && histo_sublayer.histo_chars != "undefined" && histo_sublayer.histo_chars.length > 0 
                                                        &&
                                                        histo_sublayer.histo_chars.map((histo_char,hc_i) => (
                                                        <>
                                                            <Container key={hc_i.toString()} style={{width:"75%",fontSize:"1em",marginLeft:"6em",
                                                                padding:"1em",border:"2px solid black", borderRadius:"10px",backgroundColor:"#fff2cc",color:"black"}}>
                                                                <Row style={{marginBottom:"0.5em"}}>
                                                                    <Col lg="2">
                                                                        <i style={{marginLeft:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                    </Col>
                                                                    <Col lg="8" className="d-flex justify-content-start" style={{color:"black",marginLeft:"1em"}}>
                                                                        <span>Histo_Chars:</span>&nbsp;&nbsp;<span style={{color:"red"}}>{histo_char.name}</span>
                                                                    </Col>                                                
                                                                </Row>   
                                                                <Row onMouseDown={() => props.showItems(histo_char.histo_char_cells_idx)} onMouseUp={() => useReferenceObject({
                                                                        "system_index":s_i,                                                               
                                                                        "system_name":systemReferenceArr[s_i].system_name,
                                                                        "organ_index":o_i,                                                                                                                                                                                                                    
                                                                        "organ_name":systemReferenceArr[s_i].organs[o_i].organ_name,
                                                                        "part_index":p_i,                                                                                                                       
                                                                        "part_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].part_name,
                                                                        "histo_layer_index":hl_i,                                                                       
                                                                        "histo_layer_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].histo_layers[hl_i].histo_layer_name, 
                                                                        "histo_sublayer_index":hsl_i,
                                                                        "histo_sublayer_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].histo_layers[hl_i].histo_sublayers[hsl_i].histo_sublayer_name.split('<')[0], 
                                                                        "histo_chars_index":hc_i,
                                                                        "histo_char_name": systemReferenceArr[s_i].organs[o_i].parts[p_i].histo_layers[hl_i].histo_sublayers[hsl_i].histo_chars[hc_i].histo_char_name,
                                                                        "idx":histo_char.histo_char_cells_idx,
                                                                        "cells": histo_char.cells.filter((cell) => cell.name !== 'null').map((cell) => { return { "cell_name":cell.name                                                                             
                                                                        }}),
                                                                        "type":"Cells"

                                                                })}>
                                                                    <ContentButton system_idx={s_i} organ_idx={o_i} organ_parts_idx={p_i} histo_layer_idx={hl_i} 
                                                                    histo_sublayer_idx={hsl_i} histo_chars_idx={hc_i} showItemContents={props.showItemContents} 
                                                                    idx={histo_char.histo_char_cells_idx} items={histo_char.cells} name="Cells"/>
                                                                </Row>
                                                                <Row onMouseDown={() => props.showItems(histo_char.histo_char_ecells_matrices_idx)} onMouseUp={() => useReferenceObject({
                                                                        "system_index":s_i,                                                             
                                                                        "system_name":systemReferenceArr[s_i].system_name,
                                                                        "organ_index":o_i,                                                                                                                                                                                                                  
                                                                        "organ_name":systemReferenceArr[s_i].organs[o_i].organ_name,
                                                                        "part_index":p_i,                                                                                                               
                                                                        "part_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].part_name,
                                                                        "histo_layer_index":hl_i,                                                              
                                                                        "histo_layer_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].histo_layers[hl_i].histo_layer_name, 
                                                                        "histo_sublayer_index":hsl_i,
                                                                        "histo_sublayer_name":systemReferenceArr[s_i].organs[o_i].parts[p_i].histo_layers[hl_i].histo_sublayers[hsl_i].histo_sublayer_name.split('<')[0], 
                                                                        "histo_chars_index":hc_i,
                                                                        "histo_char_name": systemReferenceArr[s_i].organs[o_i].parts[p_i].histo_layers[hl_i].histo_sublayers[hsl_i].histo_chars[hc_i].histo_char_name,
                                                                        "idx":histo_char.histo_char_ecells_matrices_idx,
                                                                        "ecell_matrices": histo_char.ecell_matrices.filter((ecell_matrix) => ecell_matrix.name !== 'null').map((ecell_matrix) =>
                                                                             { return { "ecell_matrix_name":ecell_matrix.name                                                                             
                                                                        }}),
                                                                        "type":"Ecell_Matrix"
                                                                })} ><ContentButton system_idx={s_i} organ_idx={o_i} organ_parts_idx={p_i} histo_layer_idx={hl_i} 
                                                                    histo_sublayer_idx={hsl_i} histo_chars_idx={hc_i} showItemContents={props.showItemContents} 
                                                                    idx={histo_char.histo_char_ecells_matrices_idx} items={histo_char.ecell_matrices} name="Ecell_Matrix"/></Row> 
                                                            
                                                            </Container>


                                                            {   
                                                                props.showItemContents[histo_char.histo_char_cells_idx] && histo_char.cells != "undefined" && histo_char.cells.length > 0 
                                                                &&
                                                                histo_char.cells.map((cell,hcc_i) => (
                                                                <>
                                                                    <Container key={hcc_i.toString()} style={{width:"75%",fontSize:"1em",marginLeft:"7em",
                                                                        padding:"1em",border:"2px solid black", borderRadius:"10px",backgroundColor:"#ccd9ff",color:"black"}}>
                                                                        <Row style={{marginBottom:"0.5em"}}>
                                                                            <Col lg="2">
                                                                                <i style={{marginLeft:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                            </Col>
                                                                            <Col lg="8" className="d-flex justify-content-start" style={{color:"black",marginLeft:"1em"}}>
                                                                                <span>Cell Type:</span>&nbsp;&nbsp;<span style={{color:"red"}}>{cell.name}</span>
                                                                            </Col>                                                
                                                                        </Row>  
                                                                    </Container>
                                                                </>
                                                                ))
                                                            }

                                                                {   
                                                                props.showItemContents[histo_char.histo_char_ecells_matrices_idx] && histo_char.ecell_matrices != "undefined" && histo_char.ecell_matrices.length > 0 
                                                                &&
                                                                histo_char.ecell_matrices.map((ecell_matrix,hce_i) => (
                                                                <>
                                                                    <Container key={hce_i.toString()} style={{width:"75%",fontSize:"1em",marginLeft:"7em",
                                                                        padding:"1em",border:"2px solid black", borderRadius:"10px",backgroundColor:"f2d9d9",color:"black"}}>
                                                                        <Row style={{marginBottom:"0.5em"}}>
                                                                            <Col lg="2">
                                                                                <i style={{marginLeft:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                            </Col>
                                                                            <Col lg="8" className="d-flex justify-content-start" style={{color:"black",marginLeft:"1em"}}>
                                                                                <span>Ecell Matrix Type:</span>&nbsp;&nbsp;<span style={{color:"red"}}>{ecell_matrix.name}</span>
                                                                            </Col>                                                
                                                                        </Row>  
                                                                    </Container>
                                                                </>
                                                                ))
                                                            }


                                                        </>
                                                        ))
                                                    }
                                                </>
                                                ))
                                            }




                                        </>
                                        ))
                                    }
                                    
                                    {

                                        props.showItemContents[part.part_subparts_idx] && part.contents[0].subparts.length > 0  &&
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
                                    props.showItemContents[part.part_other_structures_idx] && part.contents[0].other_structures.length > 0  &&
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
                            props.showItemContents[organ.organ_organ_layers_idx] && organ.organ_layers.length > 0 &&
                                Array.from(organ.organ_layers).map((organ_layer, l) => (
                                <>
                                    
                                    <Button key={l.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"3em",padding:"1em",border:"2px solid black", borderRadius:"10px",
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
    );




}