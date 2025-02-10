import {React, useEffect, useState} from 'react';
import ChartPager from '../ChartPager';
import ResolutionDropdown from '../ResolutionDropdown';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
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
  


export default function BinStackedChart(props) {    
    
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
        let datedata_biden = chartData.dateDataBidenStore.map((item) => item);
        let datedata_other = chartData.dateDataOtherStore.map((item) => item);        
        let datedata_trump = chartData.dateDataTrumpStore.map((item) => item);

        let datasets = [];   
        let labels = date_headers[selected_index-1];

        var data1= {};
        data1.label = "Biden Votes";
        data1.backgroundColor = bgColors[0];
        data1.borderColor = bgColors[0];
        data1.data = [];
        datedata_biden[selected_index-1].map((data) => {               
            data1.data.push(data);
        });
        let dataset1 = data1;
        //alert(JSON.stringify(dataset1));

        var data2 = {};
        data2.label = "Trump Votes";
        data2.backgroundColor = bgColors[1];
        data2.borderColor = bgColors[1];
        data2.data = [];
        datedata_trump[selected_index-1].map((data) => {                
            data2.data.push(data);
        });
        let dataset2 = data2;
        //alert(JSON.stringify(dataset2));

        var data3 = {};
        data3.label = "Other Votes";
        data3.backgroundColor = bgColors[3];
        data3.borderColor = bgColors[3];
        data3.data = [];
        datedata_other[selected_index-1].map((data) => {                
            data3.data.push(data);
        });
        let dataset3 = data3;

       

        datasets = [dataset1, dataset2, dataset3]
        //alert(JSON.stringify(datasets));


       
        const myChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                  plugins: {
                    title: {
                      display: true,
                      text: 'Chart.js Bar Chart - Stacked'
                    },
                  },
                  responsive: true,
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true
                    }
                  } 
                }              
            });
       
        return () => {
          myChart.destroy()
        }

      });
   
    return (      
        <div class="chart-viewer">
            <Container className="h-10 d-flex justify-content-center">
                <h4>Total Votes Bin Stacked Chart</h4>
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
                <h4>Incremental Stacked Total Votes</h4>
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
