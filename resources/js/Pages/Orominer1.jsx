import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import Hierarchy from "./Orominer/Hierarchy.jsx"
const parser = new DOMParser();
const partContentIndexes = [];
const organLayerIndexes = [];


export default function Orominer(props){
   
    const [displayRequest, setDisplayRequest] = useState(false);
    const [displayReferenceArr, setDisplayReferenceArr] = useState([]);
    const [currentSystemIndex, setCurrentSystemIndex] = useState('');
    const [showItemContents, setShowItemContents] = useState([]);
    const headerStyle = {
        fontSize:"1.25em", 
        border:"2px black solid",
        backgroundColor:"white"
     };


    const useReferenceObject = (obj,showItemContents) => {      
        console.log("Passed System Reference Object:",obj);
      //  const newItems5 = [...displayReferenceArr];
     // //  let idx = displayReferenceArr.length;
     //   setDisplayReferenceArr(newItems5); 

        setShowItemContents(showItemContents);
        handleDisplayRequest(obj);

    };




     const handleDisplayRequest = (obj) => {
        console.log("Top level Display Request:", obj );
        setDisplayRequest(true);
        let req =  obj;
        let len = 115;
        let r_adius = 40;
        let r_adius2 = 20;
        let r_adius3 = 15;
        let rads = 2*(Math.PI);
        let cx = 200;
        let cy = 200;
       
        
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
                        //currentReq[ridx].organs[l] = {};
                        //currentReq[ridx].organs[l].organ_name = req.organs[l].organ_name;
                        currentArr[ridx].organs[l-1].lx1 = cx + Math.cos(l*conv)*(r_adius);
                        currentArr[ridx].organs[l-1].ly1 = cy + Math.sin(l*conv)*(r_adius);   
                        currentArr[ridx].organs[l-1].lx2 = cx + Math.cos(l*conv)*(r_adius-r_adius2) + Math.cos(l*conv)*(len);
                        currentArr[ridx].organs[l-1].ly2 = cy + Math.sin(l*conv)*(r_adius-r_adius2) + Math.sin(l*conv)*(len);   
                        currentArr[ridx].organs[l-1].cx = cx + Math.cos(l*conv)*(r_adius) + Math.cos(l*conv)*(len);
                        currentArr[ridx].organs[l-1].cy = cy + Math.sin(l*conv)*(r_adius) + Math.sin(l*conv)*(len); 
                    }
                   
                });
             
           
            
            console.log("Display Reference:", currentArr);
        }
        else if(req.type.match(/Organ Parts/g) ){
            numItems = req.parts.length;
            conv = rads/numItems + 2*(Math.PI)/30;
            len = 80;
            console.log("conv:", conv);
            setCurrentSystemIndex(ridx); 



            currentArr[req.system_index].organs[req.organ_index].parts = req.parts;  
            console.log("Parts:", currentArr[req.system_index].organs[req.organ_index].parts);
            //currentArr[req.system_index] = req;

          
            let stemArr = [];
            for (let j = 1;j <= numItems; j++){
                stemArr.push(j);
            }
                console.log("draw array:", stemArr);
               console.log("Parts:", currentArr[req.system_index].organs[req.organ_index].parts);
                stemArr.map((l) => {
                    if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx1 === undefined){
                       
                        //currentArr[ridx].organs = req.organs;
                        //currentReq[ridx].organs[l] = {};
                        //currentReq[ridx].organs[l].organ_name = req.organs[l].organ_name;
                        let cx = currentArr[req.system_index].organs[req.organ_index].cx;
                        let cy = currentArr[req.system_index].organs[req.organ_index].cy;
                        console.log("first calc:",200 + Math.cos(l*conv)*(r_adius) );
                        currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx1 = cx + Math.cos(l*conv)*(r_adius2);
                        currentArr[req.system_index].organs[req.organ_index].parts[l-1].ly1 = cy + Math.sin(l*conv)*(r_adius2);   
                        currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx2 = cx + Math.cos(l*conv)*(r_adius2-r_adius3) + Math.cos(l*conv)*(len);
                        currentArr[req.system_index].organs[req.organ_index].parts[l-1].ly2 = cy + Math.sin(l*conv)*(r_adius2-r_adius3) + Math.sin(l*conv)*(len);   
                        currentArr[req.system_index].organs[req.organ_index].parts[l-1].cx = cx + Math.cos(l*conv)*(r_adius2) + Math.cos(l*conv)*(len);
                        currentArr[req.system_index].organs[req.organ_index].parts[l-1].cy = cy + Math.sin(l*conv)*(r_adius2) + Math.sin(l*conv)*(len); 
                    }
                   
                });
             
        }
         console.log("Added Display Reference:", currentArr);
         
         setDisplayReferenceArr(currentArr);
         console.log("Display Reference Array After Add:", currentArr);
     };

     const RequestedDisplay = (props) => {
        let len = 115;
        let r_adius = 40;
        let r_adius2 = 20;
        let r_adius3 = 15;
        let rads = 2*(Math.PI);
        let numItems = 8
        let conv = rads/numItems
        let stemArr = [];
        for (let i = 1;i <= numItems; i++){
            stemArr.push(i);
        }
        
        return (
             <svg version="1.1"
             width="500" height="500"
             xmlns="http://www.w3.org/2000/svg">
            <g>
                
                <circle cx="200" cy="200" r={r_adius} stroke="red" fill="transparent" style={{strokeWidth:"5"}} />
                <text x="200" y="200" stroke="black" font-size="4">S-{currentSystemIndex}</text>
                {  displayReferenceArr.map((s) => s !== undefined && s.organs !== undefined && s.organs.map((organ,i) => (
                        <g key={i.toString()}>
                            <line x1={organ.lx1} y1={organ.ly1} x2={organ.lx2} y2={organ.ly2} stroke="orange" style={{strokeWidth:"5"}}/>

                            <circle cx={organ.cx} cy={organ.cy} r={r_adius2} stroke="red" fill="transparent" style={{strokeWidth:"5"}}/>
                           
                             <text x={organ.cx-20} y={organ.cy+7} stroke="black" font-size="4">O-{i+1}</text>
                             {
                            
                                organ.parts.map((part,j) => (
                                
                                    <g key={j.toString()} >
                                        <line x1={part.lx1} y1={part.ly1} x2={part.lx2} y2={part.ly2} stroke="orange" style={{strokeWidth:"P"}}/>

                                        <circle cx={part.cx} cy={part.cy} r={r_adius3} stroke="red" fill="transparent" style={{strokeWidth:"P"}}/>
                                        <text x={part.cx-20} y={part.cy+7} stroke="black" font-size="4">P-{j+1}</text>
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
            <Row style={{height:"90%",width:"100%"}}>
                <Col id ="harchframe" className="w-100 p-0">
                    <span id="" style={headerStyle} className="w-100 d-flex justify-content-center">Hierarchy Display</span>
                    <Hierarchy handleDisplayRequest={handleDisplayRequest} useReferenceObject={useReferenceObject}  />   
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

                            {
                                displayRequest && 
                                    <div id="req_display">
                                        <RequestedDisplay  />
                                    </div>
                            }
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