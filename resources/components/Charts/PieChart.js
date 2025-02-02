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
  

  const dataLoad = {
    dateHeadersStore: [],
    dateDataBidenStore: [],
    dateDataBidenAddStore: [],
    dateDataBidenAddDiffStore: [],
    dateDataTrumpStore: [],
    dateDataTrumpAddStore: [],
    dateDataTrumpAddDiffStore: [],
    dateDataTotalStore: [],
    dateDataOtherStore: [],
    dateDataOtherAddStore: [],
    dateDataTotalAddStore: [],
    perRemainingTrumpStore: [],
    perRemainingBidenStore: [],
    bidenSlices: [],
    trumpSlices: [],
    otherSlices: [],
    totalSlices: [],
    pieHeaders: [],
    voteBins: [],
    bin_headers: [],
    bin_biden: [],
    bin_trump: []
  };

export default function PieChart(props) {
    const [title,setTitle] = useState('');
    
    const handleClick = () => {
      $('.chart-viewer').removeClass('upslide').addClass('downslide').addClass('hidden');
      $('.viewerClose').css('display','none');
      props.resetCharts();
    }

    useEffect(() => {
        let ctx = document.getElementById('myChart').getContext('2d');

        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+ props.pageNo).css('background-color','#ffc107');   
     
        let type = props.type;
        let selected_index = props.pageNo;

        let bgColors = ['red','orange','yellow','lime','green','teal','blue','purple']; 
        let bdColors =  ['black'];
        
        let chartData =   props.chartData;
        let date_headers =    chartData.dateHeadersStore[selected_index-1];

        let labels = ["Biden Votes","Trump Votes","Other Votes"];
        let label = "Votes from: " + date_headers[0].replace(/T/g,'@').replace(/Z/g,' ') + " to "+ date_headers[date_headers.length-1].replace(/T/g,'@').replace(/Z/g,' ');
        setTitle(label);
        let biden_slice = chartData.bidenSlices[selected_index-1];
        let trump_slice = chartData.trumpSlices[selected_index-1];
        let other_slice = chartData.otherSlices[selected_index-1];
        let datasets = [
          {
            label:label,
            data:[biden_slice,trump_slice,other_slice],
            backgroundColor:[bgColors[0],bgColors[1],bgColors[2]],
            borderColor:[bgColors[0],bgColors[1],bgColors[2]], 
            borderWidth:1,
          }
        ];   
     

       
        const myChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                  responsive:false,
                }
               
            });
       
        return () => {
          myChart.destroy()
        }

      });
   

    return (      
        <div class="chart-viewer">
            <Container className="h-10 d-flex justify-content-center">
                <h6>Votes Pie Chart</h6>
            </Container>
            <Container>
                <Row>
                    <Col className="pt-4" xs={1}>
                      <Button variant="outline-success" onClick={handleClick} className="viewerClose">Close Chart</Button>{' '}
                    </Col>
                    <Col xs={11}>
                        <ResolutionDropdown {...props} theResolutions={props.theResolutions} selectResolution={props.selectResolution}/>    
                    </Col>
                </Row>
            </Container>    
            <Container className="h-10 d-flex justify-content-center">
                <h4>{title}</h4>
            </Container>
            <Container className="justify-content-center">
                <div><canvas id="myChart" class="pie-chart" width="400px" height="400px" left="300px"></canvas></div>
            </Container> 
            <Container className="h-100 d-flex justify-content-center pie-pager">
                <ChartPager {...props} getPageNumber={props.getPageNumber} type={'line'} leftArrow={props.leftArrow} rightArrow={props.rightArrow}/>
            </Container> 
        </div>
    );

}
