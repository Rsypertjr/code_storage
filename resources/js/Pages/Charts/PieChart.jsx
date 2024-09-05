import {React, useEffect, useState} from 'react';
import ChartPager from '../ChartPager';
import { getRelativePosition } from 'chart.js/helpers';
import { Interaction } from 'chart.js';
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
        let ctx = document.getElementById('myChart').getContext('2d');

        $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
        $('#page-'+ pageNo).css('background-color','#ffc107');

        let type = props.type;
        let selected_index = props.pageNo;

        let labels = ["Biden Votes","Trump Votes","Other Votes"];
        
        let date_headers =    chartData.dateHeadersStore[pageNo-1]; 
        let label = "Votes from: " + date_headers[0].replace(/T/g,'@').replace(/Z/g,' ') + " to "+ date_headers[date_headers.length-1].replace(/T/g,'@').replace(/Z/g,' ');
        setTitle(label);
             
        let data = getDatasets(chartData,pageNo,type,label);      

            let selected;
            Interaction.modes.pointSelected = function(chart, e, options, useFinalPosition) {
              const activeElements = [];
              if (selected) {
                activeElements.push(selected);
              }
             const pointItems = Interaction.modes.point(chart, e, {intersect: true}, useFinalPosition);
            
             if (pointItems.length) {
               if (selected) {
                 activeElements.push(...pointItems.filter(e => e.index !== selected.index));
               } else {
                 activeElements.push(...pointItems);
               }
             }
           
             return activeElements;
           };
    
           const plugin = {
            id: 'hl',
            afterEvent(chart, args) {
              const event = args.event;
              if (event.type === 'mouseout' && selected) {
                chart.setActiveElements([selected]);
                chart.tooltip.setActiveElements([selected]);
                chart.update();
              }
            }
          };
    
          const pieChart = new Chart(ctx, {
            type: type,
            data: {
                labels: data.labels,
                datasets: [data.datasets]
            },
            options: {     
              // All of these (default) events trigger a hover and are passed to all plugins,
              // unless limited at plugin options
              responsive: false,
              interaction: {
                mode:'pointSelected',
                intersect:true
              },
              
              onHover(event, el, chart) {
                const elements = chart.getElementsAtEventForMode(event, 'point', {intersect: true}, true);
                if (elements.length) {
                  selected = elements[0];
                }
              },
              plugins: {
                
                titleFont: {
                    size: 50
                },
                bodyFont: {
                    size: 40
                },
                footerFont: {
                    size: 40 // there is no footer by default
                },
                tooltip: {
                  caretSize: 15,
                  titleFont: {
                      size: 20
                  },
                  bodyFont: {
                      size: 20
                  },
                  callbacks: {
                    title(items) {
                      return items.map(e => e.label).join(' and ');
                    },
                    label(item) {
                      return item.label +': '+item.formattedValue;
                    }
                  }
                }
              }
            
          },
          plugins: [plugin]

        });






        return () => {
          pieChart.destroy()
        }

      },[]);



    useEffect(() => {
      function resetChartData(){
          console.log("new chart data: ",props.chartData);
          setChartData(props.chartData);
          let pageNum;
          if(pageNo === 1 || pageNo === 0){
              pageNum = 1;      
              setPageNo(pageNum);      
          }
          else    {
              pageNum = pageNo - 1;    
              setPageNo(pageNum);            
          }
          setPageNo(pageNum);
          if(pageNum > 1)
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




  const getDatasets = (chartData,selected_index,type,label) => {
    
    if((selected_index - 1) < chartData.bidenSlices.length) {
            // Select Data set from Chart Data to make chart   
            let data = getDataSetPerIndex(selected_index - 1,chartData);
            return data;
     }
    else {
         // Set resolution bound for selecting a dataset from Chart data
        let last_index = chartData.bidenSlices.length - 1;
        let data = getDataSetPerIndex(last_index, chartData);
        return data;
      }
        
    };
    

    const getDataSetPerIndex = (index,chartData) => {
      let bgColors = ['red','orange','yellow','lime','green','teal','blue','purple'];
      let bdColors =  ['black'];
      let date_headers =    chartData.dateHeadersStore[index];

      let labels = ["Biden Votes","Trump Votes","Other Votes"];
      let label = "Votes from: " + date_headers[0].replace(/T/g,'@').replace(/Z/g,' ') + " to "+ date_headers[date_headers.length-1].replace(/T/g,'@').replace(/Z/g,' ');
      setTitle(label);
      let biden_slice = chartData.bidenSlices[index];
      let trump_slice = chartData.trumpSlices[index];
      let other_slice = chartData.otherSlices[index];
      let datasets = 
        {
          label:label,
          data:[biden_slice,trump_slice,other_slice],
          backgroundColor:[bgColors[0],bgColors[1],bgColors[2]],
          borderColor:[bgColors[0],bgColors[1],bgColors[2]],
          borderWidth:1,
        };


      let data = {"labels": labels,"datasets":datasets };
      return data;
    };

    const updateChart = (num,chart_data=null) => {
      if(chart_data === null)
          chart_data = chartData;

      let labels = ["Biden Votes","Trump Votes","Other Votes"];
      console.log("entering updateChart with page no: ",num);
     
      let ctx = document.getElementById('myChart').getContext('2d');
      $('.page').css('background-color','rgb(239, 239, 239').css('border-color','rgb(255, 255, 255').css('border-width','3px');
      $('#page-'+ num).css('background-color','#ffc107');

     // let data = [65, 59, 80, 81, 56, 55, 40];
      let label =  '# of Votes';
      let type = props.type;       

      let data = getDatasets(chart_data,num,type,label);
      console.log("Pie Chart data: ", data);

      let chart = Chart.getChart('myChart');
      chart.data.labels = data.labels;        
      //datasets.forEach((dataset,index) => {
         // chart.data.datasets[index].data = dataset.data;
     // });
      chart.data.datasets = [data.datasets];
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
                    <h4>Votes Pie Chart</h4>
                </Col>
            </Row>
            <AnalyticsBar handleCloseChart={props.handleCloseChart} {...props} theResolutions={props.theResolutions} selectResolution={props.selectResolution} 
              selectAnalytics={props.selectAnalytics} chartData={props.chartData} chartType={'PieChart'}/>
         
            <Row>
                <Col className="w-100 d-flex justify-content-center">
                  <h4>{title}</h4>
                </Col>               
            </Row>
            <Row className="d-flex justify-content-center">
                <canvas id="myChart" className="pie-chart" width="400px" height="400px" left="300px"></canvas>
            </Row>
            <Row className="w-100 p-1 mt-3">
            <ChartPager  getPageNumber={getPageNumber} type={'line'} leftArrow={leftArrow} rightArrow={rightArrow} pageNo={pageNo}
                    thePagingArray={thePagingArray} thePageSetNumber={thePageSetNumber} chartData={chartData} thePageSize={thePageSize}
                    theChartArray={theChartArray} />
            </Row>
        </Container>
    );

}    





