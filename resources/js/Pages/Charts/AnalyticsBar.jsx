import {React, useEffect, useState} from 'react';
import ChartPager from '../ChartPager';
import ResolutionDropdown from '../ResolutionDropdown';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
  } from 'chart.js';
import { auto } from '@popperjs/core';

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );



export default function AnalyticsBar(props) {

    return(
            <Container>
                <Row className="mb-4" >
                    <Button variant="outline-success" onClick={props.handleCloseChart} className="viewerClose">Close Chart</Button>{' '}
                </Row>
               
                <Row className="mb-3 p-2" style={{backgroundColor:"beige",fontSize:"0.8em", height:auto}}>
                    <Col className="col-6 d-flex justify-content-center" style={{position:"relative"}}>
                        <ResolutionDropdown {...props} theResolutions={props.theResolutions} selectResolution={props.selectResolution}/>
                    </Col>
                    <Col className="col-6 d-flex justify-content-center" >
                        <ResolutionDropdown {...props} analytics={'analytics'} theResolutions={props.theResolutions} selectAnalytics={props.selectAnalytics}
                        chartData={props.chartData}/>
                    </Col> 
                </Row>
            </Container>
    );

}