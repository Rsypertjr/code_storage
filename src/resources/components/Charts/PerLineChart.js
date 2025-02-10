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
  


export default function PerLineChart(props) {
    
  
    const handleClick = () => {
        $('.chart-viewer').removeClass('upslide').addClass('downslide').addClass('hidden');
        $('.viewerClose').css('display','none');
        props.resetCharts();
    }


    useEffect(() => {
        let ctx = document.getElementById('myChart').getContext('2d');
        
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+ props.pageNo).css('background-color','#ffc107');   
       // let data = [65, 59, 80, 81, 56, 55, 40];
        let label =  '# of Votes';
        let type = props.type;
        let selected_index = props.pageNo;
        let bgColors = ['red','orange','yellow','lime','green','teal','blue','purple']; 
        let bdColors =  ['black'];
        
        let chartData =   props.chartData;
        //alert(JSON.stringify(chartData));
        let date_headers =    chartData.dateHeadersStore.map((item) => item);
        let perremainingbiden_store = chartData.perRemainingBidenStore.map((item) => item);
        let perremainingtrump_store = chartData.perRemainingTrumpStore.map((item) => item);
        let datasets = [];   
        let labels = date_headers[selected_index-1];

        var data1= {};
        data1.label = "Biden % of Remaining Vote";
        data1.backgroundColor = bgColors[0];
        data1.borderColor = bgColors[0];
        data1.data = [];
        perremainingbiden_store[selected_index-1].map((data) => {               
            data1.data.push(data);
        });
        let dataset1 = data1;
        //alert(JSON.stringify(dataset1));

        var data2 = {};
        data2.label = "Trump % of Remaining Vote";
        data2.backgroundColor = bgColors[1];
        data2.borderColor = bgColors[1];
        data2.data = [];
        perremainingtrump_store[selected_index-1].map((data) => {                
            data2.data.push(data);
        });
        let dataset2 = data2;
        //alert(JSON.stringify(dataset2));

       

        datasets = [dataset1, dataset2]
        //alert(JSON.stringify(datasets));

       
        const myChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: datasets
                }
            });
       
        return () => {
          myChart.destroy()
        }

      });
   
    return (      
        <div class="chart-viewer">
            <Container className="h-10 d-flex justify-content-center">
                <h4>Remaining Percetage of Vote Chart</h4>
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
                <h4>Incremental Remaining Percentage</h4>
            </Container>
            <Container className="smaller justify-content-center">
                <div><canvas id="myChart"></canvas></div>
            </Container> 
            <Container className="h-100 d-flex justify-content-center">
                <ChartPager {...props} getPageNumber={props.getPageNumber} type={'line'} leftArrow={props.leftArrow} rightArrow={props.rightArrow}/>
            </Container> 
        </div>
    );

}
