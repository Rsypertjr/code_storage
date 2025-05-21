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
        console.log("Selected Index:", idx);
        const newItems4 = [...showPartContents];
        newItems4[idx] = !newItems4[idx];
        setShowPartContents(newItems4);        
    }

    const getIdx = () => {
        let idx = partContentIndexes.length;
        //console.log("show part content length",idx);
        partContentIndexes[idx] = false;
        setShowPartContents(partContentIndexes);
        return idx;
    }

    const ContentButton = (props) => {


        return (
            <>

            {
                !(props.items === undefined) && Array.from(props.items).filter((item) => item.name != "null").length > 0 ?
                <Button onClick={() => togglePartItems(props.idx)}  style={{width:"100%",float:"left",height:"2.5em",fontSize:"1em"}} variant="outline-info">
                {
                    
                    <span>
                        <span>
                            <font color="charcoal"><b>Click to See</b></font>&nbsp;&nbsp;
                            <font color="red">
                                { props.items.filter((item) => item.name != "null" ).length}
                                <span style={{color:"black",marginLeft:"0.5em"}}>{props.name}</span>
                            </font> 
                            
                        </span> 
                        
                    </span>                                                                   

                    }
            
                </Button>
                :  <span style={{color:"black"}}><font color="red">0&nbsp;&nbsp;</font>{props.name}</span> 


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
                    
                    let idx = getIdx();


                       

                    
                    Array.from(part_contents).map((content,l) => {
                        //console.log("content: ", $(content));
                        let name = $(content)[0].textContent;
                        let desc;
                        let nameArr;
                        let cont;
                        let remainder;
                        let idx;
                        partContents[i][j][k] = [];
                        
                        //console.log("Part Content: ",$(content));
                      
                        
                        switch ($(content)[0].nodeName) {
                            case "#text":
                              

                                desc = { "type":$(content)[0].nodeName, "name":name, "content":content,"other_structure_idx":getIdx()};

                                other_structures.push(desc);
                                break;
                            case "Subpart":     
                                name = $(content)[0].innerHTML;
                                nameArr = name.split('<');
                                cont = nameArr.splice(0,1);
                                remainder = nameArr.join('<');

                                idx = partContentIndexes.length;
                                //console.log("show part content length",idx);
                                partContentIndexes[idx] = false;
                                setShowPartContents(partContentIndexes);
                               
                                desc = { "type":$(content)[0].nodeName, "name":cont[0], "content":$(content).contents(), "subpart_idx":getIdx() };
                                histo_layers.push(desc);
                            
                                subparts.push(desc);
                                break;
                            case "histo_Layer":
                                name = $(content)[0].innerHTML;
                                nameArr = name.split('<');
                                cont = nameArr.splice(0,1);
                                remainder = nameArr.join('<');
                                
                                let contentObj = {
                                    "histo_Sublayers":[]
                                };
                                let histo_Sublayers = $(content).find("histo_Sublayer");   
                                // console.log("histo_Sublayers: ",histo_Sublayers);
                                let histo_Layer_Obj = {
                                    "histo_Sublayers":[]
                                };
                                Array.from(histo_Sublayers).map((sublayer) => {
                                    let name = sublayer.innerHTML;
                                    //console.log("sublayer contents", $(sublayer).contents());
                                    let nameArr = name.split('<');
                                    let cont = nameArr.splice(0,1);
                                    idx = partContentIndexes.length;
                                    //console.log("show part content length",idx);
                                    partContentIndexes[idx] = false;
                                    setShowPartContents(partContentIndexes);
                                   
                
                                    histo_Layer_Obj.histo_Sublayers.push({"name":cont[0],"content":sublayer,"histo_sublayer_idx":getIdx()})
                                });
                                // console.log("histo_Sublayer Obj: ", histo_Layer_Obj);

                                desc = { "type":$(content)[0].nodeName, "name":cont[0], "content":histo_Layer_Obj, "histo_layer_idx":getIdx()};
                                //console.log("histo_layer html/contents: ",$(content).contents());
                                histo_layers.push(desc);
                                break;
                        };
                       
                        partContents[i][j][k].push({"subparts":subparts, "histo_layers":histo_layers, "other_structures":other_structures});
                        //console.log("Part Contents: ",partContents[i][j][k]);    
                        //console.log("Show Part Sub Parts: ",showPartSubParts);
                      
                          
                    });    
                    p_arts.push({"name":$(part).contents()[0].nodeValue,"contents":partContents[i][j][k],"part_idx":idx,
                         "part_histo_layers_idx":getIdx(),"part_subparts_idx":getIdx(),"part_other_structures_idx":getIdx()});
                   
                    
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
                                                
                                                <Button key={k.toString()} style={{marginLeft:"1em",backgroundColor:"#e6eeff"}}  onClick={() => toggleOrganItems(j,k)} >
                                                    <div style={{position:"relative",width:"100%"}}>
                                                        <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)",color:"black"}} className="bi bi-arrow-return-right"></i>
                                                        <span style={{float:"left",marginLeft:"1.5em",textWrap:"wrap",height:"auto",color:"black"}}>Organ: <font color="red">{organ.organ_name}</font></span>     
                                                        <span style={{width:"100%",float:"left"}}><ContentButton items={organ.parts} name="Organ Parts"/></span>
                                                        <span style={{width:"100%",float:"left"}}><ContentButton items={organ.organ_layers} name="Organ Layers"/></span>  
                                                  
                                                    </div>
                                                    
                                                </Button>

                                                {
                                                showOrganParts[j,k] && organ.parts.length > 0 &&
                                                    Array.from(organ.parts).map((part, l) => (
                                                    <>
                                                        
                                                        <Button  key={l.toString()} style={{width:"20em",height:"auto",color:"black",fontSize:"1em",marginLeft:"2em",backgroundColor:"#ffe6f2"}} className="d-inline-flex justify-content-start inline">
                                                            <div style={{position:"relative",width:"100%"}}>
                                                                <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                <div style={{width:"100%",float:"left",marginTop:"-3em"}}><span>Organ Part:</span><br/><font color="red">{part.name}</font></div>
                                                                
                                                                <span style={{width:"100%",float:"left"}}><ContentButton idx={part.part_histo_layers_idx} items={part.contents[0].histo_layers} name="Part Histo-Layers"/></span>
                                                                <span style={{width:"100%",float:"left"}}><ContentButton idx={part.part_other_structures_idx} items={part.contents[0].other_structures} name="Part Structures"/></span>
                                                                <span style={{width:"100%",float:"left"}}><ContentButton idx={part.part_subparts_idx} items={part.contents[0].subparts} name="Part Sub-Parts"/></span>
                                                            </div>
                                                            
                                                        </Button>
                                                        {/*console.log("Show Part SubParts: ", showPartContents[part.showIdx])*/}
                                                       
                                                        {   
                                                           showPartContents[part.part_histo_layers_idx] && part.contents[0].histo_layers.length > 0 &&
                                                            part.contents[0].histo_layers.filter((histo_layer) => {return histo_layer.name != "null"}).map((histo_layer,m) => (
                                                            <>
                                                                <Button key={m.toString()} onClick={() => togglePartItems(histo_layer.showIdx)} style={{width:"20em",fontSize:"1em",marginLeft:"3em",backgroundColor:"#e5ffe5",color:"black"}} className="d-inline-flex justify-content-start inline">
                                                                    <div style={{position:"relative",width:"100%"}}>
                                                                        <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                        <div style={{width:"100%",float:"left",marginTop:"-3em"}}><span style={{color:"black"}}>Part Histo_Layer:</span><br/><font color="red">{histo_layer.name}</font></div>
                                                                       
                                                                        <span style={{width:"100%",float:"left"}}><ContentButton items={histo_layer.content.histo_Sublayers} name="Histo_SubLayers"/></span>
                                                                       
                                                                    
                                                                    
                                                                    </div>
                                                                  
                                                                </Button>
                                                                {console.log("Histo Layer: ",histo_layer)}

                                                                {   
                                                                    showPartContents[histo_layer.histo_layer_idx] && histo_layer.content.histo_Sublayers != "undefined" && histo_layer.content.histo_Sublayers.length > 0 
                                                                    &&
                                                                    histo_layer.content.histo_Sublayers.map((histo_Sublayer,m) => (
                                                                    <>
                                                                        <Button key={m.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"4em",backgroundColor:"#ccffff",color:"black"}} className="d-inline-flex justify-content-start inline">
                                                                            <div style={{position:"relative",width:"100%"}}>
                                                                                <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                                <div style={{width:"100%",float:"left",marginTop:"-3em"}}><span style={{color:"black"}}>Histo_SubLayers:</span><br/><font color="red">{histo_Sublayer.name}</font></div>
                                                                            </div>
                                                                            
                                                                        </Button>
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
                                                                <Button key={m.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"3em",backgroundColor:"#e8daef",color:"black"}} className="d-inline-flex justify-content-start inline">
                                                                    <div style={{position:"relative",width:"100%"}}>
                                                                        <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                        <div style={{width:"100%",float:"left",marginTop:"-3em"}}><span style={{color:"black"}}>Part Sub-Part:</span><br/><font color="red">{subpart.name}</font></div>
                                                                    </div>
                                                                    
                                                                </Button>
                                                            </>
                                                            ))


                                                        }
                                                        {   
                                                           showPartContents[part.part_other_structures_idx] && part.contents[0].other_structures.length > 0  &&
                                                            part.contents[0].other_structures.filter((other_structure) => {return other_structure.name != "null"}).map((other_structure,n) => (
                                                            <>
                                                                <Button key={n.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"3em",backgroundColor:" #f9ffe6",color:"black"}} className="d-inline-flex justify-content-start inline">
                                                                    <div style={{position:"relative",width:"100%"}}>
                                                                        <i style={{float:"left",marginLeft:"-0.5em",marginTop:"-0.25em",transform:"scale(0.75)"}} className="bi bi-arrow-return-right"></i>
                                                                        <div style={{width:"100%",float:"left",marginTop:"-3em"}}><span style={{color:"black"}}>Part Structures:</span><br/><font color="red">{other_structure.name}</font></div>
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
                                                        
                                                        <Button  key={l.toString()} style={{width:"20em",fontSize:"1em",marginLeft:"2em",backgroundColor:"lightGray",color:"black"}}  className="d-inline-flex justify-content-start inline">
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