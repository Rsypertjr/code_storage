import {React, useEffect, useState} from 'react';
import ChartPager from '../ChartPager';
import { getRelativePosition } from 'chart.js/helpers';
import ResolutionDropdown from '../ResolutionDropdown';
import AnalyticsBar from './AnalyticsBar';
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



export default function VotesLineChart2(props) {    
    const [myLineChart,setMyLineChart] = useState(null);
    const [pageNo, setPageNo] = useState(props.pageNo);
    const [thePageSetNumber, setThePageSetNumber ] = useState(parseInt(props.thePageSetNumber));
    const [thePageSize,setThePageSize ] = useState(props.thePageSize);
    const [thePagingArray,setThePagingArray] = useState(props.thePagingArray);
    const [theChartArray,setTheChartArray] = useState(props.theChartArray);
    const [chartData, setChartData] = useState(props.chartData);
    const [theVotes, setTheVotes] = useState(props.theVotes);
    const [parseResolution, setParseResolution ] = useState(props.parse_resolution);

    useEffect(() => {
        console.log("Parse Resolution",parseResolution);
        console.log("Chart Data:", chartData);
        
        let ctx = document.getElementById('myChart').getContext('2d');

        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+ pageNo).css('background-color','#ffc107');

       // let data = [65, 59, 80, 81, 56, 55, 40];
        let label =  '# of Votes';
        let type = props.type;
        let cdata = getDatasets(chartData,pageNo,type,label);
        let labels = cdata.labels;
        let datasets = cdata.datasets;      

        const lineChart = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {     
                // All of these (default) events trigger a hover and are passed to all plugins,
              // unless limited at plugin options
              events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
              plugins: {
                  tooltip: {
                      // Tooltip will only receive click events
                      events: ['click'],
                      position:'nearest',
                      enabled:true,
                      caretSize: 15,
                      interaction: {
                          mode:'index',
                          intersect:'false'
                      },
                      titleFont: {
                          size: 35
                      },
                      bodyFont: {
                          size: 30
                      },
                      footerFont: {
                          size: 30 // there is no footer by default
                      }
    
                  
                  }
              },
              onHover: (e) => {
                  const canvasPosition = getRelativePosition(e);
      
                  // Substitute the appropriate scale IDs
                  const dataX = e.chart.scales.x.getValueForPixel(canvasPosition.x);
                  const dataY = e.chart.scales.y.getValueForPixel(canvasPosition.y);
                  console.log("Data X",dataX);
                  console.log("Data Y",dataY)
                  console.log("Event", e);
                  console.log("Active Elements: ", e.chart.tooltip.getActiveElements());     
                 
                  let chartRight = Math.ceil(e.chart.chartArea.right);
                  let chartLeft = Math.floor(e.chart.chartArea.left);
                  let chartWidth = chartRight - chartLeft;
                  console.log("Chart start: ",chartLeft);
                  console.log("Chart Width: ",chartWidth);
                  console.log("Chart end: ",chartRight); 
                  let elementWidth = Math.floor((chartRight - chartLeft)/e.chart.data.datasets[0].data.length );
                  console.log("Element width: ",elementWidth);
                  console.log("Click X position: ", e.x);
                  let column_index = 0;
                  let selected_index = 0;
                  let last_index;
                  let i = parseFloat(e.chart.chartArea.left);
                  let fudgeFac = 1.2;
               
                  selected_index = Math.ceil((e.x-chartLeft)/(elementWidth)*fudgeFac);
                  console.log("Floored Selected Index: ", selected_index);
                  //alert(selected_index);
                  let activeElArray = [];
                  let element;
                
                  e.chart.data.datasets.map((d,index) => {
                      element = {
                          datasetIndex:index,
                          index: selected_index - 1
                      };
                      activeElArray.push(element);
                  });
    
                  console.log("Active Elements Array: ", activeElArray);
                  e.chart.tooltip.setActiveElements(
                    activeElArray,
                    {
                      x: dataX,
                      y: dataY,
                    });
                  e.chart.update();               
              }
          }
        });



        return () => {
          lineChart.destroy()
        }  
        
    },[]);
 
        
    useEffect(() => {

        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+pageNo).css('background-color','#ffc107');

    },[pageNo]);


    useEffect(() => {
        function resetChartData(){
            console.log("new chart data: ",props.chartData);
            setChartData(props.chartData);
            let pageNum;
            if(pageNo === 1){
                pageNum = 1;
                setPageNo(pageNum);
            }               
            else{
                pageNum = pageNo - 1;
                setPageNo(pageNum);
            }   
                
            
            updateChart(pageNum,props.chartData);
            
        }
        console.log("new parse res: ",props.parse_resolution);
        resetChartData();

    },[props.chartData]);

    const getPageNumber = (obj) =>
    {
      console.log("page num: ",obj.num);
       let num = obj.num;     
       setPageNo(num);
       updateChart(num,null);
    };
  
  
    const rightArrow = (obj) => {
        console.log(obj);
        let num = obj.num;
        let nxpagenum = obj.nxpagenum
        let type = obj.type;

        let highest_page = parseInt(thePageSetNumber)*parseInt(thePageSize);
        console.log("highest page:", highest_page);
  
        if(num > highest_page){
            setThePageSetNumber(thePageSetNumber+1);
            setPageNo(num);
           
        }
    };


    const leftArrow = (obj) => {
        console.log(obj);
  
        let num = obj.num;
        let newNum = parseInt(thePageSetNumber-1)*thePageSize;
        let lowest_page = newNum + 1;
        console.log("Lowest Page:", lowest_page);
        if(num != 0 && num < lowest_page) {
            setThePageSetNumber(thePageSetNumber - 1);
            setPageNo(num);
        }
        else if( num == 0 && lowest_page <= 1) {
            setThePageSetNumber(thePageSetNumber);
            setPageNo(1);
        }
      
    };
  
    const getDataSetPerIndex = (index,chartData) => {
        let bgColors = ['red','orange','yellow','lime','green','teal','blue','purple'];
        let bdColors =  ['black'];
        let date_headers = chartData.dateHeadersStore;
        let datedata_biden = chartData.dateDataBidenStore;
        let datedata_trump = chartData.dateDataTrumpStore;
        let datedata_other = chartData.dateDataOtherStore;

        let labels = date_headers[index];

           
        var data1= {};
        data1.label = "Biden Votes";
        data1.backgroundColor = bgColors[0];
        data1.borderColor = bgColors[0];
        data1.data = [];
        datedata_biden[index].map((data) => {
            data1.data.push(data);
        });
        let dataset1 = data1;
        //alert(JSON.stringify(dataset1));

        var data2 = {};
        data2.label = "Trump Votes";
        data2.backgroundColor = bgColors[1];
        data2.borderColor = bgColors[1];
        data2.data = [];
        datedata_trump[index].map((data) => {
            data2.data.push(data);
        });
        let dataset2 = data2;
        //alert(JSON.stringify(dataset2));


        var data3 = {};
        data3.label = "Other Votes";
        data3.backgroundColor = bgColors[2];
        data3.borderColor = bgColors[2];
        data3.data = [];

        datedata_other[index].map((data) => {
            data3.data.push(data);
        });
        let dataset3 = data3;

        let datasets = [dataset1, dataset2, dataset3];

        return { "labels": labels, "datasets": datasets };
    };


    const getDatasets = (chartData,selected_index,type,label) => {
      
        if((selected_index - 1) < chartData.dateDataBidenStore.length) {
                // Select Data set from Chart Data to make chart   
                let data = getDataSetPerIndex(selected_index - 1,chartData);
                return data;
         }
        else {
             // Set resolution bound for selecting a dataset from Chart data
            let last_index = chartData.dateDataBidenStore.length - 1;
            let data = getDataSetPerIndex(last_index, chartData);
            return data;

        }
        
    };

    const updateChart = (num,chart_data=null) => {
        if(chart_data === null)
            chart_data = chartData;


        console.log("entering updateChart with page no: ",num);
       
        let ctx = document.getElementById('myChart').getContext('2d');
        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+ num).css('background-color','#ffc107');

       // let data = [65, 59, 80, 81, 56, 55, 40];
        let label =  '# of Votes';
        let type = props.type;       

        let cdata = getDatasets(chart_data,num,type,label);
        let labels = cdata.labels;
        let datasets = cdata.datasets;

        let chart = Chart.getChart('myChart');
        chart.data.labels = labels;        
        datasets.forEach((dataset,index) => {
            chart.data.datasets[index].data = dataset.data;
        });
        chart.update();
    };

  

    return (
        <Container className="chart-viewer">

            <Row>
                <Col className="w-100 d-flex justify-content-center">
                    <h3>{props.selectedState}</h3>
                </Col>
            </Row>
            <Row>
                <Col className="w-100 d-flex justify-content-center">
                    <h4>Total Votes Line Chart</h4>
                </Col>
            </Row>
          
            <AnalyticsBar handleCloseChart={props.handleCloseChart} {...props} theResolutions={props.theResolutions} selectResolution={props.selectResolution} 
                selectAnalytics={props.selectAnalytics} chartData={props.chartData} chartType={'VotesLineChart2'}/>
            <Row>
                <Col className="w-100 d-flex justify-content-center">
                    <h4>Incremental Total Votes</h4>
                </Col>               
            </Row>
            <Row className="d-flex justify-content-center">
                <div><canvas id="myChart"></canvas></div>
            </Row>
            <Row className="h-100 p-1 mt-3 d-flex justify-content-center">
                <ChartPager  getPageNumber={getPageNumber} type={'line'} leftArrow={leftArrow} rightArrow={rightArrow} pageNo={pageNo}
                    thePagingArray={thePagingArray} thePageSetNumber={thePageSetNumber} chartData={chartData} thePageSize={thePageSize}
                    theChartArray={theChartArray} />
            </Row>
        </Container>

    );

}