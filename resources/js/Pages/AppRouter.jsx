import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { createBrowserRouter, RouterProvider, BrowserRouter,useLocation,useNavigate,useParams,Link, Route, Routes, Navigate, Outlet,NavLink} from 'react-router-dom';
import VotesLineChart2 from './Charts/VotesLineChart2';
import SpikesLineChart from './Charts/SpikesLineChart';
import DiffLineChart from './Charts/DiffLineChart';
import PerLineChart from './Charts/PerLineChart';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import BinStackedChart from './Charts/BinStackedChart';
import VoteTableReact from './VoteTableReact';
import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
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
  const [isChartClosed,setIsChartClosed] = useState(true);
  const [getNavigate,setGetNavigate] = useState();
  const [pageTitle, setPageTitle] = useState("Presidential Election");

  useEffect(() => {
      document.title = pageTitle || 'Work Portfolio'; // Set the title
      console.log("App Router page title:",pageTitle);
  },[pageTitle]);

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

   

   const NaviLinks = () => 
    {

        return (
            <>  
               
                <Row className="d-flex justify-content-center align-items-center">
                    <LinkContainer to="/" className="col-1 menu-tab">
                        <NavLink onClick={()=>setPageTitle("Home")} className="menu-tab rounded text-center">Home</NavLink> 
                    </LinkContainer>
                    <LinkContainer to="/votestable" className="col-1 menu-tab"> 
                        <NavLink onClick={()=>setPageTitle("Votes Table")} className='menu-tab rounded text-center' >Votes Table</NavLink>    
                    </LinkContainer>
                    <LinkContainer to="/voteslinechart" className="col-1 menu-tab"> 
                        <NavLink onClick={()=>setPageTitle("Votes Line Chart")}  className='menu-tab rounded text-center' >Votes Line Chart</NavLink>    
                    </LinkContainer>
                    <LinkContainer to="/spikeslinechart" className="col-1 menu-tab"> 
                        <NavLink onClick={()=>setPageTitle("Spike Lines Chart")} className='menu-tab rounded text-center' >Spikes Line Chart</NavLink>    
                    </LinkContainer>
                    <LinkContainer to="/difflinechart" className="col-1 menu-tab"> 
                        <NavLink onClick={()=>setPageTitle("Difference Line Chart")}  className='menu-tab rounded text-center' >Difference Line Chart</NavLink>    
                    </LinkContainer>
                    <LinkContainer to="/perlinechart" className="col-1 menu-tab"> 
                        <NavLink onClick={()=>setPageTitle("Percentage Line Chart")}  className='menu-tab rounded text-center' >Percent Line Chart</NavLink>    
                    </LinkContainer>
                    <LinkContainer to="/piechart" className="col-1 menu-tab"> 
                        <NavLink onClick={()=>setPageTitle("Pie Chart")}  className='menu-tab rounded text-center' >Pie Chart</NavLink>    
                    </LinkContainer>
                    <LinkContainer to="/barchart" className="col-1 menu-tab"> 
                        <NavLink onClick={()=>setPageTitle("Bar Chart")}   className='menu-tab rounded text-center' >Bar Chart</NavLink>    
                    </LinkContainer>
                    <LinkContainer to="/binstackedchart" className="col-1 menu-tab"> 
                        <NavLink onClick={()=>setPageTitle("Bin Stacked Chart")}  className='menu-tab rounded text-center' >Bin Stacked Chart</NavLink>  
                    </LinkContainer>
                </Row>            
                
            </>
          
        );
        
    };
    

   const NavRoutes = ()  => {
        const navigate = useNavigate();
        return (
            <div>
            {/*  <button onClick={() => navigate(-1)}>go back</button> */}
                <NaviLinks/>
                <Routes>
                    <Route path='/home' element={<div>Home</div>}/>
                    <Route path="/votestable" element={<VoteTableReact {...props} navigate={navigate} resetCharts={props.resetCharts}  getPageNumber={props.getPageNumber} type={'table'} rightArrow={props.rightArrow} leftArrow={props.leftArrow} setIsChartClosed={setIsChartClosed}/>}/>
                    <Route path="/voteslinechart" element={<VotesLineChart2 {...props} navigate={navigate} resetCharts={props.resetCharts} selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} setIsChartClosed={setIsChartClosed}/>}/>
                    <Route path="/spikeslinechart" element={<SpikesLineChart {...props} navigate={navigate} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} setIsChartClosed={setIsChartClosed}/>}/>
                    <Route path="/difflinechart" element={<DiffLineChart  {...props} navigate={navigate} resetCharts={props.resetCharts}  selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} setIsChartClosed={setIsChartClosed}/>}/>
                    <Route path="/perlinechart" element={<PerLineChart  {...props} navigate={navigate} resetCharts={props.resetCharts}  selectResolution={props.selectResolution} getPageNumber={props.getPageNumber} type={'line'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} setIsChartClosed={setIsChartClosed}/>}/>
                    <Route path="/piechart" element={<PieChart {...props} navigate={navigate} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'pie'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow}  setIsChartClosed={setIsChartClosed}/>}/>
                    <Route path="/barchart" element={<BarChart  {...props} navigate={navigate} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'bar'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} setIsChartClosed={setIsChartClosed}/>}/>
                    <Route path="/binstackedchart" element={<BinStackedChart {...props} navigate={navigate} resetCharts={props.resetCharts}  selectResolution={props.selectResolution}  getPageNumber={props.getPageNumber} type={'bar'}  rightArrow={props.rightArrow} leftArrow={props.leftArrow} setIsChartClosed={setIsChartClosed}/>}/>
                </Routes>
            </div>
        );
  };

  

    return(
      <>
        
        <BrowserRouter>
            <Head>
              <title>{pageTitle}</title>
            </Head>
            <NavRoutes />
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