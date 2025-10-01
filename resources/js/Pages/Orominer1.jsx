import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';

import $ from 'jquery';
import Card from 'react-bootstrap/Card';

import Hierarchy from "./Orominer/Hierarchy.jsx"
import Draggable from 'react-draggable';
import { add, padStart } from 'lodash';
const parser = new DOMParser();
const partContentIndexes = [];
const organLayerIndexes = [];
const colors = {
    system:"#ffff99",
    organ:"#e6eeff",
    part:"#ffe6f2",
    subpart:"#e8daef",
    histo_layer:"#e5ffe5",
    histo_sublayer:"#ccffff",
    organ_layer:"lightgray",
    histo_char:"#fff2cc",
    other_structure:"#e0c4ddff",
    cell:"#ccd9ff",
    ecell:"#77999E",

};
const tooltipStyle = {
    visibility:"hidden",
    height:"auto",
    width: "120px",
    fill: "#555",
    color: "#fff",
    textAlign: "center",
    //borderRadius: "6px",
    padding: "5px 0",
    position: "absolute",
    zIndex: "1",
    bottom: "125%",
    left: "50%",
    marginLeft: "-60px",
    opacity: "0",
    transition: "opacity 0.3s"
}

export default function Orominer(props){
    const [displayRequest, setDisplayRequest] = useState(false);
    const [displayReferenceArr, setDisplayReferenceArr] = useState([]);
    const [currentSystemIndex, setCurrentSystemIndex] = useState(0);
    const [currentOrganIndex, setCurrentOrganIndex] = useState(0);
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [currentHistoLayerIndex, setCurrentHistoLayerIndex] = useState(0);
    const [currentHistoSublayerIndex, setCurrentHistoSublayerIndex] = useState(0);
    const [currentHistoCharIndex, setCurrentHistoCharIndex] = useState(0);
    const [currentCellIndex, setCurrentCellIndex] = useState(0);
    const [currentEcellIndex, setCurrentEcellIndex] = useState(0);
    const [showItemContents, setShowItemContents] = useState([]);
    const [showSystemOrgans, setShowSystemOrgans] = useState([]);
    const [sysCx, setSysCx] = useState(1100);
    const [sysCy, setSysCy] = useState(1100);
    const [transX, setTransX] = useState(0);
    const [transY, setTransY] = useState(0);
    const [transLen, setTransLen] = useState(0);
    const [eClientY, setEClientY] = useState(0);
    const [ePageY, setEPageY] = useState(0);
    const [groupY,setGroupY] = useState(0);
    const [sys_radius, setSysRadius] = useState(55);
    const [org_radius, setOrgRadius] = useState(45);
    const [part_radius, setPartRadius] = useState(40);
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
    const [zoomFac, setZoomFac] = useState("0.65");
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
       $("#initInfoBar").text('').css("display","block").css('margin-left','20%').css("height","65%");
       let tag = `<div><p style="color:#0066CC">The is the Organism Relation Ontology or ORO Miner.  Click on Buttons under the Hierarchy Display to open up graphic displays of sub-organisms of their higher-level
        parent organisms.</p><br/><p style="color:#336600" >This begins with a System and the highest level and burrows down to cells.  The Graph Display shows labeled nodes for each organism and connections to their parent and sub-organisms.</p>
        <br/><p>If you click on one of these nodes this panel will open with a description of the organism from the highest to lowest level.</p></div>`;
        add_to_bar2($(tag).css("font-size","1.25em").css("padding","1em"),"40%");
    },[]);


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

    const getTags = (type,req) => {
        let tagId;       
        let buttonTagClass; 

        if(type.match(/System Organs/g))
        {
            tagId = `#S${req.system_index+1}`;            
            buttonTagClass = `.S-${req.system_index+1}`;
        }
        else if(type.match(/Organ Parts/g)){
            tagId = `#S${req.system_index+1}O${req.organ_index+1}`;
            buttonTagClass = `.S-${req.system_index+1}O-${req.organ_index+1}`;
        }
        else if(type.match(/Part Histo_Layers/g)){
            tagId = `#S${req.system_index+1}O${req.organ_index+1}P${req.part_index+1}`;
            buttonTagClass = `.S-${req.system_index+1}O-${req.organ_index+1}P-${req.part_index+1}`;
        } 
        else if(type.match(/Part Histo_Sublayers/g)){
            tagId = `#S${req.system_index+1}O${req.organ_index+1}P${req.part_index+1}hl${req.histo_layer_index+1}`;
            buttonTagClass = `.S-${req.system_index+1}O-${req.organ_index+1}P-${req.part_index+1}hl-${req.histo_layer+1}`;
        } 
        else if(type.match(/Part Structures/g)){
            tagId = `#S${req.system_index+1}O${req.organ_index+1}P${req.part_index+1}`;
            buttonTagClass = `.S-${req.system_index+1}O-${req.organ_index+1}P-${req.part_index+1}`;
        } 
        else;
        return [tagId,buttonTagClass];
    };

    const getGuiPositions = (req) => {   // Gets positions of button and relative display items
        console.log("Req:", req); 
        let tagId;       
        let buttonTagClass; 

        let tags = getTags(req.type,req)
        tagId = tags[0];
        buttonTagClass = tags[1];

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
        e.stopPropagation();
        console.log("type",type);
        console.log("indexArr",indexArr);
        $('#infoBar').html('').css("margin-top","0").css("width","0%");
       


        let system_index;
        let organ_index;
        let part_index;
        let organ_layer_index;
        let histo_layer_index;
        let cell_index;
        let ecell_index;
        let other_structure_index;
        let histo_sublayer_index;
        let subpart_index;
        let histo_char_index;
        let item;
        let req = [];

        if(indexArr[0] !== undefined)        {
            system_index = indexArr[0];
            req.system_index = system_index;
            item = displayReferenceArr[system_index];
        }
        if(indexArr[1] !== undefined){
            organ_index = indexArr[1];
            req.organ_index = organ_index;
            item = displayReferenceArr[system_index].organs[organ_index];
            console.log("Item contents:", item);         
        }
        if(indexArr[2] !== undefined ){
            part_index = indexArr[2];
            req.part_index = part_index;
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index];
            console.log("Item contents:", item);         
        }
        if(indexArr[2] !== undefined && (type === "organ_layer" && indexArr[3] === undefined)){
            organ_layer_index = indexArr[2];
            req.organ_layer_index = organ_layer_index;
            item = displayReferenceArr[system_index].organs[organ_index].organ_layers[organ_layer_index];
            console.log("Item contents:", item);         
        } 
        if(indexArr[3] !== undefined || type === "histo_layer"){
            histo_layer_index = indexArr[3];
            req.histo_layer_index = histo_layer_index;
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index].histo_layers[histo_layer_index];
            console.log("Item contents:", item);         
        }
        if(indexArr[3] !== undefined && (type === "other_structure" && indexArr[4] === undefined)){
            other_structure_index = indexArr[3];
            req.other_structure_index = other_structure_index;
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index].other_structures[other_structure_index];
            console.log("Item contents:", item);         
        } 
        if(indexArr[3] !== undefined && type === "subpart"){
            subpart_index = indexArr[3];
            req.subpart_index = subpart_index;
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index].subparts[subpart_index];
            console.log("Item contents:", item);         
        }     
        if(indexArr[4] !== undefined || type === "histo_sublayer"){
            histo_sublayer_index = indexArr[4];
            req.histo_sublayer_index = histo_sublayer_index;
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index].histo_layers[histo_layer_index].histo_sublayers[histo_sublayer_index];
            console.log("Item contents:", item);         
        }   
      
        if(indexArr[5] !== undefined){
            histo_char_index = indexArr[5];
            req.histo_char_index = histo_char_index;
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index].histo_layers[histo_layer_index].histo_sublayers[histo_sublayer_index].histo_chars[histo_char_index];
            console.log("Item contents:", item);         
        }     

        if(indexArr[6] !== undefined && type !== "ecell"){
            cell_index = indexArr[6];
            req.cell_index = cell_index;
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index].histo_layers[histo_layer_index].histo_sublayers[histo_sublayer_index].histo_chars[histo_char_index].cells[cell_index];
            console.log("Item contents:", item);         
        }     
 
         if(indexArr[6] !== undefined && type !== "cell"){
            ecell_index = indexArr[6];
            req.ecell_index = ecell_index;
            item = displayReferenceArr[system_index].organs[organ_index].parts[part_index].histo_layers[histo_layer_index].histo_sublayers[histo_sublayer_index].histo_chars[histo_char_index].ecell_matrices[ecell_index];
            console.log("Item contents:", item);         
        }     

        $("#graph_header").css("z-index",400);
        let tag;

        if(type === "system" || type === "organ" || type === "part" || type === "histo_layer" || type === "other_structure" || type === "histo_sublayer" || type === "histo_char" ||
             type === "organ_layer" || type === "cell" || type === "ecell" || type === "subpart"){
            let system_name = displayReferenceArr[indexArr[0]].system_name;
            let id = `S${indexArr[0]+1}`;
            tag = `<div id="S${system_index+1}" 
            style="color:${colors.system};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.system};border-radius:25px">System Name (S-${system_index+1}) is: 
            ${system_name}</div>`;
        }
        if(type === "organ" || type === "part" || type === "histo_layer" || type === "other_structure" || type === "histo_sublayer" || type === "histo_char" ||
                type === "organ_layer" || type === "cell" || type === "ecell" || type === "subpart"){
            let organ_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].organ_name;
            let id = `O${indexArr[1]+1}`;
            tag += `<div style="color:${colors.organ};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.organ};border-radius:25px" 
            id="${id}">Organ Name (O-${organ_index+1}) is: ${organ_name}</div>`;
        }
        if(type === "part" || type === "histo_layer" || type === "histo_sublayer" || type === "histo_char" || type === "other_structure" || type === "cell" ||
            type === "ecell" || type === "subpart"){
            let part_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].part_name;
            let id = `P${part_index+1}`;
            tag += `<div style="color:${colors.part};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.part};border-radius:25px"} 
            id="${id}">Part Name (P-${part_index+1}) is:  ${part_name}</div>`;
        }
         if(type === "organ_layer" ){
            let organ_layer_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].organ_layers[indexArr[2]].organ_layer_name;
            let id = `ol${organ_layer_index+1}`;
            tag += `<div style="color:${colors.organ_layer};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.organ_layer};border-radius:25px"} 
            id="${id}">Organ Layer Name (ol-${organ_layer_index+1}) is:  ${organ_layer_name}</div>`;
        }
        if( type === "other_structure"){
            let other_structure_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].other_structures[indexArr[3]].other_structure_name;
            let id = `os${other_structure_index+1}`;
            tag += `<div style="color:${colors.other_structure};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.other_structure};border-radius:25px"} 
            id="${id}">Part Structure (ps-${other_structure_index+1}) is:  ${other_structure_name}</div>`;
        }
        if( type === "subpart"){
            let subpart_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].subparts[indexArr[3]].subpart_name;
            let id = `os${subpart_index+1}`;
            tag += `<div style="color:${colors.subpart};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.other_structure};border-radius:25px"} 
            id="${id}">Subpart (sp-${subpart_index+1}) is:  ${subpart_name}</div>`;
        }
        if(type === "histo_layer" || type === "histo_sublayer" || type === "histo_char" || type === "cell" || type === "ecell"){
            let histo_layer_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].histo_layers[indexArr[3]].histo_layer_name;
            let id = `hl${histo_layer_index+1}`;
            tag += `<div style="color:${colors.histo_layer};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.histo_layer};border-radius:25px" 
            id="${id}">Histo_Layer Name (hl-${histo_layer_index+1}) is: ${histo_layer_name}</div>`;
        }
        if(type === "histo_sublayer" || type === "histo_char" || type === "cell" || type === "ecell"){
            let histo_sublayer_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].histo_layers[indexArr[3]].histo_sublayers[indexArr[4]].histo_sublayer_name;
            let id = `hsl${histo_sublayer_index+1}`;
            tag += `<div style="color:${colors.histo_sublayer};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.histo_sublayer};border-radius:25px" 
            id="${id}">Histo_Subayer Name (hl-${histo_sublayer_index+1}) is: ${histo_sublayer_name}</div>`;
        }
        if(type === "histo_char" || type === "cell" || type === "ecell"){
            let histo_char_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].histo_layers[indexArr[3]].histo_sublayers[indexArr[4]].histo_chars[indexArr[5]].histo_char_name;
            let id = `hc${histo_char_index+1}`;
            tag += `<div style="color:${colors.histo_char};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.histo_char};border-radius:25px" 
            id="${id}">Histo_Char Name (hc-${histo_char_index+1}) is: ${histo_char_name}</div>`;
        } 
        if(type === "cell"){
            let cell_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].histo_layers[indexArr[3]].histo_sublayers[indexArr[4]].histo_chars[indexArr[5]].cells[indexArr[6]].cell_name;
            let id = `cl${cell_index+1}`;
            tag += `<div style="color:${colors.cell};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.cell};border-radius:25px" 
            id="${id}">Cell Name (cl-${cell_index+1}) is: ${cell_name}</div>`;
        } 
        if(type === "ecell"){
            let ecell_matrix_name = displayReferenceArr[indexArr[0]].organs[indexArr[1]].parts[indexArr[2]].histo_layers[indexArr[3]].histo_sublayers[indexArr[4]].histo_chars[indexArr[5]].ecell_matrices[indexArr[6]].ecell_matrix_name;
            let id = `cl${ecell_index+1}`;
            tag += `<div style="color:${colors.ecell};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.ecell};border-radius:25px" 
            id="${id}">Ecell Matrix Name (ecl-${ecell_index+1}) is: ${ecell_matrix_name}</div>`;
        } 
         $('#infoBar').css("padding-top",0);
         add_to_bar(tag);
         console.log("E target",e.target);
         let groupElement =  e.target;
         console.log("groupElement",groupElement);
         const bboxGroup = groupElement.getBBox();
         setGroupY(bboxGroup.y);
         console.log("group Y:",bboxGroup.y);
         $('#initInfoBar').css("display","none");
     };

    

    let add_to_bar = (tag,w="30%") => {  
            
            $("#displayBar").css("display","block").css("width","100%").animate({
            width:"70%",
            height:"100em",
            display:"block",
            },500);  
            
            $("#infoBar").css("width","0%").animate({
            width:"30%",
            position:"absolute",
            zIndex:"400",
            fontSize:"1.5em",      
            },500).append(tag).css("display","block");       
    };

     let add_to_bar2 = (tag,w="30%") => {     
        /*   
            $("#displayBar").css("display","block").css("width","100%").animate({
            width:"70%",
            height:"100em",
            display:"block",
            },500);  
            */
            $("#infoBar").html('');
            $("#initInfoBar").css("width","0%").animate({
            width:"50%",
            position:"absolute",
            zIndex:"400",
            fontSize:"1.25em",
            marginTop:"2em",      
            },500).append(tag).css("display","block");       
    };

     const closeInfoBar = () => {
         
                $("#displayBar").css("display","block").css("width","70%").animate({
                width:"100%",
                height:"100em",
                display:"block",
                },1000);  
                
                $("#infoBar").css("width","30%").animate({
                width:"0%",
                display:"none",
                position:"absolute",
                zIndex:"400",
                fontSize:"1.5em"
                },1000).html('').css("display","none");       

     };
 
    // Handles request for svg items display requested by the Hierachy buttons 
     const handleDisplayRequest = (obj) => {  
        $("#infoBar").css("display","block");
        $("#initInfoBar").css("display","none");      
        let tag = `<div style="color:${colors.system};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.system};border-radius:25px">Click on an Organism Node to see its Hierachy!</div>`;
       
        $('#infoBar').html('').css("margin-top","0").css("width","0%").css("padding-top","0em");      
        add_to_bar(tag);
        tag = `<div style="color:${colors.organ};font-style=bold;background-color:black;padding:0.5em;margin-top:0.5em;border:10px solid ${colors.organ};border-radius:25px">Also, You can Click and Drag the Graph Displa Area!</div>`;
        add_to_bar(tag);        

        console.log("Top level Display Request:", obj );
        setDisplayRequest(true);
        let req =  obj;

        $("#initInfoBar").css("display","none");    

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
            //$('#infoBar').css("padding-top",groupY+transY+ePageY-transLen);

            if(numItems > 40)  // If too many items that would overlap, then make less visible so individual item selections are more visible
                setSysOpacity(0.35);
            else
                setSysOpacity(1.0);

           // currentArr[ridx] = req;
            if(currentArr[ridx] === undefined)
                currentArr[ridx] = req;
            currentArr[ridx].system_name = req.system_name;
            currentArr[ridx].open = false;
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
                    currentArr[ridx].organs[l-1].open = true;
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

            // Map Organ of other indexes to closed and this index to open for display purposes
            currentArr[req.system_index].organs.map((organ,o) => {
                    o === req.organ_index ? organ.open = true : organ.open = false
            });

            // Reset all parts open for display
            let items =  currentArr[req.system_index].organs[req.organ_index].parts;
            if(items !== undefined){
                items.map((part) => part.open = true);
            }


            

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
                        currentArr[req.system_index].organs[req.organ_index].parts[l-1].open =  true;
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
            //currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].open = showItemContents[req.part_histo_layers_idx];

            // Map Part of other indexes to closed and this index to open for display purposes
            currentArr[req.system_index].organs[req.organ_index].parts.map((part,p) => {
                    p === req.part_index ? part.open = true : part.open = false
            });

            // Reset all histo_layers open for display
            let items =  currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers;
            if(items !== undefined){
                items.map((histo_layer) => histo_layer.open = true);
            }


            let stemArr = [];
            for (let k = 1;k <= numItems; k++){
                stemArr.push(k);
            }
            stemArr.map((m) => {   // Calculate stems length and line coordinates and circle center
                if(currentArr[req.system_index] !== undefined && currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].lx1 === undefined){
                    
                    cx = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cx;
                    cy = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].cy;

                    setTransX(-cx);
                    setTransY(-cy);
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[m-1].open =  true;  // Set histo_layers intially to open
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
           // currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].map((histo_layer) => histo_layer.open = false);

            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers = req.histo_sublayers;
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_layer_histo_sublayers_idx = req.histo_layer_histo_sublayers_idx;
            //currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].open = showItemContents[req.histo_layer_histo_sublayers_idx];

            // Map Histo layer of other indexes to closed and this index to open for display purposes
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers.map((histo_layer,hl) => {
                    hl === req.histo_layer_index ? histo_layer.open = true : histo_layer.open = false
            });

            // Reset all histo_Sublayers open for display
            let items =  currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers;
            if(items !== undefined){
                items.map((histo_sublayer) => histo_sublayer.open = true);
            }




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
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[m-1].open = true;
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
           // currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].open = showItemContents[req.histo_sublayer_histo_chars_idx];

             // Map Histo Sublayer of other indexes to closed and this index to open for display purposes
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers.map((histo_sublayer,hs) => {
                    hs === req.histo_sublayer_index ? histo_sublayer.open = true : histo_sublayer.open = false
            });

            // Reset all histo_chars open for display
            let items =  currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars;
            if(items !== undefined){
                items.map((histo_char) => histo_char.open = true);
            }

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
                        .histo_chars[m-1].open =  true;
                
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

            // Map Histo Chars of other indexes closed and this one to open for display purposes
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                .histo_chars.map((histo_char,hc) => {
                    (hc === req.histo_chars_index && currentHistoSublayerIndex === req.histo_sublayer_index) ? histo_char.open = true : histo_char.open = false
            });

            // Reset all cells open for display
            let items =  currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].cells;
            if(items !== undefined){
                items.map((cell) => cell.open = true);
            }

            // Draw lines and circles for Cells
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
                        .histo_chars[req.histo_chars_index].cells[m-1].open = true;
                
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
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].histo_char_ecells_matrices_idx = req.histo_char_ecells_matrices_idx;


               // Map Histo Chars of other indexes closed and this one to open for display purposes
            currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index]
                .histo_chars.map((histo_char,hc) => {
                    (hc === req.histo_chars_index && currentHistoSublayerIndex === req.histo_sublayer_index) ? histo_char.open = true : histo_char.open = false
            });

            // Reset all ecells open for display
            let items = currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].histo_layers[req.histo_layer_index].histo_sublayers[req.histo_sublayer_index].histo_chars[req.histo_chars_index].ecell_matrices;
            if(items !== undefined ){
                items.map((ecell) => ecell.open = true);
            }



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
                        .histo_chars[req.histo_chars_index].ecell_matrices[m-1].open = true;
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
            setCurrentOrganIndex(req.organ_index);               
            setEClientY(req.e.clientY);
            setEPageY(req.e.pageY);

            currentArr[req.system_index].organs[req.organ_index].organ_layers = req.organ_layers;  
            currentArr[req.system_index].organs[req.organ_index].organ_organ_layers_idx = req.organ_organ_layers_idx;


            // Map Organ of other indexes to closed and this index to open for display purposes
            currentArr[req.system_index].organs.map((organ,o) => {
                    o === req.organ_index ? organ.open = true : organ.open = false
            });

            // Reset all organ layers open for display
            let items =  currentArr[req.system_index].organs[req.organ_index].organ_layers;
            if(items !== undefined){
                items.map((organ_layer) => organ_layer.open = true);
            }


            


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
                    currentArr[req.system_index].organs[req.organ_index].organ_layers[n-1].open = true;
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

            // Map Part of other indexes to closed and this index to open for display purposes
            currentArr[req.system_index].organs[req.organ_index].parts.map((part,p) => {
                    p === req.part_index ? part.open = true : part.open = false
            });

            // Reset all Part structures open for display
            let items =  currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures;
            if(items !== undefined){
                items.map((other_structure) => other_structure.open = true);
            }


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
                    currentArr[req.system_index].organs[req.organ_index].parts[req.part_index].other_structures[n-1].open = true;
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
         setTransLen(len);
     };

    
     const RequestedDisplay = (props) => {
        
        let rads = 2*(Math.PI);
        let numItems = 8
        let conv = rads/numItems
        let len = 700;
        setTransLen(500);

        const itemsDisplay = (show,currentOrganIndex,currentPartIndex,ii,j,idx) => {

            let boolCalc = ( !show && (currentOrganIndex === ii && currentPartIndex === j)  ||   show && (currentOrganIndex === ii && (currentPartIndex !== j
                                            || currentPartIndex === j
                        )));
            //props.showItems(idx);
            return boolCalc;
        };

        const GToolTip = (props) => {
            console.log(props);
        return (
            <>
                <path className={props.className}  d={`M${props.cx-24+25} ${props.cy-14+75} L${props.cx-24+50} ${props.cy-14-25+75} L${props.cx-24+75} ${props.cy-14+75} Z`} fill="lightgrey" fill-opacity="0.4"/>
                <rect className={props.className}  x={props.cx-24} y={props.cy+60} width="250" height="100" fill="lightgrey" fill-opacity="0.4"></rect>
                <text className={props.className}  x={props.cx-11} y={props.cy+105} stroke="black">Click to See Hierachy</text>     
                <text className={props.className}  x={props.cx-11} y={props.cy+135} stroke="black">{`for ${props.sym}`}</text>                      
            </>          
            );
        };
      

        console.log("E Client Y:",eClientY);
        console.log("E Page Y:",ePageY);



       
        return (
        <svg id="mySvg" version="1.1" 
             width={4*sysCx} height={4*sysCy} 
             xmlns="http://www.w3.org/2000/svg" transform={`translate(${transX+2*len/3} ${transY+len+(ePageY-eClientY)})`} >
            <g id="myGElement"  >
                {console.log("Before Run DisplayReferenceArr: ", displayReferenceArr)}
                {   
                    showSystemOrgans[currentSystemIndex] && 
                        <>
                           { 
                            <g key={currentSystemIndex.toString()+"system"} onClick={(e) => getIndices("system",[currentSystemIndex],e)} id={`S${currentSystemIndex+1}`}
                                className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<em>Tooltip</em> <u>with</u> <b>HTML</b>" >
                                <circle  cx={2*sysCx} cy={2*sysCy} r={sys_radius} stroke="black"  fill={colors.system} style={{strokeWidth:"1"}} />
                                <text x={2*sysCx-31} y={2*sysCy+14} stroke="black" style={{fontSize:"3.0em"}}>{`S-${currentSystemIndex+1}`}</text>
                            </g>
                           }                      
                        </>
                       
                }
                {
                                       
                displayReferenceArr.map((s,i) => (i == currentSystemIndex && s !== undefined && s.organs !== undefined && 
                
                    s.organs.map((organ,ii) => 
                        showSystemOrgans[currentSystemIndex] && 
                        currentSystemIndex === i && currentOrganIndex !== ii && 
                        <>                             
                            <g key={ii.toString()+"organ"} id={`S${currentSystemIndex+1}O${ii+1}`} 
                                onMouseOver={() => {$(`.tooltiptext.${currentSystemIndex+1}O${ii+1}` ).css("visibility","visible").css("opacity","1")}}
                                onMouseLeave={() => {$(`.tooltiptext.${currentSystemIndex+1}O${ii+1}` ).css("visibility","hidden").css("opacity","0")}}
                                onClick={(e) => getIndices("organ",[currentSystemIndex,ii],e)}>                                
                                <line x1={organ.lx1} y1={organ.ly1} x2={organ.lx2} y2={organ.ly2} stroke="black" style={{strokeWidth:"5",opacity:sys_opacity}}/>
                                <circle cx={organ.cx} cy={organ.cy} r={org_radius} stroke="black" fill={colors.organ} style={{strokeWidth:"1",opacity:sys_opacity}}/>                           
                                <text x={organ.cx-24} y={organ.cy+10} stroke="black" style={{opacity:sys_opacity,fontSize:"2.0em"}}>O-{ii+1}</text>
                                <GToolTip  className={`tooltiptext ${currentSystemIndex+1}O${ii+1}`} index={ii} cx={organ.cx} cy={organ.cy} sym={`O-${ii+1}`}
                                   type="organ" />
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
                                organ.open &&
                                <>
                                    <g id={`S${currentSystemIndex+1}O${ii+1}`} 
                                        onClick={(e) => getIndices("organ",[currentSystemIndex,ii],e)} 
                                        onMouseOver={() => {$(`.tooltiptext.${currentSystemIndex+1}O${ii+1}` ).css("visibility","visible").css("opacity","1")}}
                                        onMouseLeave={() => {$(`.tooltiptext.${currentSystemIndex+1}O${ii+1}` ).css("visibility","hidden").css("opacity","0")}}
                                    >
                                        <line x1={organ.lx1} y1={organ.ly1} x2={organ.lx2} y2={organ.ly2} stroke="black" style={{strokeWidth:"5",opacity:"1"}}/>
                                        <circle cx={organ.cx} cy={organ.cy} r={org_radius} stroke="black" fill={colors.organ} style={{strokeWidth:"1",opacity:"1"}}/>                           
                                        <text x={organ.cx-24} y={organ.cy+10} stroke="black" style={{opacity:"1",fontSize:"2.0em"}}>O-{ii+1}</text>  
                                        <GToolTip  className={`tooltiptext ${currentSystemIndex+1}O${ii+1}`} index={ii} cx={organ.cx} cy={organ.cy} sym={`O-${ii+1}`}
                                            indices={[i,ii]} type="organ" /> 
                                    </g>    
                                </>
                             }
                               
                            {   
                                showItemContents[organ.organ_organ_parts_idx] && organ.parts.map((part,j) => (   
                                    currentOrganIndex === ii && currentPartIndex !== j && 
                                    <g key={j.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}`} 
                                        onClick={(e) => getIndices("part",[currentSystemIndex,ii,j],e)}
                                        onMouseOver={() => {$(`.tooltiptext.${currentOrganIndex+1}P${j+1}` ).css("visibility","visible").css("opacity","1")}}
                                        onMouseLeave={() => {$(`.tooltiptext.${currentOrganIndex+1}P${j+1}` ).css("visibility","hidden").css("opacity","0")}}
                                    >
                                        <line x1={part.lx1} y1={part.ly1} x2={part.lx2} y2={part.ly2} stroke="black" style={{strokeWidth:"7",opacity:sys_opacity}}/>
                                        <circle cx={part.cx} cy={part.cy} r={part_radius} stroke="black" fill={colors.part} style={{strokeWidth:"1",opacity:sys_opacity}}/>
                                        <text x={part.cx-20} y={part.cy+9} stroke="black" style={{fontSize:"1.9em",opacity:sys_opacity}}>P-{j+1}</text>
                                        <GToolTip  className={`tooltiptext ${currentOrganIndex+1}P${j+1}`} index={j} cx={part.cx} cy={part.cy} sym={`P-${j+1}`}
                                         indices={[i,ii]} type="part" />
                         
                                    </g>
                                ))
                            }  

                          
                             {           
                                showItemContents[organ.organ_organ_parts_idx]  && organ.parts.map((part,j) => (  
                                    <g key={j.toString()}>    
                                        { 
                                        part.open && 
                                            <>  
                                                <g  id={`S${currentSystemIndex+1}O${ii+1}P${j+1}`} 
                                                    onClick={(e) => getIndices("part",[currentSystemIndex,ii,j],e)}
                                                    onMouseOver={() => {$(`.tooltiptext.${currentOrganIndex+1}P${j+1}` ).css("visibility","visible").css("opacity","1")}}
                                                    onMouseLeave={() => {$(`.tooltiptext.${currentOrganIndex+1}P${j+1}` ).css("visibility","hidden").css("opacity","0")}}
                                                >
                                                    <line x1={part.lx1} y1={part.ly1} x2={part.lx2} y2={part.ly2} stroke="black" style={{strokeWidth:"7",opacity:"1"}}/>
                                                    <circle cx={part.cx} cy={part.cy} r={part_radius} stroke="black" fill={colors.part} style={{strokeWidth:"1",opacity:"1"}}/>
                                                    <text x={part.cx-20} y={part.cy+9} stroke="black" style={{fontSize:"1.9em",opacity:"1"}}>P-{j+1}</text>
                                                    <GToolTip  className={`tooltiptext ${currentOrganIndex+1}P${j+1}`} index={j} cx={part.cx} cy={part.cy} sym={`P-${j+1}`}
                                                      indices={[i,ii,j]} type="part"/>
                         
                                                </g>
                                            </>    
                                        }              
                                        { 
                                            showItemContents[part.part_histo_layers_idx] && part.histo_layers !== undefined &&
                                            part.histo_layers.length > 0 && part.histo_layers.map((histo_layer,k) => (   
                                                currentPartIndex === j && currentHistoLayerIndex !== k &&          
                                                <>                                                
                                                    <g key={k.toString()+histo_layer.lx1} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}hl${k+1}`} 
                                                        onClick={(e) => getIndices("histo_layer",[currentSystemIndex,ii,j,k],e)}
                                                        onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex}P${currentPartIndex+1}P${k+1}` ).css("visibility","visible").css("opacity","1")}}
                                                        onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex}P${currentPartIndex+1}P${k+1}` ).css("visibility","hidden").css("opacity","0")}}                                              
                                                    >
                                                        <line x1={histo_layer.lx1} y1={histo_layer.ly1} x2={histo_layer.lx2} y2={histo_layer.ly2} stroke="black" style={{strokeWidth:"7",opacity:sys_opacity}}/>
                                                        <circle cx={histo_layer.cx} cy={histo_layer.cy} r={histo_layer_radius} stroke="black" fill={colors.histo_layer} style={{strokeWidth:"1",opacity:sys_opacity}}/>
                                                        <text x={histo_layer.cx-26} y={histo_layer.cy+9} stroke="black" style={{fontSize:"1.8em",opacity:sys_opacity}}>hl-{k+1}</text>
                                                        <GToolTip  className={`tooltiptext O${currentOrganIndex}P${currentPartIndex+1}P${k+1}`} index={j} cx={histo_layer.cx} cy={histo_layer.cy} sym={`hl-${k+1}`}
                                                          indices={[i,ii,j]} type="histo_layer" />
                                                    </g>
                                                </>   
                                            ))
                                        }

                                        {  
                                            showItemContents[part.part_histo_layers_idx] && part.histo_layers !== undefined &&
                                            part.histo_layers.length > 0 && part.histo_layers.map((histo_layer,k) => (                                
                                                <g key={k.toString()+histo_layer.lx2} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}hl${k+1}`}  >
                                                     {
                                                        histo_layer.open &&   
                                                        <>
                                                            <g 
                                                                onClick={(e) => getIndices("histo_layer",[currentSystemIndex,ii,j,k],e)}
                                                                onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${k+1}` ).css("visibility","visible").css("opacity","1")}}
                                                                onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${k+1}` ).css("visibility","hidden").css("opacity","0")}}
                                                            >
                                                                <line x1={histo_layer.lx1} y1={histo_layer.ly1} x2={histo_layer.lx2} y2={histo_layer.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                                                <circle cx={histo_layer.cx} cy={histo_layer.cy} r={histo_layer_radius} stroke="black" fill={colors.histo_layer} style={{strokeWidth:"1"}}/>
                                                                <text x={histo_layer.cx-26} y={histo_layer.cy+9} stroke="black" style={{fontSize:"1.8em"}}>hl-{k+1}</text>
                                                                <GToolTip  className={`tooltiptext O${currentOrganIndex+1}P${currentPartIndex+1}hl${k+1}`} index={j} cx={histo_layer.cx} cy={histo_layer.cy} sym={`hl-${k+1}`}
                                                                  indices={[i,ii,j,k]} type="histo_layer" />
                                                            </g>
                                                        </>                                                  
                                                     }
                                                     {
                                                        showItemContents[histo_layer.histo_layer_histo_sublayers_idx] && histo_layer.histo_sublayers !== undefined && histo_layer.histo_sublayers.length > 0 && 
                                                            histo_layer.histo_sublayers.map((histo_sublayer,l) => (   
                                                            currentHistoLayerIndex === k && currentHistoSublayerIndex !== l &&
                                                            <>     
                                                                <g key={l.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}hl${k+1}hsl${l+1}`} 
                                                                    onClick={(e) => getIndices("histo_sublayer",[currentSystemIndex,ii,j,k,l],e)}
                                                                    onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${l+1}` ).css("visibility","visible").css("opacity","1")}}
                                                                    onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${l+1}` ).css("visibility","hidden").css("opacity","0")}}
                                                                >
                                                                    <line x1={histo_sublayer.lx1} y1={histo_sublayer.ly1} x2={histo_sublayer.lx2} y2={histo_sublayer.ly2} stroke="black" style={{strokeWidth:"7",opacity:sys_opacity}}/>
                                                                    <circle cx={histo_sublayer.cx} cy={histo_sublayer.cy} r={histo_sublayer_radius} stroke="black" fill={colors.histo_sublayer} style={{strokeWidth:"1",opacity:sys_opacity}}/>
                                                                    <text x={histo_sublayer.cx-31} y={histo_sublayer.cy+9} stroke="black" style={{fontSize:"1.8em",opacity:sys_opacity}}>hsl-{l+1}</text>
                                                                    <GToolTip className={`tooltiptext O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${l+1}`} index={l} cx={histo_sublayer.cx} cy={histo_sublayer.cy} sym={`hsl-${l+1}`}
                                                                      indices={[i,ii,j,k,l]} type="histo_sublayer" />
                                                                </g>   
                                                            </>                            
                                                           
                                                        ))
                                                     }
                                                    
                                                     {                                                       
                                                        showItemContents[histo_layer.histo_layer_histo_sublayers_idx] && histo_layer.histo_sublayers !== undefined && histo_layer.histo_sublayers.length > 0 && 
                                                            histo_layer.histo_sublayers.map((histo_sublayer,l) => (                                
                                                            <g key={l.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}hl${k+1}hsl${l+1}`} >
                                                                {
                                                                    histo_sublayer.open && 
                                                                    <>
                                                                        <g 
                                                                            onClick={(e) => getIndices("histo_sublayer",[currentSystemIndex,ii,j,k,l],e)}
                                                                            onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${l+1}` ).css("visibility","visible").css("opacity","1")}}
                                                                            onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${l+1}` ).css("visibility","hidden").css("opacity","0")}}
                                                                        >
                                                                            <line x1={histo_sublayer.lx1} y1={histo_sublayer.ly1} x2={histo_sublayer.lx2} y2={histo_sublayer.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                                                            <circle cx={histo_sublayer.cx} cy={histo_sublayer.cy} r={histo_sublayer_radius} stroke="black" fill={colors.histo_sublayer} style={{strokeWidth:"1"}}/>
                                                                            <text x={histo_sublayer.cx-31} y={histo_sublayer.cy+9} stroke="black" style={{fontSize:"1.8em"}}>hsl-{l+1}</text>
                                                                            <GToolTip  className={`tooltiptext O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${l+1}`} index={l} cx={histo_sublayer.cx} cy={histo_sublayer.cy} sym={`hsl-${l+1}`}
                                                                              indices={[i,ii,j,k,l]} type="histo_sublayer" />
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
                                                                                <g key={hc.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}hl${k+1}hsl${l+1}hc${hc+1}`} 
                                                                                    onClick={(e) => getIndices("histo_char",[currentSystemIndex,ii,j,k,l,hc],e)}
                                                                                    onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${hc+1}`)
                                                                                        .css("visibility","visible").css("opacity","1")}}
                                                                                    onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${hc+1}`)
                                                                                        .css("visibility","hidden").css("opacity","0")}}
                                                                    
                                                                                >
                                                                                    <line x1={histo_char.lx1} y1={histo_char.ly1} x2={histo_char.lx2} y2={histo_char.ly2} stroke="black" style={{strokeWidth:"7",opacity:sys_opacity}}/>
                                                                                    <circle cx={histo_char.cx} cy={histo_char.cy} r={histo_char_radius} stroke="black" fill={colors.histo_char} style={{strokeWidth:"1",opacity:sys_opacity}}/>
                                                                                    <text x={histo_char.cx-26} y={histo_char.cy+10} stroke="black" style={{fontSize:"1.8em",opacity:sys_opacity}}>hc-{hc+1}</text> 
                                                                                    <GToolTip  className={`tooltiptext O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${hc+1}`} index={hc} cx={histo_char.cx} cy={histo_char.cy} sym={`hc-${hc+1}`}
                                                                                      indices={[i,ii,j,k,l,hc]} type="histo_char" />
                                                                                </g>  
                                                                            } 
                                                                        </>                            
                                                                 
                                                                    ))
                                                             }
                                                                
                                                             {                                                       
                                                                showItemContents[histo_sublayer.histo_sublayer_histo_chars_idx] && histo_sublayer.histo_chars !== undefined && 
                                                                    histo_sublayer.histo_chars.length > 0 && 
                                                                    histo_sublayer.histo_chars.map((histo_char,hc) => (                                
                                                                    <g key={hc.toString()+"2nd"} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}hl${k+1}hsl${l+1}hc${hc+1}`}>
                                                                        {
                                                                           histo_char.open === true && 
                                                                            <> 
                                                                                
                                                                                <g 
                                                                                    onClick={(e) => getIndices("histo_char",[currentSystemIndex,ii,j,k,l,hc],e)}
                                                                                    onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${hc+1}`)
                                                                                        .css("visibility","visible").css("opacity","1")}}
                                                                                    onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${hc+1}`)
                                                                                        .css("visibility","hidden").css("opacity","0")}}
                                                                                >
                                                                                    <line x1={histo_char.lx1} y1={histo_char.ly1} x2={histo_char.lx2} y2={histo_char.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                                                                    <circle cx={histo_char.cx} cy={histo_char.cy} r={histo_char_radius} stroke="black" fill={colors.histo_char} style={{strokeWidth:"1"}}/>
                                                                                    <text x={histo_char.cx-26} y={histo_char.cy+10} stroke="black" style={{fontSize:"1.8em"}}>hc-{hc+1}</text>   
                                                                                    <GToolTip  className={`tooltiptext O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${hc+1}`} index={hc} cx={histo_char.cx} cy={histo_char.cy} sym={`hc-${hc+1}`}
                                                                                      indices={[i,ii,j,k,l,hc]} type="histo_char" />
                                                                                </g>     
                                                                            </>
                                                                        }                                                                                                                                   
                                                                        {                                                       
                                                                            showItemContents[histo_char.histo_char_cells_idx] && histo_char.cells !== undefined && 
                                                                                histo_char.cells.length > 0 && 
                                                                                histo_char.cells.map((cell,cl) => (                                
                                                                                <g key={cl.toString()+cell.name} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}hl${k+1}hsl${l+1}hc${hc+1}C${cl+1}`}
                                                                                    onClick={(e) => getIndices("cell",[currentSystemIndex,ii,j,k,l,hc,cl],e)}
                                                                                    onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${currentHistoCharIndex}cl${cl+1}`)
                                                                                        .css("visibility","visible").css("opacity","1")}}
                                                                                    onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${currentHistoCharIndex}cl${cl+1}`)
                                                                                        .css("visibility","hidden").css("opacity","0")}} 
                                                                                 >
                                                                                    {   
                                                                                     cell.open &&   
                                                                                        <>
                                                                                            <line x1={cell.lx1} y1={cell.ly1} x2={cell.lx2} y2={cell.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                                                                            <circle cx={cell.cx} cy={cell.cy} r={cell_radius} stroke="black" fill={colors.cell} style={{strokeWidth:"1"}}/>
                                                                                            <text x={cell.cx-23} y={cell.cy+9} stroke="black" style={{fontSize:"1.8em"}}>cl-{cl+1}</text>
                                                                                            <GToolTip  className={`tooltiptext O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${currentHistoCharIndex}cl${cl+1}`} index={cl} cx={cell.cx} cy={cell.cy} sym={`cl-${cl+1}`}
                                                                                              indices={[i,ii,j,k,l,hc,cl]} type="cell" />
                                                                                       </>
                                                                                        
                                                                                    }
                                                                                </g>                                                    
                                                                            )) 
                                                                        }
                                                                          {                                                       
                                                                            showItemContents[histo_char.histo_char_ecells_matrices_idx] && histo_char.ecell_matrices !== undefined && 
                                                                                histo_char.ecell_matrices.length > 0 && 
                                                                                histo_char.ecell_matrices.map((ecell,ecl) => (                                
                                                                                <g key={ecl.toString()+ecell.name} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}hl${k+1}hsl${l+1}hc${hc+1}C${ecl+1}`}
                                                                                    onClick={(e) => getIndices("ecell",[currentSystemIndex,ii,j,k,l,hc,ecl],e)}
                                                                                    onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${currentHistoCharIndex}ecl${ecl+1}`)
                                                                                        .css("visibility","visible").css("opacity","1")}}
                                                                                    onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${currentHistoCharIndex}ecl${ecl+1}`)
                                                                                        .css("visibility","hidden").css("opacity","0")}}  
                                                                                >
                                                                                    {
                                                                                     ecell.open &&
                                                                                        <>
                                                                                            <line x1={ecell.lx1} y1={ecell.ly1} x2={ecell.lx2} y2={ecell.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                                                                            <circle cx={ecell.cx} cy={ecell.cy} r={ecell_radius} stroke="black" fill={colors.ecell} style={{strokeWidth:"1"}}/>
                                                                                            <text x={ecell.cx-31} y={ecell.cy+9} stroke="black" style={{fontSize:"1.8em"}}>ecl-{ecl+1}</text>    
                                                                                            <GToolTip  className={`tooltiptext O${currentOrganIndex+1}P${currentPartIndex+1}hl${currentHistoLayerIndex+1}hsl${currentHistoSublayerIndex+1}hc${currentHistoCharIndex}ecl${ecl+1}`} index={ecl} cx={ecell.cx} cy={ecell.cy} sym={`ecl-${ecl+1}`}
                                                                                               indices={[i,ii,j,k,l,hc,ecl]} type="ecell" />
                                                                                                                                                        
                                                                                        </> 
                                                                                    }     
                                                                                </g>                                                    
                                                                            )) 
                                                                        }                                                                    
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
                                           
                                            showItemContents[part.part_other_structures_idx] && part.other_structures !== undefined && part.other_structures.length > 0 
                                                && part.other_structures.map((other_structure,ps) => (    
                                                other_structure.open &&                            
                                                <g key={ps.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}ps${ps+1}`} 
                                                    onClick={(e) => getIndices("other_structure",[currentSystemIndex,ii,j,ps],e)}
                                                    onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}ps${ps+1}`)
                                                        .css("visibility","visible").css("opacity","1")}}
                                                    onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}ps${ps+1}`)
                                                        .css("visibility","hidden").css("opacity","0")}} 
                                                >
                                                    <line x1={other_structure.lx1} y1={other_structure.ly1} x2={other_structure.lx2} y2={other_structure.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                                    <circle cx={other_structure.cx} cy={other_structure.cy} r={other_structure_radius} stroke="black" fill={colors.other_structure} style={{strokeWidth:"4"}}/>
                                                    <text x={other_structure.cx-25} y={other_structure.cy+7} stroke="black" style={{fontSize:"1.8em"}}>ps-{ps+1}</text>
                                                    <GToolTip  className={`tooltiptext O${currentOrganIndex+1}P${currentPartIndex+1}ps${ps+1}`} index={ps} cx={other_structure.cx} cy={other_structure.cy} sym={`ps-${ps+1}`}
                                                        indices={[currentSystemIndex,ii,j,ps]} type="other_structure" />
                                                </g>                                                    
                                            ))
                                        }
                                        {
                                           
                                            showItemContents[part.part_subparts_idx] && part.subparts !== undefined && part.subparts.length > 0 && part.subparts.map((subpart,m) => (                                
                                                <g key={m.toString()} id={`S${currentSystemIndex+1}O${ii+1}P${j+1}sp${m+1}`}
                                                    onClick={(e) => getIndices("subpart",[currentSystemIndex,ii,j,m],e)}
                                                    onMouseOver={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}sp${m+1}`)
                                                        .css("visibility","visible").css("opacity","1")}}
                                                    onMouseLeave={() => {$(`.tooltiptext.O${currentOrganIndex+1}P${currentPartIndex+1}sp${m+1}`)
                                                        .css("visibility","hidden").css("opacity","0")}} 
                                                >
                                                    <line x1={subpart.lx1} y1={subpart.ly1} x2={subpart.lx2} y2={subpart.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                                    <circle cx={subpart.cx} cy={subpart.cy} r={subpart_radius} stroke="black" fill={colors.subpart} style={{strokeWidth:"4"}}/>
                                                    <text x={subpart.cx-15} y={subpart.cy+7} stroke="black" style={{fontSize:"1.2em"}}>sp-{m+1}</text>
                                                    <GToolTip  className={`tooltiptext O${currentOrganIndex+1}P${currentPartIndex+1}sp${m+1}`} index={m} cx={subpart.cx} cy={subpart.cy} sym={`sp-${m+1}`}
                                                        indices={[currentSystemIndex,ii,j,m]} type="subpart" />
                                                </g>                                                    
                                            ))
                                        }
                                    </g>                                    
                                ))
                             }
                             {

                                showItemContents[organ.organ_organ_layers_idx] && organ.organ_layers.map((organ_layer,ol) => (      
                                    organ_layer.open &&
                                    <g key={ol.toString()} id={`S${currentSystemIndex+1}O${ii+1}Ol${ol+1}`} 
                                        onClick={(e) => getIndices("organ_layer",[currentSystemIndex,ii,ol],e)}
                                        onMouseOver={() => {$(`.tooltiptext.S${currentSystemIndex}O${currentOrganIndex+1}ol${ol+1}`)
                                            .css("visibility","visible").css("opacity","1")}}
                                        onMouseLeave={() => {$(`.tooltiptext.S${currentSystemIndex}O${currentOrganIndex+1}ol${ol+1}`)
                                            .css("visibility","hidden").css("opacity","0")}} 
                                    >
                                        <line x1={organ_layer.lx1} y1={organ_layer.ly1} x2={organ_layer.lx2} y2={organ_layer.ly2} stroke="black" style={{strokeWidth:"7"}}/>
                                        <circle cx={organ_layer.cx} cy={organ_layer.cy} r={organ_layer_radius} stroke="black" fill={colors.organ_layer} style={{strokeWidth:"4"}}/>
                                        <text x={organ_layer.cx-25} y={organ_layer.cy+9} stroke="black" style={{fontSize:"1.8em"}}>ol-{ol+1}</text>                                        
                                        <GToolTip  className={`tooltiptext S${currentSystemIndex}O${currentOrganIndex+1}ol${ol+1}`} index={ol} cx={organ_layer.cx} cy={organ_layer.cy} sym={`ol-${ol+1}`}
                                                        indices={[currentSystemIndex,ii,ol]} type="organ_layer" />
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
        
        <Container id="" style={{position:"relative",width:"100%",backgroundColor:"#d1e0e0",border:"double 20px #A1A1A1",zoom:zoomFac}} fluid>         
            <Row style={{width:"100%",marginBottom:"1em"}}>
                <Container id="" className="d-flex justify-content-center top-head" style={{marginBottom:"2em"}}>
                    Organism Relation Ontology (ORO) Miner
                </Container>
            </Row>
            <Row>
                <Col xs={3} style={{position:"relative",width:"30%",backgroundColor:"lightgrey",border:"solid 3px line"}}>
                    <Row style={{position:"relative",zIndex:"200",marginLeft:"0",width:"100%"}}>
                        <Container id="" className="top-head">Hierarchy Display</Container>
                    </Row>
                    <Row id ="harchframe" style={{zIndex:"-1",width:"100%",marginLeft:"0.5em"}}>
                        <Hierarchy handleDisplayRequest={handleDisplayRequest} useReferenceObject={useReferenceObject} showItemContents={showItemContents} setShowItemContents={setShowItemContents}
                            showItems={showItems} showSystemOrgans={showSystemOrgans} setShowSystemOrgans={setShowSystemOrgans} openSystemOrgans={openSystemOrgans}
                            handleOpenClose={handleOpenClose} colors={colors}/>   
                    </Row>
                  
                    
                </Col>
                <Col xs={8} style={{backgroundColor:"lightgrey"}}>
                    
                    <Row  id="graph_header">
                        <Col xs={2}>
                            <Button id="reset_button" onClick={() => location.reload()} style={{width:"12em",height:"6em",color:"black",fontSize:"1.25em",marginTop:"2.5em",marginLeft:"2em"}} variant="danger" >RESET</Button>
                        </Col>
                        <Col xs={10}>                            
                            <Container id="" className="d-flex justify-content-center top-head">Graph Display</Container> 
                        </Col>
                    </Row>    
                    {/*                   
                    <Row id="gphtitle" className="h-20">
                        <Col id="tab1" className="tab">Cell-to-Cell</Col>
                        <Col id="tab2" className="tab">Cell-to-Lumen</Col>
                        <Col id="gphmess">Graph Messages Here</Col>
                    </Row>
                    */}
                    <Row style={{position:"relative"}} >
                       
                            <div id="displayBar"  style={{zIndex:"-1"}}> 
                                    {
                                        displayRequest && 
                                        <Draggable>
                                        <div id="requested_display" >                                         
                                            <RequestedDisplay showAll={showAll} showItems={showItems}  /> 
                                        </div>
                                        </Draggable>
                                    
                                    }
                            
                            </div> 
                        <div id="infoBar">
                           
                        </div>
                        <div id="initInfoBar">
                           
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
