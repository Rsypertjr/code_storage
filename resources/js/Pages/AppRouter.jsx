import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter,useLocation,useNavigate,useParams,Link, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import VotesLineChart2 from './Charts/VotesLineChart2';
import SpikesLineChart from './Charts/SpikesLineChart';
import DiffLineChart from './Charts/DiffLineChart';
import PerLineChart from './Charts/PerLineChart';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import BinStackedChart from './Charts/BinStackedChart';
import VoteTableReact from './VoteTableReact';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import $ from 'jquery';



import styled from "styled-components";
const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white',
  fontSize: '0.8em'
};

export default function AppRouter(props){  
  const [isChartClosed,setIsChartClosed] = useState(false);

  console.log("App Router props:",props);
  /*useEffect(() => {
    $("#navbarNav > ul > li > a").on('mouseover',function(){
      $(this).css('color','grey');
    });
    $("#navbarNav > ul > li > a").on('mouseover',function(){
      $(this).css('color','white');
    });

    $("#navbarNav > ul > li > a").on('click',function(){
      $("#navbarNav > ul > li > a").css('color','white');
      $(this).css('color','grey');
    });

  });
  */

   function openViewer(){
    $('.chart-viewer').removeClass('hidden').removeClass('downslide').addClass('upslide');
    setChartOpen();
   }

   function setChartOpen(){
    setIsChartClosed(false);
   }

   const handleCloseChart = () => {
    $('.chart-viewer').removeClass('upslide').addClass('downslide').addClass('hidden');
    setIsChartClosed(true);
    props.resetCharts();
   }

    return(
      <>
      
          <BrowserRouter>
          <Link className='menu-tab rounded text-center' to="/" >Home</Link> 
            <LinkContainer   to="/votestable"> 
                <Nav.Link  className='menu-tab rounded text-center' >Votes Table</Nav.Link>    
            </LinkContainer>






          {/*<Navbar collapseOnSelect expand="lg" className="bg-info navbar navbar-expand-lg navbar-dark bg-dark w-100">              

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
              <Nav className="navbar-nav w-100 d-flex justify-content-center">
                <Row>
                  <LinkContainer to="/" className="col-1 m-2">
                    <Nav.Link onClick={openViewer} className="text-white " href="#" style={linkStyle}>                   
                        <i className="bi bi-x-circle" style={{color:"tomato",paddingLeft:"1rem"}}><p className="text-secondary mr-2">Reset<br/>Tables</p></i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/" className="col-1 m-2">
                    <Nav.Link onClick={openViewer} className="text-white" href="#" style={linkStyle}>                    
                        <i className="bi bi-table" style={{color:"dodgerblue",paddingLeft:"1rem"}}><p className="text-secondary">Votes<br/>Tables</p></i>
                    </Nav.Link>
                  </LinkContainer>
                  
                  <LinkContainer to="/voteslinechart" className="col-1 m-2" >
                    <Nav.Link onClick={openViewer} className="text-white" href="#" style={linkStyle}>
                        <i className="bi bi-graph-up-arrow" style={{color:"slateblue",paddingLeft:"1rem"}}><p className="text-secondary">Votes<br/>Lines<br/>Chart</p></i>
                    </Nav.Link>
                  </LinkContainer>
                  
                  <LinkContainer to="/spikeslinechart" className="col-1 m-2">
                    <Nav.Link onClick={openViewer} className="text-white" href="#" style={linkStyle}>                     
                        <i className="bi bi-graph-up-arrow" style={{color:"lightgray",paddingLeft:"1rem"}}><p className="text-secondary">Spike<br/>Line<br/>Chart</p></i>
                    </Nav.Link>
                  </LinkContainer>
                  
                  <LinkContainer to="/difflinechart" className="col-1 m-2">
                    <Nav.Link onClick={openViewer} className="text-white" href="#" style={linkStyle}>  
                        <i className="bi bi-graph-up-arrow" style={{color:"orange",paddingLeft:"1rem"}}><p className="text-secondary">Diff<br/>Line<br/>Chart</p></i>
                    </Nav.Link>
                  </LinkContainer>
                  
                  <LinkContainer to="/perlinechart" className="col-1 m-2">
                    <Nav.Link onClick={openViewer} className="text-white" href="#" style={linkStyle}>                    
                        <i className="bi bi-graph-up-arrow" style={{color:"violet",paddingLeft:"1rem"}}><p className="text-secondary">Percent<br/>Line<br/>Chart</p></i>
                    </Nav.Link>
                  </LinkContainer>
                
                  <LinkContainer to="/piechart" className="col-1 m-2">
                    <Nav.Link onClick={openViewer} className="text-white" href="#" style={linkStyle}>                       
                        <i className="bi bi-pie-chart-fill" style={{color:"green",paddingLeft:"1rem"}}><p className="text-secondary">Votes<br/>Pie<br/>Chart</p></i>
                    </Nav.Link>
                  </LinkContainer>
                  
                  <LinkContainer to="/barchart" className="col-1 m-2">
                    <Nav.Link onClick={openViewer} className="text-white" href="#" style={linkStyle}>                     
                        <i className="bi bi-bar-chart-line-fill" style={{color:"azure",paddingLeft:"1rem"}}><p className="text-secondary">Votes<br/>Bar<br/>Chart</p></i>
                    </Nav.Link>
                  </LinkContainer>
                  
                  <LinkContainer to="/binstackedchart" className="col-1 m-2" >
                    <Nav.Link onClick={openViewer} className="text-white" href="#"  style={linkStyle}>                     
                      <i className="bi bi-bar-chart-line-fill" style={{color:"darksalmon",paddingLeft:"1rem"}}><p className="text-secondary">Bin<br/>Stacked Chart</p></i>
                    </Nav.Link>
                  </LinkContainer>
                </Row> 
              </Nav>
           
            </Navbar.Collapse>
          </Navbar>
             */}
          <Routes>
              <Route path='/home' element={<div>Home</div>}/>
              <Route path="/votestable" element={<VoteTableReact {...props} resetCharts={props.resetCharts}  getPageNumber={props.getPageNumber} type={'table'} rightArrow={props.rightArrow} leftArrow={props.leftArrow} handleCloseChart={handleCloseChart}/>}/>
              <Route path="/voteslinechart" element={<VotesLineChart2 {...props}  resetCharts={props.resetCharts} selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} handleCloseChart={handleCloseChart}/>}/>
              <Route path="/spikeslinechart" element={<SpikesLineChart {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} handleCloseChart={handleCloseChart}/>}/>
              <Route path="/difflinechart" element={<DiffLineChart  {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} handleCloseChart={handleCloseChart}/>}/>
              <Route path="/perlinechart" element={<PerLineChart  {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} handleCloseChart={handleCloseChart}/>}/>
              <Route path="/piechart" element={<PieChart {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'pie'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow}  handleCloseChart={handleCloseChart}/>}/>
              <Route path="/barchart" element={<BarChart  {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'bar'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} handleCloseChart={handleCloseChart}/>}/>
              <Route path="/binstackedchart" element={<BinStackedChart {...props} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'bar'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} handleCloseChart={handleCloseChart}/>}/>
          </Routes>
      </BrowserRouter>
        { isChartClosed &&
          <Container className="w-100 d-flex justify-content-center p-2 pt-3" style={{backgroundColor:"lightgray"}}>
            <h4 style={{float:"left"}}>
              <span>Please select a Chart Type above</span>
              <i className="bi bi-arrow-up-square-fill" style={{marginLeft:"0.25em",marginRight:"0.25em"}}></i>
              <span>and the chart will appear here below</span><i className="bi bi-file-arrow-down-fill" style={{marginLeft:"0.25em"}}></i>
            </h4>
          </Container>
        }
      </>
        

    );
}