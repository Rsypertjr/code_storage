import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import $ from 'jquery';
import Card from 'react-bootstrap/Card';

import Hierarchy from "./Orominer/Hierarchy.jsx"
import Draggable from 'react-draggable';
import { padStart } from 'lodash';
const parser = new DOMParser();
const partContentIndexes = [];
const organLayerIndexes = [];


export default function Orominer(props){
    const [displayRequest, setDisplayRequest] = useState(false);
    const [displayReferenceArr, setDisplayReferenceArr] = useState([]);
    const [currentSystemIndex, setCurrentSystemIndex] = useState(0);
    const [currentOrganIndex, setCurrentOrganIndex] = useState(0);
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [currentHistoLayerIndex, setCurrentHistoLayerIndex] = useState(0);
    const [currentHistoSublayerIndex, setCurrentHistoSublayerIndex] = useState(0);
    const [currentHistoCharIndex, setCurrentHistoCharIndex] = useState(0);
    const [showItemContents, setShowItemContents] = useState([]);
    const [showSystemOrgans, setShowSystemOrgans] = useState([]);
    const [sysCx, setSysCx] = useState(1100);
    const [sysCy, setSysCy] = useState(1100);
    const [transX, setTransX] = useState(0);
    const [transY, setTransY] = useState(0);
    const [eClientY, setEClientY] = useState(0);
    const [ePageY, setEPageY] = useState(0);
    const [sys_radius, setSysRadius] = useState(55);
    const [org_radius, setOrgRadius] = useState(35);
    const [part_radius, setPartRadius] = useState(35);
    const [sysColor,setSysColor] = useState('');
    const [orgColor,setOrgColor] = useState('');
    const [part_conv, setPartConv] = useState(0);
    const [histo_layer_radius, setHistoLayerRadius] = useState(35);
    const [histo_sublayer_radius, setHistoSubLayerRadius] = useState(35);
    const [histo_char_radius, setHistoCharRadius] = useState(35);
    
    const [showAll, setShowAll] = useState(false);
    
    const [cell_radius, setCellRadius] = useState(35);
    const [ecell_radius, setECellRadius] = useState(40);
    const [other_structure_radius, setOtherStructureRadius] = useState(35);    
    const [subpart_radius, setSubpartRadius] = useState(35);
    const [organ_layer_radius, setOrganLayerRadius] = useState(35);
    const [sys_opacity, setSysOpacity] = useState(1.0);    
    const [zoomFac, setZoomFac] = useState(0.75);
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
       setSysColor("#ffff99");
       setOrgColor("#e6eeff");
    },[])

    useEffect(() => {
        setShowAll(showAll);
    },[showAll,setShowAll])

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

    const useReferenceObject = (obj) => {      // Passes in object from Button Display to open up sub items
        console.log("Passed System Reference Object:",obj);   
        handleDisplayRequest(obj);   // handles display of svg graphics of sub iitems
    };

    function getRandomIntInclusive(min, max) {  // produces random number within range used to calculate angles of display items
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    } 

    const handleOpenClose = (res) => {

        setShowAll(res);
    };

    const getGuiPositions = (req) => {   // Gets positions of button and relative display items
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

     const getIndices = (type,indexArr,e ) => {
       // e.stopPropagation();
        console.log("type",type);
        console.log("indexArr",indexArr);

        let system_index;
        let organ_index;
        let part_index;
        let histo_layer_index;
        let histo_sublayer_index;
        let item;
        let sysColor;
        let orgColor;
        let partColor;
        let histoLayerColor;
        let histoSublayerColor;

        if(indexArr[0] !== undefined)
        {
            system_index = indexArr[0];
            sysColor = "#ffff99";
        }
        if(indexArr[1] !== undefined){
            organ_index = indexArr[1];
            orgColor = "#e6eeff";
            item = displayReferenceArr[system_index].organs[organ_index];
            console.log("Item contents:", item);         
        }
        if(indexArr[2] !== undefined){
            part_index = indexArr[2];
            partColor = "#ffe6f2";
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index];
            console.log("Item contents:", item);         
        }
        if(indexArr[3] !== undefined){
            histo_layer_index = indexArr[3];
            histoLayerColor = "#e5ffe5";
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index].histo_layers[histo_layer_index];
            console.log("Item contents:", item);         
        }
          if(indexArr[4] !== undefined){
            histo_sublayer_index = indexArr[4];
            histoSublayerColor = "#ccffff";
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index].histo_layers[histo_layer_index].histo_sublayers[histo_sublayer_index];
            console.log("Item contents:", item);         
        }    

        $("#graph_header").css("z-index",400);
        $("#infoBar").text('');
        let tag;

        let el = `<span></span`;
        let search;
        let test = type === "system" || type === "organ" || type === "part" || type === "histo_layer" || type === "histo_sublayer";
        if(type === "system" || type === "organ" || type === "part" || type === "histo_layer" || type === "histo_sublayer"){
            console.log("Display Reference Arr:", displayReferenceArr);
            let system_name = displayReferenceArr[indexArr[0]].system_name;
            console.log("System Name:", system_name);            
            let id = `S${indexArr[0]+1}`;
            tag = `<div id="S${system_index+1}" 
            style="color:${sysColor};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${sysColor};border-radius:25px">System Name (S-${system_index+1}) is: 
            ${system_name}</div>`;
            console.log("tag",tag);
            //search = $("#infoBar").find(`#S${indexArr[0]+1}`);  
        }
        if(type === "organ" || type === "part" || type === "part" || type === "histo_layer" || type === "histo_sublayer"){
            console.log("Display Reference Arr:", displayReferenceArr);
            let organ_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].organ_name;
            console.log("Organ Name:", organ_name);            
            let id = `S${indexArr[1]+1}`;
            tag += `<div style="color:${orgColor};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${orgColor};border-radius:25px" 
            id="O${id}">Organ Name (O-${organ_index+1}) is: ${organ_name}</div>`;
            console.log("tag",tag);
            //search = $("#infoBar").find(`#S${indexArr[1]+1}`);  
           ;          
        }
        if(type === "part" || type === "histo_layer" || type === "histo_sublayer"){
            console.log("Display Reference Arr:", displayReferenceArr);
            let part_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].part_name;
            console.log("Part Name:", part_name);            
            let id = `S${part_index+1}`;
            tag += `<div style="color:${partColor};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${partColor};border-radius:25px"} 
            id="P${id}">Part Name (P-${part_index+1}) is:  ${part_name}</div>`;
            console.log("tag",tag);
            //search = $("#infoBar").find(`#S${indexArr[1]+1}`);  
           ;          
        }
         if(type === "histo_layer" || type === "histo_sublayer"){
            console.log("Display Reference Arr:", displayReferenceArr);
            let histo_layer_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].histo_layers[indexArr[3]].histo_layer_name;
            console.log("Histo Layer Name:", histo_layer_name);            
            let id = `S${histo_layer_index+1}`;
            tag += `<div style="color:${histoLayerColor};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${histoLayerColor};border-radius:25px" 
            id="S${id}">Histo_Layer Name (hl-${histo_layer_index+1}) is: ${histo_layer_name}</div>`;
            console.log("tag",tag);
            //search = $("#infoBar").find(`#S${indexArr[1]+1}`);  
           ;          
        }
         if(type === "histo_sublayer"){
            console.log("Display Reference Arr:", displayReferenceArr);
            let histo_sublayer_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].histo_layers[indexArr[3]].histo_sublayers[indexArr[4]].histo_sublayer_name;
            console.log("Histo Sublayer Name:", histo_sublayer_name);            
            let id = `S${histo_sublayer_index+1}`;
            tag += `<div style="color:${histoSublayerColor};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${histoSublayerColor};border-radius:25px" 
            id="S${id}">Histo_Subayer Name (hl-${histo_sublayer_index+1}) is: ${histo_sublayer_name}</div>`;
            console.log("tag",tag);
            //search = $("#infoBar").find(`#S${indexArr[1]+1}`);  
           ;          
        }

         add_to_bar(tag);
     };

    

    let add_to_bar = (tag) => {
        
            $("#displayBar").css("display","block").css("width","100%").animate({
            width:"70%",
            height:"100%",
            display:"block",
            },500);  
            
            $("#infoBar").css("width","0%").animate({
            width:"30%",
            display:"block",
            position:"absolute",
            zIndex:"400",
            fontSize:"1.5em"
            },500).append(tag).css("display","block").css("width","0%");       
    };

     const closeInfoBar = () => {
         
                $("#displayBar").css("display","block").css("width","70%").animate({
                width:"100%",
                height:"100%",
                display:"block",
                },1000);  
                
                $("#infoBar").css("width","30%").animate({
                width:"0%",
                display:"none",
                position:"absolute",
                zIndex:"400",
                fontSize:"1.5em"
                },1000).append(tag).css("display","block");       

     };
 
    // Handles request for svg items display requested by the Hierachy buttons 
     const handleDisplayRequest = (obj) => {
        console.log("Top level Display Request:", obj );
        setDisplayRequest(true);
        let req =  obj;

        let len = 400;  // length of item stem
        let rads = 2*(Math.PI);  // 360 degrees in radians

        let cx = 2*sysCx;  // x, y positions of system item display
        let cy = 2*sysCy;
       
        // variables used in each type
        let ridx;  // system item index
        let numItems;  // Number of the items requested to be displayed
        let conv;  // angle/displacement of each item
        let currentArr = [...displayReferenceArr];   // global object (displayReferenceArr) to be updated by currentArr
      

        console.log("request type:", req.type);
        if(req.type.match(/System Organs/g) ){

            ridx = req.system_index;
            numItems = req.organs.length;
            conv = rads/numItems;
            setSysColor(props.color);

             let req2 = {
                "system_index":req.system_index,
                "type": req.type
            };


            setCurrentSystemIndex(ridx);
            setEClientY(req.e.clientY);    // Button position within window (scrolled position)        
            setEPageY(req.e.pageY);  // Absolute button position on Page

            if(numItems > 40)  // If too many items that would overlap, then make less visible so individual item selections are more visible
                setSysOpacity(0.35);
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
          
            // Calculate stem line coordinates and circle center for item
            stemArr.map((l) => {
                l;
                if(currentArr[ridx].organs[l-1].lx1 == undefined){
                    //currentArr[ridx].organs = req.organs;
                    currentArr[ridx].organs[l-1].organ_index = l;
                    currentArr[ridx].organs[l-1].open = showSystemOrgans[req.system_index];
                    //currentArr[ridx].organs[l-1].organ_organ_parts_idx = req.organ_organ_parts_idx;
                    currentArr[ridx].organs[l-1].lx1 = cx + Math.cos(l*conv)*(sys_radius);
                    currentArr[ridx].organs[l-1].ly1 = cy + Math.sin(l*conv)*(sys_radius);   
                    currentArr[ridx].organs[l-1].lx2 = cx + Math.cos(l*conv)*(sys_radius-org_radius) + Math.cos(l*conv)*(len);
                    currentArr[ridx].organs[l-1].ly2 = cy + Math.sin(l*conv)*(sys_radius-org_radius) + Math.sin(l*conv)*(len);   
                    currentArr[ridx].organs[l-1].cx = cx + Math.cos(l*conv)*(sys_radius) + Math.cos(l*conv)*(len);
                    currentArr[ridx].organs[l-1].cy = cy + Math.sin(l*conv)*(sys_radius) + Math.sin(l*conv)*(len); 
                }
                
            });

            console.log("Current Arr after Organs Add:",currentArr);

            //Caluculate Button and Gui positions after display
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
            
            setShowAll(false);
            let positions = getGuiPositions(req2);
            console.log("Part positions:", positions);
           

            setSysOpacity(0.35);
            console.log("System Open:", showSystemOrgans[currentSystemIndex]);
            numItems = req.parts.length;
            let adj = 2*(Math.PI)/30;
            
            conv = rads/numItems;
            len = 400; 
            setCurrentSystemIndex(req.system_index);
            setCurrentOrganIndex(req.organ_index);
            
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);
            //currentArr[req.system_index].organs[req.organ_index] = {};

            currentArr[req.system_index].organs[req.organ_index].parts = req.parts;  
            currentArr[req.system_index].organs[req.organ_index].type = req.type;
            currentArr[req.system_index].organs[req.organ_index].organ_organ_parts_idx = req.organ_organ_parts_idx;
            currentArr[req.system_index].organs[req.organ_index].organ_index = req.organ_index;
            currentArr[req.system_index].organs[req.organ_index].open = showItemContents[req.organ_organ_parts_idx];

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
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].part_index = l;
                    let item = currentArr[req.system_index].organs[req.organ_index]
                    if(currentArr[req.system_index].organs[req.organ_index].parts[l-1] !== undefined)                        
                        currentArr[req.system_index].organs[req.organ_index].parts[l-1].open =  false;
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].organ_index = req.organ_index;
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].system_index = req.system_index;
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx1 = cx + Math.cos(l*conv + adj)*(org_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].ly1 = cy + Math.sin(l*conv + adj)*(org_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].lx2 = cx + Math.cos(l*conv + adj)*(org_radius-part_radius) + Math.cos(l*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].ly2 = cy + Math.sin(l*conv + adj)*(org_radius-part_radius) + Math.sin(l*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].cx = cx + Math.cos(l*conv + adj)*(org_radius) + Math.cos(l*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[l-1].cy = cy + Math.sin(l*conv + adj)*(org_radius) + Math.sin(l*conv + adj)*(len); 
                }                
            });
            console.log("Current Arr after Parts Add:",currentArr);
               //Caluculate Button and Gui positions after display

            setTimeout(() => {
                let positions = getGuiPositions(req2);
            console.log("Part positions:", positions);
            },2000);
        }
        else if(req.type.match(/Part Histo_Layers/g) ){

            numItems = req.histo_layers.length;
            let adj = 2*(Math.PI)/-30;
            conv = rads/numItems;
            len = 350;     

            setCurrentSystemIndex(req.system_index);  
            setCurrentOrganIndex(req.organ_index);    
            setCurrentPartIndex(req.part_index);   
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            // Capture items to be displayed
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers = req.histo_layers;  
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].part_histo_layers_idx = req.part_histo_layers_idx;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].open = showItemContents[req.part_histo_layers_idx];


            let stemArr = [];
            for (let k = 1;k <= numItems; k++){
                stemArr.push(k);
            }
            stemArr.map((m) => {   // Calculate stems length and coordinates and circle center
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cy;

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].open = false;
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].system_index = currentSystemIndex;
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].organ_index = currentOrganIndex;
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].part_index = currentPartIndex;
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
            len = 200; 

            setCurrentSystemIndex(req.system_index);  
            setCurrentOrganIndex(req.organ_index);    
            setCurrentPartIndex(req.part_index);      
            setCurrentHistoLayerIndex(req.histo_layer_index);            
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            console.log("Check histo sublayers in setup:", req.histo_sublayers);
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers = req.histo_sublayers;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_layer_histo_sublayers_idx = req.histo_layer_histo_sublayers_idx;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].open = showItemContents[req.histo_layer_histo_sublayers_idx];
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
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[m-1].open = false;
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
           else if(req.type.match(/Histo_Chars/g) ){
         
            numItems = req.histo_chars.length;
            let adj = 2*(Math.PI)/-30;
            conv = rads/getRandomIntInclusive(numItems,numItems+2); // Randomsly shift item angles
            len = 150; 
            setCurrentSystemIndex(req.system_index);    
            setCurrentOrganIndex(req.organ_index);    
            setCurrentPartIndex(req.part_index);      
            setCurrentHistoLayerIndex(req.histo_layer_index);  
            setCurrentHistoSublayerIndex(req.histo_sublayer_index);
                     
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            console.log("Check histo chars in setup:", req.histo_chars);
            console.log("Check currentArr in setup",currentArr);
            if (currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars === undefined)
                currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars = req.histo_chars;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_sublayer_histo_chars_idx = req.histo_sublayer_histo_chars_idx;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].open = showItemContents[req.histo_sublayer_histo_chars_idx];

            let stemArr = [];
            for (let k = 1;k <= numItems; k++){
                stemArr.push(k);
            }
            stemArr.map((m) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[m-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].cy;

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[m-1].lx1 = cx + Math.cos(m*conv + adj)*(histo_sublayer_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[m-1].ly1 = cy + Math.sin(m*conv + adj)*(histo_sublayer_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[m-1].lx2 = cx + Math.cos(m*conv + adj)*(histo_sublayer_radius-histo_char_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[m-1].ly2 = cy + Math.sin(m*conv + adj)*(histo_sublayer_radius-histo_char_radius) + Math.sin(m*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[m-1].cx = cx + Math.cos(m*conv + adj)*(histo_sublayer_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[m-1].cy = cy + Math.sin(m*conv + adj)*(histo_sublayer_radius) + Math.sin(m*conv + adj)*(len); 
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[m-1].open = false;
                
                }      
                    
            });
              console.log("Current Arr after Histo_Char Add:",currentArr); 

            
        }
         else if(req.type.match(/Cell/g) ){
           
            numItems = req.cells.length;
            let adj = 2*(Math.PI)/-30;
            conv = rads/getRandomIntInclusive(numItems,numItems+2); // Randomsly shift item angles
            len = 300; 
            setCurrentSystemIndex(req.system_index);    
            setCurrentOrganIndex(req.organ_index);    
            setCurrentPartIndex(req.part_index);      
            setCurrentHistoLayerIndex(req.histo_layer_index);  
            setCurrentHistoSublayerIndex(req.histo_sublayer_index); 
            setCurrentHistoCharIndex(req.histo_char_index);
                     
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            console.log("Check cells in setup:", req.cells);
            console.log("Check currentArr in setup",currentArr);
            if (currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].cells === undefined)
                currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].cells = req.cells;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].histo_char_cells_idx = req.histo_char_cells_idx;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].open = showItemContents[req.histo_char_cells_idx];
            let stemArr = [];
            for (let k = 1;k <= numItems; k++){
                stemArr.push(k);
            }
            stemArr.map((m) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].cells[m-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].cy;

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].cells[m-1].lx1 = cx + Math.cos(m*conv + adj)*(histo_sublayer_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].cells[m-1].ly1 = cy + Math.sin(m*conv + adj)*(histo_sublayer_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].cells[m-1].lx2 = cx + Math.cos(m*conv + adj)*(histo_sublayer_radius-histo_char_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].cells[m-1].ly2 = cy + Math.sin(m*conv + adj)*(histo_sublayer_radius-histo_char_radius) + Math.sin(m*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].cells[m-1].cx = cx + Math.cos(m*conv + adj)*(histo_sublayer_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].cells[m-1].cy = cy + Math.sin(m*conv + adj)*(histo_sublayer_radius) + Math.sin(m*conv + adj)*(len); 
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].cells[m-1].open = false;
                
                }      
                    
            });
              console.log("Current Arr after Cells Add:",currentArr); 
            
        }

          else if(req.type.match(/Ecell_Matrix/g) ){
           
            numItems = req.ecell_matrices.length;
            let adj = 2*(Math.PI)/-30;
            conv = rads/getRandomIntInclusive(numItems,numItems+2); // Randomsly shift item angles
            len = 300; 
            setCurrentSystemIndex(req.system_index);    
            setCurrentOrganIndex(req.organ_index);    
            setCurrentPartIndex(req.part_index);      
            setCurrentHistoLayerIndex(req.histo_layer_index);  
            setCurrentHistoSublayerIndex(req.histo_sublayer_index); 
            setCurrentHistoCharIndex(req.histo_char_index);
                     
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            console.log("Check cells in setup:", req.cells);
            console.log("Check currentArr in setup",currentArr);
            if (currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].ecell_matrices === undefined)
                currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].ecell_matrices = req.ecell_matrices;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].histo_char_cells_idx = req.histo_char_ecells_matrices_idx;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index]
                .histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].open = showItemContents[req.histo_char_ecells_matrices_idx];
                
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index]
                .histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].histo_char_ecells_matrices_idx = req.histo_char_ecells_matrices_idx;


            let stemArr = [];
            for (let k = 1;k <= numItems; k++){
                stemArr.push(k);
            }
            stemArr.map((m) => {
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].ecell_matrices[m-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].cy;

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].ecell_matrices[m-1].lx1 = cx + Math.cos(m*conv + adj)*(histo_sublayer_radius);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].ecell_matrices[m-1].ly1 = cy + Math.sin(m*conv + adj)*(histo_sublayer_radius);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].ecell_matrices[m-1].lx2 = cx + Math.cos(m*conv + adj)*(histo_sublayer_radius-histo_char_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].ecell_matrices[m-1].ly2 = cy + Math.sin(m*conv + adj)*(histo_sublayer_radius-histo_char_radius) + Math.sin(m*conv + adj)*(len);   
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].ecell_matrices[m-1].cx = cx + Math.cos(m*conv + adj)*(histo_sublayer_radius) + Math.cos(m*conv + adj)*(len);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].ecell_matrices[m-1].cy = cy + Math.sin(m*conv + adj)*(histo_sublayer_radius) + Math.sin(m*conv + adj)*(len); 
            
                     currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                        .histo_chars[req.histo_chars_index].ecell_matrices[m-1].open = false;
                }      
                    
            });
              console.log("Current Arr after Cells Add:",currentArr); 
            
        }
         else if(req.type.match(/Organ Layers/g) ){

            numItems = req.organ_layers.length;
            let adj = 2*(Math.PI)/-30;
            conv = rads/numItems;
            len = 80;; 

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
            let adj = 2*(Math.PI)/(+30);  // Adjust added to item angles
          
            conv = rads/getRandomIntInclusive(numItems,numItems+2); // Randomsly shift item angles

            len = 120

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
            
            conv = rads/getRandomIntInclusive(numItems,numItems+2); // Randomsly shift item angles

            len = 160; 
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
        let len = 500;
        const itemsDisplay = (show,currentOrganIndex,currentPartIndex,ii,j,idx) => {

            let boolCalc = ( !show && (currentOrganIndex === ii && currentPartIndex === j)  ||   show && (currentOrganIndex === ii && (currentPartIndex !== j
                                            || currentPartIndex === j
                        )));
            //props.showItems(idx);
            return boolCalc;
        };

       
      

        console.log("E Client Y:",eClientY);
        console.log("E Page Y:",ePageY);



       
        return (
        <svg id="mySvg" version="1.1"
             width={4*sysCx} height={4*sysCy}
             xmlns="http://www.w3.org/2000/svg" transform={`translate(${transX+len} ${transY+len+(ePageY-eClientY)})`} >
            <g id="myGElement" style={{zoom:zoomFac}} >
                {console.log("Before Run DisplayReferenceArr: ", displayReferenceArr)}
                {   
                    showSystemOrgans[currentSystemIndex] && 
                        <>
                           { <g key={currentSystemIndex.toString()+"system"} onClick={(e) => getIndices("system",[currentSystemIndex],e)} id={`S${currentSystemIndex+1}`}>
                                <circle  cx={2*sysCx} cy={2*sysCy} r={sys_radius} stroke="black"  fill="#ffff99" style={{strokeWidth:"1"}} />
                                <text x={2*sysCx-31} y={2*sysCy+14} stroke="black" style={{fontSize:"3.0em"}}>{`S-${currentSystemIndex+1}`}</text>
                            </g>
                           }                      
                        </>
                       
                }
             
                {  
                    showSystemOrgans[currentSystemIndex] && 
                    
                    displayReferenceArr.map((s,i) => i == currentSystemIndex && s !== undefined && s.organs !== undefined && 
                    s.organs.map((organ,ii) => (
                        <>                             
                            <g key={ii.toString()+"organ"} id={`S${currentSystemIndex+1}O${ii+1}`} onClick={(e) => getIndices("organ",[currentSystemIndex,ii],e)}>                                
                                <line x1={organ.lx1} y1={organ.ly1} x2={organ.lx2} y2={organ.ly2} stroke="orange" style={{strokeWidth:"5",opacity:sys_opacity}}/>
                                <circle cx={organ.cx} cy={organ.cy} r={org_radius} stroke="black" fill="#e6eeff" style={{strokeWidth:"1",opacity:sys_opacity}}/>                           
                                <text x={organ.cx-24} y={organ.cy+10} stroke="black" style={{opacity:sys_opacity,fontSize:"2.0em"}}>O-{ii+1}</text>
                            </g>
                        </>
                       
                    )))
                }
               
                {  
                    showSystemOrgans[currentSystemIndex] && 
                    
                    displayReferenceArr.map((s,i) => i == currentSystemIndex && s !== undefined && s.organs !== undefined && 
                    s.organs.map((organ,ii) => (
                        currentOrganIndex === ii &&
                        <g key={ii.toString()}> 
                            { 
                                <>
                                    <g id={`S${currentSystemIndex+1}O${ii+1}`} onClick={(e) => getIndices("organ",[currentSystemIndex,ii],e)} >
                                        <line x1={organ.lx1} y1={organ.ly1} x2={organ.lx2} y2={organ.ly2} stroke="orange" style={{strokeWidth:"5",opacity:"1"}}/>
                                        <circle cx={organ.cx} cy={organ.cy} r={org_radius} stroke="black" fill="#e6eeff" style={{strokeWidth:"1",opacity:"1"}}/>                           
                                        <text x={organ.cx-24} y={organ.cy+10} stroke="black" style={{opacity:"1",fontSize:"2.0em"}}>O-{ii+1}</text>     
                                    </g>    
                                </>
                             }
                               
                            {   
                                showItemContents[organ.organ_organ_parts_idx] && organ.parts.map((part,j) => (   
                                    currentOrganIndex === ii && currentPartIndex !== j &&
                                    <g key={j.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}`} onClick={(e) => getIndices("part",[currentSystemIndex,ii,j],e)}>
                                        <line x1={part.lx1} y1={part.ly1} x2={part.lx2} y2={part.ly2} stroke="black" style={{strokeWidth:"7",opacity:sys_opacity}}/>
                                        <circle cx={part.cx} cy={part.cy} r={part_radius} stroke="black" fill="#ffe6f2" style={{strokeWidth:"1",opacity:sys_opacity}}/>
                                        <text x={part.cx-20} y={part.cy+9} stroke="black" style={{fontSize:"1.9em",opacity:sys_opacity}}>P-{j+1}</text>
                                    </g>
                                ))
                            }  

                          
                             {           
                                showItemContents[organ.organ_organ_parts_idx]  && organ.parts.map((part,j) => (  
                                    <g key={j.toString()}>    
                                        { 
                                        itemsDisplay(organ.open && part.open && !part.histo_layers[currentHistoLayerIndex].open,currentOrganIndex,currentPartIndex,ii,j) && 
                                            <>  
                                                <g  id={`S${currentSystemIndex+1}O${ii+1}P${j+1}`} onClick={(e) => getIndices("part",[currentSystemIndex,ii,j],e)}>
                                                    <line x1={part.lx1} y1={part.ly1} x2={part.lx2} y2={part.ly2} stroke="black" style={{strokeWidth:"7",opacity:"1"}}/>
                                                    <circle cx={part.cx} cy={part.cy} r={part_radius} stroke="black" fill="#ffe6f2" style={{strokeWidth:"1",opacity:"1"}}/>
                                                    <text x={part.cx-20} y={part.cy+9} stroke="black" style={{fontSize:"1.9em",opacity:"1"}}>P-{j+1}</text>
                                                </g>
                                            </>    
                                        }              
                                        { 
                                            showItemContents[part.part_histo_layers_idx] && part.histo_layers !== undefined &&
                                            part.histo_layers.length > 0 && part.histo_layers.map((histo_layer,k) => (   
                                                currentPartIndex === j && currentHistoLayerIndex !== k &&          
                                                <>                                                
                                                    <g key={k.toString()+histo_layer.lx1} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}`}onClick={(e) => getIndices("histo_layer",[currentSystemIndex,ii,j,k],e)}>
                                                        <line x1={histo_layer.lx1} y1={histo_layer.ly1} x2={histo_layer.lx2} y2={histo_layer.ly2} stroke="grey" style={{strokeWidth:"7",opacity:sys_opacity}}/>
                                                        <circle cx={histo_layer.cx} cy={histo_layer.cy} r={histo_layer_radius} stroke="black" fill="#e5ffe5" style={{strokeWidth:"1",opacity:sys_opacity}}/>
                                                        <text x={histo_layer.cx-26} y={histo_layer.cy+9} stroke="black" style={{fontSize:"1.8em",opacity:sys_opacity}}>hl-{k+1}</text>
                                                    </g>
                                                </>   
                                            ))
                                        }

                                        {  
                                            showItemContents[part.part_histo_layers_idx] && part.histo_layers !== undefined &&
                                            part.histo_layers.length > 0 && part.histo_layers.map((histo_layer,k) => (                                
                                                <g key={k.toString()+histo_layer.lx2} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}`}  >
                                                     {
                                                        itemsDisplay(part.open && histo_layer.open,currentPartIndex,currentHistoLayerIndex,j,k) &&   
                                                        <>
                                                            <g onClick={(e) => getIndices("histo_layer",[currentSystemIndex,ii,j,k],e)}>
                                                                <line x1={histo_layer.lx1} y1={histo_layer.ly1} x2={histo_layer.lx2} y2={histo_layer.ly2} stroke="grey" style={{strokeWidth:"7"}}/>
                                                                <circle cx={histo_layer.cx} cy={histo_layer.cy} r={histo_layer_radius} stroke="black" fill="#e5ffe5" style={{strokeWidth:"1"}}/>
                                                                <text x={histo_layer.cx-26} y={histo_layer.cy+9} stroke="black" style={{fontSize:"1.8em"}}>hl-{k+1}</text>
                                                            </g>
                                                        </>                                                  
                                                     }
                                                     {
                                                        showItemContents[histo_layer.histo_layer_histo_sublayers_idx] && histo_layer.histo_sublayers !== undefined && histo_layer.histo_sublayers.length > 0 && 
                                                            histo_layer.histo_sublayers.map((histo_sublayer,l) => (   
                                                            currentHistoLayerIndex === k && currentHistoSublayerIndex !== l &&
                                                            <>     
                                                                <g key={l.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}Hsl${l+1}`} onClick={(e) => getIndices("histo_sublayer",[currentSystemIndex,ii,j,k,l],e)}>
                                                                    <line x1={histo_sublayer.lx1} y1={histo_sublayer.ly1} x2={histo_sublayer.lx2} y2={histo_sublayer.ly2} stroke="#149900ff" style={{strokeWidth:"7",opacity:sys_opacity}}/>
                                                                    <circle cx={histo_sublayer.cx} cy={histo_sublayer.cy} r={histo_sublayer_radius} stroke="black" fill="#ccffff" style={{strokeWidth:"1",opacity:sys_opacity}}/>
                                                                    <text x={histo_sublayer.cx-31} y={histo_sublayer.cy+9} stroke="black" style={{fontSize:"1.8em",opacity:sys_opacity}}>hsl-{l+1}</text>
                                                                </g>   
                                                            </>                            
                                                           
                                                        ))
                                                     }
                                                    
                                                     {                                                       
                                                        showItemContents[histo_layer.histo_layer_histo_sublayers_idx] && histo_layer.histo_sublayers !== undefined && histo_layer.histo_sublayers.length > 0 && 
                                                            histo_layer.histo_sublayers.map((histo_sublayer,l) => (                                
                                                            <g key={l.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}Hsl${l+1}`} onClick={(e) => getIndices("histo_sublayer",[currentSystemIndex,ii,j,k,l],e)}>
                                                                {
                                                                    itemsDisplay(histo_layer.open && histo_sublayer.open,currentHistoLayerIndex,currentHistoSublayerIndex,k,l) &&   
                                                                    <>
                                                                        <g>
                                                                            <line x1={histo_sublayer.lx1} y1={histo_sublayer.ly1} x2={histo_sublayer.lx2} y2={histo_sublayer.ly2} stroke="#149900ff" style={{strokeWidth:"7"}}/>
                                                                            <circle cx={histo_sublayer.cx} cy={histo_sublayer.cy} r={histo_sublayer_radius} stroke="black" fill="#ccffff" style={{strokeWidth:"1"}}/>
                                                                            <text x={histo_sublayer.cx-31} y={histo_sublayer.cy+9} stroke="black" style={{fontSize:"1.8em"}}>hsl-{l+1}</text>
                                                                        </g>
                                                                    </>
                                                                }
                                                          
                                                             {
                                                                showItemContents[histo_sublayer.histo_sublayer_histo_chars_idx] && histo_sublayer.histo_chars !== undefined && 
                                                                    histo_sublayer.histo_chars.length > 0 && 
                                                                    histo_sublayer.histo_chars.map((histo_char,hc) => (    
                                                                        <>  
                                                                            {  
                                                                                currentHistoSublayerIndex === l && currentHistoCharIndex !== hc &&                                                                           
                                                                                <g key={hc.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}Hsl${l+1}Hc${hc+1}`}>
                                                                                    <line x1={histo_char.lx1} y1={histo_char.ly1} x2={histo_char.lx2} y2={histo_char.ly2} stroke="#990061ff" style={{strokeWidth:"7",opacity:sys_opacity}}/>
                                                                                    <circle cx={histo_char.cx} cy={histo_char.cy} r={histo_char_radius} stroke="black" fill="#fff2cc" style={{strokeWidth:"1",opacity:sys_opacity}}/>
                                                                                    <text x={histo_char.cx-26} y={histo_char.cy+10} stroke="black" style={{fontSize:"1.8em",opacity:sys_opacity}}>hc-{hc+1}</text> 
                                                                                </g>  
                                                                            } 
                                                                        </>                            
                                                                 
                                                                    ))
                                                             }
                                                                
                                                             {                                                       
                                                                showItemContents[histo_sublayer.histo_sublayer_histo_chars_idx] && histo_sublayer.histo_chars !== undefined && 
                                                                    histo_sublayer.histo_chars.length > 0 && 
                                                                    histo_sublayer.histo_chars.map((histo_char,hc) => (                                
                                                                    <g key={hc.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}Hsl${l+1}Hc${hc+1}`}>
                                                                        {
                                                                            itemsDisplay(histo_sublayer.open && histo_char.open,currentHistoSublayerIndex,currentHistoCharIndex,l,hc) && 
                                                                            <> 
                                                                                
                                                                                <g>
                                                                                    <line x1={histo_char.lx1} y1={histo_char.ly1} x2={histo_char.lx2} y2={histo_char.ly2} stroke="#990061ff" style={{strokeWidth:"7"}}/>
                                                                                    <circle cx={histo_char.cx} cy={histo_char.cy} r={histo_char_radius} stroke="black" fill="#fff2cc" style={{strokeWidth:"1"}}/>
                                                                                    <text x={histo_char.cx-26} y={histo_char.cy+10} stroke="black" style={{fontSize:"1.8em"}}>hc-{hc+1}</text>   
                                                                                </g>     
                                                                            </>
                                                                        }                                                                                                                                   
                                                                        {                                                       
                                                                            showItemContents[histo_char.histo_char_cells_idx] && histo_char.cells !== undefined && 
                                                                                histo_char.cells.length > 0 && 
                                                                                histo_char.cells.map((cell,cl) => (                                
                                                                                <g key={cl.toString()+cell.name} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}Hsl${l+1}Hc${hc+1}C${cl+1}`}>
                                                                                    <line x1={cell.lx1} y1={cell.ly1} x2={cell.lx2} y2={cell.ly2} stroke="#34afbfff" style={{strokeWidth:"7"}}/>
                                                                                    <circle cx={cell.cx} cy={cell.cy} r={cell_radius} stroke="black" fill="#ccd9ff" style={{strokeWidth:"1"}}/>
                                                                                    <text x={cell.cx-22} y={cell.cy+9} stroke="black" style={{fontSize:"1.8em"}}>cl-{cl+1}</text>
                                                                                </g>                                                    
                                                                            )) 
                                                                        }
                                                                          {                                                       
                                                                            showItemContents[histo_char.histo_char_ecells_matrices_idx] && histo_char.ecell_matrices !== undefined && 
                                                                                histo_char.ecell_matrices.length > 0 && 
                                                                                histo_char.ecell_matrices.map((ecell,ecl) => (                                
                                                                                <g key={ecl.toString()+ecell.name} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}Hsl${l+1}Hc${hc+1}C${ecl+1}`}>
                                                                                    <line x1={ecell.lx1} y1={ecell.ly1} x2={ecell.lx2} y2={ecell.ly2} stroke="#5E4F4B" style={{strokeWidth:"7"}}/>
                                                                                    <circle cx={ecell.cx} cy={ecell.cy} r={ecell_radius} stroke="black" fill="#77999E" style={{strokeWidth:"1"}}/>
                                                                                    <text x={ecell.cx-29} y={ecell.cy+9} stroke="black" style={{fontSize:"1.8em"}}>ecl-{ecl+1}</text>
                                                                                </g>                                                    
                                                                            )) 
                                                                        }
                                                                        
                                                                         {/*                                                      
                                                                            showItemContents[histo_char.histo_char_cells_idx] && histo_char.cells !== undefined && 
                                                                                histo_char.cells.length > 0 && 
                                                                                histo_char.cells.map((cell,cl) => (                                
                                                                                <g key={cl.toString()+cell.name} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Hl${k+1}Hsl${l+1}Hc${hc+1}C${cl+1}`}>
                                                                                    <line x1={cell.lx1} y1={cell.ly1} x2={cell.lx2} y2={cell.ly2} stroke="#34afbfff" style={{strokeWidth:"7"}}/>
                                                                                    <circle cx={cell.cx} cy={cell.cy} r={cell_radius} stroke="black" fill="#ccd9ff" style={{strokeWidth:"1"}}/>
                                                                                    <text x={cell.cx-22} y={cell.cy+9} stroke="black" style={{fontSize:"1.8em"}}>cl-{cl+1}</text>
                                                                                </g>                                                    
                                                                            )) 
                                                                        */}
                                                                    
                                                                    </g>                                                    
                                                                )) 
                                                            }
                                                            
                                                            
                                                            </g>                                                    
                                                        )) 
                                                    }
                                                </g>                                                    
                                            )) 
                                        }
                                        {
                                           
                                            showItemContents[part.part_other_structures_idx] && part.other_structure !== undefined && part.other_structures.length > 0 
                                                && part.other_structures.map((other_structure,l) => (                                
                                                <g key={l.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Os${l+1}`}>
                                                    <line x1={other_structure.lx1} y1={other_structure.ly1} x2={other_structure.lx2} y2={other_structure.ly2} stroke="#C0C0C0" style={{strokeWidth:"7"}}/>
                                                    <circle cx={other_structure.cx} cy={other_structure.cy} r={other_structure_radius} stroke="#00FF00" fill="transparent" style={{strokeWidth:"4"}}/>
                                                    <text x={other_structure.cx-18} y={other_structure.cy+7} stroke="black" style={{fontSize:"1.2em"}}>ps-{l+1}</text>
                                                </g>                                                    
                                            ))
                                        }
                                        {
                                           
                                            showItemContents[part.part_subparts_idx] && part.subparts !== undefined && part.subparts.length > 0 && part.subparts.map((subpart,m) => (                                
                                                <g key={m.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}Sp${m+1}`}>
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
                                    <g key={l.toString()} id={`S${currentSystemIndex+1}O${ii+1}Ol${l+1}`}>
                                        <line x1={organ_layer.lx1} y1={organ_layer.ly1} x2={organ_layer.lx2} y2={organ_layer.ly2} stroke="brown" style={{strokeWidth:"7"}}/>
                                        <circle cx={organ_layer.cx} cy={organ_layer.cy} r={organ_layer_radius} stroke="green" fill="transparent" style={{strokeWidth:"4"}}/>
                                        <text x={organ_layer.cx-22} y={organ_layer.cy+7} stroke="black" font-size="2">ol-{l+1}</text>
                                         {/*
                                            showItemContents[part.part_histo_layers_idx] && part.histo_layers !== undefined && part.histo_layers.length > 0 && 
                                                part.histo_layers.map((histo_layer,k) => (                                
                                                <g key={k.toString()} >
                                                    <line x1={histo_layer.lx1} y1={histo_layer.ly1} x2={histo_layer.lx2} y2={histo_layer.ly2} stroke="grey" style={{strokeWidth:"7"}}/>
                                                    <circle cx={histo_layer.cx} cy={histo_layer.cy} r={histo_layer_radius} stroke="blue" fill="transparent" style={{strokeWidth:"4"}}/>
                                                    <text x={histo_layer.cx-18} y={histo_layer.cy+7} stroke="black" style={{fontSize:"1.2em"}}>hl-{k+1}</text>
                                                </g>                                                    
                                            ))
                                        */}
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
                        showItems={showItems} showSystemOrgans={showSystemOrgans} setShowSystemOrgans={setShowSystemOrgans} openSystemOrgans={openSystemOrgans}
                        handleOpenClose={handleOpenClose}/>   
                </Col>
                <Col id="grphframe1" xs={8} className="w-60 p-0">
                    
                    <Row  id="graph_header" className="h-10">
                        <span id="" style={headerStyle} className="d-flex justify-content-center">Graph Display</span> 
                    </Row>    
                    {/*                   
                    <Row id="gphtitle" className="h-20">
                        <Col id="tab1" className="tab">Cell-to-Cell</Col>
                        <Col id="tab2" className="tab">Cell-to-Lumen</Col>
                        <Col id="gphmess">Graph Messages Here</Col>
                    </Row>
                    */}
                    <Row style={{position:"relative"}} >
                        <div id="displayBar">
                            <div style={{zIndex:"-1"}}>
                                {
                                    displayRequest && 
                                    <Draggable>
                                     <div id="requested_display" >

                                            <RequestedDisplay showAll={showAll} showItems={showItems}  /> 
                                                     
                                    </div>
                                    </Draggable>
                                   
                                }
                         
                            </div> 
                        </div>
                        <div id="infoBar" >
                           
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