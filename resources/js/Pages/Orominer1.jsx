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
    const [currentOrganIndex, setCurrentOrganIndex] = useState(0);
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [showItemContents, setShowItemContents] = useState([]);
    const [showSystemOrgans, setShowSystemOrgans] = useState([]);
    const [showItemsFunc, setShowItemsFunc ] = useState(null);
    const [sysCx, setSysCx] = useState(1100);
    const [sysCy, setSysCy] = useState(1100);
    const [transX, setTransX] = useState(0);
    const [transY, setTransY] = useState(0);
    const [eClientY, setEClientY] = useState(0);
    const [ePageY, setEPageY] = useState(0);
    const [sys_radius, setSysRadius] = useState(55);
    const [org_radius, setOrgRadius] = useState(35);
    const [part_radius, setPartRadius] = useState(25);
    const [sys_color, setSysColor] = useState('');
    const [org_color, setOrganColor] = useState('');
    const [part_color, setPartColor] = useState('');
    const [part_conv, setPartConv] = useState(0);
    const [stem_length, setStemLength] = useState(0);
    const [histo_layer_radius, setHistoLayerRadius] = useState(20);
    const [histo_sublayer_radius, setHistoSubLayerRadius] = useState(20);
    const [other_structure_radius, setOtherStructureRadius] = useState(20);    
    const [subpart_radius, setSubpartRadius] = useState(20);
    const [organ_layer_radius, setOrganLayerRadius] = useState(25);
    const [sys_opacity, setSysOpacity] = useState(1.0);
  

    
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

    function getRandomIntInclusive(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    } 

    const getGuiPositions = (req) => {
        console.log("Req:", req); 
        let tagId;       
        let buttonTagClass; 

        if(req.type.match(/System Organs/g))
        {
            tagId = `#S${req.system_index+1}`;            
            buttonTagClass = `.S-${req.system_index+1}`;
        }
        else if(req.type.match(/Organ Parts/g)){
            tagId = `#S${req.system_index+1}O${req.organ_index+1}`;
            buttonTagClass = `.S-${req.system_index+1}O-${req.organ_index+1}`;
        }
        else;
        console.log("Tag ID:",tagId);
        let groupElement = $(tagId)[0];
        console.log("groupElement",groupElement);
        const bboxGroup = groupElement.getBBox();
        console.log("X location of Organ:", bboxGroup.x);

        console.log("Button Tag Class:", buttonTagClass);
        let buttonTag = $(buttonTagClass)[0];
        console.log("buttonElement", buttonTag);
        const bboxGroup2 = buttonTag.getBoundingClientRect();
         console.log("X location of Organ Button:", bboxGroup2.x);
 

        let positions = {
            "gtagX":bboxGroup.x,
            "gtagY":bboxGroup.y,
            "btagX":bboxGroup2.x,
            "btagY":bboxGroup2.y
        };

        return(positions);
    };

     const handleDisplayRequest = (obj) => {
        console.log("Top level Display Request:", obj );
        setDisplayRequest(true);
        let req =  obj;
        let len = 400;
        let rads = 2*(Math.PI);
        let cx = 2*sysCx;
        let cy = 2*sysCy;
       
        let ridx;
        let numItems;
        let conv;
        let currentArr = [...displayReferenceArr];

        console.log("request type:", req.type);
        if(req.type.match(/System Organs/g) ){

            ridx = req.system_index;
            numItems = req.organs.length;
            conv = rads/numItems;

             let req2 = {
                "system_index":req.system_index,
                "type": req.type
            };


            setCurrentSystemIndex(ridx);
            setEClientY(req.e.clientY);            
            setEPageY(req.e.pageY);
            setStemLength(400);

            if(numItems > 40)
                setSysOpacity(0.15);
            else
                setSysOpacity(1.0);

           // currentArr[ridx] = req;
            if(currentArr[ridx] === undefined)
                currentArr[ridx] = req;
            currentArr[ridx].system_name = req.system_name;
            currentArr[ridx].displayed = true;

            currentArr[ridx].organs = req.organs;
            currentArr[ridx].cx = cx;
            currentArr[ridx].cy = cx;
            setTransX(-cx);
            setTransY(-cy);

            let stemArr = [];
            for (let i = 1;i <= numItems; i++){
                stemArr.push(i);
            }
          
                stemArr.map((l) => {
                    l;
                    if(currentArr[ridx].organs[l-1].lx1 == undefined){
                        //currentArr[ridx].organs = req.organs;
                        currentArr[ridx].organs[l-1].lx1 = cx + Math.cos(l*conv)*(sys_radius);
                        currentArr[ridx].organs[l-1].ly1 = cy + Math.sin(l*conv)*(sys_radius);   
                        currentArr[ridx].organs[l-1].lx2 = cx + Math.cos(l*conv)*(sys_radius-org_radius) + Math.cos(l*conv)*(len);
                        currentArr[ridx].organs[l-1].ly2 = cy + Math.sin(l*conv)*(sys_radius-org_radius) + Math.sin(l*conv)*(len);   
                        currentArr[ridx].organs[l-1].cx = cx + Math.cos(l*conv)*(sys_radius) + Math.cos(l*conv)*(len);
                        currentArr[ridx].organs[l-1].cy = cy + Math.sin(l*conv)*(sys_radius) + Math.sin(l*conv)*(len); 
                    }
                   
                });

            console.log("Current Arr after Organs Add:",currentArr);

            setTimeout(() => {
                 let positions = getGuiPositions(req2);
            console.log("Part positions:", positions);
            },2000);
           

           
        }
        else if(req.type.match(/Organ Parts/g) ){
            let req2 = {
                "system_index":req.system_index,
                "organ_index":req.organ_index,
                "type": req.type
            };

            let positions = getGuiPositions(req2);
            console.log("Part positions:", positions);
           

            setSysOpacity(0.15);
            console.log("System Open:", showSystemOrgans[currentSystemIndex]);
            numItems = req.parts.length;
            let adj = 2*(Math.PI)/30;
            
            conv = rads/numItems;
            len = 260; 
            setStemLength(len);
            setCurrentSystemIndex(req.system_index);
            setCurrentOrganIndex(req.organ_index);
            
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);
            //currentArr[req.system_index].organs[req.organ_index] = {};

            currentArr[req.system_index].organs[req.organ_index].parts = req.parts;  
            currentArr[req.system_index].organs[req.organ_index].type = req.type;
            currentArr[req.system_index].organs[req.organ_index].organ_organ_parts_idx = req.organ_organ_parts_idx;
            currentArr[req.system_index].organs[req.organ_index].organ_index = req.organ_index;

            let stemArr = [];
            for (let j = 1;j <= numItems; j++){
                stemArr.push(j);
            }
            stemArr.map((l) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].cy;
                    setTransX(-cx);
                    setTransY(-cy);

                    console.log("first calc:",200 + Math.cos(l*conv)*(sys_radius) );
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx1 = cx + Math.cos(l*conv + adj)*(org_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].ly1 = cy + Math.sin(l*conv + adj)*(org_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx2 = cx + Math.cos(l*conv + adj)*(org_radius-part_radius) + Math.cos(l*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].ly2 = cy + Math.sin(l*conv + adj)*(org_radius-part_radius) + Math.sin(l*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].cx = cx + Math.cos(l*conv + adj)*(org_radius) + Math.cos(l*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].cy = cy + Math.sin(l*conv + adj)*(org_radius) + Math.sin(l*conv + adj)*(len); 
                }                
            });
              console.log("Current Arr after Parts Add:",currentArr);
        }
        else if(req.type.match(/Part Histo_Layers/g) ){

            numItems = req.histo_layers.length;
            let adj = 2*(Math.PI)/-30;
            conv = rads/numItems;
            len = 250; 
            setStemLength(len);       

            setCurrentSystemIndex(req.system_index);              
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

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

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].lx1 = cx + Math.cos(m*conv + adj)*(part_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].ly1 = cy + Math.sin(m*conv + adj)*(part_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].lx2 = cx + Math.cos(m*conv + adj)*(part_radius-histo_layer_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].ly2 = cy + Math.sin(m*conv + adj)*(part_radius-histo_layer_radius) + Math.sin(m*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].cx = cx + Math.cos(m*conv + adj)*(part_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].cy = cy + Math.sin(m*conv + adj)*(part_radius) + Math.sin(m*conv + adj)*(len); 
                    
                
                
                }                
            });
             
        }
         else if(req.type.match(/Histo_Sublayers/g) ){
            numItems = req.histo_sublayers.length;
            let adj = 2*(Math.PI)/-30;
            conv = rads/numItems;
            len = 110; 
            setStemLength(len); 

            setCurrentSystemIndex(req.system_index);    
            setCurrentOrganIndex(req.organ_index);    
            setCurrentPartIndex(req.part_index);              
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            console.log("Check histo sublayers in setup:", req.histo_sublayers);
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers = req.histo_sublayers;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayer_idx = req.histo_sublayer_idx;

            let stemArr = [];
            for (let k = 1;k <= numItems; k++){
                stemArr.push(k);
            }
            stemArr.map((m) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[req.part_index]
                    .histo_layers[req.histo_layer_index].histo_sublayers[m-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].cy;

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[m-1].lx1 = cx + Math.cos(m*conv + adj)*(part_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[m-1].ly1 = cy + Math.sin(m*conv + adj)*(part_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[m-1].lx2 = cx + Math.cos(m*conv + adj)*(part_radius-histo_layer_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[m-1].ly2 = cy + Math.sin(m*conv + adj)*(part_radius-histo_layer_radius) + Math.sin(m*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[m-1].cx = cx + Math.cos(m*conv + adj)*(part_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[m-1].cy = cy + Math.sin(m*conv + adj)*(part_radius) + Math.sin(m*conv + adj)*(len); 
            
                
                }                
            });
              console.log("Current Arr after Histo_Sublayer Add:",currentArr); 
        }
         else if(req.type.match(/Organ Layers/g) ){

            numItems = req.organ_layers.length;
            let adj = 2*(Math.PI)/-30;
            conv = rads/numItems;
            len = 80;
            setStemLength(len); 

            setCurrentSystemIndex(req.system_index);              
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            currentArr[req.system_index].organs[req.organ_index].organ_layers = req.organ_layers;  
            currentArr[req.system_index].organs[req.organ_index].organ_organ_layers_idx = req.organ_organ_layers_idx;

            let stemArr = [];
            for (let k = 1;k <= numItems; k++){
                stemArr.push(k);
            }
            stemArr.map((n) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].organ_layers[n-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].cy;

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].organ_layers[n-1].lx1 = cx + Math.cos(n*conv + adj)*(org_radius);
                    currentArr[req.system_index].organs[req.organ_index].organ_layers[n-1].ly1 = cy + Math.sin(n*conv + adj)*(org_radius);   
                    currentArr[req.system_index].organs[req.organ_index].organ_layers[n-1].lx2 = cx + Math.cos(n*conv + adj)*(org_radius-organ_layer_radius) + Math.cos(n*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].organ_layers[n-1].ly2 = cy + Math.sin(n*conv + adj)*(org_radius-organ_layer_radius) + Math.sin(n*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].organ_layers[n-1].cx = cx + Math.cos(n*conv + adj)*(org_radius) + Math.cos(n*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].organ_layers[n-1].cy = cy + Math.sin(n*conv + adj)*(org_radius) + Math.sin(n*conv + adj)*(len); 
                }                
            });
             
        }
        else if(req.type.match(/Part Structures/g) ){

            numItems = req.other_structures.length;
            let adj = 2*(Math.PI)/(+30);

            if(numItems === 1)
                conv = rads/getRandomIntInclusive(3,7);
            else 
                conv = rads/numItems;


            len = 120
            setStemLength(len); 

            setCurrentSystemIndex(req.system_index);    
            setCurrentOrganIndex(req.organ_index);    
            setCurrentPartIndex(req.part_index);      
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures = req.other_structures; 
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].part_index = req.part_index; 
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].organ_index = req.organ_index;  
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].part_other_structures_idx = req.part_other_structures_idx;  

            let stemArr = [];
            for (let o = 1;o <= numItems; o++){
                stemArr.push(o);
            }
            stemArr.map((n) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures[n-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cy;

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures[n-1].lx1 = cx + Math.cos(n*conv + adj)*(part_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures[n-1].ly1 = cy + Math.sin(n*conv + adj)*(part_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures[n-1].lx2 = cx + Math.cos(n*conv + adj)*(part_radius-other_structure_radius) + Math.cos(n*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures[n-1].ly2 = cy + Math.sin(n*conv + adj)*(part_radius-other_structure_radius) + Math.sin(n*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures[n-1].cx = cx + Math.cos(n*conv + adj)*(part_radius) + Math.cos(n*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures[n-1].cy = cy + Math.sin(n*conv + adj)*(part_radius) + Math.sin(n*conv + adj)*(len); 
               
                }                
            });
            console.log("Current Arr after Other Structures Add:",currentArr);
             
        }
        else if(req.type.match(/Part Sub-Parts/g) ){
            numItems = req.subparts.length;
            let adj = 2*(Math.PI)/(75);

            if(numItems === 1)
                conv = rads/getRandomIntInclusive(3,7);
            else 
                conv = rads/numItems;

            len = 160; 
            setStemLength(len); 
            setCurrentSystemIndex(req.system_index);    
            setCurrentOrganIndex(req.organ_index);    
            setCurrentPartIndex(req.part_index);      
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].subparts = req.subparts; 
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].part_index = req.part_index; 
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].organ_index = req.organ_index;  
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].part_subparts_idx = req.part_subparts_idx;  

            let stemArr = [];
            for (let p = 1;p <= numItems; p++){
                stemArr.push(p);
            }
            stemArr.map((p) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].subparts[p-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cy;

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].subparts[p-1].lx1 = cx + Math.cos(p*conv + adj)*(part_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].subparts[p-1].ly1 = cy + Math.sin(p*conv + adj)*(part_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].subparts[p-1].lx2 = cx + Math.cos(p*conv + adj)*(part_radius-subpart_radius) + Math.cos(p*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].subparts[p-1].ly2 = cy + Math.sin(p*conv + adj)*(part_radius-subpart_radius) + Math.sin(p*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].subparts[p-1].cx = cx + Math.cos(p*conv + adj)*(part_radius) + Math.cos(p*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].subparts[p-1].cy = cy + Math.sin(p*conv + adj)*(part_radius) + Math.sin(p*conv + adj)*(len); 
                }                
            });
            console.log("Current Arr after Subparts Add:",currentArr);
             
        }

         console.log("Bottom Current Arr after selected add:", currentArr);
         setDisplayReferenceArr(currentArr);
     };

     const RequestedDisplay = (props) => {
        
        let rads = 2*(Math.PI);
        let numItems = 8
        let conv = rads/numItems

        console.log("E Client Y:",eClientY);
        console.log("E Page Y:",ePageY);

       
        return (
        <svg id="mySvg" version="1.1"
             width={4*sysCx} height={4*sysCy}
             xmlns="http://www.w3.org/2000/svg" transform={`translate(${transX+stem_length} ${transY+stem_length+(ePageY-eClientY)})`} >
            <g id="myGElement" style={{zoom:"80%"}} >
                {console.log("Before Run DisplayReferenceArr: ", displayReferenceArr)}
                {   
                    showSystemOrgans[currentSystemIndex] &&
                        <>
                            <g id={`S${currentSystemIndex+1}`}>
                                <circle  cx={2*sysCx} cy={2*sysCy} r={sys_radius} stroke="red" fill="transparent" style={{strokeWidth:"5"}} />
                                <text x={2*sysCx-16} y={2*sysCy+8} stroke="black" font-size="4">S-{currentSystemIndex+1}</text>
                            </g>
                           
                        </>
                }
             
                {  
                    showSystemOrgans[currentSystemIndex] && 
                    
                    displayReferenceArr.map((s,i) => i == currentSystemIndex && s !== undefined && s.organs !== undefined && 
                    s.organs.map((organ,ii) => (
                        <g key={ii.toString()} id={`S${currentSystemIndex+1}O${ii+1}`} onClick={() => openSystemOrgans(i)} >
                            
                                <line x1={organ.lx1} y1={organ.ly1} x2={organ.lx2} y2={organ.ly2} stroke="orange" style={{strokeWidth:"5",opacity:sys_opacity}}/>
                                <circle cx={organ.cx} cy={organ.cy} r={org_radius} stroke="red" fill="transparent" style={{strokeWidth:"5",opacity:sys_opacity}}/>                           
                                <text x={organ.cx-20} y={organ.cy+7} stroke="black" style={{opacity:sys_opacity}} font-size="4">O-{ii+1}</text>
                          
                                           
                              
                        </g>
                    )))
                }
               
                {  
                    showSystemOrgans[currentSystemIndex] && 
                    
                    displayReferenceArr.map((s,i) => i == currentSystemIndex && s !== undefined && s.organs !== undefined && 
                    s.organs.map((organ,ii) => (
                        <g key={ii.toString()} onClick={() => openSystemOrgans(i)} > 
                            { organ.organ_index === currentOrganIndex &&
                                <>
                                    <g id={`S${currentSystemIndex+1}O${ii+1}`}>
                                        <line x1={organ.lx1} y1={organ.ly1} x2={organ.lx2} y2={organ.ly2} stroke="orange" style={{strokeWidth:"5",opacity:"1"}}/>
                                        <circle cx={organ.cx} cy={organ.cy} r={org_radius} stroke="purple" fill="transparent" style={{strokeWidth:"5",opacity:"1"}}/>                           
                                        <text x={organ.cx-20} y={organ.cy+7} stroke="black" style={{opacity:"1"}} font-size="4">O-{ii+1}</text>     
                                    </g>    
                                </>
                             }
                               
                          
                             {  organ.organ_index === currentOrganIndex &&            
                                showItemContents[organ.organ_organ_parts_idx]  && organ.parts.map((part,j) => (                                
                                    <g key={j.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}`} onClick={() => showItems(organ.organ_organ_parts_idx)}>
                                        <line x1={part.lx1} y1={part.ly1} x2={part.lx2} y2={part.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                        <circle cx={part.cx} cy={part.cy} r={part_radius} stroke="red" fill="transparent" style={{strokeWidth:"4"}}/>
                                        <text x={part.cx-20} y={part.cy+7} stroke="black" font-size="2">P-{j+1}</text>
                                        {
                                            showItemContents[part.part_histo_layers_idx] && part.histo_layers.map((histo_layer,k) => (                                
                                                <g key={k.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}`}>
                                                    <line x1={histo_layer.lx1} y1={histo_layer.ly1} x2={histo_layer.lx2} y2={histo_layer.ly2} stroke="grey" style={{strokeWidth:"7"}}/>
                                                    <circle cx={histo_layer.cx} cy={histo_layer.cy} r={histo_layer_radius} stroke="blue" fill="transparent" style={{strokeWidth:"4"}}/>
                                                    <text x={histo_layer.cx-18} y={histo_layer.cy+7} stroke="black" style={{fontSize:"1.2em"}}>hl-{k+1}</text>
                                                     {
                                                       
                                                        showItemContents[histo_layer.histo_sublayer_idx] && histo_layer.histo_sublayers !== undefined && histo_layer.histo_sublayers.length > 0 && 
                                                            histo_layer.histo_sublayers.map((histo_sublayer,l) => (                                
                                                            <g key={k.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}Hsl${l+1}`}>
                                                                <line x1={histo_sublayer.lx1} y1={histo_sublayer.ly1} x2={histo_sublayer.lx2} y2={histo_sublayer.ly2} stroke="#000099" style={{strokeWidth:"7"}}/>
                                                                <circle cx={histo_sublayer.cx} cy={histo_sublayer.cy} r={histo_sublayer_radius} stroke="#993399" fill="transparent" style={{strokeWidth:"4"}}/>
                                                                <text x={histo_sublayer.cx-18} y={histo_sublayer.cy+7} stroke="black" style={{fontSize:"1.0em"}}>hsl-{l+1}</text>
                                                            </g>                                                    
                                                        )) 
                                                    }
                                                </g>                                                    
                                            )) 
                                        }
                                        {
                                           
                                            showItemContents[part.part_other_structures_idx] && part.other_structures.map((other_structure,l) => (                                
                                                <g key={l.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Os${l+1}`}>
                                                    <line x1={other_structure.lx1} y1={other_structure.ly1} x2={other_structure.lx2} y2={other_structure.ly2} stroke="#C0C0C0" style={{strokeWidth:"7"}}/>
                                                    <circle cx={other_structure.cx} cy={other_structure.cy} r={other_structure_radius} stroke="#00FF00" fill="transparent" style={{strokeWidth:"4"}}/>
                                                    <text x={other_structure.cx-18} y={other_structure.cy+7} stroke="black" style={{fontSize:"1.2em"}}>ps-{l+1}</text>
                                                </g>                                                    
                                            ))
                                        }
                                        {
                                           
                                            showItemContents[part.part_subparts_idx] && part.subparts.map((subpart,m) => (                                
                                                <g key={m.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Sp${l+1}`}>
                                                    <line x1={subpart.lx1} y1={subpart.ly1} x2={subpart.lx2} y2={subpart.ly2} stroke="#848884" style={{strokeWidth:"7"}}/>
                                                    <circle cx={subpart.cx} cy={subpart.cy} r={subpart_radius} stroke="#e8daef" fill="transparent" style={{strokeWidth:"4"}}/>
                                                    <text x={subpart.cx-18} y={subpart.cy+7} stroke="black" style={{fontSize:"1.2em"}}>sp-{m+1}</text>
                                                </g>                                                    
                                            ))
                                        }
                                    </g>                                    
                                ))
                             }
                             {                            
                                showItemContents[organ.organ_organ_layers_idx] && organ.organ_layers.map((organ_layer,l) => (                                
                                    <g onClick={() => showItems(organ.organ_organ_layers_idx)} key={l.toString()} id={`S${currentSystemIndex+1}O${ii+1}Ol${l+1}`}>
                                        <line x1={organ_layer.lx1} y1={organ_layer.ly1} x2={organ_layer.lx2} y2={organ_layer.ly2} stroke="brown" style={{strokeWidth:"7"}}/>
                                        <circle cx={organ_layer.cx} cy={organ_layer.cy} r={organ_layer_radius} stroke="green" fill="transparent" style={{strokeWidth:"4"}}/>
                                        <text x={organ_layer.cx-22} y={organ_layer.cy+7} stroke="black" font-size="2">ol-{l+1}</text>
                                         {
                                            showItemContents[part.part_histo_layers_idx] && part.histo_layers.map((histo_layer,k) => (                                
                                                <g key={k.toString()} >
                                                    <line x1={histo_layer.lx1} y1={histo_layer.ly1} x2={histo_layer.lx2} y2={histo_layer.ly2} stroke="grey" style={{strokeWidth:"7"}}/>
                                                    <circle cx={histo_layer.cx} cy={histo_layer.cy} r={histo_layer_radius} stroke="blue" fill="transparent" style={{strokeWidth:"4"}}/>
                                                    <text x={histo_layer.cx-18} y={histo_layer.cy+7} stroke="black" style={{fontSize:"1.2em"}}>hl-{k+1}</text>
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
                                     <div id="requested_display" >

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