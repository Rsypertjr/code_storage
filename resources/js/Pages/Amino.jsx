import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, Form, Button, Table, Image } from 'react-bootstrap';
import parse from "html-react-parser";
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import TopCarousel from './Portfolio/TopCarousel';
import MidCarousel from './Portfolio/MidCarousel';
import TopNav from './Portfolio/TopNav';
import $ from 'jquery';
import axios from "axios";

import spiral from '../../images/spiral.gif';

const acid_names = ['G - Glycine','A - Alanine','V - Valine','L - Leucine',' I - Isoleucine','M - Methionine',
                    'F - Phenylalanine','W - Tryptophan','P - Proline','S - Serine','T - Threonine','C - Cysteine',
                    'Y - Tyrosine','N - Asparagine','Q - Glutaminie','D - Aspartic Acid','E - Glutamic Acid',
                    'K - Lysine','R - Arginine','H - Histidine'
                    ];

const acid_initials = ['G','A','V','L','I','M','F','W','P','S','T','C','Y','N','Q','D','E','K','R','H'];

const protein_analytics = [
    "Get All Accession Numbers for chosen miniMotif",
    "Get All Motif Instances in All Proteins",
    "Get Start Positions of selected Motif in All Proteins",
    "Get Number of Motifs for Each Protein",
    "Get All Species Names in which selected Motif occurs",
    "Get Average Length of All Proteins for the selected Motif"
];

const pa_values = ['X','1','2','3','4','5'];




export default function Amino(props){  
    const [startMotif, setStartMotif] = useState('Start Motif');
    const [endMotif, setEndMotif] = useState('End Motif');
    const [aminoString, setAminoString] = useState('X......X');
    const [waitStyle, setWaitStyle] = useState({});
    const [motifAnalytic, setMotifAnalytic] = useState('Select an Analytic');
    const [motifAnalyticIndex,setMotifAnalyticIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [loaderMessage, setLoaderMessage] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [loaderImage, setLoaderImage] = useState(null);
    const [tableStatusMessage, setTableStatusMessage] = useState(null);
    const [dropTableConfirm,setDropTableConfirm] = useState(false)
    const [numRows, setNumRows] = useState(0);
    const [droppingTables, setDroppingTables] = useState(false);
    const [alreadyBuilding, setAlreadyBuilding] = useState(false);
    const [checkingStatus, setCheckingStatus ] = useState(false);


    const handleStartMotif = (e) => {
        setStartMotif(e.target.value.toString());
        setAminoString(e.target.value.toString() + aminoString.slice(1,8));
    };

    const handleEndMotif = (e) => {
        setEndMotif(e.target.value.toString());
        setAminoString(aminoString.slice(0,-1) + e.target.value.toString());
    };

    const closeResults = (e) => {
        setShowResults(false);
        setShowLoader(false);
        $('#wait').fadeOut(3000);
    };

    const handleMotifAnalytic = (e) => {
        setMotifAnalytic(e.target.value.toString());

        let index = protein_analytics.indexOf(e.target.value.toString());
        setMotifAnalyticIndex(index); 
        
    };


    const fsiz = {
        paddingLeft:'2em'        
    };

    const loadingStyle = {
        position: 'relative',
        height: '20em',
        width: '70%',
        marginLeft:'15%',
        backgroundColor: 'beige',
        marginTop: '-10em',
        zIndex: '10'
    };

    const resultsStyle = {
        position: 'relative',
        height: '30em',
        width: '70%',
        marginLeft:'15%',
        backgroundColor: '#F0FFFF',
        marginTop: '-30em',
        opacity:'0.90',
        zIndex: '10',
        overflowY:'scroll',
        padding:'2em'
    }


    const Form_Select = (props) => {
        return (
            <>
                 <Form.Select id="am1" aria-label="am1" onChange={props.handleMotif}>
                    <option>{props.first_option}</option>
                    {
                        props.names.length > 0 && props.names.map((aname,i) => (
                    
                            <option key={i} value={props.initials[i]} >{aname}</option>
                    
                        ))
                    }
                </Form.Select>
                                             
            </>
    
        );
    } ;

    const Mobile_Loader = (props) => {
        return (
            <>
                <Container>
                    <Row className="d-flex justify-content-center mb-3">
                            <Button className="" type="button" onClick={closeResults}>Close</Button> 
                    </Row>
                    <Row>
                        <div className="d-flex justify-content-center"> 
                            <p id='loaderMessage'>{parse(props.message)}</p>
                        </div>
                        <div className="d-flex justify-content-center"> 
                            <Image src={props.image}></Image>
                        </div> 
                    </Row>
                </Container> 
            </>               
        );
    };

    const Table_Status = (props) => {
        return (
            <>
                <Container>
                    <Row className="d-flex justify-content-center">
                        <p className="d-flex justify-content-center" >
                            <span style={{color:'blue', fontSize:'1.3em', marginRight:'1em'}}>Current Database Status (May need to use Update button):</span>
                            <span style={{color:'green', fontSize:'1.3em'}}> {props.table_status_message}</span>
                          
                        </p>
                        {   numRows > 0 && 
                            <p className="d-flex justify-content-center">                          
                                <span style={{color:'blue', fontSize:'1.3em', marginRight:'1em'}}>Number of Rows in miniMotif Table: </span>
                                <span style={{color:'green', fontSize:'1.3em'}}>{numRows} </span> 
                            </p>
                        }
                    </Row>
                    { 
                        !dropTableConfirm &&  
                        <Row className="p-2" style={{fontSize:"1.25em"}}>
                            <p className="d-flex justify-content-center">You can use 'Drop Button' to get rid of these tables and load a new FASTA format file with a (.txt) extension</p>
                        </Row>  
                    }                  
                </Container>
            </>

        );

    };


    const Result_Table = (props) => {
        return (
            <>
                <Container >
                    <Row className="d-flex justify-content-center mb-3">
                        <Button className="" type="button" onClick={closeResults}>Close</Button> 
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Table striped bordered hover>
                            <thead>
                                <tr>                        
                                    {
                                        props.headers.length > 0 && props.headers.map((header,i) => (
                                            <th key={i}>{header}</th>
                                        ))

                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.rows.length > 0 && props.rows.map((row,j) => (
                                        <tr key={j}>
                                            {
                                                Object.values(row).length > 0 && 
                                                Object.values(row).map((value,k) => (
                                                    <td key={k}>{value}</td>
                                                ))
                                            }
                                        </tr>

                                    ))
                                }
                            
                            </tbody>
                        </Table>
                    </Row>
                    
                </Container>
            </>
           
        );

    };

    const valInput = () => {
        var inform = document.forms["filein"];
        var fnm = inform.elements["fname"].value;
        var input = fnm.toString();
        var n = fnm.includes("input");

        const extension = ".txt";

      
        
        var rcvid = "wait";

        if(!fnm.match(/(\w|\d|(\Q-_\E))*\.txt/))
        {
            var inform = document.forms["filein"];
            inform.elements["fname"].value = "Please input a FASTA type file";
           
            alert("Ops! You Forgot File Name or Its not a Text File (.txt)");

        }
        else
        {
           
                var mess = "Please Wait while Database Tables are being Built!";
                //setTableStatusMessage(mess);       
                if(!alreadyBuilding){
                    setDroppingTables(false);
                    setAlreadyBuilding(true);
                    setShowLoader(true);
                    setLoaderImage(spiral);
                    setWaitStyle(resultsStyle);
                    setLoaderMessage("Building the Protein and miniMotif Tables.");
                    setTableStatusMessage("Building the Protein and miniMotif Tables.");                
                    makeRequest(fnm,rcvid,"no",mess);
                    setAlreadyBuilding(true);  
                }
            
                 
                   

        }
    }

    const checkStatus = () => {
        setCheckingStatus(true);
        axios.get('/checkstatus')
        .then( 
          response => {
             //alert(JSON.stringify(response.data));
             if(response.data.data.toString().includes('The Protein and MimiMotif Tables are Dropped')){
                setDropTableConfirm(true);
                setTableStatusMessage("There are presently no Database Tables.");
                setNumRows(0);
         
             }
            
             else{
                setDropTableConfirm(false);
                setTableStatusMessage(response.data.data.toString());
             }
             
          } 
        )
        .catch(error => {
            console.log("ERROR:: ",error);
         });

    }

    const checkMiniMotifSize = () => {
        axios.get('/minimotifsize')
        .then( 
            response => {
                //alert(JSON.stringify(response.data));
                console.log(JSON.stringify(response));
                if(response.data.num_rows != undefined)
                {
                    setNumRows(response.data.num_rows);
                    setShowLoader(false);
                    setWaitStyle({});

                }
                else    
                    setNumRows(0);

                setDroppingTables(false);
                   
        
            } 
            )
            .catch(error => {
                console.log("ERROR:: ",error);
            });

    }

    const updateDatabase = () => {

        checkMiniMotifSize();
    };

    const makeRequest = (snd,recid,drp,mess) => {
       
       if(!mess.includes('Drop'))
            mobileLoader(mess);   
       else {
            if (confirm("Are You sure that you want to Drop Tables?")) {
                // User clicked "Yes" (OK)
                console.log("User clicked Yes");
                setDropTableConfirm(true);
            } else {
                // User clicked "No" (Cancel)
                console.log("User clicked No");
                return;
            }
        }     

       const packets = {
            dropDb: drp,
            file:snd,
            motif:null
       };
/*
       if(snd != null){
            $('#wait').fadeIn('fast');
            setLoaderMessage("Protein and MiniMotif Tables are Now Building. This could take a While.");
            setTableStatusMessage("Protein and MiniMotif Tables are Now Building. This could take a While.");
            setDropTableConfirm(true);  //tables are dropped until fully rebuilt
           

       }
            */
        setNumRows(0);
        if(alreadyBuilding){
            setLoaderMessage("Now Building the Protein and miniMotif Tables.");
            setTableStatusMessage("Now Building the Protein and miniMotif Tables.");
            setShowLoader(true);
            setLoaderImage(spiral);
            setAlreadyBuilding(true);
            mobileLoader();          
            
        }
        else if(droppingTables && !checkingStatus && !alreadyBuilding){
            setLoaderMessage("Now Dropping the Protein and miniMotif Tables.");
            setTableStatusMessage("Now Dropping the Protein and miniMotif Tables.");
            setNumRows(0);
        }
        if(numRows > 0 && !droppingTables && !alreadyBuilding){
            setLoaderMessage("The Protein and miniMotif Tables are now built.");
            setTableStatusMessage("The Protein and miniMotif Tables are now built.");
            clearTimeout();
        }
        
        fetchData(packets);   
        checkMiniMotifSize();
          
    };



     function fetchData(packets) {
         axios.post('/makerequest', packets)
        .then( 
            response => {
                //alert(response.data);
                if(response.data.includes('Database already built'))
                {               
                    $('#wait').fadeIn('fast');
                    setLoaderMessage("Database Tables already Exist!  Click 'Drop Table' button if you want to start new tables.");
                    setTableStatusMessage("Database Tables already Exist!  Click 'Drop Table' button if you want to start new tables.");
                    setShowLoader(true);
                    setLoaderImage(null);
                    setAlreadyBuilding(true);
                    //mobileLoader();
                }   
                else if(response.data.includes('Dropping') || response.data.message.includes('Base table or view not found'))
                    {               
                        $('#wait').fadeIn('fast');
                        setLoaderMessage(response.data);
                        setNumRows(0)
                        setTableStatusMessage("Proteins and miniMotif Tables are Dropped!");
                        setShowLoader(false);
                        setDroppingTables(true);
                        //setLoaderImage(null);    
                        setAlreadyBuilding(false);            
                        setWaitStyle({});                        
                    }        
                else
                {
                    $('#wait').fadeIn('fast');
                    checkMiniMotifSize();
                    setLoaderMessage("Protein and MiniMotif Tables are Done Building.");
                    setAlreadyBuilding(true);
                    setShowLoader(true);
                    setLoaderImage(null);
                    //mobileLoader();
                }
            } 
        )
        .catch(error => {
            console.log("ERROR:: ",error.response.data);
            });

        return;
    }
    
    const LoaderMessage = (props) => {
        return (
            <Container style={{height:"20em",backgroundColor:"beige"}}>
                <p id='loaderMessage'>{props.message}</p>
                <img src={props.spiral}></img>
            </Container>
               
        );
    };
     
    const mobileLoader = () => {

        var i = 0;
        setWaitStyle(resultsStyle);
        setInterval(function()
            {
                $('#wait img').css({"transform": "rotate("+(30*i)+"deg)"});
                i++;
            },50 ); 
    };

    const dropTables = () =>
    {
      var mess = "Starting to Drop Exisiting Tables! (use Update Database Status to see if finished!)";
      setDroppingTables(true);
      setCheckingStatus(false);
      setAlreadyBuilding(false);
      setNumRows(0);
      setTableStatusMessage(mess);
      makeRequest(null,"wait","yes",mess);
     
    };


    const doSearch = (e) =>  {
        e.preventDefault();
        var am1 = startMotif;
        var am2 = endMotif;
        var qu = motifAnalyticIndex;       
      
        var recid = "wait";
        var fnm = am1 + am2 + qu;
        $('#wait').fadeIn('fast');
        setLoaderMessage("Please Wait for Database Response!");
        setShowLoader(true);
        setLoaderImage(spiral);
        mobileLoader();
        makeRequest2(fnm,recid,"no");
            
    }
  
const makeRequest2 = (snd,recid,drp) => {
 
    const packets = {
        dropDb: null,
        file: null,
        motif:snd
    };
    
    axios.post('/makerequest', packets)
    .then( 
      response => {
         //alert(JSON.stringify(response.data));
         console.log(response.data);
         let results = response.data;
         $('#wait').fadeIn('slow');
         setShowLoader(false);
         setShowResults(true);
         setHeaders(results.headers);
         setRows(results.rows);
         setWaitStyle(resultsStyle);
 
      } 
    )
    .catch(error => {
        console.log("ERROR:: ",error);
     });
};

useEffect(() => {
    $('#fname').on('click',function(){
        var inform = document.forms["filein"];
        inform.elements["fname"].value = "";
    });

    checkStatus();
    checkMiniMotifSize();
},[]);
/*
useEffect(() => {   
    checkStatus();
    checkMiniMotifSize();
},[dropTableConfirm, tableStatusMessage]);
*/

    return(
       
        <>			
            <Container id="mmContainer" className="viewer">
                <Card>
                    <Card.Body>
                        <Card.Title><h1>Input Form for Minimotif Search</h1></Card.Title>                           
                            <Form id="filein">
                                <Form.Group className="mb-2" >
                                    <Form.Label className="p-2" style={{backgroundColor:"lightGrey" }}>
                                        <h3>Input the file name below</h3>
                                        <p>(<i><b>FASTA-TEST.txt</b> is an example file that will work.&nbsp;&nbsp;However, the database tables take several minutes to build since with 10's thousands of entries.</i>)&nbsp;&nbsp;If tables already exist you can <b>'Drop Tables'</b> to restart.&nbsp;&nbsp;Another file can be used but it must be in the <b>FASTA format</b> and <b>.txt</b> extension.
                                        </p>
                                    </Form.Label>
                                    <Form.Control type="input" id="fname" name="fname" placeholder="Input File Name" />                                            
                                </Form.Group>     
                                <Form.Group className="mb-2 inline">
                                    <Button className="aButton2" type="button" style={{marginRight:"1em"}} onClick={valInput}>Verify File and Start Database Build</Button>
                                    <Button className="aButton2" type="button" onClick={dropTables}>Drop Tables</Button>     
                                    <Button className="aButton2" type="button" style={{marginLeft:"1em"}} onClick={updateDatabase}>Update Database Status</Button>                                    
                                </Form.Group>                                 
                            </Form>
                            <Container className="d-flex justify-content-center" style={{heigth:'auto', padding:'1em', backgroundColor:'beige'}}>
                                {tableStatusMessage != null && <Table_Status table_status_message={tableStatusMessage}/> }
                            </Container>
                    </Card.Body>
                </Card>
            </Container>
            <Container id="motifsel" className="mt-3 viewer p-3" >
                <Form id="aminocodes">
                    <Form.Group className="mb-2" controlId="filein.ControlInput1" >                      
                        <Container className="p-5" style={{border: '1px solid lightGrey', backgroundColor:'beige', borderRadius:'5px' }}>
                            <Row>
                                <p className="mt-1 p-3 rounded" style={{backgroundColor:"lightGrey"}}>Select below the first and last letter codes for minimotif sequence you
                                    want to search.  (e.g. P and G for P.....G where dots represent any other amino acid codes in between).
                                </p>
                            </Row>
                            <Row >
                                <Col>     
                                    <Form_Select id="am1" name="am1" first_option={startMotif} names={acid_names} initials={acid_initials} handleMotif={handleStartMotif}/>
                                </Col>
                                <Col>
                                    <h2 id="mobX" className="text-center" style={{color:"green", zoom:"110%"}}>{aminoString}</h2>
                                </Col>
                                <Col>
                                    <Form_Select id="am2" name="am2" first_option={endMotif}  names={acid_names} initials={acid_initials} handleMotif={handleEndMotif}/>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="p-5 mt-3" style={{border: '1px solid lightGrey', backgroundColor:'beige', borderRadius:'5px' }}>
                            <Row>
                                {/*<hr className="rounded" style={{borderTop:'8px solid #bbb', borderRadius:'5px'}}/>*/}
                                <p className="mt-1 p-3 rounded" style={{backgroundColor:"lightGrey"}}>Select an Analytic to be performed on the MiniMotif Table.</p>
                                <Form_Select id="qu" name="qu" first_option={motifAnalytic}  names={protein_analytics} initials={protein_analytics} handleMotif={handleMotifAnalytic} />
                                <p className="mt-2"><span style={{color:'blue',zoom:'110%'}}>Analytic to be Performed:</span><span style={{color:'green',zoom:'110%', marginLeft:'1em'}} >{motifAnalytic}</span></p>
                            </Row>
                        </Container>                                           
                    </Form.Group>     
                    <Form.Group>

                    </Form.Group>
                    <Form.Group className="mb-2 inline">
                        {
                            numRows > 0 && 
                            <Button id="subButton" as="input" type="submit" style={{marginRight:"1em"}} onClick={doSearch} value="Submit Search"></Button>  
                        }                                  
                    </Form.Group>                                 
                </Form>
            </Container>
			<div id="wait" style={waitStyle}>
                { showLoader && <Mobile_Loader message={loaderMessage} image={loaderImage} /> }
                { showResults && <Result_Table headers={headers} rows={rows} /> }
            </div>			    
		
        </>
               
    );


};