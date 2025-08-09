import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import $ from 'jquery';
import Card from 'react-bootstrap/Card';

import Hierarchy from "./Orominer/Hierarchy.jsx"
import Draggable from 'react-draggable';
const parser = new DOMParser();
const partContentIndexes = [];
const organLayerIndexes = [];


export default function Orominer(props){
    const [displayRequest, setDisplayRequest] = useState(false);
    const [displayReferenceArr, setDisplayReferenceArr] = useState([]);
    const [currentSystemIndex, setCurrentSystemIndex] = useState(0);
    const [showItemContents, setShowItemContents] = useState([]);
    const [showSystemOrgans, setShowSystemOrgans] = useState([]);
    const [showItemsFunc, setShowItemsFunc ] = useState(null);
    const [sysCx, setSysCx] = useState(500);
    const [sysCy, setSysCy] = useState(500);
    const [sys_radius, setSysRadius] = useState(55);
    const [org_radius, setOrgRadius] = useState(35);
    const [part_radius, setPartRadius] = useState(25);
    const [histo_layer_radius, setHistoLayerRadius] = useState(20);
  

    let isDragging = false;
    let initialX, initialY;
    let currentTranslateX = 0;
    let currentTranslateY = 0;
    const gElement = document.getElementById('myGElement'); // Assuming your <g> has an ID


    const headerStyle = {
        fontSize:"1.25em", 
        border:"2px black solid",
        backgroundColor:"white"
     };

    useEffect(() => {
       // $(myRef.current);
    },[])

    const openSystemOrgans = (index) => {
             console.log(index);
            const newItems2 = [...showSystemOrgans];
            newItems2[index] = !newItems2[index];
            setShowSystemOrgans(newItems2);
    }

    const showItems = (idx) => {
        console.log(idx);
        const newItems4 = [...showItemContents];
        newItems4[idx] = !newItems4[idx];
        setShowItemContents(newItems4);    // Set boolean variable used for toggling show of Part Items    
    }

    const useReferenceObject = (obj) => {      
        console.log("Passed System Reference Object:",obj);
      //  const newItems5 = [...displayReferenceArr];
     // //  let idx = displayReferenceArr.length;
     //   setDisplayReferenceArr(newItems5); 

        handleDisplayRequest(obj);

    };


     const handleDisplayRequest = (obj) => {
        console.log("Top level Display Request:", obj );
        setDisplayRequest(true);
        let req =  obj;
        let len = 400;
        let rads = 2*(Math.PI);
        let cx = sysCx;
        let cy = sysCy;
       
        
        let ridx;
        let numItems;
        let conv;
        let currentArr = [...displayReferenceArr];
        console.log("request type:", req.type);
        if(req.type.match(/System Organs/g) ){
            ridx = req.system_index;
            numItems = req.organs.length;
            conv = rads/numItems;
            setCurrentSystemIndex(ridx);
            
            currentArr[ridx] = req;
            currentArr[ridx].system_name = req.system_name;
            currentArr[ridx].displayed = true;

            currentArr[ridx].organs = req.organs;
            currentArr[ridx].cx = 200;
            currentArr[ridx].cy = 200;

            let stemArr = [];
            for (let i = 1;i <= numItems; i++){
                stemArr.push(i);
            }
          
                stemArr.map((l) => {
                    l;
                    if(currentArr[ridx].organs[l-1].lx1 == undefined){
                        currentArr[ridx].organs = req.organs;
                        currentArr[ridx].organs[l-1].lx1 = cx + Math.cos(l*conv)*(sys_radius);
                        currentArr[ridx].organs[l-1].ly1 = cy + Math.sin(l*conv)*(sys_radius);   
                        currentArr[ridx].organs[l-1].lx2 = cx + Math.cos(l*conv)*(sys_radius-org_radius) + Math.cos(l*conv)*(len);
                        currentArr[ridx].organs[l-1].ly2 = cy + Math.sin(l*conv)*(sys_radius-org_radius) + Math.sin(l*conv)*(len);   
                        currentArr[ridx].organs[l-1].cx = cx + Math.cos(l*conv)*(sys_radius) + Math.cos(l*conv)*(len);
                        currentArr[ridx].organs[l-1].cy = cy + Math.sin(l*conv)*(sys_radius) + Math.sin(l*conv)*(len); 
                    }
                   
                });
             
           
            
            console.log("Display Reference:", currentArr);
        }
        else if(req.type.match(/Organ Parts/g) ){

            console.log("System Open:", showSystemOrgans[currentSystemIndex]);
            numItems = req.parts.length;
            let adj = 2*(Math.PI)/30;
            conv = rads/numItems;
            len = 180; 
            setCurrentSystemIndex(req.system_index);
            currentArr[req.system_index].organs[req.organ_index].parts = req.parts;  
            currentArr[req.system_index].organs[req.organ_index].organ_organ_parts_idx = req.organ_organ_parts_idx;
            console.log("Parts:", currentArr[req.system_index].organs[req.organ_index].parts);

            let stemArr = [];
            for (let j = 1;j <= numItems; j++){
                stemArr.push(j);
            }
            stemArr.map((l) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].cy;

                    console.log("first calc:",200 + Math.cos(l*conv)*(sys_radius) );
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx1 = cx + Math.cos(l*conv + adj)*(org_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].ly1 = cy + Math.sin(l*conv + adj)*(org_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx2 = cx + Math.cos(l*conv + adj)*(org_radius-part_radius) + Math.cos(l*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].ly2 = cy + Math.sin(l*conv + adj)*(org_radius-part_radius) + Math.sin(l*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].cx = cx + Math.cos(l*conv + adj)*(org_radius) + Math.cos(l*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].cy = cy + Math.sin(l*conv + adj)*(org_radius) + Math.sin(l*conv + adj)*(len); 
                }                
            });
             
        }
         else if(req.type.match(/Part Histo_Layers/g) ){

            numItems = req.histo_layers.length;
            let adj = 2*(Math.PI)/-30;
            conv = rads/numItems;
            len = 80; 
            setCurrentSystemIndex(req.system_index);
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers = req.histo_layers;  
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].part_histo_layers_idx = req.part_histo_layers_idx;

            let stemArr = [];
            for (let k = 1;k <= numItems; k++){
                stemArr.push(k);
            }
            stemArr.map((m) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cy;

                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].lx1 = cx + Math.cos(m*conv + adj)*(part_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].ly1 = cy + Math.sin(m*conv + adj)*(part_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].lx2 = cx + Math.cos(m*conv + adj)*(part_radius-histo_layer_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].ly2 = cy + Math.sin(m*conv + adj)*(part_radius-histo_layer_radius) + Math.sin(m*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].cx = cx + Math.cos(m*conv + adj)*(part_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].cy = cy + Math.sin(m*conv + adj)*(part_radius) + Math.sin(m*conv + adj)*(len); 
                }                
            });
             
        }
         console.log("Added Display Reference:", currentArr);
         
         setDisplayReferenceArr(currentArr);
         console.log("Display Reference Array After Add:", currentArr);
     };

     const RequestedDisplay = (props) => {
        let len = 115;
        let cx = 500;
        let cy = 500;
        let rads = 2*(Math.PI);
        let numItems = 8
        let conv = rads/numItems
        let stemArr = [];
        for (let i = 1;i <= numItems; i++){
            stemArr.push(i);
        }
       
        return (
             <svg version="1.1"
             width="1100" height="2200"
             xmlns="http://www.w3.org/2000/svg">
            <g id="myGElement">
                
                {   showSystemOrgans[currentSystemIndex] &&
                    <>
                        <circle cx={cx} cy={cy} r={sys_radius} stroke="red" fill="transparent" style={{strokeWidth:"5"}} />
                        <text x={cx-16} y={cy+8} stroke="black" font-size="4">S-{currentSystemIndex}</text>
                    </>
                }
                {  showSystemOrgans[currentSystemIndex] && displayReferenceArr.map((s,i) => s !== undefined && s.organs !== undefined && s.organs.map((organ,i) => (
                        <g key={i.toString()}>
                             <line x1={organ.lx1} y1={organ.ly1} x2={organ.lx2} y2={organ.ly2} stroke="orange" style={{strokeWidth:"5"}}/>
                             <circle cx={organ.cx} cy={organ.cy} r={org_radius} stroke="red" fill="transparent" style={{strokeWidth:"5"}}/>                           
                             <text x={organ.cx-20} y={organ.cy+7} stroke="black" font-size="4">O-{i+1}</text>
                             {
                            
                                showItemContents[organ.organ_organ_parts_idx] && organ.parts.map((part,j) => (                                
                                    <g onClick={() => showItems(organ.organ_organ_parts_idx)} key={j.toString()} >
                                        <line x1={part.lx1} y1={part.ly1} x2={part.lx2} y2={part.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                        <circle cx={part.cx} cy={part.cy} r={part_radius} stroke="red" fill="transparent" style={{strokeWidth:"4"}}/>
                                        <text x={part.cx-20} y={part.cy+7} stroke="black" font-size="2">P-{j+1}</text>
                                        {console.log("Histo Layer Open:",showItemContents[part.part_histo_layer_idx])}
                                         {
                                            showItemContents[part.part_histo_layers_idx] && part.histo_layers.map((histo_layer,k) => (                                
                                                <g key={k.toString()} >
                                                    <line x1={histo_layer.lx1} y1={histo_layer.ly1} x2={histo_layer.lx2} y2={histo_layer.ly2} stroke="grey" style={{strokeWidth:"7"}}/>
                                                    <circle cx={histo_layer.cx} cy={histo_layer.cy} r={histo_layer_radius} stroke="blue" fill="transparent" style={{strokeWidth:"4"}}/>
                                                    <text x={histo_layer.cx-18} y={histo_layer.cy+7} stroke="black" style={{fontSize:"1.2em"}}>hl-{j+1}</text>
                                                </g>
                                                    
                                            ))
                                        }
                                    </g>
                                    
                                ))
                            }
                        </g>
                    )))
                     
                }
               
               
            </g>   

        </svg>
        );
     };

    return (
    <>
        
        <Container id="" style={{position:"relative",width:"100%",height:"100%"}} fluid>
            <Row style={{width:"100%"}}>
                <div id="" style={{border:"20px ridge silver", width:"70%", marginLeft:"15%", fontSize:"1.5em"}} className="mb-4 p-2 d-flex justify-content-center">
                    Organism Relation Ontology (ORO) Miner
                </div>
            </Row>
            <Row style={{position:"relative",height:"90%",width:"100%"}}>
                <Col id ="harchframe" xs={3} className="w-40 p-0">
                    <span id="" style={headerStyle} className="w-100 d-flex justify-content-center">Hierarchy Display</span>
                    <Hierarchy handleDisplayRequest={handleDisplayRequest} useReferenceObject={useReferenceObject} showItemContents={showItemContents} setShowItemContents={setShowItemContents}
                        showItems={showItems} showSystemOrgans={showSystemOrgans} setShowSystemOrgans={setShowSystemOrgans} openSystemOrgans={openSystemOrgans}/>   
                </Col>
                <Col id="grphframe1" xs={8} className="w-60 p-0">
                    
                    <Row className="h-10">
                        <span id="" style={headerStyle} className="d-flex justify-content-center">Graph Display</span> 
                    </Row>                       
                    <Row id="gphtitle" className="h-20">
                        <Col id="tab1" className="tab">Cell-to-Cell</Col>
                        <Col id="tab2" className="tab">Cell-to-Lumen</Col>
                        <Col id="gphmess">Graph Messages Here</Col>
                    </Row>
                    <Row >
                        <div id="gphdisp">
                            <div id="gphdisp2">
                            {/*<svg id="mySVG" style="overflow: visible" width="100%" height="100%" viewBox = "0 0 4000 4000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>*/}

                            {
                                displayRequest && 
                                    <Draggable>
                                     <div >

                                            <RequestedDisplay  /> 
                                                     
                                    </div>
                                    </Draggable>
                                   
                            }
                            </div>
                        </div>
                    </Row>
                    
                </Col>
                {/*
                <Col id="dispframe" className="dispframe w-100 p-0">
                    <span id="" style={headerStyle} className="d-flex justify-content-center">Info Display</span> 
                    <div id="panel"></div>
                </Col>
                */}
            </Row>
             
        </Container>

      
    </>
            
    );
}  