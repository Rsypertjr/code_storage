// resources/js/components/TableReact.js

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ChartPager from './ChartPager';
import { Container, Row, Col } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
//import { Button } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip'; 
import Button from 'react-bootstrap/Button'; 
import Table from 'react-bootstrap/Table';
import 'react-dropdown/style.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import $ from 'jquery';
const headers = ["Index","Total Biden %","Total Biden Votes","Total Trump %","Total Trump Votes","Total Other Votes","Time Stamps","Total Votes", "Added Total Votes","Added Trump Votes","Added Biden Votes","% of Remaining Biden Vote","% of Remaining Trump Vote"];

function AHeader(props){
    return  <th scope="col" className="text-center" style={{width:"2em"}}>{ props.header }</th>
}

const MyTooltip = (td, index) => (
    <Tooltip className="mytooltip" id={`button-tooltip-${td}`}> 
        { headers[index] }:&nbsp;&nbsp;{ td } 
    </Tooltip>  
);

function ATd(props){
  
    return  <>
               
                <OverlayTrigger {...props}
                    delay={{ hide: 450, show: 300 }} 
                    overlay= {MyTooltip(props)}
                    placement="left" 
                > 
                    <span className="text-center text-dark fw-bolder text-hover-primary fs-6 text-break">{ props.td }</span>
                    
                </OverlayTrigger>
              </>
}


function CloseButton(props){

    
    return (
        <Row className="h-10 m-4 d-flex justify-content-center">
            <Button variant="outline-success" onClick={props.handleCloseChart} className="viewerClose">Close Chart</Button>{' '}
        </Row>  
    );
}

const handleCloseChart = () => {
    $('.chart-viewer').removeClass('upslide').addClass('downslide').addClass('hidden');
    };



const OuterTable = (props) => {
    const refLink = useRef(null);

    return (    
            <Row ref={refLink}>
                <Col>
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                    {
                                        headers.map((header) => (
                                            <AHeader key={header} header={header} />
                                        ))
                                    }

                                </tr>
                            </thead>
                            <tbody>
                            { props.theCurrentPages !== 'undefined' && props.theCurrentPages.length > 0 && props.theCurrentPages[props.pageNo-1].map(row =>
                                <tr  key={(row.id * props.theCurrentPages.length * props.pageNo-1).toString()}>
                                    {
                                        [
                                            row.id,
                                            parseFloat(row.bidenj*100).toFixed(1)+'%',
                                            parseFloat(row.biden_votes).toFixed(2),
                                            parseFloat(row.trumpd*100).toFixed(1)+'%',
                                            parseFloat(row.trump_votes).toFixed(2),
                                            parseFloat(row.other_votes).toFixed(2),
                                            row.timestamp,
                                            row.votes,
                                            row.total_vote_add,
                                            parseFloat(row.trump_added).toFixed(0),
                                            parseFloat(row.biden_added).toFixed(0),
                                            parseFloat(row.remaining_percent_biden*100).toFixed(1)+'%',
                                            parseFloat(row.remaining_percent_trump*100).toFixed(1)+'%' 
                                        ].map( (td,idx) => 
                                            
                                        <OverlayTrigger {...props}
                                            delay={{ hide: 450, show: 300 }} 
                                            overlay= {MyTooltip(td,idx)}
                                            placement="left" 
                                        > 
                                            <td className="text-center">{ td }</td>
                                            
                                        </OverlayTrigger>
                                            )
                                        
                                    }
                            
                                </tr>
                            )}
                        </tbody>
                    </Table>             
                </Col>                
            </Row>     
               
    );
};


export default function VoteTableReact(props)  {

     
     
        console.log("votes table props:", props);

        return (
            <Container className='chart-viewer'>                     
                <Row className="mt-1">
                    <Col className="w-100 d-flex justify-content-center">
                        <h3>{props.selectedState}</h3>
                    </Col>
                </Row>   
                <CloseButton handleCloseChart={handleCloseChart}/>
            
                <OuterTable {...props}/>
                
                <Row className="h-100 d-flex justify-content-center">
                    <ChartPager {...props}/>
                </Row>
            </Container>
           
        );
}